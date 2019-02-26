import React, { Component } from 'react';

export class AggregatedOrderBook extends Component {
  render() {
    return (
      <div className="AggregatedOrderBook">
        <h1>{console.log(grabData())}</h1>
      </div>
    );
  }
}
  function grabData() {
    fetch('http://localhost:3001/')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }
      // Examine the text in the response
      let finalData = response.json().then(function(data) {
        console.log(data)
        return data
      });
      console.log(finalData)
      return finalData
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
  }


export default AggregatedOrderBook;
