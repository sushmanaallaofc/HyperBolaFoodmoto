import React, { Component } from "react";
import Meta from "../../../helpers/meta";
import BackWithSearch from "../../../Mobile/Elements/BackWithSearch";
import Ink from "react-ink";
import { applyCoupon } from "../../../../services/coupon/actions";
import { GET_CART_COUPON_URL } from "../../../../configs";
import { connect } from "react-redux";
import Axios from "axios";
import Flip from "react-reveal/Flip";

class Coupons extends Component {
	static contextTypes = {
		router: () => null,
	};
	
    state = {
		inputCoupon: "",
		loading: true,
		couponFailed: false,
		couponFailedType: "",
		couponSubtotalMessage: "",
		subtotal: null,
		coupons: [],
		showSuccess: false,
		error_msg: false,
	};

	componentDidMount() {
		console.log('this.props',this.props);
		this.setState({subtotal: this.props.location.state});
		this.__getCartCoupons()
		document.getElementsByTagName("body")[0].classList.add("bg-grey");
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
		console.log('nextProps-coupon',coupon);
		localStorage.removeItem("showSuccessDialog");
		//check if props changed after calling the server
		if (coupon !== nextProps.coupon) {
			//if nextProps.coupon is successful then
			if (nextProps.coupon.success) {
				console.log("SUCCESS COUPON");
				localStorage.setItem("appliedCoupon", nextProps.coupon.code);
				this.setState({ couponFailed: false });
			}
			// else {
			// 	console.log("COUPON Removed");
			// 	// coupon is invalid
			// 	console.log("FAILED COUPON");
			// 	localStorage.removeItem("appliedCoupon");
			// 	this.setState({
			// 		couponFailed: !nextProps.coupon.hideMessage,
			// 		couponFailedType: nextProps.coupon.type,
			// 		couponSubtotalMessage: nextProps.coupon.message,
			// 	});
			// }
		}

	}

	__getCartCoupons = () => {
		const { user } = this.props;
		if(user.success){
			Axios.post(GET_CART_COUPON_URL, {
				token: user.data.auth_token,
				subtotal: this.props.location.state,
				restaurant_id: this.props.restaurant_info.id
			})
			.then((response) => {
				// console.log('response',response);
				if(response.data.success){
					this.setState({coupons: response.data.coupons});
					this.setState({loading: false });
				}
			})
			.catch(function(error) {
				console.warn(error.response.data);
			});
		}
	};

	handleInput = (event) => {
		this.setState({ inputCoupon: event.target.value });
	};

	handleSubmit = (event) => {
		event.preventDefault();
		const { user } = this.props;
		const token = user.success ? this.props.user.data.auth_token : null;
		this.props.applyCoupon(token, this.state.inputCoupon, this.props.restaurant_info.id, this.props.location.state).then((response) => {
			if(response[0].payload.success){
				localStorage.setItem("showSuccessDialog", "true");
				// this.context.router.history.push("/cart");
				this.context.router.history.goBack();
			}
			if(!response[0].payload.success){
				this.setState({ error_msg: true });
				setTimeout(() => {
					this.setState({ error_msg: false });
				}, 2000);
			}
		});
	};

    componentWillUnmount() {
		document.getElementsByTagName("body")[0].classList.remove("bg-grey");
	}

	__applyCoupon = (code) => {
		const { user } = this.props;
		const token = user.success ? this.props.user.data.auth_token : null;
		this.props.applyCoupon(token, code, this.props.restaurant_info.id, this.props.location.state).then((response) => {
			if(response[0].payload.success){
				localStorage.setItem("showSuccessDialog", "true");
				// this.context.router.history.push("/cart");
				this.context.router.history.goBack();
			}
			if(!response[0].payload.success){
				this.setState({ error_msg: true });
				setTimeout(() => {
					this.setState({ error_msg: false });
				}, 2000);
			}
		});
	};

    render() {
        const { coupon, user } = this.props;
        return (
            <React.Fragment>
                <Meta
					seotitle={"Coupons"}
					seodescription={localStorage.getItem("seoMetaDescription")}
					ogtype="website"
					ogtitle={localStorage.getItem("seoOgTitle")}
					ogdescription={localStorage.getItem("seoOgDescription")}
					ogurl={window.location.href}
					twittertitle={localStorage.getItem("seoTwitterTitle")}
					twitterdescription={localStorage.getItem("seoTwitterDescription")}
				/>
                <BackWithSearch
					boxshadow={true}
					has_title={true}
					title={"Coupons & Offers"}
					disable_search={true}
				/>
				{(this.state.loading) && (
					<div className="height-100 overlay-loading ongoing-payment-spin">
						<div className="spin-load" />
					</div>
				)}
				{this.state.error_msg && (
					<div className="auth-error mb-50">
						<div className="error-shake">Sorry, this offer is not available</div>
					</div>
				)}
                <div className="mx-15" style={{position: 'relative', paddingTop: '5rem', marginBottom: '-3rem'}}>
					<form
						className={`coupon-form mb-3 ${!user.success && "coupon-block-not-loggedin"}`}
						onSubmit={this.handleSubmit}
					>
						<div className="input-group">
							<input
								type="text"
								className="form-control apply-coupon-input"
								placeholder={localStorage.getItem("cartCouponText")}
								onChange={this.handleInput}
								style={{ color: localStorage.getItem("storeColor") }}
								spellCheck="false"
								ref="couponInput"
							/>
							<div className="input-group-append">
								<button type="submit" className="btn apply-coupon-btn" onClick={this.handleSubmit}>
									<span
										style={{
											backgroundColor: localStorage.getItem("cartColorBg"),
											color: localStorage.getItem("cartColorText"),
										}}
									>
										{localStorage.getItem("applyCouponButtonText")}
									</span>
									<Ink duration="500" />
								</button>
							</div>
						</div>
					</form>
                    <hr />
					{this.state.coupons.length > 0 && (
						<div className="listedCartCoupons">
							{this.state.coupons.map((coupon, index) => (
								<Flip key={index} top delay={100}>
									<div onClick={(event) => {event.preventDefault(); this.__applyCoupon(coupon.code)}} key={index} className="react-reveal position-relative blured-lg" style={{animationFillMode: 'both', backfaceVisibility: 'visible', animationDuration: '1000ms', animationDelay: '0ms', animationIterationCount: 1, opacity: 1, animationName: 'react-reveal-620367998382870-2'}}>
										<div className="single-cart-coupon">
											<div className="d-flex justify-content-start mr-2">
											<img src="/assets/img/various/coupon-gift.png" alt="Coupon" className="single-cart-coupon-image mr-4" />
											<div className="position-relative"
												dangerouslySetInnerHTML={{
													__html: coupon.display_text,
												}}
											/>
											</div>
											{coupon.can_be_applied && (<div className="single-cart-coupon-applyBtn">Apply</div>)}
										</div>
										<Ink duration="500" />
									</div>
								</Flip>
							))}
						</div>
					)}
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
)(Coupons);