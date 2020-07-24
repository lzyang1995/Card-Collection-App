import React from 'react';
import { Row, Col, Divider } from 'antd';
import axios from 'axios';

import Loading from './Loading.js';
import { formatDate } from '../utils/functions.js';
import '../assets/css/PromotionInfo.css';

class PromotionInfo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            promotionInfo: null,
        };
    }

    async componentDidMount() {
        let titleUri = encodeURIComponent(this.props.promotionTitle);

        let promotionResult = await axios.get("/api/promotions/search/findByTitle?title=" + titleUri);
        console.log("promotionResult: " + promotionResult.data);

        let promotion = promotionResult.data._embedded.promotions[0];
        let promotionInfo = {
            title: this.props.promotionTitle,
            imgUrl: "data:image/jpg;base64," + promotion.image,
            startDate: new Date(promotion.startDate),
            endDate: new Date(promotion.endDate),
            rule: promotion.ruleText
        };

        let cardResult = await axios.get("/api/cards/search/findByPromotionTitle?promotionTitle=" + titleUri);
        console.log("cardResult: " + cardResult.data);

        let cards = cardResult.data._embedded.cards;
        cards = cards.map(item => ({
            cardName: item.cardName,
            cardImgUrl: "data:image/jpg;base64," + item.cardImage
        }))
        promotionInfo.cards = cards;

        this.setState({
            promotionInfo,
        });
    }

    render() {
        let promotionInfo = this.state.promotionInfo;
        if (promotionInfo === null) {
            return (<Loading />);
        }

        return (
            <div>
                <div className="promotionSketch">
                    <div className="promotionImg">
                        <img src={promotionInfo.imgUrl} alt="活动宣传图" />
                    </div>
                    <div className="promotionDescription">
                        <h2>{promotionInfo.title}</h2>
                        <div>
                            活动时间：{formatDate(promotionInfo.startDate)} -- {formatDate(promotionInfo.endDate)}
                        </div>
                        <div className="promotionRule">
                            活动规则：{promotionInfo.rule}
                        </div>
                        <div className="promotionChildren">
                            {
                                this.props.children
                            }
                        </div>
                    </div>
                </div>
                <Divider />
                <h2>活动卡种：</h2>
                <Row gutter={16}>
                    {
                        promotionInfo.cards.map((item, index) => {
                            return (
                                <Col 
                                    span={4} 
                                    key={item.cardName}
                                    offset={index === 0 ? 2 : 0}
                                >
                                    <div className="promotionCardImg">
                                        <img src={item.cardImgUrl} alt={item.cardName} />
                                    </div>
                                    <div className="promotionCardName">
                                        {item.cardName}
                                    </div>
                                </Col>
                            );
                        })
                    }
                </Row>
            </div>
        );
    }

}

export default PromotionInfo;