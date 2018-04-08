import { Layout, Menu, Breadcrumb } from 'antd';
import styles from "./index.css";
const { Header, Content, Footer } = Layout;

export default (props) => {
    return (
        <div>
            <Layout className="layout">
            <Header>
                <div className={styles.logo}></div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{ lineHeight: '64px' ,float: 'right',marginRight: '200px'}}
                >
                    <Menu.Item key="1">首页</Menu.Item>
                    <Menu.Item key="2">未读消息</Menu.Item>
                    <Menu.Item key="3">新手入门</Menu.Item>
                </Menu>
    </Header>
            <content style={{ padding: '0 480px' }}>               
<div style={{ padding: 24, minHeight: 280 }}>{
                    props.children
                }</div>
            </content>   
            <footer style={{ textAlign: 'center' }}>Footer</footer>
            </Layout>
        </div>
    )
}