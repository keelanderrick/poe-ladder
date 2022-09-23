import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react';
import '../custom.scss'
import Header from './Header';
import Ladder from './Ladder';
import CharacterPanel from './CharacterPanel';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.onLadderChange = this.onLadderChange.bind(this);
    this.onSelectCharacter = this.onSelectCharacter.bind(this);
    this.onCloseCharacterPanel = this.onCloseCharacterPanel.bind(this);
  }

  state = {
    ladders: [],
    selectedLadder: 'Standard',
    entries: [],
    selectedCharacter: '',
  }

  render() {
    return (
      <div className="App">
        <Header ladders={this.state.ladders} selectedLadder={this.state.selectedLadder} onLadderChange={this.onLadderChange} />
        <Ladder entries={this.state.entries} onSelectCharacter={this.onSelectCharacter}/>
        <CharacterPanel onClose={this.onCloseCharacterPanel} selectedCharacter={this.state.selectedCharacter} />
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
    fetch(`https://guarded-falls-96614.herokuapp.com/https://api.pathofexile.com/ladders/${newLadder}?type=league&limit=200`)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          entries: data.entries
        })
      })
      .catch(console.log)

      this.setState({selectedLadder: newLadder})
  }

  onSelectCharacter (character) {
    this.setState({
      selectedCharacter: character
    })
  }

  onCloseCharacterPanel () {
    this.setState({
      selectedCharacter: ''
    })
  }
}

export default App;
