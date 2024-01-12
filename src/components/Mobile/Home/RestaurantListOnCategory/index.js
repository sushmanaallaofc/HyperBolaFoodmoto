import React, { Component } from "react";

import { getRestaurantsBasedOnCategory, getRestaurantsCategories } from "../../../../services/restaurant/actions";
import { connect } from "react-redux";
import ContentLoader from "react-content-loader";
import DelayLink from "../../../helpers/delayLink";
import Ink from "react-ink";
import PromoSlider from "../PromoSlider";

import { Redirect } from "react-router";

import Meta from "../../../helpers/meta";
import Nav from "../../Nav";
import Fade from "react-reveal/Fade";
import Footer from "../../Footer";
import BackWithSearch from "../../Elements/BackWithSearch";

export class RestaurantListOnCategory extends Component {
	state = {
		selectedOption: null,
		options: [],
		defaultValues: [],
		checkboxChecked: false,
		checkedCount: 0,
		loading: true,
		selectedCategoryLabel: "",
	};

	//getting all restaurants before rendering
	componentDidMount() {
		this.props.getRestaurantsCategories();

		// Get default selected category label from localStorage
		const categorySelectOptions = JSON.parse(localStorage.getItem("categorySelectOptions"));

		if (categorySelectOptions && categorySelectOptions.length > 0) {
			this.setState({ selectedCategoryLabel: categorySelectOptions[0].label });
		}

		this.setState({ checkedCount: JSON.parse(localStorage.getItem("categorySelectOptions")).length });
	}

	_processSelectedCheckboxs = () => {
		this.setState({ loading: true });
		let selectedOption = [];
	
		let checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
		this.setState({ checkedCount: checkboxes.length });
	
		if (checkboxes.length === 0) {
			console.log("Came here");
	
			localStorage.removeItem("categorySelectOptions");
		} else {
			for (let i = 0; i < checkboxes.length; i++) {
				selectedOption.push({
					value: parseInt(checkboxes[i].getAttribute("data-value")),
					label: checkboxes[i].getAttribute("data-label"),
				});
			}
	
			this.setState({ selectedCategoryLabel: selectedOption[0].label }); // Update the state with the selected category label
	
			return new Promise((resolve, reject) => {
				localStorage.setItem("categorySelectOptions", JSON.stringify(selectedOption));
				let categorySelectOptions = JSON.parse(localStorage.getItem("categorySelectOptions"));
				let latandlng = JSON.parse(localStorage.getItem("userSetAddress"));
	
				if (categorySelectOptions) {
					let categoryIds = [];
					categorySelectOptions.map((restaurantCategories) => {
						return categoryIds.push(parseInt(restaurantCategories.value));
					});
					this.props.getRestaurantsBasedOnCategory(latandlng.lat, latandlng.lng, categoryIds);
				}
				let data = JSON.parse(localStorage.getItem("categorySelectOptions"));
				if (data) {
					resolve(this.sortRestaurantCategoriesOptions());
				} else {
					reject(new Error("Promise rejected"));
				}
			});
		}
	};	

	// called when you click category from restaurant list page
	filterRestaurants() {
		let categorySelectOptions = JSON.parse(localStorage.getItem("categorySelectOptions"));
		let latandlng = JSON.parse(localStorage.getItem("userSetAddress"));

		if (categorySelectOptions) {
			let categoryIds = [];
			categorySelectOptions.map((restaurantCategories) => {
				return categoryIds.push(parseInt(restaurantCategories.value));
			});
			this.props.getRestaurantsBasedOnCategory(latandlng.lat, latandlng.lng, categoryIds);
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.restaurants_categories.categories !== nextProps.restaurants_categories.categories) {
			this.setState({ selectedOption: nextProps.restaurants_categories.categories });
		}

		if (this.props.filtered_restaurants !== nextProps.filtered_restaurants) {
			this.setState({ loading: false });
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.restaurants_categories !== prevProps.restaurants_categories) {
			this.filterRestaurants();
			this.selectRestaurantsCategories(this.props.restaurants_categories);
		}
	}

	callAfterDefaultRestaurantsCategoriesSelected = () => {
		this.handleChange(this.state.defaultValues);
	};

	selectRestaurantsCategories = (restaurants_categories) => {
		let arr = [];
		if (restaurants_categories) {
			restaurants_categories.categories.map((restaurantCatogory) => {
				let restaurantCateories = {
					value: restaurantCatogory.id,
					label: restaurantCatogory.name,
				};
				if (restaurantCateories) {
					arr.push(restaurantCateories);
				}
				return null;
			});
			if (arr.length > 0) {
				this.setState({
					options: arr,
				});
				localStorage.setItem("allSelectableOptions", JSON.stringify(arr));
				return new Promise((resolve, reject) => {
					let data = JSON.parse(localStorage.getItem("allSelectableOptions"));
					if (data) {
						resolve(this.sortRestaurantCategoriesOptions());
					} else {
						reject(new Error("Promise rejected"));
					}
				});
			}
		}
	};

