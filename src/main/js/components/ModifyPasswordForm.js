import React from 'react';
import axios from 'axios';
import { Form, Input, Button, message } from 'antd';
import bcrypt from 'bcryptjs';
import VerficationCode from './VerificationCode.js';

import { LOCALSTORAGE_AUTH, SALT_ROUNDS, VERIFICATION_INPUT_CLASS } from '../utils/constants.js';
import { getVerificationImgCoord, formLayouts } from '../utils/functions.js';
import '../assets/css/Form.css';

const { layout, verfificationLayout, tailLayout } = formLayouts();

class ModifyPasswordForm extends React.Component {

    constructor(props) {
        super(props);

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

    onFinish(values) {
        this.setState({
            isSubmitting: true
        });

        console.log('Success:', values);

        bcrypt.hash(values.newPassword, SALT_ROUNDS)
            .then(hash => {
                let username = JSON.parse(localStorage.getItem(LOCALSTORAGE_AUTH)).username;
                return axios.patch('/api/users/' + encodeURIComponent(username), {
                    password: hash
                });
            })
            .then(response => {
                console.log(response);
                localStorage.removeItem(LOCALSTORAGE_AUTH);
                window.location = "/modifyPasswordSuccess";
            })
            .catch(error => {
                console.log(error);
                message.error("密码修改失败");
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
                <h2 className="formTitle">修改密码</h2>
                <Form
                    {...layout}
                    name="modifyPassword"
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <Form.Item
                        label="旧密码"
                        name="oldPassword"
                        rules={[
                            {
                                required: true,
                                message: '请输入旧密码',
                            },
                            {
                                validator: async (rule, value) => {
                                    let user = JSON.parse(localStorage.getItem(LOCALSTORAGE_AUTH));
                                    let compareResult = await bcrypt.compare(value, user.password);
                                    if (!value || compareResult) {
                                        return Promise.resolve();
                                    } else {
                                        return Promise.reject("旧密码错误");
                                    }
                                }
                            }
                        ]}
                    >
                        <Input.Password allowClear maxLength={20} />
                    </Form.Item>

                    <Form.Item
                        label="新密码"
                        name="newPassword"
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
                        label="确认新密码"
                        dependencies={['newPassword']}
                        rules={[
                            {
                                required: true,
                                message: '请确认您的密码',
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
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

export default ModifyPasswordForm;