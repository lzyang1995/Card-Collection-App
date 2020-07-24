import React from 'react';
import { Divider } from 'antd'; 
import axios from 'axios';

import PromotionGrid from './PromotionGrid.js';
import { LOCALSTORAGE_AUTH } from '../utils/constants.js';

class IndexContent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            promotions: [],
            participated: []
        };
    }

    async componentDidMount() {
        let result = await axios.get("/api/promotions");
        console.log(result.data);

        let promotions = result.data._embedded.promotions;
        // filter by promotion date. Do not show promotions that are invalid.
        let now = Date.now();
        promotions = promotions.filter(item => {
            let startTime = new Date(item.startDate).getTime();
            let endTime = new Date(item.endDate).getTime();

            return startTime <= now && now <= endTime;
        });

        promotions = promotions.map((item) => {
            let selfLink = item._links.self.href;
            let title = selfLink.slice(selfLink.lastIndexOf("/") + 1);
            title = decodeURIComponent(title);

            return {
                imgUrl: "data:image/jpg;base64," + item.image,
                title
            };
        });

        console.log(promotions);

        let auth = JSON.parse(localStorage.getItem(LOCALSTORAGE_AUTH));

        if (auth && auth.loggedIn) {
            // user logged in
            let participated = await axios.get("/api/userPromotions/search/findByUsername?username=" + encodeURIComponent(auth.username));
            console.log(participated.data);

            participated = participated.data._embedded.userPromotions;
            participated = participated.map((item) => item.promotionTitle);

            console.log(participated);

            this.setState({
                promotions,
                participated
            });

        } else {
            // user not logged in
            this.setState({
                promotions
            });
        }
    }

    render() {
        let promotions = this.state.promotions;
        let participated = this.state.participated;
        let auth = JSON.parse(localStorage.getItem(LOCALSTORAGE_AUTH));

        if (auth && auth.loggedIn) {
            // user logged in
            let canParticipate = [];
            let alreadyParticipate = [];
            for (let item of promotions) {
                if (participated.includes(item.title)) {
                    alreadyParticipate.push(item);
                } else {
                    canParticipate.push(item);
                }
            }

            return (
                <div>
                    <PromotionGrid title="可参与活动" items={canParticipate} />
                    <Divider />
                    <PromotionGrid title="已参与活动" items={alreadyParticipate} />
                </div>
            );
        } else {
            // user not logged in
            return (
                <PromotionGrid title="所有活动" items={promotions} />
            );
        }
    }

}

export default IndexContent;