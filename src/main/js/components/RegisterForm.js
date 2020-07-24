import React from 'react';
import axios from 'axios';
import { Form, Input, Button, Select, message, Space } from 'antd';
import bcrypt from 'bcryptjs';
import VerficationCode from './VerificationCode.js';

import { SALT_ROUNDS, VERIFICATION_INPUT_CLASS } from '../utils/constants.js';
import { getVerificationImgCoord, formLayouts } from '../utils/functions.js';
import '../assets/css/Form.css';

const { Option } = Select;

const { layout, verfificationLayout, tailLayout } = formLayouts();

class RegisterForm extends React.Component {

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
    }

    async componentDidMount() {
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
        delete payload.confirm;
        delete payload.verficationCode;

        bcrypt.hash(payload.password, SALT_ROUNDS)
            .then(hash => {
                payload.password = hash;
                return axios.post('/api/users', payload);
            })
            .then(response => {
                console.log(response);
                window.location = "/registerSuccess";
            })
            .catch(error => {
                console.log(error);
                message.error("注册失败");
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
                <h2 className="formTitle">注册</h2>
                <Form
                    {...layout}
                    name="basic"
                    ref={this.formRef}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名',
                            },
                            {
                                validator: (rule, value) => {
                                    return axios.get("/api/users/search/findByUsername?username=" + encodeURIComponent(value))
                                        .then(result => {
                                            // console.log(result);
                                            if (result.data._embedded.users.length === 0) {
                                                return Promise.resolve();
                                            } else {
                                                return Promise.reject("用户名已存在");
                                            }
                                        })
                                }
                            },
                            {
                                pattern: /^[a-z0-9]{6,16}$/igm,
                                message: "用户名无效"
                            }
                        ]}
                    >
                        <Input allowClear maxLength={16} placeholder="由字母和数字组成，长度6~16位" />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: '请输入密码',
                            },
                            {
                                min: 8,
                                message: "密码长度至少8位"
                            }
                        ]}
                    >
                        <Input.Password allowClear maxLength={20} placeholder="长度8~20位" />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="确认密码"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: '请确认您的密码',
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('两次输入密码不一致');
                                },
                            }),
                        ]}
                    >
                        <Input.Password allowClear maxLength={20} />
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

export default RegisterForm;