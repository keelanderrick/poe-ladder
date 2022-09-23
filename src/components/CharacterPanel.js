import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import CharacterInventory from './CharacterInventory';
import CharacterGems from './CharacterGems';

class CharacterPanel extends React.Component {
    state = {
        items: [],
        loaded: false,
        failedToLoad: false
    }

    render () {
        if(this.props.selectedCharacter === '') {
            return(null)
        }

        var body = null;

        if(this.state.loaded === false)
            body = <div style={{'display': 'flex', 'height': 'inherit', 'justifyContent': 'center', 'alignItems': 'center', 'width': '540px'}}>Loading items...</div>
        else if (this.state.failedToLoad === true)
            body = <div style={{'display': 'flex', 'height': 'inherit', 'justifyContent': 'center', 'alignItems': 'center', 'width': '540px'}}>Failed to load items, this account is likely private</div>
        else body = <div><CharacterInventory items={this.state.items} /><CharacterGems items={this.state.items} /></div>
        return (
            <Modal style={{'maxWidth': '100%', 'maxHeight': '100%', 'overflow': 'auto'}} show={true} onHide={this.onClose.bind(this)} dialogClassName='character-panel'>
                <Modal.Header className='bg-dark text-light'>
                    <Modal.Title>{this.props.selectedCharacter.character.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='bg-dark text-light'>
                    {body}
                </Modal.Body>
                <Modal.Footer className='bg-dark text-light'>
                    <Button variant='secondary' onClick={this.onClose.bind(this)}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }

    onClose (evt) {
        this.setState({failedToLoad: false, loaded: false, items: []});
        this.props.onClose(evt);
    }

    componentDidUpdate(prevProps) {
        if(this.props.selectedCharacter !== prevProps.selectedCharacter && this.props.selectedCharacter !== '')
            fetch(`https://guarded-falls-96614.herokuapp.com/https://www.pathofexile.com/character-window/get-items?accountName=${this.props.selectedCharacter.account.name}&character=${this.props.selectedCharacter.character.name}`, { headers: { 'Accept': 'application/json' }})
                .then(res => res.json())
                .then((data) => {
                    if(data.hasOwnProperty('items'))
                        this.setState({items: data.items, loaded: true, failedToLoad: false})
                    else   
                        this.setState({failedToLoad: true, loaded: true})
                })
                .catch(console.log)
    }
}

export default CharacterPanel;