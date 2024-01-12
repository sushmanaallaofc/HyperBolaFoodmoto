import React, { Component } from "react";
import Ink from "react-ink";
import { applyCoupon } from "../../../../services/coupon/actions";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

class NewCoupon extends Component {
    static contextTypes = {
		router: () => null,
	};

    state = {
        error_msg: false,
        inputCoupon: "",
		couponFailed: false,
		couponFailedType: "",
		couponSubtotalMessage: "",
        // appliedAmount: "",
    };

    componentDidMount() {
        // automatically apply coupon if already exists in localstorage
		if (localStorage.getItem("appliedCoupon") && localStorage.getItem("activeRestaurant")) {
			const { user } = this.props;
            const token = user.success ? this.props.user.data.auth_token : null;
            this.props.applyCoupon(
            token,
            localStorage.getItem("appliedCoupon"),
            localStorage.getItem("activeRestaurant") ? localStorage.getItem("activeRestaurant") : this.props.restaurant_info.id,
            this.props.subtotal
            );
		}
    }

    checkAndSetAppliedAmount = () => {
		let elem = "";
        if(localStorage.getItem("couponAppliedAmount") !== null){
            if(localStorage.getItem("currencySymbolAlign") === "left"){
                elem = localStorage.getItem("currencyFormat") + parseFloat(localStorage.getItem("couponAppliedAmount")).toFixed(0);
            } else {
                elem = parseFloat(localStorage.getItem("couponAppliedAmount")).toFixed(0) + localStorage.getItem("currencyFormat")
            }
        } else {
            const { coupon } = this.props;
            console.log('testing', coupon.discount);
            if(localStorage.getItem("currencySymbolAlign") === "left"){
                elem = localStorage.getItem("currencyFormat") + parseFloat(coupon.discount).toFixed(0);
            } else {
                elem = parseFloat(coupon.discount).toFixed(0) + localStorage.getItem("currencyFormat")
            }
        }

		if (this.refs.appliedAmount) {
			this.refs.appliedAmount.innerHTML = elem;
		}
	};

    componentWillReceiveProps(nextProps) {
        if(nextProps.coupon.appliedAmount) {
            const saveCouponAppliedAmount = new Promise((resolve) => {
                resolve("Saved");
            });
            saveCouponAppliedAmount.then(() => {
                this.checkAndSetAppliedAmount(nextProps.coupon.discount);
            });
        }
	}
    showCoupons = () => {
        const { user } = this.props;
        const { history } = this.context.router;
        if(user.success){
            history.push("/cart/coupons", this.props.subtotal);
        } else {
            this.setState({ error_msg: true });
            setTimeout(() => {
                this.setState({ error_msg: false });
            }, 3000);
        }
    }

    render() {
        const { user, coupon } = this.props;

		if (!user.success) {
			// return (
			// 	<Redirect to={"/cart"} />
			// );
		}
        return (
            <React.Fragment>
                {this.state.error_msg && (
					<div className="auth-error mb-50">
						<div className="error-shake">Login to apply coupon</div>
					</div>
				)}
                <div onClick={this.showCoupons} className={`coupon-success d-flex justify-content-between px-15 pb-15 mx-15 mb-15 position-relative`}>
                    {coupon.code ? (
                        <div>
                        <span>'{coupon.code}' Coupon Applied </span><br />
                        <p className="mb-0">You saved <span style={{color: 'rgb(252, 128, 25)'}} ref="appliedAmount">{this.checkAndSetAppliedAmount()}</span></p>
                      </div>
                    ):(
                    <div>
                        <img src="/assets/img/various/offer.png" alt="coupon" className="mr-2" style={{width:"25px"}}/>
                        Apply Coupon
                    </div>
                    )}
                    <div>
                        <i className="si si-arrow-right text-muted font-size-md" />
                    </div>
                    <Ink duration="500" />
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
)(NewCoupon);
