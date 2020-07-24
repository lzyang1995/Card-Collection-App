import React from 'react';
import axios from 'axios';
import { Form, Input, Button, Select, message, Space } from 'antd';
import VerficationCode from './VerificationCode.js';

import {
    LOCALSTORAGE_AUTH,
    VERIFICATION_INPUT_CLASS
} from '../utils/constants.js';
import { getVerificationImgCoord, formLayouts } from '../utils/functions.js';
import '../assets/css/Form.css';

const { Option } = Select;

const { layout, verfificationLayout, tailLayout } = formLayouts();

class ModifyInfoForm extends React.Component {

    constructor(props) {
        super(props);

        this.formRef = React.createRef();
        this.onReset = this.onReset.bind(this);
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

        this.formInitialValues = JSON.parse(localStorage.getItem(LOCALSTORAGE_AUTH));
        delete this.formInitialValues.loggedIn;
        delete this.formInitialValues.password;
    }

    componentDidMount() {
        this.setState({
            verificationImgCoord: getVerificationImgCoord(VERIFICATION_INPUT_CLASS)
        });
    }

    onReset() {
        this.formRef.current.resetFields();
    };

    onFinish(values) {
        this.setState({
            isSubmitting: true
        });

        console.log('Success:', values);

        let payload = Object.assign({}, values);
        delete payload.username;
        delete payload.verficationCode;

        axios.patch('/api/users/' + encodeURIComponent(values.username), payload)
            .then(response => {
                console.log(response);
                let auth = JSON.parse(localStorage.getItem(LOCALSTORAGE_AUTH));
                Object.assign(auth, payload);
                localStorage.setItem(LOCALSTORAGE_AUTH, JSON.stringify(auth));
                window.location = "/modifyInfoSuccess";
            })
            .catch(error => {
                console.log(error);
                message.error("个人信息修改失败");
            })
            .finally(() => this.setState({
                isSubmitting: false
            }))
    }

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
                <h2 className="formTitle">修改个人信息</h2>
                <Form
                    {...layout}
                    name="modifyInfo"
                    ref={this.formRef}
                    initialValues={this.formInitialValues}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                    >
                        <Input disabled={true} />
                    </Form.Item>

                    <Form.Item
                        label="昵称"
                        name="nickname"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: '请输入昵称',
                            }
                        ]}
                    >
                        <Input allowClear maxLength={16} placeholder="长度不超过16位" />
                    </Form.Item>

                    <Form.Item
                        name="phoneNumber"
                        label="手机号"
                        hasFeedback
                        rules={[
                            { required: true, message: '请输入手机号' },
                            {
                                pattern: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g,
                                message: "请输入有效的手机号"
                            }
                        ]}
                    >
                        <Input allowClear />
                    </Form.Item>

                    <Form.Item name="gender" label="性别" rules={[{ required: true }]}>
                        <Select placeholder="请选择性别">
                            <Option value="male">男</Option>
                            <Option value="female">女</Option>
                            <Option value="other">其他</Option>
                        </Select>
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
                        <Space>
                            <Button type="primary" htmlType="submit" loading={this.state.isSubmitting}>
                                提交
                            </Button>
                            <Button htmlType="button" onClick={this.onReset}>
                                重置
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        );
    }

}

export default ModifyInfoForm;