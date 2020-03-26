import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import CharacterInventory from './characterInventory';

class CharacterPanel extends Component {
    state = {
        items: [],
        loaded: false
    }

    render () {
        if(this.props.characterName === '')
            return(null)

        if(this.state.loaded === false)
            return(
                <Modal show={true} onHide={this.onClose.bind(this)} dialogClassName="character-panel">
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.characterName}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        {this.props.accountName}
                        Loading items...
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.onClose.bind(this)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            )

        return (
            <Modal show={true} onHide={this.onClose.bind(this)} dialogClassName="character-panel">
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.characterName}</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    {this.props.accountName}
                    <CharacterInventory items={this.state.items} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.onClose.bind(this)}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    onClose (e) {
        this.setState({loaded: false, items: []})
        this.props.onClose(e);
    }

    componentDidUpdate(prevProps) {
        if(this.props.accountName !== prevProps.accountName && this.props.accountName !== '')
            fetch(`http://guarded-falls-96614.herokuapp.com/https://www.pathofexile.com/character-window/get-items?character=${this.props.characterName}&accountName=${this.props.accountName}`)
            .then(res => res.json())
            .then((data) => {
                this.setState({items: data.items, loaded: true});
            })
            .catch(console.log) 
    }

}

export default CharacterPanel;