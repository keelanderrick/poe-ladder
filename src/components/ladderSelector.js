import React, {Component} from 'react';
import {Dropdown} from 'react-bootstrap';

class LadderSelector extends Component {
    constructor(props) {
        super(props);
        this.changeLadder = this.changeLadder.bind(this);
    }

    render () {
        return ( 
            <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    Select League
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {this.props.ladders.map((ladder) => (
                        <Dropdown.Item as="button" key={ladder.id} value={ladder.id} onClick={this.changeLadder}>{ladder.id}</Dropdown.Item>
                    ))}
                </Dropdown.Menu> 
            </Dropdown>
        )
    }

    changeLadder (e) {
        this.props.onLadderChange(e.target.value);
    }
}

export default LadderSelector;