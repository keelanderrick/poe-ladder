import React, {Component} from 'react'
import {Table, Button} from 'react-bootstrap';

class LadderEntry extends Component {
    render () {
        return (
            <div>
                <center><h1>{this.props.selectedLadder}</h1></center>
                <Table>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Class</th>
                            <th>Character</th>
                            <th>Level</th>
                            <th>Alive</th>
                            <th>Account</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.entries.map((entry) => (
                            this.renderEntry(entry)
                        ))}
                    </tbody>
                </Table>
            </div>
        )
    }

    renderEntry (entry) {
        var deadText = "Alive";
        if(entry.dead === true)
            deadText = "Dead";
    
        return (
            <tr key={entry.character.name}>
                <td>{entry.rank}</td>
                <td>{entry.character.class}</td>
                <td><Button value={entry} className="ladder-character-name" variant="link" onClick={this.selectCharacter.bind(this, entry)}>{entry.character.name}</Button></td>
                <td>{entry.character.level}</td>
                <td>{deadText}</td>
                <td>{entry.account.name}</td>
            </tr>
        )
    } 

    selectCharacter (entry) {
        this.props.onCharacterSelect(entry.character.name, entry.account.name);
    }
};

export default LadderEntry