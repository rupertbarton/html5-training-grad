import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as d3 from "d3";




export class D3Graph extends Component {

  componentDidMount() {

    var dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160];

    let buys = this.props.data[0]
    let sells = this.props.data[1]
    // console.log(this.props.data)
    // console.log([sells])
    // console.log([buys])
    // console.log([...sells,...buys])

    var svgWidth = 500, svgHeight = 300;
    var barWidth = (svgWidth / dataset.length);

    var svgWidth = 600, svgHeight = 400;
    var margin = { top: 20, right: 20, bottom: 30, left: 50 };
    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;

    var svg = d3.select('svg')
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    var g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleLinear()
      .rangeRound([0, width]);

    var y = d3.scaleLinear()
      .rangeRound([height, 0]);

    var buyLine = d3.line()
      .x(function (d) { return x(d.price) })
      .y(function (d) { return y(d.quantity) })
      .curve(d3.curveStepBefore);


    // var sellLine = d3.line()
    // .x(function(d) {return x(d.price)})
    // .y(function(d) {return y(d.quantity)})
    // .curve(d3.curveStepAfter);

    x.domain(d3.extent(buys, function (d) { return d.price }));
    y.domain(d3.extent(buys, function (d) { return d.quantity }));

    g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .select(".domain")

    g.append("g")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Price ($)");

    g.append("path")
      .datum(buys)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", buyLine);
  }

  render() {

    return (
      <div className="D3Graph">
        <svg ref={el => this.svgEl = el} ></svg>
      </div>
    );
  }
}




function mapStateToProps(state) {
  return {
    data: state.AggregatedOrderBook.graphData,
    fetched: state.AccountSelector.fetched
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(D3Graph);