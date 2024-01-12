import React, { Component } from "react";

import Ink from "react-ink";
import { Link } from "react-router-dom";
import { applyCoupon } from "../../../../services/coupon/actions";
import { connect } from "react-redux";

class Coupon extends Component {
	state = {
		inputCoupon: "",
		couponFailed: false,
		couponFailedType: "",
		couponSubtotalMessage: "",
	};

	componentDidMount() {
		// automatically apply coupon if already exists in localstorage
		if (localStorage.getItem("appliedCoupon")) {
			this.setState({ inputCoupon: localStorage.getItem("appliedCoupon") }, () => {
				// this.refs.couponInput.defaultValue = localStorage.getItem("appliedCoupon");
				const { user } = this.props;
				const token = user.success ? this.props.user.data.auth_token : null;
				this.props.applyCoupon(
					token,
					localStorage.getItem("appliedCoupon"),
					this.props.restaurant_info.id,
					this.props.subtotal
				);
			});
		}
	}
	componentWillReceiveProps(nextProps) {
		const { coupon } = this.props;
		//check if props changed after calling the server
		if (coupon !== nextProps.coupon) {
			//if nextProps.coupon is successful then
			if (nextProps.coupon.success) {
				console.log("SUCCESS COUPON");
				localStorage.setItem("appliedCoupon", nextProps.coupon.code);
				this.setState({ couponFailed: false });
			} else {
				// console.log("COUPON Removed");
				// coupon is invalid
				// console.log("FAILED COUPON");
				localStorage.removeItem("appliedCoupon");
				localStorage.removeItem("couponAppliedAmount");
				this.setState({
					couponFailed: !nextProps.coupon.hideMessage,
					couponFailedType: nextProps.coupon.type,
					couponSubtotalMessage: nextProps.coupon.message,
				});
			}
		}
	}
	handleInput = (event) => {
		this.setState({ inputCoupon: event.target.value });
	};

	handleSubmit = (event) => {
		event.preventDefault();
		const { user } = this.props;
		const token = user.success ? this.props.user.data.auth_token : null;
		this.props.applyCoupon(token, this.state.inputCoupon, this.props.restaurant_info.id, this.props.subtotal);
	};

	componentWillUnmount() {
		// this.props.coupon.code = undefined;
		// localStorage.removeItem("appliedCoupon");
	}

	render() {
		const { coupon, user } = this.props;
		return (
			<React.Fragment>
				<div className="input-group bg-white mb-15">
					{/* <Link
					to={{
						pathname: "/cart/apply-coupon"
					}}	
					> */}
					<div className="input-group btn-group-cpn-apply">
						<div className="input-group-prepend">
							<div className="btn apply-coupon-btn pt-15">
								<i className="icon-offersOutline offers-icon" />
							</div>
						</div>
						<span className="input-group apply-coupon-text pt-15">
						{localStorage.getItem("cartCouponText")}
						</span>
						<div className="input-group-append">
							<div type="submit" className="btn apply-coupon-arrow">
								<i className="icon-rightArrow" style={{ color : "#bebfc5" }}/>
							</div>
						</div>
					</div>
					{/* </Link> */}
					
					<div className="coupon-status">
						{coupon.code && (
							<div className="coupon-success pt-10 pb-10">
								{localStorage.getItem("showCouponDescriptionOnSuccess") === "true" ? (
									<React.Fragment>{coupon.description}</React.Fragment>
								) : (
									<React.Fragment>
										{'"' + coupon.code + '"'} {localStorage.getItem("cartApplyCoupon")}{" "}
										{coupon.discount_type === "PERCENTAGE" ? (
											coupon.discount + "%"
										) : (
											<React.Fragment>
												{localStorage.getItem("currencySymbolAlign") === "left" &&
													localStorage.getItem("currencyFormat") + coupon.discount}
												{localStorage.getItem("currencySymbolAlign") === "right" &&
													coupon.discount + localStorage.getItem("currencyFormat")}{" "}
												{localStorage.getItem("cartCouponOffText")}
											</React.Fragment>
										)}
									</React.Fragment>
								)}
							</div>
						)}
						{/* Coupon is not applied, then coupon state is true */}
						{this.state.couponFailed &&
							(this.state.couponFailedType === "MINSUBTOTAL" ? (
								<div className="coupon-fail pt-10 pb-10">{this.state.couponSubtotalMessage}</div>
							) : (
								<div className="coupon-fail pt-10 pb-10">
									{localStorage.getItem("cartInvalidCoupon")}
								</div>
							))}
						{/* {!user.success && (
							<div className="coupon-not-loggedin-message pt-10 pb-10">
								<i className="si si-info mr-2" />
								{localStorage.getItem("couponNotLoggedin")}
							</div>
						)} */}
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	coupon: state.coupon.coupon,
	restaurant_info: state.items.restaurant_info,
	user: state.user.user,
});

export default connect(
	mapStateToProps,
	{ applyCoupon }
)(Coupon);
