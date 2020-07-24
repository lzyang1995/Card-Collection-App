import React from 'react';
import ReactDOM from 'react-dom';
import Framework from './components/Framework.js';
import SuccessResponse from './components/SuccessResponse.js';

ReactDOM.render(
    <Framework>
        <SuccessResponse title="密码修改成功" buttonUrl="/login" buttonText="重新登录" />
    </Framework>,
    document.getElementById("react")
);
