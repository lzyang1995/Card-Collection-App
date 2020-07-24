import React from 'react';
import { Layout } from 'antd';
import 'antd/dist/antd.css';

import FrameworkSider from './FrameworkSider.js';
import '../assets/css/framework.css';

const { Header, Sider, Content } = Layout;

class Framework extends React.Component {

    constructor(props) {
        super(props);

        
    }

    render() {
        return (
            <Layout>
                <Header className="indexHeader">
                    <Layout>
                        <Content className="indexTitle">
                            <span onClick={() => window.location = "/"}>
                                集卡游戏
                            </span>
                        </Content>
                        <Sider>
                            <FrameworkSider />
                        </Sider>
                    </Layout>
                </Header>
                <Content className="indexContent">
                    {this.props.children}
                </Content>
            </Layout>
        );
    }
}

export default Framework;