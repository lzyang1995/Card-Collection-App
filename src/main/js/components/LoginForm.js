import React from 'react';
import axios from 'axios';
import { Form, Input, Button, message } from 'antd';
import bcrypt from 'bcryptjs';
import VerficationCode from './VerificationCode.js';

import { 
    LOCALSTORAGE_AUTH, 
    SESSIONSTORAGE_INVITEURL,
    VERIFICATION_INPUT_CLASS
} from '../utils/constants.js';
import { getVerificationImgCoord, formLayouts } from '../utils/functions.js';
import '../assets/css/Form.css';

const { layout, verfificationLayout, tailLayout } = formLayouts();

class LoginForm extends React.Component {

    constructor(props) {
        super(props);

        this.formRef = React.createRef();
        this.setVerificationCode = this.setVerificationCode.bind(this);
        this.onFinish = this.onFinish.bind(this);
        this.state = {
            verficationCode: null,
            isSubmitting: false,
            verificationImgCoord: {
                left: -100,
                top: -100
            }
        };
    }

    componentDidMount() {
        this.setState({
            verificationImgCoord: getVerificationImgCoord(VERIFICATION_INPUT_CLASS)
        });
    }

    async onFinish(values) {
        this.setState({
            isSubmitting: true
        });

        console.log('Success:', values);

        let result = await axios.get("/api/users/search/findByUsername?username=" + encodeURIComponent(values.username));

        if (result.data._embedded.users.length !== 0) {
            let user = result.data._embedded.users[0];
            let compareResult = await bcrypt.compare(values.password, user.password);
            if (compareResult) {
                let auth = {
                    loggedIn: true,
                    username: values.username,
                    nickname: user.nickname,
                    gender: user.gender,
                    phoneNumber: user.phoneNumber,
                    password: user.password
                };
                localStorage.setItem(LOCALSTORAGE_AUTH, JSON.stringify(auth));
                message.success('登陆成功！');
                setTimeout(() => {
                    let inviteUrl = sessionStorage.getItem(SESSIONSTORAGE_INVITEURL);

                    if (inviteUrl === null) {
                        window.location = "/";
                    } else {
                        window.location = inviteUrl;
                    }
                }, 500);
                return;
            }
        }

        message.error("登陆失败");
        this.onReset();
        this.setState({
            isSubmitting: false
        });
    }

    onReset() {
        this.formRef.current.resetFields();
    };

    onFinishFailed(errorInfo) {
        console.log('Failed:', errorInfo);
    }

    setVerificationCode(code) {
        this.setState({
            verficationCode: code
        });
    }

    render() {
        return (
            <div>
                <h2 className="formTitle">登录</h2>
                <Form
                    {...layout}
                    name="login"
                    ref={this.formRef}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名',
                            }
                        ]}
                    >
                        <Input allowClear maxLength={16} />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码',
                            }
                        ]}
                    >
                        <Input.Password allowClear maxLength={20} />
                    </Form.Item>

                    <Form.Item
                        name="verficationCode"
                        label="验证码"
                        {...verfificationLayout}
                        rules={[
                            { required: true, message: '请输入验证码' },
                            {
                                validator: (rule, value) => {
                                    if (!value || value.trim().toLowerCase() === this.state.verficationCode.toLowerCase()) {
                                        return Promise.resolve();
                                    } else {
                                        return Promise.reject("验证码错误");
                                    }
                                }
                            }
                        ]}
                    >
                        <Input className={VERIFICATION_INPUT_CLASS} />
                    </Form.Item>
                    <VerficationCode 
                        onClick={this.setVerificationCode} 
                        coordinate={this.state.verificationImgCoord}
                    />

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" loading={this.state.isSubmitting}>
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }

}

export default LoginForm;