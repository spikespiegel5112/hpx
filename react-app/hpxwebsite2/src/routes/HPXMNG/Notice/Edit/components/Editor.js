import React from 'react'
import ReactQuill from 'react-quill'
import theme from 'react-quill/dist/quill.snow.css'
import './Editor.css'

class Editor extends React.Component {
  constructor (props) {
    super(props)
    this.state = { 
        editorHtml: '', 
        theme: 'snow' 
    }
    this.handleChange = this.handleChange.bind(this)
  }
  
  handleChange (html) {
  	this.setState({ 
        editorHtml: html 
    });
    this.props.handleChange(html);
  }
  
  handleThemeChange (newTheme) {
    if (newTheme === "core") newTheme = null;
    this.setState({ theme: newTheme })
  }

  render () {
    return (
      <div className="app">
        <ReactQuill 
          theme={this.state.theme}
          onChange={this.handleChange}
          value={this.state.editorHtml}
          modules={Editor.modules}
          formats={Editor.formats}
          bounds={'.app'}
          placeholder={this.props.placeholder}

         />
         {/*<div className="themeSwitcher">
          <label>Theme </label>
          <select onChange={(e) => 
              this.handleThemeChange(e.target.value)}>
            <option value="snow">Snow</option>
            <option value="bubble">Bubble</option>
            <option value="core">Core</option>
          </select>
        </div>*/}
       </div>
     )
  }
}

Editor.modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, 
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
  ]
}

Editor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]


Editor.propTypes = {
  placeholder: React.PropTypes.string,
}


export default Editor