import React, { Component } from 'react';
import {connect} from 'react-redux';

export class AggregatedOrderBook extends Component {

  constructor(props) {
    super(props);
    this.state = { order: [1, 2, 3, 4, 5] };

  }

  render() {
    return (
      <div className="AggregatedOrderBook">
        <h1>{this.state.order}</h1>
        <p>{this.props.name}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    // name: state.app.name
  };
}

export default connect(mapStateToProps)(AggregatedOrderBook);
// export default AggregatedOrderBook;