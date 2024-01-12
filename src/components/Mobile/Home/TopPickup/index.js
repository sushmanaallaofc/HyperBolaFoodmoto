import React, { Component } from "react";

import ContentLoader from "react-content-loader";
import LazyLoad from "react-lazyload";
import { NavLink } from "react-router-dom";
import Ink from "react-ink";
import Carousel from 'react-multi-carousel';
import Axios from "axios";
import moment from 'moment';
import 'react-multi-carousel/lib/styles.css';
import RestaurantInfo from "../../Items/RestaurantInfo";

class TopPickup extends Component {
    componentDidMount() {
        // console.log('this.props', this.props);
    };
    render() {
        const { slides, size, secondarySlider } = this.props;
        return (
            <React.Fragment>
                {slides && slides[0] && (
                    <div className="slider-wrapper__img-wrapper" style={{ backgroundColor: "#fafafa", width: "100%", marginLeft:"0px", marginRight:"0px" }}>
                        <div style={{paddingLeft: '0px'}}>
                            <h2 className="styles_headerContainerTitle__27_ET" style={{ paddingLeft:"20px", marginTop:"10px", marginBottom:"10px" }}>
                                <span>{slides[0].name.toUpperCase()}</span></h2>
                        </div>
                    </div>
                )}
                <div
					className={
						secondarySlider
							? "slider-wrapper secondary-slider-wrapper mb-20"
							: "slider-wrapper bg-light py-20 my-0"
					}
				style={{ paddingTop:"0px", marginTop:"0px" }}>
					{slides.length === 0 ? (
						<ContentLoader
							height={170}
							width={400}
							speed={1.2}
							primaryColor="#f3f3f3"
							secondaryColor="#ecebeb"
						>
							<rect x="20" y="0" rx="4" ry="4" width="168" height="168" />
							<rect x="228" y="0" rx="4" ry="4" width="168" height="168" />
						</ContentLoader>
					) : (
						slides.map((slide) => slide.data.model === "3" ? (
								<a href={slide.url}
									className="slider-wrapper__img-wrapper"
									key={slide.data.id}
									style={{ position: "relative" }}
								>
									{/* if customURL then use anchor tag */}
                                    <img
                                        src={slide.data.image}
                                        alt={slide.data.name}
                                        className={`slider-wrapper__img slider-cust-img ${!secondarySlider &&
                                            "slider-wrapper__img-shadow"} custom-promo-img`}
                                        style={{
                                            height: (12 / 5) * size + "rem",
                                            width: (12 / 5) * size + "rem",
                                        }}
                                    />
									<Ink duration="500" hasTouch={true} />
								</a>
							) : (
                                slide.data.restaurant && slide.data.restaurant.is_accepted ? (
                                    <React.Fragment key={slide.data.id}>
                                        <NavLink
                                            to={"../" + slide.url}
                                            className={`slider-wrapper__img-wrapper pl-5 ${!slide.data.restaurant.is_active && "restaurant-not-active"}`}
                                            key={slide.data.id}
                                            style={{ position: "relative" }}
                                        >
                                            <div className="styles_slide__2c207">
                                                <div data-testid="favourite-restaurant-item">
                                                <button aria-label="Restaurant" className="Ripple_container__17nxL NewPromo__3Ykhl">
                                                    <div className="NewPromoImageCon__tMvMP" style={{background: 'rgb(251, 238, 215)', borderRadius:"8px"}}>
                                                        <div alt="" className={`NewPromoImageConImagesContainer__1J6kD ${slide.data.restaurant.coupon ? 'promo_rest_img' : ''}`} style={{ backgroundImage: `url(${slide.data.restaurant.image})`, }}  />
                                                        {/* <div className="NewPromoAds__230ip">Ad</div> */}
                                                        {slide.data.restaurant.coupon ? (
                                                            <div className="NewPromoOverlayOffer__eIxn0">
                                                            <div className="NewPromoOverlayOfferHeading__3J-E1">{slide.data.restaurant.coupon.discount_type === 'PERCENTAGE' ? slide.data.restaurant.coupon.discount+'% OFF':null}{slide.data.restaurant.coupon.discount_type === 'AMOUNT' && (localStorage.getItem("currencySymbolAlign") === "left" ? localStorage.getItem("currencyFormat") + slide.data.restaurant.coupon.discount + ' OFF' : + slide.data.restaurant.coupon.discount + localStorage.getItem("currencyFormat") + ' OFF')}</div>
                                                            <div className="NewPromoOverlayOfferSubheading__3MMlR">{slide.data.restaurant.coupon.discount_type === 'PERCENTAGE' && slide.data.restaurant.coupon.max_discount !== null ? (
                                                                localStorage.getItem("currencySymbolAlign") === "left"
                                                                    ? `Upto ${localStorage.getItem("currencyFormat")}${parseFloat(slide.data.restaurant.coupon.max_discount).toFixed(0)}`
                                                                    : `Upto ${parseFloat(slide.data.restaurant.coupon.max_discount).toFixed(0)}${localStorage.getItem("currencyFormat")}`
                                                                ) : (
                                                                localStorage.getItem("currencySymbolAlign") === "left" && slide.data.restaurant.coupon.min_subtotal > 0
                                                                    ? `Above ${localStorage.getItem("currencyFormat")}${parseFloat(slide.data.restaurant.coupon.min_subtotal).toFixed(0)}`
                                                                    : slide.data.restaurant.coupon.min_subtotal > 0
                                                                    ? `Above ${parseFloat(slide.data.restaurant.coupon.min_subtotal).toFixed(0)}${localStorage.getItem("currencyFormat")}`
                                                                    : null
                                                                )}
                                                            </div>
                                                        </div>
                                                        ):(null)
                                                        }
                                                    </div>
                                                    <div className="NewPromoTitle__2Q9Nl">{slide.data.restaurant.name}</div>
                                                    <div className="NewPromoSlaString__1iAGU">{slide.data.restaurant.description}</div>
                                                </button>
                                                </div>
                                            </div>
                                            <Ink duration="500" hasTouch={true} />
                                        </NavLink>
                                    </React.Fragment>
                                ):(null)
							)
						)
					)}
				</div>
            </React.Fragment>
        )
    }
}
export default TopPickup;