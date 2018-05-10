import {Card, Button} from 'antd';
import Link from 'umi/link'
const UserCard = (props) => {
    const userInfo = props.userInfo;
    const card1 = <Card
        title="个人信息"
        style={{
        width: '100%',
        border: 'none'
    }}>
        <div>
            <img src={userInfo?userInfo.avatar_url:''} alt=""/>
            <span>{userInfo?userInfo.loginname:''}</span>
        </div>
        <Button type="primary"><Link to='publish/publish'>发布话题</Link></Button>
    </Card>


    const card2 = <Card
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
    return userInfo
        ? card1
        : card2

}

export default UserCard;