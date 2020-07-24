import React from 'react';
import { Tabs, Button, message, Modal } from 'antd';
import axios from 'axios';
import copy from 'clipboard-copy';

import JoinedPromotionDetail from './JoinedPromotionDetail.js';
import PromotionInfo from './PromotionInfo.js';
import Loading from './Loading.js';
import { LOCALSTORAGE_AUTH } from '../utils/constants.js';
import { finishedCollecting } from '../utils/functions.js';

const { TabPane } = Tabs;

class PromotionDetailContent extends React.Component {

    constructor(props) {
        super(props);

        this.handleInvitation = this.handleInvitation.bind(this);
        this.handleJoin = this.handleJoin.bind(this);
        this.state = {
            participated: null,
            isSubmitting: false,
            finished: false,
            shared: false
        }
    }

    async componentDidMount() {
        let href = window.location.href;
        let promotionTitle = href.slice(href.lastIndexOf("/") + 1);
        this.promotionTitle = decodeURIComponent(promotionTitle);
        console.log(this.promotionTitle);

        let auth = JSON.parse(localStorage.getItem(LOCALSTORAGE_AUTH));
        if (auth && auth.loggedIn) {
            let result = await axios.get("/api/userPromotions/search/findByUsernameAndPromotionTitle?username=" + encodeURIComponent(auth.username) + "&promotionTitle=" + promotionTitle);

            console.log(result.data);

            if (result.data._embedded.userPromotions.length > 0) {
                let haveInvited = result.data._embedded.userPromotions[0].haveInvited;

                let finished = await finishedCollecting(auth.username, this.promotionTitle);

                this.setState({
                    participated: true,
                    finished,
                    shared: haveInvited !== 0,
                });
                return;
            }
        }

        this.setState({
            participated: false,
            finished: false,
            shared: false
        });
    }

    handleInvitation() {
        this.setState({
            isSubmitting: true
        });

        let auth = JSON.parse(localStorage.getItem(LOCALSTORAGE_AUTH));
        let title = this.promotionTitle;
        let shareUrl = "http://localhost:8080/invite/" + encodeURIComponent(auth.username) + "/" + encodeURIComponent(title);

        Modal.info({
            title: "分享URL",
            content: (<div id="shareUrl">{shareUrl}</div>),
            okText: "复制",
            async onOk() {
                copy(shareUrl);

                let response = await axios.get("/api/userPromotions/search/findByUsernameAndPromotionTitle?username=" + encodeURIComponent(auth.username) + "&promotionTitle=" + encodeURIComponent(title));
                console.log(response);
                let chances = response.data._embedded.userPromotions[0].chances;
                let haveInvited = response.data._embedded.userPromotions[0].haveInvited;
                let href = response.data._embedded.userPromotions[0]._links.self.href;
                let id = +href.slice(href.lastIndexOf("/") + 1);

                if (haveInvited === 0) {
                    response = await axios.patch("/api/userPromotions/" + id, {
                        chances: chances + 2,
                        haveInvited: 1
                    });
                    console.log(response);
                }

                window.location.reload();
            }
        });
    }

    handleJoin() {
        this.setState({
            isSubmitting: true
        });

        let auth = JSON.parse(localStorage.getItem(LOCALSTORAGE_AUTH));
        if (auth && auth.loggedIn) {
            // user logged in
            axios.post("/api/userPromotions", {
                username: auth.username,
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
        } else {
            // user not logged in
            window.location = "/login";
            this.setState({
                isSubmitting: false
            });
        }
    }

    render() {
        let participated = this.state.participated;
        if (participated === null) {
            return (<Loading />);
        }

        if (participated) {
            return (
                <Tabs defaultActiveKey="1" centered>
                    <TabPane tab="参与信息" key="1">
                        <JoinedPromotionDetail promotionTitle={this.promotionTitle} />
                    </TabPane>
                    <TabPane tab="活动信息" key="2">
                        <PromotionInfo promotionTitle={this.promotionTitle}>
                            <div>
                                <Button 
                                    type="primary" 
                                    onClick={this.handleInvitation} 
                                    loading={this.state.isSubmitting}
                                    disabled={this.state.finished}
                                >
                                    邀请朋友助力
                                </Button>
                                {
                                    this.state.shared ? 
                                        null :
                                        <p>首次邀请可获得两次刮卡机会！</p>
                                }
                            </div>
                        </PromotionInfo>
                    </TabPane>
                </Tabs>
            );
        } else {
            return (
                <PromotionInfo promotionTitle={this.promotionTitle}>
                    <Button type="primary" onClick={this.handleJoin} loading={this.state.isSubmitting}>立即参与</Button>
                </PromotionInfo>
            );
        }
    }

}

export default PromotionDetailContent;