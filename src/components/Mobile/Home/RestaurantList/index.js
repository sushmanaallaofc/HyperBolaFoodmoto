import { GET_RESTAURANTS_SLIDES_URL } from "../../../../configs/index";
import React, { Component } from "react";

import ContentLoader from "react-content-loader";
import DelayLink from "../../../helpers/delayLink";
import Ink from "react-ink";
import LazyLoad from "react-lazyload";

import { withRouter } from "react-router-dom";
import axios from "axios";
import PromoSlider from "../PromoSlider";
import PromoSliderGen from "../PromoSliderGen";
import Fade from "react-reveal/Fade";

import { connect } from "react-redux";
import { getDeliveryRestaurants, getSelfpickupRestaurants } from "../../../../services/restaurant/actions";
import NewPromoSlider from "../NewPromoSlider";
import GetItSlider from "../GetItSlider";
import TopPickup from "../TopPickup";

class RestaurantList extends Component {
	state = {
		total: null,
		restaurants: [],
		loading: false,
		selfpickup: false,
		userPreferredSelectionDelivery: true,
		userPreferredSelectionSelfPickup: false,
		no_restaurants: false,
		data: [],
		review_data: [],
		isHomeDelivery: true,
	};

	componentDidMount() {
		// this.getAllRestaurantSliders();
		if (localStorage.getItem("enSPU") === "true") {
			//when selfpickup is on
			if (localStorage.getItem("userPreferredSelection") === "DELIVERY") {
				this.setState({
					selfpickup: false,
					isHomeDelivery: true,
					userPreferredSelectionDelivery: true,
					userPreferredSelectionSelfPickup: false,
				});
				if (this.props.restaurants && this.props.restaurants.length <= 0) {
					this.filterDelivery();
				}
			}
			if (
				localStorage.getItem("userPreferredSelection") === "SELFPICKUP" &&
				localStorage.getItem("enSPU") === "true"
			) {
				this.setState({
					selfpickup: true,
					isHomeDelivery: false,
					userPreferredSelectionSelfPickup: true,
					userPreferredSelectionDelivery: false,
				});
				if (this.props.restaurants && this.props.restaurants.length <= 0) {
					this.filterSelfPickup();
				}
			}
		} else {
			//when selfpickup is off by admin
			this.setState({
				selfpickup: false,
				isHomeDelivery: true,
				userPreferredSelectionDelivery: true,
				userPreferredSelectionSelfPickup: false,
			});
			if (this.props.restaurants && this.props.restaurants.length <= 0) {
				this.filterDelivery();
			}
		}

		if (localStorage.getItem("userPreferredSelection") === null) {
			localStorage.setItem("userPreferredSelection", "DELIVERY");
			localStorage.setItem("userSelected", "DELIVERY");
			this.setState({ userPreferredSelectionDelivery: true, isHomeDelivery: true });
			this.__getDeliveryRestaurants();
		}

		if (this.props.restaurants && this.props.restaurants.length > 0) {
			this.setState({ total: this.props.restaurants.length });
		}
	}

	__getDeliveryRestaurants = (retryCount = 0) => {
		if (localStorage.getItem("userSetAddress")) {
			this.setState({
				loading: true,
			});
			const userSetAddress = JSON.parse(localStorage.getItem("userSetAddress"));

			this.props.getDeliveryRestaurants(userSetAddress.lat, userSetAddress.lng).then((restaurants) => {
				if (restaurants && restaurants.payload.length) {
					this.setState({
						total: restaurants.payload.length,
						no_restaurants: false,
						loading: false,
					});
				} else {
					const maxRetries = 1;
					if (retryCount < maxRetries) {
						setTimeout(() => {
						  this.__getDeliveryRestaurants(retryCount + 1);
						}, 1000);
					  }else {
						  this.setState({
							  total: null,
							  no_restaurants: true,
						  });
					  }
				}
			});
		}
	};

	__getSelfPickupRestaurants = () => {
		if (localStorage.getItem("userSetAddress")) {
			this.setState({
				loading: true,
			});
			const userSetAddress = JSON.parse(localStorage.getItem("userSetAddress"));

			this.props.getSelfpickupRestaurants(userSetAddress.lat, userSetAddress.lng).then((restaurants) => {
				if (restaurants && restaurants.payload.length) {
					this.setState({
						total: restaurants.payload.length,
						no_restaurants: false,
						loading: false,
					});
				} else {
					this.setState({
						total: null,
						loading: false,
						no_restaurants: true,
					});
				}
			});
		}
	};

