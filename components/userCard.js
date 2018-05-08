import {Card, Button} from 'antd';
import Link from 'umi/link'

export default (props) => {
    const userInfo = props.userInfo;
    return 
        {userInfo
            ? <Card
                    title="个人信息"
                    style={{
                    width: '100%',
                    border: 'none'
                }}>
                    <div>
                    <img src={userInfo.avatar_url} alt="nidongde"/><span>{userInfo.loginname}</span>
                    </div>
                    <Button type="primary">发布话题</Button>                              
                </Card>   
            : <Card
                title="CNode：Node.js专业中文社区"
                style={{
                width: '100%',
                border: 'none'
            }}>
                <p>当前是游客状态，您可以登录享受更多特权</p>
                <Button type="primary">
                    <Link to="/login">通过AccessToken登录</Link>
                </Button>
            </Card>
    }
}