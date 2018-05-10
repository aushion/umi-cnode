import {Layout, Menu} from 'antd';
import styles from "./index.css";
import router from "umi/router";
import Link from "umi/link";
const {Header, Content, Footer} = Layout;


export default (props) => {
    const accessToken = localStorage.getItem('accesstoken');
     return (
        <div>
            <Layout
                className="layout"
                style={{
                backgroundColor: '#e1e1e1'
            }}>
                <Header>
                    <Link to="/" className={styles.logo}></Link>
                    <Menu mode="horizontal" defaultSelectedKeys={['1']} className={styles.menu}   onClick={(e) => {
                        console.log(e)
                        if(e.key === 'exit'){
                            localStorage.clear();
                            router.push('/');
                        }
                        }}>
                        <Menu.Item key="home"><Link to="/"></Link>首页</Menu.Item>
                        {accessToken?<Menu.Item key="message">未读消息</Menu.Item>:''}
                        {accessToken?<Menu.Item key="exit">退出</Menu.Item>:<Menu.Item key="login"><Link to="/login"></Link>登录</Menu.Item>}
                        
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