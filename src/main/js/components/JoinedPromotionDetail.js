import React from 'react';
import { Button, Row, Col, message, Table, Modal, Divider } from 'antd';
import axios from 'axios';

import { LOCALSTORAGE_AUTH, PAGE_SIZE } from '../utils/constants.js';
import { formatDate } from '../utils/functions.js';

import HelpInfo from './HelpInfo.js';
import Loading from './Loading.js';
import '../assets/css/JoinedPromotionDetail.css';

class JoinedPromotionDetail extends React.Component {

    constructor(props) {
        super(props);

        let auth = JSON.parse(localStorage.getItem(LOCALSTORAGE_AUTH));
        this.username = auth.username;
        this.title = this.props.promotionTitle;

        this.handleDraw = this.handleDraw.bind(this);
        this.state = {
            info: null,
            isSubmitting: false,
            drawResultIndex: 0,
            modalVisible: false
        };
    }

    async componentDidMount() {
        let info = {};

        let chancesResult = await axios.get("/api/userPromotions/search/findByUsernameAndPromotionTitle?username=" + encodeURIComponent(this.username) + "&promotionTitle=" + encodeURIComponent(this.title));
        info.chances = chancesResult.data._embedded.userPromotions[0].chances;
        let curPromotionHref = chancesResult.data._embedded.userPromotions[0]._links.self.href;
        info.userPromotionId = +curPromotionHref.slice(curPromotionHref.lastIndexOf("/") + 1);

        let cardsResult = await axios.get("/api/cards/search/findByPromotionTitle?promotionTitle=" + encodeURIComponent(this.title));
        let cards = cardsResult.data._embedded.cards;

        let cardIds = [];
        info.cards = cards.map(item => {
            let href = item._links.self.href;
            let id = +href.slice(href.lastIndexOf("/") + 1);
            
            cardIds.push(id);
            return {
                id,
                name: item.cardName,
                imgUrl: "data:image/jpg;base64," + item.cardImage,
                probability: item.probability,
            };
        });

        console.log("cardIds:")
        console.log(cardIds);

        let cardDrawTimes = await Promise.all(cardIds.map(async item => {
            let itemDrawTime = await axios.get("/api/userCards/search/countByUsernameAndCardIdIsIn?username=" + encodeURIComponent(this.username) + "&cardIdList=" + item);
            return itemDrawTime.data;
        }));

        info.drawTime = 0;
        for (let i = 0; i < cardDrawTimes.length; i++) {
            info.drawTime += cardDrawTimes[i];

            info.cards[i].got = cardDrawTimes[i] > 0;
        }

        let drawHistoryResult = await axios.get("/api/userCards/search/findByUsernameAndCardIdIsIn?username=" + encodeURIComponent(this.username) + "&cardIdList=" + cardIds.join() + "&page=0&size=" + PAGE_SIZE + "&sort=gotAt,desc");
        let drawHistory = drawHistoryResult.data._embedded.userCards;
        let cardIdToName = new Map();
        for (let item of info.cards) {
            cardIdToName.set(item.id, item.name);
        }
        info.drawHistory = drawHistory.map(item => ({
            cardName: cardIdToName.get(item.cardId),
            gotAt: new Date(item.gotAt)
        }));

        this.setState({
            info,
        });
    }

    async handleDraw() {
        this.setState({
            isSubmitting: true
        });

        let info = this.state.info;
        let probs = info.cards.map(item => item.probability);

        let rand = Math.random();
        let resultIndex;
        let start = 0.0;
        for (resultIndex = 0; resultIndex < info.cards.length; resultIndex++) {
            if (start <= rand && rand < start + probs[resultIndex]) break;

            start += probs[resultIndex];
        }

        console.log(info.cards[resultIndex].id);

        try {
            let response = await axios.post("/api/userCards", {
                username: this.username,
                cardId: info.cards[resultIndex].id
            });

            console.log(response);

            response = await axios.patch("/api/userPromotions/" + info.userPromotionId, {
                chances: info.chances - 1
            })

            console.log(response);

            this.setState({
                drawResultIndex: resultIndex,
                modalVisible: true
            });
        } catch (error) {
            console.log(error);
            message.error("刮卡失败，请重试");
        } finally {
            this.setState({
                isSubmitting: false
            });
        }
    }

    handleOk() {
        window.location.reload();
    }

    render() {
        let info = this.state.info;
        if (info === null) {
            return (<Loading />);
        } else {
            console.log("info:");
            console.log(info);

            let drawHistoryTableData = info.drawHistory.map((item, index) => ({
                key: String(index),
                cardName: item.cardName,
                time: formatDate(item.gotAt)
            }));
            let drawHistoryTableCols = [
                {
                    title: "卡片",
                    dataIndex: "cardName",
                    key: "cardName",
                    width: 500
                },
                {
                    title: "获得时间",
                    dataIndex: "time",
                    key: "time"
                }
            ];

            let gotCardNum = 0;
            for (let item of info.cards) {
                if (item.got) {
                    gotCardNum++;
                }
            }

            return (
                <div>
                    <div className="joinedDrawCard">
                        <h3>可刮卡次数：{info.chances}</h3>
                        <div>
                            <Button
                                type="primary"
                                onClick={this.handleDraw}
                                loading={this.state.isSubmitting}
                                disabled={info.chances <= 0 || gotCardNum >= 5}
                            >
                                刮卡
                        </Button>
                        </div>
                    </div>
                    <Divider />
                    <Row gutter={16}>
                        {
                            info.cards.map((item, index) => {
                                return (
                                    <Col 
                                        span={4} 
                                        key={item.name}
                                        offset={index === 0 ? 2 : 0}
                                    >
                                        <div className="userPromotionCardDiv">
                                            <img
                                                src={item.imgUrl}
                                                className={item.got ? null : "notGotCard"}
                                                alt={item.name}
                                            />
                                        </div>
                                        <div className="userPromotionCardNameDiv">{item.name}</div>
                                    </Col>
                                );
                            })
                        }
                    </Row>
                    <Divider />
                    <div>
                        <h2>刮卡记录</h2>
                        <p className="drawCardTimes">您共计刮卡{info.drawTime}次</p>
                        <p>刮卡历史（最近10次）</p>
                        <Table
                            columns={drawHistoryTableCols}
                            dataSource={drawHistoryTableData}
                            pagination={false}
                        />
                    </div>
                    <HelpInfo
                        username={this.username}
                        promotionTitle={this.title}
                        subject="您"
                    />

                    {/** The modal to show after drawing card */}
                    <Modal
                        title="刮卡结果"
                        visible={this.state.modalVisible}
                        onOk={this.handleOk}
                        closable={false}
                        footer={[
                            <Button key="confirm" type="primary" onClick={this.handleOk}>
                                确认
                            </Button>
                        ]}
                    >
                        <p>恭喜您抽到了：</p>
                        <div>
                            <div className="modalImgDiv">
                                <img
                                    src={info.cards[this.state.drawResultIndex].imgUrl}
                                    alt={info.cards[this.state.drawResultIndex].name}
                                />
                            </div>
                            <div className="modalCardNameDiv">
                                {info.cards[this.state.drawResultIndex].name}
                            </div>
                        </div>
                    </Modal>
                </div>
            );
        }
    }
}

export default JoinedPromotionDetail;