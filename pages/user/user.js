import React, { Component } from 'react';
import {Card,List,Avatar} from 'antd';
import UserCard from '../../components/userCard';
import {formatime} from "../../util/index";
import Link from 'umi/link';
const cnodeApi = 'https://cnodejs.org/api/v1';

export default class User extends Component {
    state = {
        loginname: '',
        userInfo: null,
        recent_replies: [],
        recent_topics: [],
        collections: []
    }
    componentDidMount() {
        this.setState({loginname: this.props.location.query.loginname})
        this.getUserInfo(this.props.location.query.loginname)
        this.getCollections(this.props.location.query.loginname)
    }
    getUserInfo = (loginname) => {
        fetch(cnodeApi+'/user/'+loginname)
        .then(res => {
            if(res.status === 200){
                res.json().then(data => {
                  let  userInfo = {
                        loginname: data.data.loginname,
                        avatar_url: data.data.avatar_url,
                        score: data.data.score,
                        githubUsername: data.data.githubUsername,
                        create_at: data.data.create_at
                    }
                    this.setState({
                        userInfo: userInfo,
                        recent_replies: data.data.recent_replies,
                        recent_topics: data.data.recent_topics
                    })
                })
            }
        })
        .catch( err=> {
            console.warn(err)
          })
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
    return (
      <div className="wrapper">
        <div className="sidebar">
            <UserCard userInfo = {this.state.userInfo}/>
        </div>
        <div className="content">
        <Card title="主页">
            <div>
                <img src={this.state.userInfo?this.state.userInfo.avatar_url:''} alt="" style={{width: 40,display: 'inline-block'}}/>
                <span>{this.state.userInfo?this.state.userInfo.loginname:''}</span>
                <div>{this.state.userInfo?this.state.userInfo.score:''}积分</div>
                 <Link to={"collections?loginname="+this.props.location.query.loginname}>{this.state.collections.length}个话题收藏</Link>
                <div>注册时间是{formatime(this.state.userInfo?this.state.userInfo.create_at:"")}</div>
            </div>
        </Card>

        <Card title="最近创建的话题">
        <List
          itemLayout="horizontal"
          dataSource={this.state.recent_topics}
          loading = {this.state.loading}
          renderItem={item => (
            <List.Item key={item.id}>
              <List.Item.Meta
                avatar={<Avatar src= {item.author.avatar_url} />}
                title={<Link to={"/detail/detail?id="+item.id} style={{color: '#08c'}}>             
                {item.title}
                {<span style={{float: 'right',fontSize: '12px'}}>{formatime(item.last_reply_at)}</span>  }
                </Link>}
              />
            </List.Item>
          )}
        />
        </Card>

        <Card title="最近参与的话题">
        <List
          itemLayout="horizontal"
          dataSource={this.state.recent_replies}
          loading = {this.state.loading}
          renderItem={item => (
            <List.Item key={item.id}>
              <List.Item.Meta
                avatar={<Avatar src= {item.author.avatar_url} />}
                title={<Link to={"/detail/detail?id="+item.id} style={{color: '#08c'}}>             
                {item.title}
                {<span style={{float: 'right',fontSize: '12px'}}>{formatime(item.last_reply_at)}</span>  }
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
