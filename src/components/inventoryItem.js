import React, {Component} from 'react';
import {Image, OverlayTrigger, Tooltip} from 'react-bootstrap';

class InventoryItem extends Component {
    render () {
        const className = (this.props.item.inventoryId + this.props.flaskIndex).toLowerCase() + ' item';
        if(className === ' item')
            return null;
        return(
            <OverlayTrigger
                placement="auto-end"
                delay={{ show: 100, hide: 100 }}
                overlay={this.renderTooltip.bind(this)}
                trigger={['hover', 'click', 'focus']}
            >
            <div className={className}>

                <Image className='item-image' src={this.props.item.icon} />
            </div>
            </OverlayTrigger>
        )
    }

    renderTooltip (props) {
        return (
            <Tooltip id="tooltip" {...props}>
                <div>{this.props.item.name}</div>
                <div>{this.props.item.typeLine}</div>
                {this.props.item.properties && this.props.item.properties.map((property) => {
                    if(property.values.length > 0) {
                        if(property.displayMode === 0)
                            return(<div key={property.name}>{property.name}: {property.values[0][0]}</div>)
                        if(property.displayMode === 3) {
                            var ret = property.name;
                            for(var i = 0; i < property.values.length; i++) {
                                ret = ret.replace(`%${i}`, property.values[i][0])
                            }
                            return(<div key={property.name}>{ret}</div>);
                        }
                    }
                    return(<div key={property.name}>{property.name}</div>)
                })}
                {this.props.item.utilityMods && this.props.item.utilityMods.map((mod) => {
                    return(<div key={mod}>{mod}</div>)
                })}
                {this.props.item.explicitMods && this.props.item.explicitMods.map((mod) => {
                    return(<div key={mod}>{mod}</div>)
                })}
                {this.props.item.craftedMods && this.props.item.craftedMods.map((mod) => {
                    return(<div key={mod}>{mod}</div>)
                })}
            </Tooltip>
        )
    }
}

export default InventoryItem;