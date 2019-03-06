import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as d3 from "d3";




export class D3Graph extends Component {

  componentDidMount() {
    var dataset = this.props.data;

    console.log(dataset)
    var svgWidth = 500, svgHeight = 300;
    var barWidth = (svgWidth / dataset.length);

    console.log()
    console.log()

    var svg = d3.select('svg')
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    var barChart = svg.selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("y", function (d) {
        return svgHeight - d
      })
      .attr("height", function (d) {
        return d;
      })
      .attr("width", barWidth + 1)
      .attr("transform", function (d, i) {
        var translate = [barWidth * i, 0];
        return "translate(" + translate + ")";
      });


  }

  render() {

    return (
      <div className="D3Graph">
        <p>yo</p>
        <svg ref={el => this.svgEl = el} ></svg>
      </div>
    );
  }
}




function mapStateToProps(state) {
  return {
    data: state.AggregatedOrderBook.aggregatedOrderBook,
    fetched: state.AccountSelector.fetched
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(D3Graph);