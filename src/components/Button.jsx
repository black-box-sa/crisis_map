import React, { Component } from 'react';
export default class Button extends Component {
  render() {
    return (
      <a
      href={this.props.href}
      type={this.props.type}
      target={this.props.target}
      id={this.props.id}
      onClick={this.props.onClick}
      disabled={this.props.disabled}
      className={"btn " + this.props.className + [this.props.disabled ? ' disabled':'']}>
        {this.props.text}
        {this.props.icon}
        {this.props.children}
        {this.props.iconRight}
      </a>
    )
  }
}