import React, {Component} from 'react'
import {render} from 'react-dom'

import Example from '../../src'
import '../../css/Draft.css';

class Demo extends Component {
  render() {
    return <div>
      <h1>@fi1osof/react-draft-wysiwyg Demo</h1>
      <Example/>
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
