import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as d3 from "d3";




export class D3Graph extends Component {

  constructor(props) {
    super(props);
    this.createGraph = this.createGraph.bind(this);
  }

  componentDidMount() {
    this.createGraph()
  }

  componentDidUpdate() {
    this.createGraph()
  }

  createGraph() {
    console.log(this.props.data)
    console.log("zlskjfdgnaselrsgmkasrd;lnkgmadfs;lkmnaer;lgkmnerg;lkmdfh;lkdnfmga[dfmv[oier")

    let buys = this.props.data[0]
    let sells = this.props.data[1]

    var svgWidth = 500, svgHeight = 300;

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
      .curve(d3.curveStepAfter);

    var sellLine = d3.line()
      .x(function (d) { return x(d.price) })
      .y(function (d) { return y(d.quantity) })
      .curve(d3.curveStepAfter);

    x.domain(d3.extent([...buys, ...sells], function (d) { return d.price }));
    y.domain(d3.extent([...buys, ...sells], function (d) { return d.quantity }));

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

    g.append("path")
      .datum(buys)
      .attr("fill", "lightblue")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", buyLine);

    g.append("path")
      .datum(sells)
      .attr("fill", "red")
      .attr("stroke", "darkred")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", sellLine);
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
  console.log(state.AggregatedOrderBook.graphData)
  return {
    data: state.AggregatedOrderBook.graphData,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(D3Graph);