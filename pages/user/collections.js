import React, { Component } from 'react';
import {Card,List,Avatar} from 'antd';
import UserCard from '../../components/userCard';
import {formatime} from "../../util/index";
import Link from 'umi/link';
const cnodeApi = 'https://cnodejs.org/api/v1';

export default class User extends Component {
    state = {
        collections: []
    }
    componentDidMount() {   
        this.getCollections(this.props.location.query.loginname)
    }
  
    getCollections = (loginname) => {
      fetch(cnodeApi+'/topic_collect/'+loginname)
      .then(res => {
        if(res.status === 200){
          res.json().then(data => {
            this.setState({
              collections: data.data
            })
          })
        }
      })
      .catch( err=> {
        console.warn(err)
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
        <Card title="主页">
        <List
          itemLayout="horizontal"
          dataSource={this.state.collections}
          loading = {this.state.loading}
          renderItem={item => (
            <List.Item key={item.id}>
              <List.Item.Meta
                avatar={<Avatar src= {item.author.avatar_url} />}
                title={<Link to={"/detail/detail?id="+item.id} >
               
                {<span style={{color: '#9e78c0',fontSize: '12px'}}>{item.reply_count}</span>}
                {<span style={{fontSize: '12px'}}>{"/"}</span>}
                {<span style={{fontSize: '12px',color: '#b4b4b4',marginRight: '10px'}}>{item.visit_count}</span>}
                {item.title}
                {<span style={{float: 'right',fontSize: '12px'}}>{formatime(item.last_reply_at)}</span>}
                </Link>}
              />
            </List.Item>
          )}
        />
        </Card>

        </div>
      </div>
    )
  }
}
