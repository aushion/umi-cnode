import {Card} from 'antd';
const AuthorCard = (props) => {
    const userInfo = props.userInfo;
    
    return (<Card
        title="作者"
        style={{
        border: 'none'
    }}>
        <div>
            <img src={userInfo?userInfo.avatar_url:''} alt="" style={{width: '50%',display: 'inline-block'}}/>
            <span>{userInfo?userInfo.loginname:''}</span>
        </div>     
    </Card>
    )
}

export default AuthorCard;