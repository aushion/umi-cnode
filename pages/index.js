import Link from 'umi/link';
import * as React from 'react';
import styles from './index.css';
import { List,Avatar,Tabs } from "antd";
const cnodeApi = 'https://cnodejs.org/api/v1';
const TabPane = Tabs.TabPane;
export default class extends React.Component{
  constructor(props){
    super(props)
  }

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
  renderList = (dataSouce) => {
    return (
      <List
          itemLayout="horizontal"
          dataSource={dataSouce}
          loading = {this.state.loading}
          renderItem={item => (
            <List.Item key={item.id}>
              <List.Item.Meta
                avatar={<Avatar src= {item.author.avatar_url} />}
                title={<Link to={"/list?id="+item.id}>{item.title}</Link>}
              />
            </List.Item>
          )}
        />
    )
  }
  render() {
    return (
    <div>
      <Tabs defaultActiveKey="all" onChange={this.changeTopic} type="card" onTabClick = {this.onTabClick}>
        <TabPane tab="全部" key="all">    
        {this.renderList(this.state.data)}
        </TabPane>
        <TabPane tab="精华" key="good">
         {this.renderList(this.state.data)}
        </TabPane>
        <TabPane tab="分享" key="share">
        {this.renderList(this.state.data)}
        </TabPane>
        <TabPane tab="问答" key="ask">
        {this.renderList(this.state.data)}
        </TabPane>
        <TabPane tab="招聘" key="job">
        {this.renderList(this.state.data)}
        </TabPane>
        <TabPane tab="客户端测试" key="dev">
        {this.renderList(this.state.data)}
        </TabPane>
        
      </Tabs>
      
    </div>
    )


  }
}