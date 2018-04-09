import { Layout, Menu, Input } from 'antd';
import styles from "./index.css";
const { Header, Content, Footer } = Layout;
const Search = Input.Search;

export default (props) => {
    return (
        <div>
            <Layout className="layout" style={{backgroundColor: '#e1e1e1'}}>
            <Header>
                <div className={styles.logo}></div>
                <Search
                placeholder="input search text"
                onSearch={value => console.log(value)}
                style={{ width: 200 }}
            />
                <Menu
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    className={styles.menu}
                >
                    <Menu.Item key="1">首页</Menu.Item>
                    <Menu.Item key="2">未读消息</Menu.Item>
                    <Menu.Item key="3">新手入门</Menu.Item>
                </Menu>
            </Header>
            <Content className={styles.content}>               
                    {props.children}
            </Content>   
            <Footer style={{ textAlign: 'center' }}>Footer</Footer>
            </Layout>
        </div>
    )
}