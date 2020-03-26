import React, {Component} from 'react';
import {Image} from 'react-bootstrap';

class InventoryItem extends Component {
    render () {
        const className = (this.props.item.inventoryId + this.props.flaskIndex).toLowerCase() + ' item';
        if(className === ' item')
            return null;
        return(
            <div className={className}>
                <Image className='item-image' src={this.props.item.icon} />
            </div>
        )
    }
}

export default InventoryItem;