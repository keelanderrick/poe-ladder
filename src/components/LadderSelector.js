import React from "react";
import { Dropdown, NavItem } from "react-bootstrap";

class LadderSelector extends React.Component {
    constructor(props) {
        super(props);
        this.changeLadder = this.changeLadder.bind(this);
    }

    render() {
        return (
            <Dropdown as={NavItem}>
                <Dropdown.Toggle id='ladder-selector'>
                    {this.props.selectedLadder}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {this.props.ladders.map((ladder) => {
                        return(<Dropdown.Item as="button" key={ladder.id} value={ladder.id} onClick={this.changeLadder}>{ladder.id}</Dropdown.Item>)
                    })}
                </Dropdown.Menu>
            </Dropdown>
        )
    }

    changeLadder (evt) {
        this.props.onLadderChange(evt.target.value);
    }
}

export default LadderSelector;