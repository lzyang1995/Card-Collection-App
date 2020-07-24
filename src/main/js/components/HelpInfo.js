import React from 'react';
import { Table, Divider } from 'antd';
import axios from 'axios';

import { PAGE_SIZE } from '../utils/constants.js';
import { formatDate } from '../utils/functions.js';
import '../assets/css/HelpInfo.css';

class HelpInfo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            info: null
        }
    }

    async componentDidMount() {
        let username = this.props.username;
        let title = this.props.promotionTitle;
        let info = {};

        let helpedTime = await axios.get("/api/helpRecords/search/countByUsernameAndPromotionTitle?username=" + encodeURIComponent(username) + "&promotionTitle=" + encodeURIComponent(title));
        info.helpedTime = helpedTime.data;

        let helpedHistoryResult = await axios.get("/api/helpRecords/search/findByUsernameAndPromotionTitle?username=" + encodeURIComponent(username) + "&promotionTitle=" + encodeURIComponent(title) + "&page=0&size=" + PAGE_SIZE + "&sort=helpedAt,desc");
        let helpedHistory = helpedHistoryResult.data._embedded.helpRecords;
        info.helpedHistory = await Promise.all(helpedHistory.map(async item => {
            let helperUsername = item.helper;
            let helperInfo = await axios.get("/api/users/search/findByUsername?username=" + encodeURIComponent(helperUsername));
            return {
                nickname: helperInfo.data._embedded.users[0].nickname,
                helpedAt: new Date(item.helpedAt)
            };
        }));

        this.setState({
            info
        });
    }

    render() {
        if (this.state.info === null) {
            return null;
        } else {
            let info = this.state.info;

            let helpedHistoryTableData = info.helpedHistory.map((item, index) => ({
                key: String(index),
                nickname: item.nickname,
                time: formatDate(item.helpedAt)
            }));
            let helpedHistoryTableCols = [
                {
                    title: "昵称",
                    dataIndex: "nickname",
                    key: "nickname",
                    width: 500
                },
                {
                    title: "助力时间",
                    dataIndex: "time",
                    key: "time"
                }
            ];

            return (
                <div>
                    <Divider />
                    <h2>助力记录</h2>
                    <p className="helpInfoTimes">{this.props.subject}共计被助力{info.helpedTime}次</p>
                    <p>助力历史（最近10次）</p>
                    <Table
                        columns={helpedHistoryTableCols}
                        dataSource={helpedHistoryTableData}
                        pagination={false}
                    />
                </div>
            );
        }
    }

}

export default HelpInfo;