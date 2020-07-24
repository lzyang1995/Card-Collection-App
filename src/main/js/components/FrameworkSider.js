import React from 'react';
import { Breadcrumb, Menu } from 'antd';

import { LOCALSTORAGE_AUTH, SESSIONSTORAGE_INVITEURL } from '../utils/constants.js'
import '../assets/css/frameworkSider.css';

class FrameworkSider extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false
        };
    }

    componentDidMount() {
        let auth = localStorage.getItem(LOCALSTORAGE_AUTH);
        let loggedIn;
        if (!auth) {
            loggedIn = false;
        } else {
            loggedIn = JSON.parse(auth).loggedIn;
        }

        this.setState({
            loggedIn,
        });
    }

    handleLogout() {
        localStorage.removeItem(LOCALSTORAGE_AUTH);
        sessionStorage.removeItem(SESSIONSTORAGE_INVITEURL);
        window.location = "/login";
    }

    render() {
        if (this.state.loggedIn) {
            let menu = (
                <Menu>
                    <Menu.Item>
                        <a href="/modifyInfo">
                            编辑个人信息
                        </a>
                    </Menu.Item>
                    <Menu.Item>
                        <a href="/modifyPassword">
                            修改密码
                        </a>
                    </Menu.Item>
                    <Menu.Item>
                        <a href="#" onClick={this.handleLogout}>
                            注销
                        </a>
                    </Menu.Item>
                </Menu>
            );

            return (
                <Breadcrumb separator="" className="indexLoginout">
                    <Breadcrumb.Item className="userOptions" overlay={menu}>
                        {
                            JSON.parse(localStorage.getItem(LOCALSTORAGE_AUTH)).nickname
                        }
                    </Breadcrumb.Item>
                    <Breadcrumb.Separator></Breadcrumb.Separator>
                    <Breadcrumb.Item></Breadcrumb.Item>
                </Breadcrumb>
            );
        } else {
            return (
                <Breadcrumb separator="" className="indexLoginout">
                    <Breadcrumb.Item><a href="/login">登录</a></Breadcrumb.Item>
                    <Breadcrumb.Separator>|</Breadcrumb.Separator>
                    <Breadcrumb.Item><a href="/register">注册</a></Breadcrumb.Item>
                    <Breadcrumb.Separator></Breadcrumb.Separator>
                    <Breadcrumb.Item></Breadcrumb.Item>
                </Breadcrumb>
            );
        }
    }

}

export default FrameworkSider;
