import React, { Component } from "react";
import moment from "moment";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
class StoreCoupons extends Component {

    state = {
		coupons: [],
        show_coupon_msg: false,
        coupon_msg: ""
	};

    componentDidMount() {
        const { coupons,restaurant} = this.props;
        // console.log('didcoupons', coupons);
		if(coupons){
			this.setState({ coupons: coupons });
		}
    }

    handleCouponClick = (code) => {
        // Copy coupon code to clipboard
        navigator.clipboard.writeText(code)
          .then(() => {
            this.setState({ show_coupon_msg: true, coupon_msg: code + " Coupon Copied to clipboard" });

            setTimeout(() => {
                this.setState({ show_coupon_msg: false, coupon_msg: "" });
            }, 3000);
          })
          .catch((err) => {
            console.error('Failed to copy coupon code to clipboard', err);
            // Handle the error, e.g., show an error message to the user
          });
    };

    componentWillReceiveProps(nextProps) {
		if (this.props.coupons !== nextProps.coupons) {
			if (nextProps.coupons && nextProps.coupons.length) {
                this.setState({ coupons: nextProps.coupons });
            }
		}
	}

    render() {
        const today = moment().startOf('day');
		const filteredCoupons = this.state.coupons.filter(coupon => {
            return moment(coupon.expiry_date).isSameOrAfter(today) && coupon.max_count > 0 && coupon.is_active === 1;
		});
        // console.log('state-coupons',this.state.coupons);
        // console.log('filteredCoupons',filteredCoupons);
        return (
            <React.Fragment>
                {
                    this.props.restaurant.store_type &&  this.props.restaurant.store_type.store_ui === "restaurant" &&
                    <React.Fragment>
                    {this.state.coupon_msg && (
                        <div className="auth-error mb-50">
                            <div className="error-shake">{this.state.coupon_msg}</div>
                        </div>
                    )}
                    {this.state.coupons.length > 0 && filteredCoupons.length > 0 ? (
                        <div className="product-slider mb-3 ml-10">
                            {filteredCoupons.map((coupon) =>(
                                <div className="product-slider-item" key={coupon.id}>
                                    <div className="d-flex justify-content-start align-items-start store-single-coupon-block"
                                    onClick={() => this.handleCouponClick(coupon.code)}
                                    style={{ cursor: 'pointer' }}
                                    >
                                        <div>
                                            <img src="/assets/img/various/offer.png" alt="" className="mr-2 mt-1" style={{ width: "24px"}} />
                                        </div>
                                        <div className="coupon-sentence">
                                            <p className="mb-0">
                                            <b>
                                                {coupon.discount_type === 'PERCENTAGE' && coupon.discount + '% Off'}
                                                {coupon.discount_type === 'AMOUNT' && (
                                                localStorage.getItem("currencySymbolAlign") === "left"
                                                    ? localStorage.getItem("currencyFormat") + coupon.discount + ' Off'
                                                    : coupon.discount + localStorage.getItem("currencyFormat") + ' Off'
                                                )}
                                            </b>
                                            {coupon.discount_type === 'PERCENTAGE' && coupon.max_discount !== null ? (
                                                localStorage.getItem("currencySymbolAlign") === "left"
                                                ? ' Upto ' + localStorage.getItem("currencyFormat") + parseFloat(coupon.max_discount).toFixed(0)
                                                : ' Upto ' + parseFloat(coupon.max_discount).toFixed(0) + localStorage.getItem("currencyFormat")
                                            ) : (
                                                localStorage.getItem("currencySymbolAlign") === "left"
                                                ? ' | Above ' + localStorage.getItem("currencyFormat") + parseFloat(coupon.min_subtotal).toFixed(0)
                                                : ' | Above ' + parseFloat(coupon.min_subtotal).toFixed(0) + localStorage.getItem("currencyFormat")
                                            )}
                                            </p>
                                            <p className="mb-0">
                                            Use <b>{coupon.code}</b>
                                            {coupon.discount_type === 'PERCENTAGE' && coupon.max_discount !== null && 
                                                ` | Above ${localStorage.getItem("currencySymbolAlign") === "left" ? 
                                                localStorage.getItem("currencyFormat") + parseFloat(coupon.min_subtotal).toFixed(0) : 
                                                parseFloat(coupon.min_subtotal).toFixed(0) + localStorage.getItem("currencyFormat")
                                                }`
                                            }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))} 
                        </div>
                    ):(
                        null
                    )}
                  </React.Fragment>   

                }
                {
                    this.props.restaurant.store_type &&  this.props.restaurant.store_type.name === "Resturant V2" &&
                        <React.Fragment>
                            {this.state.coupon_msg && (
                                <div className="auth-error mb-50">
                                    <div className="error-shake">{this.state.coupon_msg}</div>
                                </div>
                            )}
                            
                            {this.state.coupons.length > 0 && filteredCoupons.length > 0 ? (
                                <AliceCarousel autoPlay infinite={filteredCoupons.length == 1 ? false : true} 
                                 autoPlayInterval="1500" disableButtonsControls disableDotsControls
                                
                                 >
                                    {filteredCoupons.map((coupon,index) =>(
                                        <div className="sliderimg" style={{width:'100%',padding:'0px 18px'}}  key={coupon.id} >
                                            <div className="d-flex justify-content-between align-items-center store-single-coupon-block"
                                            onClick={() => this.handleCouponClick(coupon.code)}
                                            style={{ cursor: 'pointer',borderRadius:20,border:'none',boxShadow:'none' }}
                                            >
                                                <div className="d-flex justify-content-start align-items-center">
                                                <div>
                                                    <img src="/assets/img/various/offer-icon-v2.png" alt="" className="mr-2 mt-1" style={{ width: "48px"}} />
                                                </div>
                                                <div className="coupon-sentence p-5">
                                                    <p className="mb-0" style={{fontSize:18}}>
                                                    <b >
                                                        {coupon.discount_type === 'PERCENTAGE' && coupon.discount + '% Off'}
                                                        {coupon.discount_type === 'AMOUNT' && (
                                                        localStorage.getItem("currencySymbolAlign") === "left"
                                                            ? localStorage.getItem("currencyFormat") + coupon.discount + ' Off'
                                                            : coupon.discount + localStorage.getItem("currencyFormat") + ' Off'
                                                        )}
                                                    </b>
                                                    <b>
                                                    {coupon.discount_type === 'PERCENTAGE' && coupon.max_discount !== null ? (
                                                        localStorage.getItem("currencySymbolAlign") === "left"
                                                        ? ' upto ' + localStorage.getItem("currencyFormat") + parseFloat(coupon.max_discount).toFixed(0)
                                                        : ' upto ' + parseFloat(coupon.max_discount).toFixed(0) + localStorage.getItem("currencyFormat")
                                                    ) : (
                                                        localStorage.getItem("currencySymbolAlign") === "left"
                                                        ? ' | ABOVE ' + localStorage.getItem("currencyFormat") + parseFloat(coupon.min_subtotal).toFixed(0)
                                                        : ' | ABOVE ' + parseFloat(coupon.min_subtotal).toFixed(0) + localStorage.getItem("currencyFormat")
                                                    )}
                                                    </b>
                                                    </p>
                                                    <p className="mb-0" style={{color:'rgba(2, 6, 12, 0.45)',fontSize:14,fontWeight:800}}>
                                                    USE {coupon.code}
                                                    {coupon.discount_type === 'PERCENTAGE' && coupon.max_discount !== null && 
                                                        ` | ABOVE ${localStorage.getItem("currencySymbolAlign") === "left" ? 
                                                        localStorage.getItem("currencyFormat") + parseFloat(coupon.min_subtotal).toFixed(0) : 
                                                        parseFloat(coupon.min_subtotal).toFixed(0) + localStorage.getItem("currencyFormat")
                                                        }`
                                                    }
                                                    </p>
                                                </div>
                                                </div>
                                                <div>
                                                    {
                                                        filteredCoupons.length > 1 &&
                                                        <span style={{color:'rgb(241, 87, 0)',fontWeight:700}}>
                                                            {index+1}/{filteredCoupons.length}
                                                        </span>
                                                    }
                                                    
                                                </div>
                                            </div>
                                        
                                        </div>
                                    ))} 
                                </AliceCarousel>
                            ):(
                                null
                            )}
                        </React.Fragment>  

                }
            </React.Fragment>
        );
    }

}
export default StoreCoupons;