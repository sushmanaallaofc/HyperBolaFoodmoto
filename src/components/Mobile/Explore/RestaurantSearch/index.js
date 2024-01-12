import React, { Component } from "react";

import Ink from "react-ink";

class RestaurantSearch extends Component {
    state = {
        restaurant: ""
    };
    componentDidMount() {
        this.searchInput.focus();
    }
    static contextTypes = {
        router: () => null
    };

    handleInputChange = e => {
        this.setState({ restaurant: e.target.value });
        this.props.searchFunction(e.target.value);
    };

    render() {
        return (
            <React.Fragment>
                <div className="col-12 p-0">
                    <div className="block m-0">
                        <div className="block-content p-0">
                            <div className="input-group search-box">
                                <div className="input-group-prepend">
                                    <button
                                        type="button"
                                        className="btn search-navs-btns"
                                        style={{ position: "relative" }}
                                        onClick={this.context.router.history.goBack}
                                    >
                                        {/* <i className="si si-arrow-left" /> */}
                                        <svg className="uHGrw _17EkR" viewBox="0 0 32 32" height="18" width="18"><path d="M3.333 14.984l28.667-0v2.097l-0.16 0.006h-28.506l-0.16-0.16v-1.782l0.16-0.16zM1.114 14.986l10.079-10.079 0.121-0.108 1.465 1.467-0.101 0.127-10.079 10.079h-0.226l-1.26-1.26v-0.226zM12.679 25.676l0.108 0.117-1.468 1.484-0.126-0.115-10.079-10.079v-0.226l1.26-1.26h0.226l10.079 10.079zM3.268 12.87l0.272 0.116-0.022 6.125-0.272 0.114-3.245-3.18 0.111-0.112 3.157-3.062z"></path></svg>
                                        <Ink duration="500" />
                                    </button>
                                </div>
                                <input
                                    type="text"
                                    className="form-control search-input"
                                    placeholder={localStorage.getItem("restaurantSearchPlaceholder")}
                                    value={this.state.restaurant}
                                    onChange={this.handleInputChange}
                                    ref={input => {
                                        this.searchInput = input;
                                    }}
                                />
                                <div className="input-group-append">
                                    <button type="submit" className="btn search-navs-btns" style={{ position: "relative" }}>
                                        <i className="si si-magnifier" />
                                        <Ink duration="500" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default RestaurantSearch;
