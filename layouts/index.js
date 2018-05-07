import {Layout, Menu, Input, Card, Button} from 'antd';
import Link from 'umi/link';
import styles from "./index.css";
const {Header, Content, Footer} = Layout;
const Search = Input.Search;

export default(props) => {
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
                    </Menu>
                </Header>
                <Content className={styles.main}>
                    <div className={styles.sidebar}>
                        <Card
                            title="CNode：Node.js专业中文社区"
                            style={{
                            width: '100%',
                            border: 'none'
                        }}>
                            <p>当前是游客状态，您可以登录享受更多特权</p>
                            <Button type="primary"><Link to="/login">通过AccessToken登录</Link></Button>
                        </Card>
                    </div>
                    <div className={styles.content}>
                        {props.children}
                    </div>

                </Content>
                <Footer className={styles.footer}>Footer</Footer>
            </Layout>
        </div>
    )
}