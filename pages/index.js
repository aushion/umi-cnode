import Link from 'umi/link';
import * as React from 'react';
import styles from './index.css';
import { List,Avatar,Tabs } from "antd";
const cnodeApi = 'https://cnodejs.org/api/v1';
const TabPane = Tabs.TabPane;

export default class extends React.Component{

  state = {
    data: [],
    loading: true
  }
  
  componentDidMount(){
    this.getTopics('all');
  }
//请求分类主题
  getTopics = (tab) => {
    this.setState({loading: true})
    fetch(cnodeApi+'/topics?tab='+tab)
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
    console.log(tab)
    this.getTopics(tab)
  }
//渲染列表函数
  renderList = (dataSouce,classific) => {
    return (
      <List
          itemLayout="horizontal"
          dataSource={dataSouce}
          loading = {this.state.loading}
          renderItem={item => (
            <List.Item key={item.id} style={{fontSize: '16px'}}>
              <List.Item.Meta
                avatar={<Avatar src= {item.author.avatar_url} />}
                title={<Link to={"/list?id="+item.id}>
                {this.showLabel(item.tab,item.top,item.good,classific)}
                {<span style={{color: '#9e78c0',fontSize: '12px'}}>{item.reply_count}</span>}
                {<span style={{fontSize: '12px'}}>{"/"}</span>}
                {<span style={{fontSize: '12px',color: '#b4b4b4',marginRight: '10px'}}>{item.visit_count}</span>}
                {item.title}</Link>}
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
        bgcolor = 'gray'
      switch (tab){
        case 'good':
        bgcolor = 'green';
          x = "精华";
          break;
        case 'share':
          x = "分享";
          break;
        case 'ask':
          x = '问答';;
          break;
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
    return (
    <div>
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
      
    </div>
    )


  }
}