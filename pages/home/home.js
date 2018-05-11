import Link from 'umi/link';
import * as React from 'react';
import styles from './home.css';
import { List,Avatar,Tabs, Pagination } from "antd";
import {formatime} from "../../util/index";
import UserCard from "../../components/userCard";
const cnodeApi = 'https://cnodejs.org/api/v1';
const TabPane = Tabs.TabPane;

export default class extends React.Component{

  state = {
    data: [],
    tab:'all',
    page: 1,
    loading: true
  }
  
  componentDidMount(){
    this.getTopics();
  }
//请求分类主题
  getTopics = (tab=this.state.tab,page=this.state.page) => {
    let topicUrl = cnodeApi+'/topics?tab='+tab+'&page='+page;
    this.setState({loading: true})
    fetch(topicUrl)
    .then( res => {
      if(res.status === 200){
        res.json().then(data => {
          this.setState({
            data: data.data,
            loading: false
          })
        })
      }
    })
    .catch(err => {
      console.warn(err)
    })
  }
//切换tab触发分类
  onTabClick = (tab) => {
    this.setState({
      tab: tab,
      page: 1
    },() => {
      this.getTopics(tab,1)

    })
   
  }
  //点击分页
  onChangePage = (page) => {
    this.setState({
      page: page
    },() =>{
      this.getTopics(this.state.tab,page)
    })  
  }

//渲染列表函数
  renderList = (dataSouce,classific) => {
    return (
      <List
          itemLayout="horizontal"
          dataSource={dataSouce}
          loading = {this.state.loading}
          renderItem={item => (
            <List.Item key={item.id}>
              <List.Item.Meta
                avatar={<Avatar src= {item.author.avatar_url} />}
                title={<Link to={"/detail/detail?id="+item.id} className={styles.link}>
                {this.showLabel(item.tab,item.top,item.good,classific)}
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
    )
  }

 
  showLabel = (tab,top,good,classific) => {
    let x = "",bgcolor="";
    if(classific === 'all'|| classific === 'good'){
      if(top||good){
        bgcolor = 'green'
        if(top)
         x = "置顶";
        else{
          x = "精华"
        } 
      }else{
        bgcolor = 'gray';
        switch (tab){
          case 'good':
          bgcolor = 'green';
            x = "精华";
            break;
          case 'share':
            x = "分享";
            break;
          case 'ask':
            x = '问答';
            break;
          default:
            x = "";  
        }
    }
  }else{
      if(top||good){
        bgcolor = 'green'
        if(top)
         x = "置顶";
        else{
          x = "精华"
        } 
    }   
  }
  return (
    <label className={bgcolor}>{x}</label>
  )
  }
  render() {
    let userInfo = JSON.parse(localStorage.getItem('userInfo')); 
    return (
      <div className="wrapper">
       <div className="sidebar">
          <UserCard userInfo = {userInfo}/>
        </div>
        <div className="content">
          <Tabs tabBarGutter={0} defaultActiveKey="all"  type="card" onTabClick = {this.onTabClick}>
            <TabPane tab="全部" key="all">    
            {this.renderList(this.state.data,'all')}
            </TabPane>
            <TabPane tab="精华" key="good">
            {this.renderList(this.state.data,'good')}
            </TabPane>
            <TabPane tab="分享" key="share">
            {this.renderList(this.state.data,'share')}
            </TabPane>
            <TabPane tab="问答" key="ask">
            {this.renderList(this.state.data,'ask')}
            </TabPane>
            <TabPane tab="招聘" key="job">
            {this.renderList(this.state.data,'job')}
            </TabPane>
            <TabPane tab="客户端测试" key="dev">
            {this.renderList(this.state.data,'dev')}
            </TabPane>          
          </Tabs>
          <Pagination defaultCurrent={1} current = {this.state.page} total={200} onChange = {this.onChangePage}/>
        </div>
       
    </div>
    )
  }
}