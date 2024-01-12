// ScrollToTop.js
import React, { Component } from 'react';

const ScrollToTop = (WrappedComponent) => {
    return class ScrollToTopComponent extends Component {
        componentDidMount() {
            window.scrollTo(0, 0);
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }
};

export default ScrollToTop;
