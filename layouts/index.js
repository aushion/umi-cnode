import {Layout, Menu, Input, Card, Button} from 'antd';
import Link from 'umi/link';
import styles from "./index.css";
const {Header, Content, Footer} = Layout;
const Search = Input.Search;

export default(props) => {
    if(props.location.query.data){
        localStorage.setItem('userInfo',JSON.stringify(props.location.query.data))
    } 
    return (
        <div>
            <Layout
                className="layout"
                style={{
                backgroundColor: '#e1e1e1'
            }}>
                <Header>
                    <a className={styles.logo} href="http://localhost:8000"></a>
                    <Search
                        placeholder="input search text"
                        onSearch={value => console.log(value)}
                        style={{
                        width: 200
                    }}/>
                    <Menu mode="horizontal" defaultSelectedKeys={['1']} className={styles.menu}>
                        <Menu.Item key="1">首页</Menu.Item>
                        <Menu.Item key="2">未读消息</Menu.Item>
                        <Menu.Item key="3">新手入门</Menu.Item>
                        <Menu.Item key="4">退出</Menu.Item>
                        
                    </Menu>
                </Header>
                <Content className={styles.main}>
                        {props.children}
                </Content>
                <Footer className={styles.footer}>Footer</Footer>
            </Layout>
        </div>
    )
}