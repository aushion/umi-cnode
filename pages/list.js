
import * as React from 'react';
import { List,Card,Spin,Avatar } from "antd";
const cnodeApi = 'https://cnodejs.org/api/v1';
export default class extends React.Component{
  constructor(props){
    super(props)
  }

  state = {
    details: {},
    replies:[]
  }

  componentDidMount() {
    this.getDetails(this.props.location.query.id)
  }
  getDetails = (id) => {
    fetch(cnodeApi+'/topic/'+id)
    .then(res => {
      if(res.status === 200){
        res.json().then(data => {
          console.log(data)
          this.setState(
              {details: data.data,
              replies: data.data.replies }
          )
        })
      }
    })
    .catch( err=> {
      console.warn(err)
    })
  }
  render(){
    return (
      <div>
      <Card title={this.state.details.title}>
        <div 
         dangerouslySetInnerHTML = {          
          {__html:this.state.details.content}
         }
        />
      </Card>

      <Card type="inner" title={this.state.details.reply_count?this.state.details.reply_count+"回复":""}>
            <List
                itemLayout="horizontal"
                dataSource={this.state.replies}
                renderItem={(item,i) => (
                  <List.Item key={item.id}>
                    <List.Item.Meta
                      avatar={<Avatar src= {item.author.avatar_url} />}
                      title={item.author.loginname+' '+(i+1)+'楼'}
                      description={
                        <div
                        dangerouslySetInnerHTML ={
                          {__html: item.content}
                        }
                        />
                      
                      }
                    />
                  </List.Item>
                )}
          />   
      </Card>
      </div>
    )
  }

}