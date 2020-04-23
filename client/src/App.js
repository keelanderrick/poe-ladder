import React, {
  Component
} from 'react';
import LadderSelector from './components/ladderSelector';
import LadderEntry from './components/ladderEntry';
import CharacterPanel from './components/characterPanel';
import {
  Button
} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import fetch from 'node-fetch';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleLadderChange = this.handleLadderChange.bind(this);
    this.handleCharacterSelect = this.handleCharacterSelect.bind(this);
    this.onCloseCharacterPanel = this.onCloseCharacterPanel.bind(this);
  }

  render() {
    return (
      <div>
        <LadderSelector ladders={this.state.ladders} onLadderChange={this.handleLadderChange} />
        <Button variant="warning" onClick={this.importData.bind(this)}> Import Data </Button>
        <LadderEntry selectedLadder={this.state.selectedLadder} entries={this.state.entries} onCharacterSelect={this.handleCharacterSelect} />
        <CharacterPanel onClose={this.onCloseCharacterPanel} accountName={this.state.selectedAccountName} characterName={this.state.selectedCharacter} />
      </div>
    );
  }

  state = {
    entries: [],
    ladders: [],
    selectedLadder: 'SSF Delirium HC',
    selectedCharacter: '',
    selectedAccountName: ''
  }

  importData() {
    fetch('/api/import')
  }

  componentDidMount() {
    fetch('/api/ladders')
      .then(res => res.json())
      .then((data) => {
        this.setState({
          ladders: data
        })
      })
      .catch(console.log)

    fetch(`/api/ladders/${this.state.selectedLadder}`)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          entries: data.entries
        })
      })
      .catch(console.log)
  }

  handleLadderChange(newId) {
    fetch(`/api/ladders/${newId}`)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          entries: data.entries
        })
      })
      .catch(console.log)

    this.setState({
      selectedLadder: newId
    });
  }

  handleCharacterSelect(charName, accName) {
    this.setState({
      selectedCharacter: charName,
      selectedAccountName: accName
    });
  }

  onCloseCharacterPanel(e) {
    this.setState({
      selectedCharacter: '',
      selectedAccountName: ''
    });
  }
}

export default App;