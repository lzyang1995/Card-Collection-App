import React from "react";
import { Row, Col } from 'antd';

import '../assets/css/PromotionGrid.css';

function PromotionGrid(props) {
    let colArray = props.items.map((item) => {
        let url = "/promotion/" + encodeURIComponent(item.title);

        return (
            <Col span={6} key={item.title} className="promotionGridCol">
                <div className="indexPromotionImgDiv">
                    <a href={url}><img className="indexPromotionImg" src={item.imgUrl} /></a>
                </div>
                <div className="indexPromotionTitleDiv">{item.title}</div>
            </Col>
        );
    });

    return (
        <div>
            <h2 className="promotionGridTitle">{props.title}</h2>
            <Row gutter={16}>
                {colArray}
            </Row>
        </div>
    );
}

export default PromotionGrid;