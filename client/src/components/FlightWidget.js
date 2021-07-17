import React from "react";
import loadScript from "load-script";

export default class Widget extends React.Component {
  componentDidMount() {
    loadScript("https://widgets.skyscanner.net/widget-server/js/loader.js");
  }

  render() {
    return (
      <div
        data-skyscanner-widget="FlightSearchWidget"
        data-locale="en-GB"
        data-market="SG"
        data-currency="SGD"
        data-widget-padding="2rem"
        data-origin-geo-lookup="true"
      />
    );
  }
}