	filterDelivery = () => {
		this.setState(
			() => ({
				selfpickup: false,
				restaurants: [],
				userPreferredSelectionDelivery: true,
				userPreferredSelectionSelfPickup: false,
			}),
			() => {
				this.__getDeliveryRestaurants();
			}
		);
		localStorage.setItem("userPreferredSelection", "DELIVERY");
	};

	filterSelfPickup = () => {
		this.setState(
			() => ({
				selfpickup: true,
				restaurants: [],
				userPreferredSelectionSelfPickup: true,
				userPreferredSelectionDelivery: false,
			}),
			() => {
				this.__getSelfPickupRestaurants();
			}
		);
		localStorage.setItem("userPreferredSelection", "SELFPICKUP");
	};

	// getAllRestaurantSliders = () => {
	// 	axios.post(GET_RESTAURANTS_SLIDES_URL).then((response) => {
	// 		if (response.data) {
	// 			this.setState({
	// 				data: response.data,
	// 			});
	// 		}
	// 	});
	// };

	changeRouteToRestaurantsCategories = (categories) => {
		if (categories.categories_ids) {
			const saveCategorySelectOptions = new Promise((resolve) => {
				localStorage.setItem("categorySelectOptions", JSON.stringify(categories.categories_ids));
				resolve("categorySelectOptions Saved");
			});
			saveCategorySelectOptions.then(() => {
				this.props.history.push("categories/stores");
			});
		}
	};

	// componentDidUpdate(prevProps) {
	// 	// Compare the previous restaurants prop with the current one
	// 	if (prevProps.restaurants !== this.props.restaurants) {
	// 		// Check if this.props.restaurants is empty or undefined
	// 		if (!this.props.restaurants || this.props.restaurants.length <= 0) {
	// 			// Check user's preferred selection and fetch restaurants accordingly
	// 			if (localStorage.getItem("userPreferredSelection") === "DELIVERY") {
	// 				this.filterDelivery();
	// 			} else if (
	// 				localStorage.getItem("userPreferredSelection") === "SELFPICKUP" &&
	// 				localStorage.getItem("enSPU") === "true"
	// 			) {
	// 				this.filterSelfPickup();
	// 			} else {
	// 				this.__getDeliveryRestaurants();
	// 			}
	// 		}
	// 	}
	
	// 	// Update total count of restaurants
	// 	if (prevProps.restaurants !== this.props.restaurants && this.props.restaurants && this.props.restaurants.length > 0) {
	// 		this.setState({ total: this.props.restaurants.length });
	// 	}
	// }		

