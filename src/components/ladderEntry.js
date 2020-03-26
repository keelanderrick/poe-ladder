import React, {Component} from 'react'
import {Card, Button} from 'react-bootstrap';

class LadderEntry extends Component {
    render () {
        return (
            <div>
                <center><h1>Ladder</h1></center>
                {this.props.entries.map((entry) => (
                    this.renderEntry(entry)
                ))}
            </div>
        )
    }

    renderEntry (entry) {
        var bgColor = "success";
        if(entry.dead === true)
            bgColor = "danger";
    
        return (
            <Card key={entry.character.name} bg={bgColor}>
                <Card.Body>
                    <Card.Title ><Button variant="light" value={entry} onClick={this.selectCharacter.bind(this, entry)}>{entry.character.name}</Button></Card.Title>
                    <Card.Subtitle>{entry.character.class}</Card.Subtitle>
                    <Card.Text className="card-text">{entry.character.level}</Card.Text>
                </Card.Body>
            </Card>
        )
    } 

    selectCharacter (entry) {
        this.props.onCharacterSelect(entry.character.name, entry.account.name);
    }
};

export default LadderEntry