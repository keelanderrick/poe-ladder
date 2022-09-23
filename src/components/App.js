import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import Header from './Header';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.onLadderChange = this.onLadderChange.bind(this);
  }

  state = {
    ladders: [],
    selectedLadder: 'Standard',
    entries: [],
  }

  render() {
    return (
      <div className="App">
        <Header ladders={this.state.ladders} selectedLadder={this.state.selectedLadder} onLadderChange={this.onLadderChange} />
      </div>
    )
  }
  
  componentDidMount() {
    fetch('https://api.pathofexile.com/leagues')
      .then(res => res.json())
      .then((data) => {
        this.setState({
          ladders: data
        })
      })
      .catch(console.log)

      this.onLadderChange ("Standard")
  }

  onLadderChange (newLadder) {
    fetch(`https://guarded-falls-96614.herokuapp.com/https://api.pathofexile.com/ladders/${newLadder}`)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          entries: data.entries
        })
      })
      .catch(console.log)

      this.setState({selectedLadder: newLadder})
  }
}

export default App;
