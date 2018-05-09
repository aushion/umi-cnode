import * as React from 'react';
import {Card, Breadcrumb, Select, Input, Button} from 'antd';
import Link from 'umi/link';
import  router from 'umi/router';
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/braft.css'
const Option = Select.Option;
const cnodeApi = 'https://cnodejs.org/api/v1';

export default class extends React.Component {
    state = {
        title: '',
        tab: '',
        content: ''
    }
    handleSelect = (value) => {
        this.setState({tab: value})
    }
    getContent = (content) => {
        this.setState({content: content.blocks[0].text})
    }
    getTitle = (e) => {
        this.setState({title: e.target.value})
    }
    submit = () => {
       const accesstoken = localStorage.getItem('accesstoken');
       const data = Object.assign(this.state,{accesstoken: accesstoken})
       fetch(cnodeApi+'/topics', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then(res => res.json().then(data => {
          router.push('/detail/detail?id='+ data.topic_id)  
      }))
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));  
    }
    render() {
        const editorProps = {
            placeholder: '',
            initialContent: '',
            onHTMLChange: this.handleHTMLChange,
            onRawChange: this.getContent,
            height: 600
            // 增加自定义预览按钮
        
          }
        return (
            <div>
                <Card
                    title =
                    {<Breadcrumb> 
                      <Breadcrumb.Item > <Link to="/">主页</Link> </Breadcrumb.Item> 
                      <Breadcrumb.Item>发布话题</Breadcrumb.Item> 
                    </Breadcrumb>}
                     bodyStyle = {{height: 800}}
                    >
                   
                   <div>
                       <span>选择板块： </span>
                   <Select
                        defaultValue="0"
                        style={{
                        width: 120
                    }}
                        onChange={this.handleSelect}>
                        <Option value="0">请选择</Option>
                        <Option value="ask">问答</Option>
                        <Option value="share">分享</Option>
                        <Option value="job">招聘</Option>
                        <Option value="dev">客户端测试</Option>
                        
                    </Select>
                   </div>
                    
                    <div>
                        <Input placeholder="标题字数10字以上" onChange = {this.getTitle}/>
                    </div>
                    
                    <div>
                    <BraftEditor {...editorProps} />
                    </div>
                    
                </Card>
                <Button type="primary" onClick = {this.submit}>提交</Button>
            </div>
        )
    }
}
