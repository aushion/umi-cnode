import {Card} from 'antd';
import Link from 'umi/link';
const AuthorCard = (props) => {
    const userInfo = props.userInfo;
    
    return (<Card
        title="作者"
        style={{
        border: 'none'
    }}>
        <div>
            <Link to={userInfo?'/user/user?loginname='+userInfo.loginname:''}> <img src={userInfo?userInfo.avatar_url:''} alt="" style={{width: '50%',display: 'inline-block'}}/>
            </Link>
            <span>{userInfo?userInfo.loginname:''}</span>
        </div>     
    </Card>
    )
}

export default AuthorCard;