	checkIfChecked = (value) => {
		return JSON.parse(localStorage.getItem("categorySelectOptions")).some(
			(categories) => value === categories.value
		);
	};

	sortRestaurantCategoriesOptions = () => {
		let categorySelectOptions = JSON.parse(localStorage.getItem("categorySelectOptions"));
		let allSelectableOptions = JSON.parse(localStorage.getItem("allSelectableOptions"));

		let checkedOptions = new Set(categorySelectOptions.map((category) => category.value));
		let sortedOptions = [
			...categorySelectOptions,
			...allSelectableOptions.filter((category) => !checkedOptions.has(category.value)),
		];

		if (sortedOptions.length === allSelectableOptions.length) {
			this.setState({
				options: sortedOptions,
			});
		}
	};

	render() {
		if (localStorage.getItem("hideDesktopView") !== "true" &&  window.innerWidth > 768) {
			return <Redirect to="/" />;
		}
		if (localStorage.getItem("categorySelectOptions") === null) {
			return <Redirect to="/" />;
		}
		if (localStorage.getItem("userSetAddress") === null) {
			// this.context.router.history.push("/search-location");
			console.log("Redirect to search location");
			return <Redirect to="/search-location" />;
		}

		const { selectedOption } = this.state;
		const { history, user } = this.props;
		return (
			<React.Fragment>
				<Meta
					seotitle={localStorage.getItem("seoMetaTitle")}
					seodescription={localStorage.getItem("seoMetaDescription")}
					ogtype="website"
					ogtitle={localStorage.getItem("seoOgTitle")}
					ogdescription={localStorage.getItem("seoOgDescription")}
					ogurl={window.location.href}
					twittertitle={localStorage.getItem("seoTwitterTitle")}
					twitterdescription={localStorage.getItem("seoTwitterDescription")}
				/>
				{/* <Nav
					logo={true}
					logoLink={true}
					active_nearme={true}
					disable_back_button={true}
					history={history}
					loggedin={user.success}
				/> */}
				<BackWithSearch
					boxshadow={false}
					has_title={true}
					title={this.state.selectedCategoryLabel}
					disable_search={true}
					homeButton={true}
				/>
				<div style={{ paddingTop:"55px" }}>
				{localStorage.getItem("showStoreCategoriesFilter") === "true" && (
					<React.Fragment>
					{this.state.options.length > 0 && selectedOption !== null && (
						<React.Fragment>
							<div className="category-checkboxes-block px-15 mt-20" ref="categoryOptions">
								<div className="filter-count-block">
									{localStorage.getItem("categoriesFiltersText")} {this.state.checkedCount}
								</div>
								{this.state.options.map((category) => (
									<label key={category.value} style={{ position: "relative" }}>
										<input
											type="checkbox"
											value={category.value}
											defaultChecked={this.checkIfChecked(category.value)}
											onChange={this._processSelectedCheckboxs}
											data-label={category.label}
											data-value={category.value}
										/>
										<span>{category.label}</span>
										<Ink duration="500" hasTouch={true} />
									</label>
								))}
							</div>
						</React.Fragment>
					)}
					</React.Fragment>
				)}
				{this.state.loading ? (
					<ContentLoader height={378} width={400} speed={1.2} primaryColor="#f3f3f3" secondaryColor="#ecebeb">
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
						{this.props.filtered_restaurants.length === 0 ? (
							<React.Fragment>
								<div className="d-flex justify-content-center mt-100">
									<img
										className="explore-bg"
										src="/assets/img/various/explore-bg.png"
										alt={localStorage.getItem("restaurantSearchPlaceholder")}
									/>
								</div>
								<h4 className="d-flex justify-content-center filter-no-found">
									{localStorage.getItem("categoriesNoRestaurantsFoundText")}
								</h4>
							</React.Fragment>
						) : (
							this.props.filtered_restaurants.map((restaurant, index) => (
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
									{localStorage.getItem("showPromoSlider") === "true" && (
										<React.Fragment>
											{this.props.slides && this.props.slides.length > 0 && (
												<React.Fragment>
													{index ===
														this.props.slides[0]["promo_slider"]["position_id"] - 1 && (
														<PromoSlider
															slides={this.props.slides}
															size={this.props.slides[0]["promo_slider"]["size"]}
															secondarySlider={true}
														/>
													)}
												</React.Fragment>
											)}
										</React.Fragment>
									)}
								</React.Fragment>
							))
						)}
					</React.Fragment>
				)}
				</div>
				<Footer />
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	restaurants_categories: state.restaurant.restaurants_categories,
	filtered_restaurants: state.restaurant.filtered_restaurants,
	user: state.user.user,
});

export default connect(
	mapStateToProps,
	{ getRestaurantsBasedOnCategory, getRestaurantsCategories }
)(RestaurantListOnCategory);
