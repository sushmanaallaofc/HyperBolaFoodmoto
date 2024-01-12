import React, { Component } from "react";

import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PWAInstallation from "../PWAInstallation";

class Footer extends Component {
	state = {
		active_nearme: false,
		active_explore: false,
		active_cart: false,
		active_account: false,
		active_alerts: false,
		unread_alerts_count: null,
	};

	componentDidMount() {
		if (this.props.active_nearme === true) {
			this.setState({ active_nearme: true });
		}
		if (this.props.active_explore === true) {
			this.setState({ active_explore: true });
		}
		if (this.props.active_cart === true) {
			this.setState({ active_cart: true });
		}
		if (this.props.active_account === true) {
			this.setState({ active_account: true });
		}
		if (this.props.active_alerts === true) {
			this.setState({ active_alerts: true });
		}
	}

	render() {
		const { cartTotal, alertUnreadTotal } = this.props;

		return (
			<React.Fragment>
				{localStorage.getItem("showPwaInstallPromptFooter") === "true" && <PWAInstallation type={"footer"} />}

				<div className="d-flex justify-content-center">
					<div
						className={`content pt-5 py-5 font-size-xs clearfix ${
							localStorage.getItem("footerStyleType") === "FLOAT" ? "footer-float" : "footer-fixed"
						}`}
					>
						<NavLink to="/" className="col footer-links px-2 py-1">
							{/* <i className={this.state.active_nearme ? "iconn-foodmoto footer-active-links footer-icon" : "iconn-foodmoto footer-icon"} /> <br /> */}
							<i className={this.state.active_nearme ? "si si-pointer footer-active-links footer-icon" : "si si-pointer footer-icon"} /> <br />
							<span className={this.state.active_nearme ? "active-footer-tab" : ""}>
								{this.state.active_nearme ? (
									localStorage.getItem("footerNearme")
								) : (
									<span> {localStorage.getItem("footerNearme")}</span>
								)}
							</span>
						</NavLink>
						{/* <NavLink to="/alerts" className="col footer-links px-2 py-1">
							<span
								className="cart-quantity-badge"
								style={{ backgroundColor: localStorage.getItem("storeColor") }}
							>
								{alertUnreadTotal}
							</span>
							<i className="si si-bell footer-icon" /> <br />
							<span className={this.state.active_alerts ? "active-footer-tab" : ""}>
								{this.state.active_alerts ? (
									localStorage.getItem("footerAlerts")
								) : (
									<span> {localStorage.getItem("footerAlerts")}</span>
								)}
							</span>
						</NavLink> */}
						<NavLink to="/explore" className="col footer-links px-2 py-1">
							<i className={this.state.active_explore ? "icon-SearchFilled-v3 footer-active-links footer-icon" : "icon-SearchInverse-v3 footer-icon"} /> <br />
							<span className={this.state.active_explore ? "active-footer-tab" : ""}>
								{this.state.active_explore
									? localStorage.getItem("footerExplore")
									: localStorage.getItem("footerExplore")}
							</span>
						</NavLink>
						<NavLink to="/cart" className="col footer-links px-2 py-1">
							<i className={this.state.active_cart ? "icon-CartFilled-v3 footer-icon footer-active-links" : "icon-CartInverse-v3 footer-icon"} /> <br />
							<span className={this.state.active_cart ? "active-footer-tab" : ""}>
								{this.state.active_cart
									? localStorage.getItem("footerCart")
									: localStorage.getItem("footerCart")}
								{cartTotal.productQuantity > 0 && (
								<span
									className="cart-quantity-badge"
									style={{ backgroundColor: "#000000" }}
								>
									{cartTotal.productQuantity}
								</span>
								)}
							</span>
						</NavLink>
						<NavLink to="/my-account" className="col footer-links px-2 py-1">
							<i className={this.state.active_account ? "icon-userFilled-v3 footer-active-links footer-icon" : "icon-userIcon-v3 footer-icon"} /> <br />
							<span className={this.state.active_account ? "active-footer-tab" : ""}>
								{this.state.active_account
									? localStorage.getItem("footerAccount")
									: localStorage.getItem("footerAccount")}
							</span>
						</NavLink>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	cartTotal: state.total.data,
	alertUnreadTotal: state.alert.alertUnreadTotal,
});

export default connect(
	mapStateToProps,
	{}
)(Footer);
