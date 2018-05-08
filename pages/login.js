import * as React from 'react';
import {  Icon, Input, Button } from 'antd';
import router from "umi/router";
const cnodeApi = 'https://cnodejs.org/api/v1';
export  default class extends React.Component{
    state = {
        AccessToken: ''
    }
    onChangeUser = (e) => {
        console.log(e.target.value)
        this.setState({AccessToken: e.target.value})
        
    }
    goLogin = () => {
     let user = this.state.AccessToken;
     window.localStorage.setItem('accesstoken',user)
     let accesstoken = {accesstoken: user}
     fetch(cnodeApi+'/accesstoken', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(accesstoken), // data can be `string` or {object}!
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then(res => res.json().then(data => {
          router.push({
            pathname: '/',
            query: {
              data
            },
          })
          
      }))
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));
    }
    render() {
        const user = this.state.AccessToken;
        return (
            <div style={{padding: 50,position: 'absolute',left: '50%',top: '50%',transform: 'translate(-50%,-50%)',background:'#fff'}}>
              <Input placeholder="Enter your AccessToken"  onChange = {this.onChangeUser} value={user} 
              ref={node => this.userNameInput = node}
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
             
              />
              <div style={{marginTop: 20}}><a href="https://cnodejs.org/setting" target="_blank"  rel="noopener noreferrer">如何获取AccessToken</a></div>
              <Button type="primary" style={{marginTop: 20}} onClick = {this.goLogin}>通过AccessToken登录</Button>
          </div>
          )
          
    }
  
}