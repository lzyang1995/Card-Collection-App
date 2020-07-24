import React from 'react';
import ReactDOM from 'react-dom';
import Framework from './components/Framework.js';
import SuccessResponse from './components/SuccessResponse.js';

ReactDOM.render(
    <Framework>
        <SuccessResponse title="个人信息修改成功" buttonUrl="/index" buttonText="返回首页" />
    </Framework>,
    document.getElementById("react")
);
