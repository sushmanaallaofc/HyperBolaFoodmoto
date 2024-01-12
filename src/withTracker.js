import React, { Component } from "react";
import ReactGA from "react-ga4";

const withTracker = (WrappedComponent, options = {}) => {
  const trackPage = (page) => {
    if (localStorage.getItem("enableGoogleAnalytics") === "true") {
      ReactGA.initialize(localStorage.getItem("googleAnalyticsId"));
      ReactGA.send({ hitType: "pageview", page, ...options });
    }
  };

  const HOC = class extends Component {
    componentDidMount() {
      const page = this.props.location.pathname;
      trackPage(page);
    }

    componentDidUpdate(prevProps) {
      const currentPage = prevProps.location.pathname;
      const nextPage = this.props.location.pathname;

      if (currentPage !== nextPage) {
        trackPage(nextPage);
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  return HOC;
};

export default withTracker;