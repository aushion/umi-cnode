import * as React from 'react';
import {Card, Breadcrumb, List} from 'antd';
import UserCard from '../../components/userCard';
import Link from 'umi/link';
const cnodeApi = 'https://cnodejs.org/api/v1';
const accesstoken = localStorage.getItem('accesstoken');
export default class extends React.Component{
    state = {
      has_read_messages: [],
      hasnot_read_messages: []
    }

    componentDidMount () {
        this.getMessage()
    }
    getMessage = () => {
        fetch(cnodeApi+'/messages?accesstoken='+accesstoken)
        .then( res => {
            if(res.status === 200){
                res.json().then( data => {
                    console.log(data)
                    this.setState({
                        has_read_messages: data.data.has_read_messages,
                        hasnot_read_messages: data.data.hasnot_read_messages
                    })
                })
            }
        })
    }

   render() {
       const userInfo = JSON.parse(localStorage.getItem('userInfo'))
       return (
           <div className="wrapper">
                <div className="sidebar">
                <UserCard userInfo = {userInfo}/>
                    
                </div>
                <div className="content">
                     <Card title={
                            <Breadcrumb> 
                                <Breadcrumb.Item > <Link to="/">主页</Link> </Breadcrumb.Item> 
                                <Breadcrumb.Item>新消息</Breadcrumb.Item> 
                            </Breadcrumb>
                            }
                       >

                       <List    
                            itemLayout="horizontal"
                            dataSource={this.state.hasnot_read_messages}
                            renderItem={(item,i) => (
                                item.type === 'reply'?<List.Item key={item.id} >
                                <Link to={'/user/user?loginname='+item.author.loginname}> {item.author.loginname}</Link>回复了你的话题  <Link to={'/detail/detail?id='+item.topic.id}>{item.topic.title} </Link>
                            </List.Item>:
                            <List.Item key={item.id} >
                            <Link to={'/user/user?loginname='+item.author.loginname}> {item.author.loginname}</Link>在话题 <Link to={'/detail/detail?id='+item.topic.id}>{item.topic.title}</Link>中@了你
                        </List.Item>
                            )}
                        />   
                    </Card>


                    <Card title="过往信息">
                        <List    
                                itemLayout="horizontal"
                                dataSource={this.state.has_read_messages}
                                renderItem={(item,i) => (
                                    item.type === 'reply'?<List.Item key={item.id} >
                                        <Link to={'/user/user?loginname='+item.author.loginname}> {item.author.loginname}</Link>回复了你的话题  <Link to={'/detail/detail?id='+item.topic.id}>{item.topic.title} </Link>
                                    </List.Item>:
                                    <List.Item key={item.id} >
                                    <Link to={'/user/user?loginname='+item.author.loginname}> {item.author.loginname}</Link>在话题 <Link to={'/detail/detail?id='+item.topic.id}>{item.topic.title}</Link>中@了你
                                </List.Item>
                                )}
                            />   
                    </Card>

                </div>
           </div>
       )
   }
}