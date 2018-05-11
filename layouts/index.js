import {Layout, Menu, Badge} from 'antd';
import styles from "./index.css";
import router from "umi/router";
import Link from "umi/link";
const {Header, Content, Footer} = Layout;
const cnodeApi = 'https://cnodejs.org/api/v1';

const accessToken = localStorage.getItem('accesstoken');

const getMessageCount = () => {
    let count = 0;
    fetch(cnodeApi+'/message/count?accesstoken='+accessToken)
    .then(res => {
        if(res.status === 200){
            res.json().then( data => {
                count = data.data;
            })
        }
    })
    return count;
}

export default (props) => {

     return (
        <div>
            <Layout
                className="layout"
                style={{
                backgroundColor: '#e1e1e1'
            }}>
                <Header>
                    <Link to="/" className={styles.logo}></Link>
                    <Menu mode="horizontal"  className={styles.menu}   onClick={(e) => {
                        console.log(e)
                        if(e.key === 'exit'){
                            localStorage.clear();
                            router.push('/');
                        }
                        }}>
                        <Menu.Item key="home"><Link to="/"></Link>首页</Menu.Item>
                     
                    
                     {accessToken?<Menu.Item key="message"><Badge count={getMessageCount()}><Link to="/newMessage/newMessage" style={{color: '#fff'}}>未读消息</Link> </Badge></Menu.Item>:''}
                   
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