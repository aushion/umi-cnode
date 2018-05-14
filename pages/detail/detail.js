import * as React from 'react';
import { List,Card,Avatar, Button } from "antd";
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/braft.css';
import AuthorCard from "../../components/authorCard";
import 'github-markdown-css';
const cnodeApi = 'https://cnodejs.org/api/v1';

export default class extends React.Component{

  state = {
    details: {},
    replies:[],
    loading: true,
    id: '',
    content: '',
    author: null,
    is_collect: null
  }

  componentDidMount() {
    this.setState({id: this.props.location.query.id})    
    this.getDetails(this.props.location.query.id)
  }
  

  getDetails = (id) => {
    fetch(cnodeApi+'/topic/'+id)
    .then(res => {
      if(res.status === 200){
        res.json().then(data => {
          this.setState(
              {details: data.data,
              replies: data.data.replies,
              author: data.data.author,
              loading: false,
              is_collect: data.data.is_collect
            }
          )
        })
      }
    })
    .catch( err=> {
      console.warn(err)
    })
  }

  getContent = (content) => {
    this.setState({content: content.blocks[0].text})
  }

 reply = () => {
  const accesstoken = localStorage.getItem('accesstoken');
  let data = {
    content: this.state.content,
    accesstoken: accesstoken
  }
  fetch(cnodeApi+'/topic/'+this.state.id+'/replies', {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data), // data can be `string` or {object}!
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then( res => res.json().then(data => {
      this.editorInstance.clear();
      this.getDetails(this.state.id)

  }))
  .catch(error => console.error('Error:', error))
  .then(response => console.log('Success:', response));  
 }

 onCollect = () => {
   const accesstoken = localStorage.getItem('accesstoken');   
   let data = {
     accesstoken: accesstoken,
     topic_id: this.state.id
   }
  fetch(cnodeApi+'/topic_collect/collect',{
    method: 'POST',
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(res => res.json().then(data => {
      this.setState({is_collect: !this.state.is_collect})
  }))
 }


 cancelCollect = () =>{
  const accesstoken = localStorage.getItem('accesstoken');   
  let data = {
    accesstoken: accesstoken,
    topic_id: this.state.id
  }
 fetch(cnodeApi+'/topic_collect/de_collect',{
   method: 'POST',
   body: JSON.stringify(data),
   headers: new Headers({
     'Content-Type': 'application/json'
   })
 }).then(res => res.json().then(data => {
     this.setState({is_collect: !this.state.is_collect})
 }))
 }

  render(){
    const editorProps = {
      placeholder: '',
      initialContent: '',
      onChange: this.getContent,
      height: 400,
      // 增加自定义预览按钮      
      excludeControls: [
        'undo',
        'redo',
        'split',
        'font-size',
        'font-family',
        'line-height',
        'letter-spacing',
        'indent',
        'text-color',
        'headings'
    ]
    }

    const accesstoken = localStorage.getItem('accesstoken');
    let userInfo = this.state.author; 
    return (    
      <div className="wrapper">
      <div className="sidebar">
        <AuthorCard userInfo = {userInfo}/>
      </div>
      <div className="content">
        <Card style = {{color: '#444'}} loading = {this.state.loading} title={this.state.details.title} >
        {!this.state.is_collect?<Button type="primary" onClick = {this.onCollect}>收藏</Button>:<Button type="normal" onClick = {this.cancelCollect}>取消收藏</Button>}
          <div 
            dangerouslySetInnerHTML = {          
              {__html:this.state.details.content}
            }
          />
        </Card>
        <Card type="inner" style = {{color: '#444',display: this.state.replies.length?'block':'none'}} 
        loading = {this.state.loading} 
        title={this.state.details.reply_count?this.state.details.reply_count+"回复":""}
       
        >
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

      <Card type="inner" title = "添加回复" style = {{marginTop: '10px',display: accesstoken?'block':'none'}}>
          <BraftEditor {...editorProps} ref={instance => this.editorInstance = instance}/>
          <Button type="primary" onClick = {this.reply}>回复</Button>
        </Card>
        
      </div>
      </div>
    )
  }

}