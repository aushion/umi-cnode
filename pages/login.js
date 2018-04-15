import { Form, Icon, Input, Button, Checkbox } from 'antd';
import  Link from "umi/link";
const FormItem = Form.Item;

export default () =>{
    return (
      <div>
        <Input placeholder="Enter your username"
        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
       
        />
        <div><a href="https://cnodejs.org/setting" target="_blank">如何获取AccessToken</a></div>
        <Button type="primary">通过AccessToken登录</Button>
    </div>
    

    )
}