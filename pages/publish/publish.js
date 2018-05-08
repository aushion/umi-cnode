import React, { Component } from 'react';
import {Card, Breadcrumb} from 'antd';
import Link from 'umi/link';
export default class PublishTopic extends Component {
  render() {
    const Breadcrumb = <Breadcrumb>
    <Breadcrumb.Item ><Link to="/">主页</Link></Breadcrumb.Item>
    <Breadcrumb.Item>发布话题</Breadcrumb.Item>
  </Breadcrumb>
    return (
      <div>
        <Card title={Breadcrumb}>
        wocao
        </Card>
      </div>
    )
  }
}
