import React from 'react';
import { OverlayTrigger, Image, Tooltip } from 'react-bootstrap';

class InventoryItem extends React.Component {
    render () {
        const className = (this.props.item.inventoryId).toLowerCase() + ' item' + this.props.item.frameType;
        if(className === ' item')
            return null;
        return(
            <OverlayTrigger
                placement='auto-end'
                delay={{ show: 100, hide: 100 }}
                overlay={this.renderTooltip.bind(this)}
                trigger={['hover', 'focus']}
            >
                <div className={className}>
                    <Image className='item-image' src={this.props.item.icon} />
                </div>
            </OverlayTrigger>
        )
    }

    renderTooltip (props) {
        return (
            <Tooltip id='tooltip' {...props}>
                <div className={`item-tooltip-name${this.props.item.frameType}`}>
                    {this.props.item.name !== '' && this.props.item.name + ', '}
                    {this.props.item.typeLine}
                </div>
                {this.props.item.name !== '' && this.props.item.properties && this.props.item.properties.map((property) => {
                    if(property.values.length > 0) {
                        if(property.displayMode === 0)
                            return(<div className='item-tooltip-properties' key={property.name}>{property.name}: {property.values.map((value, i) => {
                                if(i !== 0)
                                    return(<span>, <span key={i} className={'item-tooltip-properties'+value[1]}></span></span>)
                                else
                                    return(<span key={i} className={'item-tooltip-properties'+value[1]}>{value[0]}</span>)
                            })}</div>)
                        if(property.displayMode === 3) {
                            let ret = property.name;
                            for(let i = 0; i < property.values.length; i++) {
                                ret = ret.replace(`{${i}}`, property.values[i][0])
                            }
                            return(<div className='item-tooltip-properties' key={property.name}><span className={'item-tooltip-properties'+property.values[0][1]}>{ret}</span></div>)
                        }
                    }
                    return(<div className='item-tooltip-properties' key={property.name}>{property.name}</div>)
                })}
                {this.props.item.properties && <hr className='item-tooltip-divider' />}
                {this.props.item.implicitMods && this.props.item.implicitMods.map((mod) => {
                    return(<div className='item-tooltip-mods' key={mod}>{mod}<hr className='item-tooltip-divider' /></div>)
                })}
                         {this.props.item.utilityMods && this.props.item.utilityMods.map((mod) => {
                    return(<div className="item-tooltip-mods" key={mod}>{mod}</div>)
                })}
                {this.props.item.explicitMods && this.props.item.explicitMods.map((mod) => {
                    return(<div className="item-tooltip-mods"  key={mod}>{mod}</div>)
                })}
                {this.props.item.craftedMods && this.props.item.craftedMods.map((mod) => {
                    return(<div className="item-tooltip-crafted-mods"  key={mod}>{mod}</div>)
                })}
            </Tooltip>
        )
    }
}

export default InventoryItem;