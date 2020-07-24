import React from 'react';
import { Button, message, Divider, Result } from 'antd';
import axios from 'axios';

import PromotionInfo from './PromotionInfo.js';
import Loading from './Loading.js';
import HelpInfo from './HelpInfo.js';
import {
    LOCALSTORAGE_AUTH,
    SESSIONSTORAGE_INVITEURL,
    MAX_HELP_TIME
}
    from '../utils/constants.js';
import { finishedCollecting } from '../utils/functions.js';
import '../assets/css/InviteContent.css';

class InviteContent extends React.Component {

    constructor(props) {
        super(props);

        this.handleCheck = this.handleCheck.bind(this);
        this.handleJoin = this.handleJoin.bind(this);
        this.handleHelp = this.handleHelp.bind(this);
        this.state = {
            sameUser: false,
            info: null,
            isSubmitting: false,
            isSubmittingForHelp: false,
            invalid: false
        }
    }

    async componentDidMount() {
        let auth = JSON.parse(localStorage.getItem(LOCALSTORAGE_AUTH));

        let tmp = window.location.href.split("/");
        this.promotionTitle = decodeURIComponent(tmp[tmp.length - 1]);
        this.userToHelp = decodeURIComponent(tmp[tmp.length - 2]);

        // check whether the promotion already ends
        let invalidCheck = await axios.get("/api/promotions/search/findByTitle?title=" + encodeURIComponent(this.promotionTitle));
        invalidCheck = invalidCheck.data._embedded.promotions[0];
        let now = Date.now();
        let startTime = new Date(invalidCheck.startDate).getTime();
        let endTime = new Date(invalidCheck.endDate).getTime();
        if (now < startTime || now > endTime) {
            this.setState({
                invalid: true
            });
            return;
        }

        if (auth && auth.loggedIn) {
            this.username = auth.username;

            if (this.userToHelp === auth.username) {
                this.setState({
                    sameUser: true
                });
                return;
            }

            let info = {};

            let participateResult = await axios.get("/api/userPromotions/search/findByUsernameAndPromotionTitle?username=" + encodeURIComponent(auth.username) + "&promotionTitle=" + encodeURIComponent(this.promotionTitle));
            console.log(participateResult);
            if (participateResult.data._embedded.userPromotions.length > 0) {
                info.participated = true;
            } else {
                info.participated = false;
            }

            let userToHelpResult = await axios.get("/api/users/search/findByUsername?username=" + encodeURIComponent(this.userToHelp));
            console.log(userToHelpResult);
            info.userToHelpNickname = userToHelpResult.data._embedded.users[0].nickname;

            let alreadyHelpTimeResult = await axios.get("/api/helpRecords/search/countByUsernameAndPromotionTitleAndHelper?username=" + encodeURIComponent(this.userToHelp) + "&promotionTitle=" + encodeURIComponent(this.promotionTitle) + "&helper=" + encodeURIComponent(this.username));
            console.log(alreadyHelpTimeResult);
            info.remainingHelpTime = MAX_HELP_TIME - alreadyHelpTimeResult.data;

            let finished = await finishedCollecting(this.userToHelp, this.promotionTitle);
            info.finished = finished;

            this.setState({
                sameUser: false,
                invalid: false,
                info
            });

        } else {
            sessionStorage.setItem(SESSIONSTORAGE_INVITEURL, window.location.href);
            window.location = "/login";
        }
    }

    handleCheck() {
        window.location = "/promotion/" + encodeURIComponent(this.promotionTitle);
    }

    handleJoin() {
        this.setState({
            isSubmitting: true
        });

        axios.post("/api/userPromotions", {
            username: this.username,
            promotionTitle: this.promotionTitle,
            chances: 3,
            haveInvited: 0
        }).then(response => {
            console.log(response);
            message.success("参与成功！");
            setTimeout(() => window.location.reload(), 500);
        }).catch(error => {
            console.log(error);
            message.error("参与失败，请重试");
        }).finally(() => this.setState({
            isSubmitting: false
        }))
    }

    async handleHelp() {
        this.setState({
            isSubmittingForHelp: true
        });

        try {
            let response;
            response = await axios.post("/api/helpRecords", {
                username: this.userToHelp,
                promotionTitle: this.promotionTitle,
                helper: this.username
            });
            console.log(response);

            response = await axios.get("/api/userPromotions/search/findByUsernameAndPromotionTitle?username=" + encodeURIComponent(this.userToHelp) + "&promotionTitle=" + encodeURIComponent(this.promotionTitle));
            console.log(response);
            let chances = response.data._embedded.userPromotions[0].chances;
            let href = response.data._embedded.userPromotions[0]._links.self.href;
            let id = +href.slice(href.lastIndexOf("/") + 1);

            response = await axios.patch("/api/userPromotions/" + id, {
                chances: chances + 1
            })
            console.log(response);

            message.success("助力成功！");
            setTimeout(() => window.location.reload(), 500);
        } catch (error) {
            message.error("助力失败，请重试");
            console.log(error);
        } finally {
            this.setState({
                isSubmittingForHelp: false
            });
        }
    }

    render() {
        if (this.state.invalid) {
            return <Result title="活动已结束" />;
        }

        if (this.state.sameUser) {
            return <Result title="您不能为自己助力" />;
        }

        if (this.state.info === null) {
            return (<Loading />);
        } else {
            let info = this.state.info;

            return (
                <div>
                    <PromotionInfo promotionTitle={this.promotionTitle}>
                        <Button
                            type="primary"
                            onClick={info.participated ? this.handleCheck : this.handleJoin}
                            loading={this.state.isSubmitting}
                        >
                            {info.participated ? "查看活动" : "立即参与"}
                        </Button>
                    </PromotionInfo>
                    <Divider />
                    <h1 className="inviteTitle">{info.userToHelpNickname}邀请您助力</h1>
                    <h3 className="inviteRemainTime">剩余助力次数：{info.remainingHelpTime}次</h3>
                    {
                        info.finished ?
                            <div style={{ textAlign: "center" }}>该用户已集齐卡片，不能再为TA助力</div> :
                            null
                    }
                    <div className="inviteHelpButton">
                        <Button
                            type="primary"
                            onClick={this.handleHelp}
                            disabled={info.remainingHelpTime <= 0 || info.finished}
                            loading={this.state.isSubmittingForHelp}
                        >
                            为TA助力
                        </Button>
                    </div>
                    <HelpInfo
                        username={this.userToHelp}
                        promotionTitle={this.promotionTitle}
                        subject={info.userToHelpNickname}
                    />
                </div>
            );
        }
    }
}

export default InviteContent;