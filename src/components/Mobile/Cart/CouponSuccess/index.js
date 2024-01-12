import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import { applyCoupon } from "../../../../services/coupon/actions";
import { connect } from "react-redux";
import Lottie from 'react-lottie-player';
import lottieJson from './lf20_tkeaajkc.json';

class CouponSuccess extends Component {

    render() {
        const { user, coupon } = this.props;
        return (
            <React.Fragment>
                <Dialog
					fullWidth={true}
					fullScreen={false}
					open={this.props.open}
					onClose={this.props.handleCouponDialog}
					style={{ width: "80%", margin: "auto" }}
					PaperProps={{ style: { backgroundColor: "rgb(255, 255, 255)", borderRadius: "10px", overflow: "visible" } }}
				>
                    <Lottie
                    onClick={this.props.handleCouponDialog}
                    loop
                    animationData={lottieJson}
                    play
                    style={{height: 'auto', position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '470px'}}
                    />
                    <div className="text-center d-flex justify-content-center align-items-end" style={{height: '13rem'}}>
                        <img src="/assets/img/various/offer.png" alt="Coupon Applied" className="couponAppliedPopupImage" />
                        <div>
                            <b>{coupon.code}</b> Coupon Applied
                            <h3 className="mb-0 mt-3 h3"><b>You saved {localStorage.getItem("couponAppliedAmount") ? localStorage.getItem("currencySymbolAlign") === "left" ? localStorage.getItem("currencyFormat") + parseFloat(localStorage.getItem("couponAppliedAmount")).toFixed(0) : parseFloat(localStorage.getItem("couponAppliedAmount")).toFixed(0) + localStorage.getItem("currencyFormat") : localStorage.getItem("currencySymbolAlign") === "left" ? localStorage.getItem("currencyFormat") + parseFloat(coupon.discount).toFixed(0) : parseFloat(coupon.discount).toFixed(0) + localStorage.getItem("currencyFormat")}</b></h3>
                            <div onClick={this.props.handleCouponDialog} className="couponAppliedCloseBtn">Awesome</div>
                        </div>
                    </div>
				</Dialog>
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
)(CouponSuccess);
