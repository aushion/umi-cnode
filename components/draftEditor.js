import React from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/braft.css'

export default class Editor extends React.Component {

  state = {
    htmlContent: ''
  }

  render() {

    const editorProps = {
      placeholder: '',
      initialContent: '',
      onHTMLChange: this.handleHTMLChange,
      viewWrapper: '.demo',
      height: 200
      // 增加自定义预览按钮
  
    }

    return (
      <div className="demo">
        <BraftEditor {...editorProps} />
      </div>
    )

  }

  handleHTMLChange = (htmlContent) => {
    this.setState({ htmlContent })
  }

}