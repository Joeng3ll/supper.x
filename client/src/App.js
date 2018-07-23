import React, {Component} from 'react'

class App extends Component {
  render() {
    const href = window.location.href
    return <div className="App">
      <div className="App-heading App-flex">
        {href}
      </div>
      <div className="App-instructions App-flex">
      </div>
    </div>
  }
}

export default App
