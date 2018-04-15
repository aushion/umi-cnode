import * as React from 'react';
import { List,Card,Avatar } from "antd";
// import styles from './detail.css';
import  Editor from '../../components/draftEditor';
const cnodeApi = 'https://cnodejs.org/api/v1';
export default class extends React.Component{

  state = {
    details: {},
    replies:[],
    loading: true
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
              replies: data.data.replies,
              loading: false
            }
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
        <Card style = {{color: '#444'}} loading = {this.state.loading} title={this.state.details.title}>
          <div 
            dangerouslySetInnerHTML = {          
              {__html:this.state.details.content}
            }
          />
        </Card>
        <Card type="inner" style = {{color: '#444'}} loading = {this.state.loading} title={this.state.details.reply_count?this.state.details.reply_count+"回复":""}>
              <List    
                  itemLayout="horizontal"
                  dataSource={this.state.replies}
                  renderItem={(item,i) => (
                    <List.Item key={item.id} >
                      <List.Item.Meta          
                        avatar={<Avatar src= {item.author.avatar_url} />}
                        title={item.author.loginname+' '+(i+1)+'楼'}
                        description={
                          <div
                          style = {{color: '#444'}}
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

        <Card type="inner" title = "添加回复" style = {{marginTop: '10px',}}>
          <Editor height= {100} />
        </Card>
      </div>
    )
  }

}