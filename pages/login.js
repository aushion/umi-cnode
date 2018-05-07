import * as React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import  Link from "umi/link";
const FormItem = Form.Item;

export  default class extends React.Component{
    goLogin() {
     const accessToken = this.userNameInput;
     console.log(accessToken.value)
    }
    render() {
        return (
            <div style={{padding: 50,position: 'absolute',left: '50%',top: '50%',transform: 'translate(-50%,-50%)',background:'#fff'}}>
              <Input placeholder="Enter your AccessToken"  ref={node => this.userNameInput = node}
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
             
              />
              <div style={{marginTop: 20}}><a href="https://cnodejs.org/setting" target="_blank">如何获取AccessToken</a></div>
              <Button type="primary" style={{marginTop: 20}} onClick = {this.goLogin}>通过AccessToken登录</Button>
          </div>
          )
          
    }
  
}