	render() {
		return (
			<React.Fragment>
				<div className="bg-white mb-100">
					{this.state.no_restaurants && (
						<div
							className={"bg-light " + (localStorage.getItem("enSPU") === "true" ? "sticky-top" : "pt-3")}
						>
							{localStorage.getItem("enSPU") === "true" ? (
								<React.Fragment>
									<div className="px-15 py-3 d-flex justify-content-between align-items-center">
										<h1 className="restaurant-count mb-0 mr-2">
											{localStorage.getItem("noRestaurantMessage")}
										</h1>

										<div className="d-flex btn-group btn-preference-group">
											<button
												onClick={() => {
													this.filterDelivery();
													// window.scrollTo({ top: 190, behavior: "smooth" });
												}}
												className={
													"btn btn-preference " +
													(this.state.userPreferredSelectionDelivery ? "user-preferred" : "")
												}
											>
												{localStorage.getItem("deliveryTypeDelivery")}
											</button>
											<button
												onClick={() => {
													this.filterSelfPickup();
													// window.scrollTo({ top: 190, behavior: "smooth" });
												}}
												className={
													"btn btn-preference " +
													(this.state.userPreferredSelectionSelfPickup
														? "user-preferred"
														: "")
												}
											>
												{localStorage.getItem("deliveryTypeSelfPickup")}
											</button>
										</div>
									</div>
									<hr />
								</React.Fragment>
							) : (
								<h1 className="restaurant-count mb-0 mr-2 px-15">
									{localStorage.getItem("noRestaurantMessage")}
								</h1>
							)}
							<hr />
						</div>
					)}
					{this.state.total ? (
						<React.Fragment>
							<div
								className={
									"bg-light " + (localStorage.getItem("enSPU") === "true" ? "sticky-top" : "pt-3")
								}
							>
								{localStorage.getItem("enSPU") === "true" ? (
									<React.Fragment>
										<div className="px-15 py-3 d-flex justify-content-between align-items-center">
											<h1 className="restaurant-count mb-0 mr-2">
												{!this.state.loading && this.state.total}{" "}
												{localStorage.getItem("restaurantCountText")}
											</h1>

											<div className="d-flex btn-group btn-preference-group">
												<button
													onClick={() => {
														this.filterDelivery();
														// window.scrollTo({ top: 190, behavior: "smooth" });
													}}
													className={
														"btn btn-preference " +
														(this.state.userPreferredSelectionDelivery
															? "user-preferred"
															: "")
													}
												>
													{localStorage.getItem("deliveryTypeDelivery")}
												</button>
												<button
													onClick={() => {
														this.filterSelfPickup();
														// window.scrollTo({ top: 190, behavior: "smooth" });
													}}
													className={
														"btn btn-preference " +
														(this.state.userPreferredSelectionSelfPickup
															? "user-preferred"
															: "")
													}
												>
													{localStorage.getItem("deliveryTypeSelfPickup")}
												</button>
											</div>
										</div>
									</React.Fragment>
								) : (
									<div className="px-15 py-3 d-flex justify-content-between align-items-center">
										<h1 className="restaurant-count mb-0 mr-2">
											{!this.state.loading && this.state.total}{" "}
											{localStorage.getItem("restaurantCountText")}
										</h1>
									</div>
								)}
							</div>
						</React.Fragment>
					) : null}

					{localStorage.getItem("restaurantCategorySliderPosition") === "0" && (
						<React.Fragment>
							{this.state.data.length > 0 && (
								<React.Fragment>
								<div className="ivdviM">
									<div className="fIuLDK">
									{this.state.data.map((category) => (
										<div className="cPKzjJ" key={category.id}>
											<div className="res-cat-group">
												<div className="dFJdDA">
													<div className="gqbMke" style={{ width:"100", height:"100%" }}>
														<img
															src={category.image}
															alt={category.name}
															className=""
															style={{width:'100%',borderRadius:'100%'}}
														/>
													</div>
												</div>
											</div>
										</div>
									))}
									</div>
								</div>
								<div className="slider-wrapper secondary-slider-wrapper my-0 pb-20">
									{this.state.data.map((category) => (
										<div className="slider-wrapper__img-wrapper" key={category.id}>
											<div
												style={{ position: "relative" }}
												onClick={() => {
													this.changeRouteToRestaurantsCategories(category);
												}}
											>
												<img
													src={category.image}
													alt={category.name}
													className="slider-wrapper__img slider-cust-img"
													style={{
														height:
															(12 / 5) *
																parseInt(
																	localStorage.getItem("restaurantCategorySliderSize")
																) +
															"rem",
														width:
															(12 / 5) *
																parseInt(
																	localStorage.getItem("restaurantCategorySliderSize")
																) +
															"rem",
														borderRadius:
															parseFloat(
																localStorage.getItem("restaurantCategorySliderStyle")
															) + "rem",
													}}
												/>
												{localStorage.getItem("showRestaurantCategorySliderLabel") ===
													"true" && (
													<span className="category-slider-name">{category.name}</span>
												)}
												<Ink duration="500" hasTouch={true} />
											</div>
										</div>
									))}
								</div>
								</React.Fragment>
							)}
						</React.Fragment>
					)}
					{this.state.loading ? (
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
						<React.Fragment>
							{this.props.restaurants && this.props.restaurants.length === 0 ? (
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
								this.props.restaurants && this.props.restaurants.map((restaurant, index) => (
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
																			<i className="fa fa-bicycle"></i> <span> Free Delivery</span> {restaurant.coupon && restaurant.coupon.code && (" | "+ restaurant.coupon.code.toUpperCase())}
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
																				<div className="price_for_two">
																				<React.Fragment>
																				{localStorage.getItem("showPriceForTwo") === "true" && (
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
																				</div>
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
										{/* <LazyLoad>
											<div className="col-xs-12 col-sm-12 restaurant-block">
												<DelayLink
													to={"../stores/" + restaurant.slug}
													delay={200}
													className="block text-center mb-3 single-store-homepage"
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
													<div
														className={`block-content block-content-full ${
															restaurant.is_featured && restaurant.is_active
																? "ribbon ribbon-bookmark ribbon-warning pt-2"
																: "pt-2"
														} `}
													>
														{restaurant.is_featured ? (
															<React.Fragment>
																{restaurant.custom_featured_name == null ? (
																	<div className="ribbon-box">
																		{localStorage.getItem("restaurantFeaturedText")}
																	</div>
																) : (
																	<div className="ribbon-box">
																		{restaurant.custom_featured_name}
																	</div>
																)}
															</React.Fragment>
														) : null}

														<Fade duration={500}>
															<img
																src={restaurant.image}
																alt={restaurant.name}
																className={`restaurant-image ${!restaurant.is_active &&
																	"restaurant-not-active"}`}
															/>
														</Fade>
													</div>
													<div className="block-content block-content-full restaurant-info">
														<div className="font-w600 mb-5 text-dark">
															{restaurant.name}
														</div>
														<div className="font-size-sm text-muted truncate-text text-muted">
															{restaurant.description}
														</div>
														{restaurant.custom_message_on_list !== null &&
															restaurant.custom_message_on_list !== "<p><br></p>" && (
																<div
																	dangerouslySetInnerHTML={{
																		__html: restaurant.custom_message_on_list,
																	}}
																/>
															)}

														{!restaurant.is_active && (
															<span className="restaurant-not-active-msg">
																{localStorage.getItem("restaurantNotActiveMsg")}
															</span>
														)}
														<hr className="my-10" />
														<div className="text-center restaurant-meta mt-5 d-flex align-items-center justify-content-between text-muted">
															<div className="col-2 p-0 text-left store-rating-block">
																<i className={`fa fa-star pr-1 ${!restaurant.is_active &&
																		"restaurant-not-active"}`}
																	style={{
																		color: localStorage.getItem("storeColor"),
																	}}
																/>{" "}
																{restaurant.avgRating === "0"
																	? restaurant.rating
																	: restaurant.avgRating}
															</div>
															<div className="col-4 p-0 text-center store-distance-block">
																{this.state.selfpickup ? (
																	<span>
																		<i className="si si-pointer pr-1" />
																		{restaurant.distance &&
																			restaurant.distance.toFixed(1)}{" "}
																		Km
																	</span>
																) : (
																	<span>
																		<i className="si si-clock pr-1" />{" "}
																		{restaurant.delivery_time}{" "}
																		{localStorage.getItem("homePageMinsText")}
																	</span>
																)}
															</div>
															<div className="col-6 p-0 text-center store-avgprice-block">
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
																{localStorage.getItem("homePageForTwoText")}
															</div>
														</div>
													</div>
													<Ink duration="500" hasTouch={false} />
												</DelayLink>
											</div>
										</LazyLoad> */}
										{this.state.custom_section && this.state.custom_section.customSection &&(
										<React.Fragment>
											{index === this.state.custom_section.customSection.position_id - 1 && this.state.custom_section.customSection.custom_message !== null && this.state.custom_section.customSection.custom_message !== "<p><br></p>" && (
												<div
													dangerouslySetInnerHTML={{
														__html: this.state.custom_section.customSection.custom_message,
													}}
												/>
											)}
										</React.Fragment>
										)}
										{localStorage.getItem("showPromoSlider") === "true" && (
											<React.Fragment>
												{/* {this.props.slides && this.props.slides.length > 0 && (
													<React.Fragment>
														{index ===
															this.props.slides[0]["promo_slider"]["position_id"] - 1 && (
															<PromoSliderGen
																slides={this.props.slides}
																size={this.props.slides[0]["promo_slider"]["size"]}
																secondarySlider={true}
															/>
														)}
													</React.Fragment>
												)} */}
												{this.props.slides && this.props.slides.length > 0 && (
													<React.Fragment>
														{index === this.props.slides[0]["promo_slider"]["position_id"] - 1 && (
															<NewPromoSlider
																name={this.props.slides[0]["name"]}
																slides={this.props.slides}
																size={this.props.slides[0]["promo_slider"]["size"]}
																secondarySlider={true}
															/>
														)}
													</React.Fragment>
												)}
												{this.props.getItSlides && this.props.getItSlides.length > 0 && (
													<React.Fragment>
														{index === this.props.getItSlides[0]["promo_slider"]["position_id"] - 1 && (
															<GetItSlider
															name={this.props.slides[0]["name"]}
															slides={this.props.getItSlides}
															size={this.props.slides[0]["promo_slider"]["size"]}
															secondarySlider={true}/>
														)}
													</React.Fragment>
												)}
												{this.props.topPickupSlides && this.props.topPickupSlides.length > 0 && (
													<React.Fragment>
														{index === this.props.topPickupSlides[0]["promo_slider"]["position_id"] - 1 && (
															<TopPickup
															name={this.props.slides[0]["name"]}
															slides={this.props.topPickupSlides}
															size={this.props.slides[0]["promo_slider"]["size"]}
															secondarySlider={true}/>
														)}
													</React.Fragment>
												)}
											</React.Fragment>
										)}
										{localStorage.getItem("enRestaurantCategorySlider") === "true" && (
											<React.Fragment>
												{index ===
													parseInt(localStorage.getItem("restaurantCategorySliderPosition")) -
														1 && (
													<React.Fragment>
														{this.state.data.length > 0 && (
															<div className="slider-wrapper secondary-slider-wrapper my-20">
																{this.state.data.map((category) => (
																	<div
																		className="slider-wrapper__img-wrapper"
																		key={category.id}
																	>
																		<div
																			style={{ position: "relative" }}
																			onClick={() => {
																				this.changeRouteToRestaurantsCategories(
																					category
																				);
																			}}
																		>
																			<img
																				src={category.image}
																				alt={category.name}
																				className="slider-wrapper__img slider-cust-img"
																				style={{
																					height:
																						(12 / 5) *
																							parseInt(
																								localStorage.getItem(
																									"restaurantCategorySliderSize"
																								)
																							) +
																						"rem",
																					width:
																						(12 / 5) *
																							parseInt(
																								localStorage.getItem(
																									"restaurantCategorySliderSize"
																								)
																							) +
																						"rem",
																					borderRadius:
																						parseFloat(
																							localStorage.getItem(
																								"restaurantCategorySliderStyle"
																							)
																						) + "rem",
																				}}
																			/>
																			{localStorage.getItem(
																				"showRestaurantCategorySliderLabel"
																			) === "true" && (
																				<span className="category-slider-name">
																					{category.name}
																				</span>
																			)}
																			<Ink duration="500" hasTouch={true} />
																		</div>
																	</div>
																))}
															</div>
														)}
													</React.Fragment>
												)}
											</React.Fragment>
										)}
										{this.state.review_data.ratable &&
											localStorage.getItem("enRAR") === "true" &&
											localStorage.getItem("rarModEnHomeBanner") === "true" &&
											"enRAR" === "disRAR" && (
												<React.Fragment>
													{console.log("Came here")}
													{!this.state.loading &&
														index ===
															parseInt(localStorage.getItem("rarModHomeBannerPosition")) -
																1 && (
															<div
																className="col-xs-12 col-sm-12 rating-block px-15 py-10"
																style={{
																	backgroundColor: localStorage.getItem(
																		"rarModHomeBannerBgColor"
																	),
																}}
															>
																<DelayLink
																	to={{
																		pathname:
																			"../rate-and-review/" +
																			this.state.review_data.data.id,
																	}}
																	delay={250}
																>
																	<div className="d-flex justify-content-between align-items-center">
																		<strong
																			style={{
																				color: localStorage.getItem(
																					"rarModHomeBannerTextColor"
																				),
																			}}
																		>
																			{localStorage.getItem(
																				"rarModHomeBannerText"
																			)}
																			{localStorage.getItem(
																				"rarModShowBannerRestaurantName"
																			) === "true" &&
																				this.state.review_data.data.restaurant
																					.name}
																		</strong>
																		<span
																			className="btn btn-default"
																			style={{
																				minWidth: "100px",
																				textAlign: "center",
																			}}
																		>
																			{this.animateStarIcon()}
																		</span>
																	</div>
																	<Ink duration="500" hasTouch={false} />
																</DelayLink>
															</div>
														)}
												</React.Fragment>
											)}
									</React.Fragment>
								))
							)}
						</React.Fragment>
					)}
				</div>
			</React.Fragment>
		);
	}
}

// export default withRouter(RestaurantList);

const mapStateToProps = (state) => ({
	restaurants: state.restaurant.restaurants,
});

export default withRouter(
	connect(
		mapStateToProps,
		{
			getDeliveryRestaurants,
			getSelfpickupRestaurants,
		}
	)(RestaurantList)
);
