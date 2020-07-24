import React from 'react';
import ReactDOM from 'react-dom';
import Framework from './components/Framework.js';
import SuccessResponse from './components/SuccessResponse.js';

ReactDOM.render(
    <Framework>
        <SuccessResponse title="注册成功" buttonUrl="/login" buttonText="登录" />
    </Framework>,
    document.getElementById("react")
);
