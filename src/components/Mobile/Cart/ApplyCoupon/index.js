import React, { Component } from "react";

import Ink from "react-ink";
import { userCoupons, applyCoupon } from "../../../../services/coupon/actions";
import { connect } from "react-redux";
import BackWithSearch from "../../../Mobile/Elements/BackWithSearch";
import ContentLoader from "react-content-loader";
import { Redirect } from "react-router";

class Coupon extends Component {

	static contextTypes = {
		router: () => null,
	};
	
	state = {
		inputCoupon: "",
		couponFailed: false,
		couponFailedType: "",
		couponSubtotalMessage: "",
	};

	componentDidMount() {
		const { user } = this.props;
		const token = user.success ? this.props.user.data.auth_token : null;
		this.props.userCoupons(token, this.props.restaurant_info.id);

		// automatically apply coupon if already exists in localstorage
		if (localStorage.getItem("appliedCoupon")) {
			this.setState({ inputCoupon: localStorage.getItem("appliedCoupon") }, () => {
				const { user } = this.props;
				const token = user.success ? this.props.user.data.auth_token : null;
				this.props.applyCoupon(
					token,
					localStorage.getItem("appliedCoupon"),
					this.props.restaurant_info.id,
					this.props.cartTotal.totalPrice
				);
			});
		}
		// this.context.router.history.goBack();
	}
	
	componentWillReceiveProps(nextProps) {
		const { coupon } = this.props;
		//check if props changed after calling the server
		if (coupon !== nextProps.coupon) {
			//if nextProps.coupon is successful then
			if (nextProps.coupon.success) {
				// console.log("SUCCESS COUPON");
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
	
	
	handleApplyCoupon = (coupon_id) => {
		const { user } = this.props;
		const token = user.success ? this.props.user.data.auth_token : null;
		this.props.applyCoupon(token, coupon_id, this.props.restaurant_info.id, this.props.cartTotal.totalPrice).then((response) => {
			console.log(response);
			this.context.router.history.goBack();
			// if (response && response.success) {
			// 	//successfully saved
			// 	this.context.router.history.goBack();
			// }
		});
	};

	componentWillUnmount() {
		// this.props.coupon.code = undefined;
		// localStorage.removeItem("appliedCoupon");
	}

	render() {
		const { usercoupons, coupon, user } = this.props;
		// console.log(this.props.cartTotal.totalPrice);
		return (
			<React.Fragment>
				<BackWithSearch
					boxshadow={true}
					has_title={true}
					title={"APPLY COUPON"}
					disable_search={true}
					homeButton={false}
				/>
				<div className="coupon-header">
					<div className="_3Qhg8">
						<div className="_1ZSQj">
							<div className="_3sRAt"><input className="_3cdyb" type="text" placeholder="Enter Coupon Code" /></div>
							<div className="_2uBSr _3hylU">Apply</div>
						</div>
					</div>
					<h2 className="_3K0qi">AVAILABLE COUPONS</h2>
				</div>
				{this.props.usercoupons.length === 0 ? (
					<ContentLoader
						height={378}
						width={400}
						speed={1.2}
						primaryColor="#f3f3f3"
						secondaryColor="#ecebeb"
					>
						<rect x="20" y="20" rx="4" ry="4" width="80" height="78" />
						<rect x="144" y="30" rx="0" ry="0" width="115" height="18" />
						<rect x="144" y="60" rx="0" ry="0" width="165" height="16" />

						<rect x="20" y="145" rx="4" ry="4" width="80" height="78" />
						<rect x="144" y="155" rx="0" ry="0" width="115" height="18" />
						<rect x="144" y="185" rx="0" ry="0" width="165" height="16" />

						<rect x="20" y="270" rx="4" ry="4" width="80" height="78" />
						<rect x="144" y="280" rx="0" ry="0" width="115" height="18" />
						<rect x="144" y="310" rx="0" ry="0" width="165" height="16" />
					</ContentLoader>
				) : (
					this.props.usercoupons.map((usercoupon, index) => (
						<React.Fragment key={usercoupon.id}>
							<div className="rpOr6 HmMYg">
							<div className="vJcVv">
								<div className="Crzsi">
									<div className="_2BAr3 _3-8tC"><img alt="" className="_2yQPs _3SKwK" height="20" width="20" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_40,h_40/rng/md/ads/production/jcuiipzv1wspesayzyok"/><span className="_1rOlC">{usercoupon.code}<span className="QQ9Qf"></span><span className="_1sFBB"></span></span></div>
								</div>
								<span className="J7O-y" onClick={() => this.handleApplyCoupon(usercoupon.code)}>APPLY
								</span>
							</div>
							<div className="_1lsNa">Get 30% off</div>
							<div className="_1xami">Use code {usercoupon.code} &amp; get 30% off on orders above ₹{usercoupon.min_subtotal.replace('.00', '')}. Maximum discount: ₹75.</div>
							</div>
						</React.Fragment>
					))
				)}
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	coupon: state.coupon.coupon,
	usercoupons: state.coupon.usercoupons,
	restaurant_info: state.items.restaurant_info,
	user: state.user.user,
	cartTotal: state.total.data,
});

export default connect(
	mapStateToProps,
	{ userCoupons, applyCoupon }
)(Coupon);
