import React, { Component } from "react";

import DelayLink from "../../../helpers/delayLink";
import Ink from "react-ink";
import LazyLoad from "react-lazyload";

class RestaurantSearchList extends Component {
	render() {
		const { restaurants } = this.props;
		return (
			<React.Fragment>
				<div className="bg-white mb-50 mt-30">
					<h5 className="px-15 mb-1 text-muted">{localStorage.getItem("exploreRestautantsText")}</h5>
					{restaurants.map((restaurant) => (
						<React.Fragment key={restaurant.id}>
							<div className={`styles_row__1ivP1 ${!restaurant.is_active && "restaurant-not-active"}`} style={{marginBottom: '6px', marginTop:'6px'}}>
								<div className="styles_slide__2c207" style={{marginRight: '0px'}}>
									<div>
										<div className="styles_cardWithPadding__JE1QE" style={{width: 'calc((100vw - 0px) - 12px)'}}>
											<DelayLink
												to={"../stores/" + restaurant.slug}
												delay={200}
												className="styles_container__fLC0R"
												clickAction={() => {
													localStorage.getItem("userPreferredSelection") === "DELIVERY" &&
														restaurant.delivery_type === 1 &&
														localStorage.setItem("userSelected", "DELIVERY");
													localStorage.getItem("userPreferredSelection") ===
														"SELFPICKUP" &&
														restaurant.delivery_type === 2 &&
														localStorage.setItem("userSelected", "SELFPICKUP");
													localStorage.getItem("userPreferredSelection") === "DELIVERY" &&
														restaurant.delivery_type === 3 &&
														localStorage.setItem("userSelected", "DELIVERY");
													localStorage.getItem("userPreferredSelection") ===
														"SELFPICKUP" &&
														restaurant.delivery_type === 3 &&
														localStorage.setItem("userSelected", "SELFPICKUP");
												}}
											>
												<div className="styles_imgContainer__1uHo5" aria-hidden="true">
													<div className="styles_ImageContainer__2rk9a styles_ImageContainerMore__2iYQz" style={{background: 'rgb(251, 238, 215)'}}>
														{/* <img alt="" className="styles_Image__1fplJ rest_img" src={restaurant.image} /> */}
														<div className={`styles_Image__1fplJ ${restaurant.coupon ? 'rest_img' : ''}`} style={{ backgroundImage: `url(${restaurant.image})`, }} />
													</div>
													{restaurant.custom_featured_name ? (
														<div className="styles_imgAd__2zrjj">{restaurant.custom_featured_name}</div>
													):(null)}
													{restaurant.coupon ? (
														<div className="OfferHeading_container__1-mOm">
															<div className="OfferHeading_wrapper__2NaIu OfferHeading_wrapperTypeOne__26S_t">
																<div className="OfferHeading_Header__3b4k3">{restaurant.coupon.discount_type === 'PERCENTAGE' && restaurant.coupon.discount+'% OFF'}{restaurant.coupon.discount_type === 'AMOUNT' && (localStorage.getItem("currencySymbolAlign") === "left" ? localStorage.getItem("currencyFormat") + restaurant.coupon.discount + ' OFF' : + restaurant.coupon.discount + localStorage.getItem("currencyFormat") + ' OFF')}</div>
																<div className="OfferHeading_SubHeader__3nmoQ">
																	{restaurant.coupon.discount_type === 'PERCENTAGE' && restaurant.coupon.max_discount !== null ? (
																	localStorage.getItem("currencySymbolAlign") === "left"
																		? `Upto ${localStorage.getItem("currencyFormat")}${parseFloat(restaurant.coupon.max_discount).toFixed(0)}`
																		: `Upto ${parseFloat(restaurant.coupon.max_discount).toFixed(0)}${localStorage.getItem("currencyFormat")}`
																	) : (
																	localStorage.getItem("currencySymbolAlign") === "left" && restaurant.coupon.min_subtotal > 0
																		? `Above ${localStorage.getItem("currencyFormat")}${parseFloat(restaurant.coupon.min_subtotal).toFixed(0)}`
																		: restaurant.coupon.min_subtotal > 0
																		? `Above ${parseFloat(restaurant.coupon.min_subtotal).toFixed(0)}${localStorage.getItem("currencyFormat")}`
																		: null
																	)}
																</div>
															</div>
														</div>
													):(null)}
												</div>
												<div className="styles_containerRestaurant__3vhx3 styles_containerRestaurantOneAlign__1D7al">
													<div className="styles_containerImageBadge__14fk3">
														<div className="styles_restaurantName__29jAP">{restaurant.name}</div>
													</div>
													<div className="styles_restaurantMeta__2QtMf">
														<div>
															{/* <span className="styles_restaurantMetaRatingStar__7G4dD icon-star"><i className="fa fa-star" /></span> */}
															<img src="/assets/img/various/star_green.svg" alt="rating" style={{ width: "1.4rem", textAlign:"center" }} />

															<span className="styles_restaurantMetaRating__4H1gt">{restaurant.avgRating === "0" ? parseFloat(restaurant.rating).toFixed(1) : parseFloat(restaurant.avgRating).toFixed(1)} </span>
														</div>
														<div style={{ paddingLeft: "10px" }}>
															<span className="styles_restaurantMetaDot__1AKA9" />
															<span className="styles_restaurantMetaRating__4H1gt">{restaurant.delivery_time}{" "}{localStorage.getItem("homePageMinsText")}</span>
														</div>
														{/* <span className="styles_restaurantMetaDot__1AKA9"/>
														<div>25-35 mins</div>
														<span className="styles_restaurantMetaDot__1AKA9"/>
														<div>₹400 for two</div> */}
													</div>
													<div className="styles_restaurantCuisines__3lBL4">
														<span>{restaurant.description}</span>
													</div>
													{/* <div className="parent-container">
														<div className="home_rest_address">
															<span>{restaurant.address}</span>
														</div>
														{restaurant.distance && (
														<div className="home_rest_address_distance">
															<span> {parseFloat(restaurant.distance).toFixed(1)} km</span>
														</div>
														)}
													</div> */}
													<div className="col-12">
														<div className="row">
															<div className="col-9 pl-0 pr-0">
																<div className="styles_restaurantCuisines__3lBL4">
																	<span>{restaurant.address}</span>
																</div>
															</div>
															{restaurant.distance ? (
																<div className="col-3 pl-0 pr-0">
																	<div className="styles_restaurantCuisines__3lBL4">
																	<span style={{ paddingLeft:"2px" }}> {parseFloat(restaurant.distance).toFixed(1)} km</span>
																	</div>
																</div>
															):(null)}
														</div>
													</div>
													<hr className="HomeRest_dottedSeparator"/>
													{!restaurant.is_active ? (
														<span className="restaurant-not-active-msg">
															{localStorage.getItem("restaurantNotActiveMsg")}
														</span>
													):(
														<React.Fragment>
														{restaurant.free_delivery_subtotal > 0 ? (
															<React.Fragment>
															<div className="styles_restaurantCuisines__3lBL4">
																<i className="fa fa-bicycle"></i> <span> Free Delivery</span>
															</div>
															</React.Fragment>
														):(
															<React.Fragment>
															<div className="styles_restaurantCuisines__3lBL4">
															{restaurant.custom_message_on_list !== null &&
															restaurant.custom_message_on_list !== "<p><br></p>" ? (
																<div
																	dangerouslySetInnerHTML={{
																		__html: restaurant.custom_message_on_list,
																	}}
																/>
															):(
																<React.Fragment>
																{restaurant.coupon && restaurant.coupon.code ? (
																	<React.Fragment>
																		<div className="styles_restaurantCuisines__3lBL4" style={{ display:"inline-flex" }}>
																			<i className="icon-Offers-outline offers-icon mr-1"></i> <span> {restaurant.coupon.code}</span>
																		</div>
																	</React.Fragment>
																):(
																	<React.Fragment>
																	<i className="si si-wallet" />{" "}
																	{localStorage.getItem("currencySymbolAlign") ===
																		"left" && (
																		<React.Fragment>
																			{localStorage.getItem("currencyFormat")}
																			{restaurant.price_range}{" "}
																		</React.Fragment>
																	)}
																	{localStorage.getItem("currencySymbolAlign") ===
																		"right" && (
																		<React.Fragment>
																			{restaurant.price_range}
																			{localStorage.getItem("currencyFormat")}{" "}
																		</React.Fragment>
																	)}
																	<span>{localStorage.getItem("homePageForTwoText")}</span>
																	</React.Fragment>
																)}
																</React.Fragment>
																
															)}
															</div>
															</React.Fragment>
														)}
														</React.Fragment>
													)}
												</div>
												<Ink duration="500" hasTouch={false} />
											</DelayLink>
										</div>
									</div>
								</div>
							</div>
						{/*<div key={restaurant.id} className="col-xs-12 col-sm-12 restaurant-block">
							<DelayLink
								to={"../stores/" + restaurant.slug}
								delay={200}
								className="block block-link-shadow text-center light-bottom-border"
							>
								<div className="block-content block-content-full pt-2">
									<LazyLoad>
										<img
											src={restaurant.image}
											alt={restaurant.name}
											className={`restaurant-image mt-0 ${!restaurant.is_active &&
												"restaurant-not-active"}`}
										/>
									</LazyLoad>
								</div>
								<div className="block-content block-content-full restaurant-info">
									<h4 className="font-w600 mb-5 text-dark">{restaurant.name}</h4>
									<div className="font-size-sm text-muted truncate-text text-muted">
										{restaurant.description}
									</div>
									{!restaurant.is_active && (
										<span className="restaurant-not-active-msg">
											{localStorage.getItem("restaurantNotActiveMsg")}
										</span>
									)}
									<div className="text-center restaurant-meta mt-5 d-flex align-items-center justify-content-between text-muted">
										<div className="col-2 p-0 text-left store-rating-block">
											<i
												className={`fa fa-star pr-1 ${!restaurant.is_active &&
													"restaurant-not-active"}`}
												style={{
													color: localStorage.getItem("storeColor"),
												}}
											/>{" "}
											{restaurant.avgRating === "0" ? restaurant.rating : restaurant.avgRating}
										</div>
										<div className="col-4 p-0 text-center store-distance-block">
											<i className="si si-clock" /> {restaurant.delivery_time}{" "}
											{localStorage.getItem("homePageMinsText")}
										</div>
										<div className="col-6 p-0 text-center store-avgprice-block">
											<i className="si si-wallet" />{" "}
											{localStorage.getItem("currencySymbolAlign") === "left" && (
												<React.Fragment>
													{localStorage.getItem("currencyFormat")}
													{restaurant.price_range}{" "}
												</React.Fragment>
											)}
											{localStorage.getItem("currencySymbolAlign") === "right" && (
												<React.Fragment>
													{restaurant.price_range}
													{localStorage.getItem("currencyFormat")}{" "}
												</React.Fragment>
											)}
											{localStorage.getItem("homePageForTwoText")}
										</div>
									</div>
								</div>

								<Ink duration="500" />
							</DelayLink>
						</div> */}
						</React.Fragment>
					))}
				</div>
			</React.Fragment>
		);
	}
}

export default RestaurantSearchList;
