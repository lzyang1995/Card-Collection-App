import React from 'react';
import { Spin } from 'antd';

import '../assets/css/Loading.css';

function Loading() {
    return (<div className="loadingDiv"><Spin size="large" /></div>);
}

export default Loading;