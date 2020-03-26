import React, {Component} from 'react';
import {Image, Button} from 'react-bootstrap';
import InventoryItem from './inventoryItem';

class CharacterInventory extends Component {
    state = {
        items: this.props.items
    }

    render () {
        this.flaskIndex = 0;
        return(
            <div style={{backgroundColor: 'black'}}>
                <Image src='/img/inventory-background.png' />
                <Image className='left-weapon-swap-background' src='/img/mini-inventory-background.png' />
                <Image className='right-weapon-swap-background' src='/img/mini-inventory-background.png' />
                <Button onClick={this.onWeaponSwap.bind(this)}>Swap</Button>
                {this.state.items.map((item) => {
                    if(item.inventoryId === 'Flask') {
                        this.flaskIndex++;
                        return(<InventoryItem key={item.id} item={item} flaskIndex={this.flaskIndex} />)
                    }
                    return(<InventoryItem key={item.id} item={item} flaskIndex='' />)
                })}
            </div>
        )
    }

    onWeaponSwap () {
        const items = this.state.items;
        items.map((item) => {
            if(item.inventoryId === 'Weapon2') {
                item.inventoryId = 'Weapon'
            } else if (item.inventoryId === 'Weapon') {
                item.inventoryId = 'Weapon2'
            } 

            if(item.inventoryId === 'Offhand2') {
                item.inventoryId = 'Offhand'
            } else if (item.inventoryId === 'Offhand') {
                item.inventoryId = 'Offhand2'
            }

            return(item); 
        })
        this.setState({items: items});
    }
}

export default CharacterInventory;