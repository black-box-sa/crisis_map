// ======================================================================================================

//                                        COMPONENT NOTES

// This component is built off boostraps toggle. The state has been built into the component, but doesn't 
// effect the ui. The ui changes in css checking the 'checked' property. The state just toggles onChange 
// of the checkbox. 

// ======================================================================================================

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './toggle.scss';

export default class Toggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      label: 'Toggle Off',
      customStyles: {
        backgroundColor: this.props.indicatorColour 
      }
    }
    this.toggleTrigger = this.toggleTrigger.bind(this);
  }

// Function that adjusts state to open or close sidebar by adding or removing the "open" class
toggleTrigger() {
  if (this.state.toggle === false) {
    this.setState({
      toggle : true,
      label : 'Toggle On'
    })
  } else {
    this.setState({
      toggle : false,
      label : 'Toggle Off'
    })
  }
  console.log(this.state.toggle)
}

  render(){
    return (
      <div className={["toggle "] + this.props.className}>
  
        <div className="custom-control custom-switch">
          <input type="checkbox" className="custom-control-input" onChange={this.toggleTrigger} id={this.props.id} />
          <label className={['custom-control-label '] + this.props.class} htmlFor={this.props.id}></label>
        </div>
  
      </div>
    );
  }
};

Toggle.propTypes = {
  /**
   * Each item needs an item which defines units and allows individual switching
   */
  id: PropTypes.number.isRequired,
  /**
   * Text for the toggle when it is turned on
   */
  labelOn: PropTypes.string,
  /**
   * Text for the toggle when it is turned off
   */
  labelOff: PropTypes.string,

};


