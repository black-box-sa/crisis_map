import React from 'react';
import './switch.scss';
export default class ToggleSwitch extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      toggleState: this.props.toggleState 
    }
  }
  
  render() {
    return (
      <>
      <div onClick={this.props.handleToggle} className="ToggleSwitch" id="ToggleSwitch">
        <div className={this.props.toggleState ? 'knob active' : 'knob'} />
      </div>
      </>
    )
  }
}