import React from "react";
import loadScript from "load-script";

export default class HotelWidget extends React.Component {
  componentDidMount() {
    loadScript(
      "https://widgets.skyscanner.net/widget-server/js/loader.js"
    );
  }

  render() {
    return (
      <div
      data-skyscanner-widget="HotelSearchWidget"
      data-locale="en-GB"
      data-market="SG"
      data-currency="SGD"
      />
    );
  }
}
