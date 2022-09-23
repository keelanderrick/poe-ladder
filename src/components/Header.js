import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import LadderSelector from './LadderSelector';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
        <Navbar bg='dark' variant='dark' className='Header'>
            <Navbar.Brand>Path of Exile Ladder</Navbar.Brand>
            <Nav>
                <Navbar.Text>Select Ladder: </Navbar.Text>
                <LadderSelector selectedLadder={this.props.selectedLadder} onLadderChange={this.props.onLadderChange} ladders={this.props.ladders} />
            </Nav>
        </Navbar>
        )
    }
}

export default Header;