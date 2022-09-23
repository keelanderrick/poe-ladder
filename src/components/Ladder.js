import React from "react";
import { Table } from "react-bootstrap";

class Ladder extends React.Component {
    render () {
        return (
            <Table striped>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Character Name</th>
                        <th>Account Name</th>
                        <th>Level</th>
                        <th>Ascendancy</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.entries.map((entry) => {
                        return(
                            <tr key={entry.character.name}>
                                <td>{entry.rank}</td>
                                <td><a href='javascript:void(0)' value={entry} onClick={this.selectCharacter.bind(this, entry)}>{entry.character.name}</a></td>
                                <td>{entry.account.name}</td>
                                <td>{entry.character.level}</td>
                                <td>{entry.character.class}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        )
    }

    selectCharacter(entry) {
        this.props.onSelectCharacter(entry);
    }
}

export default Ladder;