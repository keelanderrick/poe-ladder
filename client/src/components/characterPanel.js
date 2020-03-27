import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import CharacterInventory from './characterInventory';

class CharacterPanel extends Component {
    state = {
        items: [],
        loaded: false,
        failedToLoad: false
    }

    render () {
        if(this.props.characterName === '')
            return(null)
        
        var body = null;

        if(this.state.loaded === false)
            body = <div>Loading items...</div>
        else if(this.state.failedToLoad === true)
            body = <div>Failed to load items</div>
        else body = <CharacterInventory items={this.state.items} />

        return(
            <Modal style={{'maxWidth': '100%', 'maxHeight': '100%', 'overflow': 'auto'}} show={true} onHide={this.onClose.bind(this)} dialogClassName="character-panel">
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.characterName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {body}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.onClose.bind(this)}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    onClose (e) {
        this.setState({failedToLoad: false, loaded: false, items: []})
        this.props.onClose(e);
    }

    componentDidUpdate(prevProps) {
        if(this.props.accountName !== prevProps.accountName && this.props.accountName !== '')
            fetch(`/api/get-items/${this.props.accountName}/${this.props.characterName}`)
            .then(res => res.json())
            .then((data) => {
                if(data.hasOwnProperty('items')) 
                    this.setState({items: data.items, loaded: true, failedToLoad: false})
                else this.setState({failedToLoad: true, loaded: true})
            })
            .catch(console.log)
    }
}

export default CharacterPanel;