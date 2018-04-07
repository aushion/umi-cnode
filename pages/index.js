import Link from 'umi/link';
import * as React from 'react';
import styles from './index.css';
import { List,Avatar } from "antd";
const cnodeApi = 'https://cnodejs.org/api/v1';
export default class extends React.Component{
  constructor(props){
    super(props)
  }

  state = {
    data: {}
  }
  
  componentDidMount(){
    let dataArray = [];
    let that = this;
    fetch(cnodeApi+'/topics')
    .then( res => {
      console.log(res)
      if(res.status === 200){
        res.json().then(data => {
           that.setState({
             data: data
           })
          
        })
      }
    })
    .catch(err => {
      console.warn(err)
    })
  }

  render() {
    return (
    <List
    itemLayout="horizontal"
    dataSource={this.state.data.data}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src= {item.author.avatar_url} />}
          title={<a href={item.title}>{item.title}</a>}
          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        />
      </List.Item>
    )}
  />
    )


  }
}