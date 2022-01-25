import React, { Component } from 'react';

export default class Ge extends Component {
  goPage = () => {
  }

  render() {
    return <div>
      <div onClick={() => {
        this.goPage()
      }}>gege</div>
    </div>
  }
}

