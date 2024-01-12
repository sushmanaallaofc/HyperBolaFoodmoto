import * as firebase from "firebase/app";

import React, { Component } from "react";

import Footer from "../Footer";
import Meta from "../../helpers/meta";
import Nav from "../Nav";
import PromoSlider from "./PromoSlider";
import { Redirect } from "react-router";
import RestaurantList from "./RestaurantList";
import { connect } from "react-redux";
import { getPromoSlides } from "../../../services/promoSlider/actions";
import { getRestaurantCategorySlides } from "../../../services/restaurantCategorySlider/actions";

import messaging from "../../../init-fcm";
import { saveNotificationToken } from "../../../services/notification/actions";
import { getSingleLanguageData } from "../../../services/languages/actions";
import { getUserNotifications } from "../../../services/alert/actions";
import { resetInfo, resetItems, resetBackup } from "../../../services/items/actions";
import { GET_RESTAURANTS_SLIDES_URL } from "../../../configs";
import Axios from "axios";

import { Link } from "react-router-dom";

import Dialog from "@material-ui/core/Dialog";
import GpsSelector from "../Location/PopularPlaces/GpsSelector";
import Ink from "react-ink";

class Home extends Component {
	static contextTypes = {
		router: () => null,
	};

	state = {
		open: false,
		data: [],
		customer_name: "Guest",
	};

	async componentDidMount() {
		this.props.resetItems();
		this.props.resetInfo();
		this.props.resetBackup();

		const { user } = this.props;

		const userSetAddress = JSON.parse(localStorage.getItem("userSetAddress"));

		this.props.getPromoSlides(userSetAddress.lat, userSetAddress.lng);
		this.props.getRestaurantCategorySlides(userSetAddress.lat, userSetAddress.lng);

		if (user.success) {
			this.props.getUserNotifications(user.data.id, user.data.auth_token);
		}

		if (user.success) {
			if (localStorage.getItem("enablePushNotification") === "true") {
				if (firebase.messaging.isSupported()) {
					let handler = this.props.saveNotificationToken;
					messaging
						.requestPermission()
						.then(async function() {
							const push_token = await messaging.getToken();
							handler(push_token, user.data.id, user.data.auth_token);
						})
						.catch(function(err) {
							console.log("Unable to get permission to notify.", err);
						});
				}
			}
		}
		if (user.success) {
			this.setState({ customer_name: user.data.name });
		}

		const userAlreadySelected = !JSON.parse(localStorage.getItem("userSetAddress")).hasOwnProperty(
			"businessLocation"
		);

		if (localStorage.getItem("userAlreadySelectedLocation") === null) {
			if (userAlreadySelected) {
				this.setState({ open: false });
			} else {
				this.setState({ open: true });
			}
		}

		// this.getAllRestaurantSliders();
	}

	// getAllRestaurantSliders = () => {
	// 	Axios.post(GET_RESTAURANTS_SLIDES_URL).then((response) => {
	// 		if (response.data) {
	// 			this.setState({
	// 				data: response.data,
	// 			});
	// 		}
	// 	});
	// };

	componentWillReceiveProps(nextProps) {
		if (this.props.languages !== nextProps.languages) {
			if (localStorage.getItem("userPreferedLanguage")) {
				this.props.getSingleLanguageData(localStorage.getItem("userPreferedLanguage"));
			} else {
				if (nextProps.languages.length) {
					// console.log("Fetching Translation Data...");
					const id = nextProps.languages.filter((lang) => lang.is_default === 1)[0].id;
					this.props.getSingleLanguageData(id);
				}
			}
		}
	}

	handlePopularLocationClick = (location) => {
		const userSetAddress = {
			lat: location.latitude,
			lng: location.longitude,
			address: location.name,
			house: null,
			tag: null,
			city: null,
			state: null,
			businessLocation: true,
		};
		localStorage.setItem("userSetAddress", JSON.stringify(userSetAddress));

		const saveUserSetAddress = new Promise((resolve) => {
			localStorage.setItem("userSetAddress", JSON.stringify(userSetAddress));
			localStorage.setItem("userAlreadySelectedLocation", "true");
			resolve("Location Saved");
		});
		saveUserSetAddress.then(() => {
			window.location.reload();
		});
	};

	changeRouteToRestaurantsCategories = (categories) => {
		if (categories.categories_ids) {
			const saveCategorySelectOptions = new Promise((resolve) => {
				localStorage.setItem("categorySelectOptions", JSON.stringify(categories.categories_ids));
				resolve("categorySelectOptions Saved");
			});
			saveCategorySelectOptions.then(() => {
				this.context.router.history.push("categories/stores");
			});
		}
	};

	componentWillUnmount() {
		// navigator.serviceWorker.removeEventListener("message", message => console.log(message));
	}

	render() {
		if (localStorage.getItem("hideDesktopView") !== "true" &&  window.innerWidth > 768) {
			return <Redirect to="/" />;
		}

		const { history, user, promo_slides, popular_locations, restaurant_category_slides } = this.props;
		const firstRow = restaurant_category_slides.slice(0, 4);
		const secondRow = restaurant_category_slides.slice(4, 8);
		const additionalCategories = restaurant_category_slides.slice(8);

		additionalCategories.forEach((category, index) => {
		if (index % 2 === 0) {
			firstRow.push(category);
		} else {
			secondRow.push(category);
		}
		});

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

				<div className="height-100-percent mb-50">
					<div className="custom-bg">
						<Nav
							logo={true}
							active_nearme={true}
							disable_back_button={true}
							history={history}
							loggedin={user.success}
						/>
						{localStorage.getItem("showWelcomeMessage") === "true" && (
							<div className="l0FILG">
								<div className="JUktc">
									<div className="sc-bczRLJ rsenjl">What would you like to eat?</div>
								</div>
							</div>
						)}
						{localStorage.getItem("mockSearchOnHomepage") === "true" && (
							<div className="bg-white custom-bg" style={{ position:"sticky", top:"52px", zIndex:"1", paddingBottom:"2px" }}>
							<Link to="explore">
								{/* delivery */}
								{/* <div
									className={`mock-search-block-new ${
										localStorage.getItem("showPromoSlider") === "false"
											? "pt-15"
											: "pb-15" + promo_slides.mainSlides === "null"
											? "pt-15"
											: "pb-15"
									}`}
								> */}
								<div
									className={`mock-search-block-new ${
										localStorage.getItem("showPromoSlider") === "false"
											? "pt-15"
											: "pb-5" + promo_slides.mainSlides === "null"
											? "pt-15"
											: "pb-5"
									}`}
								>
									<div className="d-flex justify-content-between mock-search--block-new-inner">
										<div className="mock-search-left">
											<img src="assets/img/search.svg" alt="search" />
										</div>
										<div>
											<span>{localStorage.getItem("mockSearchPlaceholder")}</span>
										</div>
										<div className="mock-search-right">
											<img src="assets/img/mic.svg" alt="search" />
										</div>
									</div>
								</div>
							</Link>
							</div>
						)}
						{/* Passing slides as props to PromoSlider */}
						{localStorage.getItem("showPromoSliderTop") === "true" ? (
							<React.Fragment>
							{localStorage.getItem("showPromoSlider") === "true" && (
								<React.Fragment>
									<div style={{ paddingBottom:"10px" }}>
										{promo_slides && promo_slides.mainSlides && promo_slides.mainSlides.length > 0 && (
											<PromoSlider
												slides={promo_slides.mainSlides}
												size={promo_slides.mainSlides[0]["promo_slider"]["size"]}
											/>
										)}
									</div>
								</React.Fragment>
							)}
							{localStorage.getItem("enRestaurantCategorySlider") === "true" && localStorage.getItem("restaurantCategorySliderPosition") === "main" && (
								<React.Fragment>
									{restaurant_category_slides && restaurant_category_slides.length > 0 && (
										<React.Fragment>
										{localStorage.getItem("homePageCategoryStyle") === "STYLEONE" && (
										<div className="l4FVG">
											{localStorage.getItem("showCustomerNameHome") === "true" ? (
											<div className="XjI6m" style={{marginBottom: '8px'}}>
												<div className="JUktc">
													<div className="sc-bczRLJ enrsjx"><span className="customer_name">{this.state.customer_name},</span>{" "} <span className="whats_on_mind">What&apos;s on your mind?</span></div>
												</div>
											</div>
											):(
											<div className="XjI6m" style={{marginBottom: '16px'}}>
												<div className="JUktc">
													<div className="sc-bczRLJ enrsjx">Top Categories</div>
												</div>
											</div>
											)}
											{localStorage.getItem("homePageCategoryType") === "SLIDE" ? (
												<div className="sc-eAKupa bSMoNJ">
												<div className="bSMoNJrow">
													{firstRow.map((category) => (
														<div key={category.id} className="sc-ilxdoh eCLiFX">
															<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
																<a href={category.link} aria-label={`restaurants curated for ${category.name}`} className="Collection__CollectionAnchor-sc-ioxwkf-0 caCxps">
																	<div height={'100%'} width={'auto'} className="Collection__ImageWrapper-sc-ioxwkf-2 fEWKBs">
																		<img className="sc-jTQDnj gaSMPu" src={category.image} width={'auto'} height={'100%'} alt={`restaurants curated for ${category.name}`} onClick={() => {
																			this.changeRouteToRestaurantsCategories(category);
																		}} />
																	</div>
																</a>
																<p className="meat-category-text" style={{ textAlign: 'center' }}>{category.name}</p>
															</div>
														</div>
													))}
												</div>
												<div className="bSMoNJrow">
													{secondRow.map((category) => (
														<div key={category.id} className="sc-ilxdoh eCLiFX">
															<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
																<a href={category.link} aria-label={`restaurants curated for ${category.name}`} className="Collection__CollectionAnchor-sc-ioxwkf-0 caCxps">
																	<div height={'100%'} width={'auto'} className="Collection__ImageWrapper-sc-ioxwkf-2 fEWKBs">
																		<img className="sc-jTQDnj gaSMPu" src={category.image} width={'auto'} height={'100%'} alt={`restaurants curated for ${category.name}`} onClick={() => {
																			this.changeRouteToRestaurantsCategories(category);
																		}} />
																	</div>
																</a>
																<p className="meat-category-text" style={{ textAlign: 'center' }}>{category.name}</p>
															</div>
														</div>
													))}
												</div>
											</div>
											):(
												<div className="meat-category-grid">
											{restaurant_category_slides.map((category) => (
												<div key={category.id} className="meat-category" onClick={() => {
														this.changeRouteToRestaurantsCategories(category);
													}}>
												<img src={category.image} alt={category.name} />
												<p className="meat-category-text">{category.name}</p>
												</div>
											))}
											</div>
											)}
										</div>
										)}
										{localStorage.getItem("homePageCategoryStyle") === "STYLETWO" && (
										<div className="grid-container">
											{restaurant_category_slides.map((category) => (
												<div className="grid-item" key={category.id}>
													<div onClick={() => {
															this.changeRouteToRestaurantsCategories(category);
														}} className="" style={{ background:"rgb(242 242 242)", width:"100%", borderRadius:"15px" }}>
														<img src={category.image} alt="image1" />
													</div>
													<p>{category.name}</p>
												</div>
											))}
										</div>
										)}
										</React.Fragment>
									)}
								</React.Fragment>
							)}
							</React.Fragment>
						):(
							<React.Fragment>
							{localStorage.getItem("enRestaurantCategorySlider") === "true" && localStorage.getItem("restaurantCategorySliderPosition") === "main" && (
								<React.Fragment>
									{restaurant_category_slides && restaurant_category_slides.length > 0 && (
										<React.Fragment>
										{/* {console.log('hekki')} */}
										{localStorage.getItem("homePageCategoryStyle") === "STYLEONE" && (
										<div className="l4FVG mb-15">
											{localStorage.getItem("showCustomerNameHome") === "true" ? (
											<div className="XjI6m" style={{marginBottom: '8px'}}>
												<div className="JUktc">
													<div className="sc-bczRLJ enrsjx"><span className="customer_name">{this.state.customer_name},</span>{" "} <span className="whats_on_mind">What&apos;s on your mind?</span></div>
												</div>
											</div>
											):(
											<div className="XjI6m" style={{marginBottom: '16px'}}>
												<div className="JUktc">
													<div className="sc-bczRLJ enrsjx">Top Categories</div>
												</div>
											</div>
											)}
											{localStorage.getItem("homePageCategoryType") === "SLIDE" ? (
												<div className="sc-eAKupa bSMoNJ">
												<div className="bSMoNJrow">
													{firstRow.map((category) => (
														<div key={category.id} className="sc-ilxdoh eCLiFX">
															<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
																<a href={category.link} aria-label={`restaurants curated for ${category.name}`} className="Collection__CollectionAnchor-sc-ioxwkf-0 caCxps">
																	<div height={'100%'} width={'auto'} className="Collection__ImageWrapper-sc-ioxwkf-2 fEWKBs">
																		<img className="sc-jTQDnj gaSMPu" src={category.image} width={'auto'} height={'100%'} alt={`restaurants curated for ${category.name}`} onClick={() => {
																			this.changeRouteToRestaurantsCategories(category);
																		}} />
																	</div>
																</a>
																<p className="meat-category-text" style={{ textAlign: 'center' }}>{category.name}</p>
															</div>
														</div>
													))}
												</div>
												<div className="bSMoNJrow">
													{secondRow.map((category) => (
														<div key={category.id} className="sc-ilxdoh eCLiFX">
															<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
																<a href={category.link} aria-label={`restaurants curated for ${category.name}`} className="Collection__CollectionAnchor-sc-ioxwkf-0 caCxps">
																	<div height={'100%'} width={'auto'} className="Collection__ImageWrapper-sc-ioxwkf-2 fEWKBs">
																		<img className="sc-jTQDnj gaSMPu" src={category.image} width={'auto'} height={'100%'} alt={`restaurants curated for ${category.name}`} onClick={() => {
																			this.changeRouteToRestaurantsCategories(category);
																		}} />
																	</div>
																</a>
																<p className="meat-category-text" style={{ textAlign: 'center' }}>{category.name}</p>
															</div>
														</div>
													))}
												</div>
											</div>
											):(
												<div className="meat-category-grid">
											{restaurant_category_slides.map((category) => (
												<div key={category.id} className="meat-category" onClick={() => {
														this.changeRouteToRestaurantsCategories(category);
													}}>
												<img src={category.image} alt={category.name} />
												<p className="meat-category-text">{category.name}</p>
												</div>
											))}
											</div>
											)}
										</div>
										)}
										{localStorage.getItem("homePageCategoryStyle") === "STYLETWO" && (
										<div className="grid-container">
											{restaurant_category_slides && restaurant_category_slides.map((category) => (
												<div className="grid-item" key={category.id}>
													<div onClick={() => {
															this.changeRouteToRestaurantsCategories(category);
														}} className="" style={{ background:"rgb(242 242 242)", width:"100%", borderRadius:"15px" }}>
														<img src={category.image} alt="image1" />
													</div>
													<p>{category.name}</p>
												</div>
											))}
										</div>
										)}
										</React.Fragment>
									)}
								</React.Fragment>
							)}
							{localStorage.getItem("showPromoSlider") === "true" && (
								<React.Fragment>
									<div style={{ paddingBottom:"10px" }}>
										{promo_slides && promo_slides.mainSlides && promo_slides.mainSlides.length > 0 && (
											<PromoSlider
												slides={promo_slides.mainSlides}
												size={promo_slides.mainSlides[0]["promo_slider"]["size"]}
											/>
										)}
									</div>
								</React.Fragment>
							)}
							</React.Fragment>
						)}
						
						{localStorage.getItem("customHomeMessage") !== "<p></p>" &&
							localStorage.getItem("customHomeMessage") !== "<p><br></p>" &&
							localStorage.getItem("customHomeMessage") !== "null" &&
							(localStorage.getItem("customHomeMessage") !== "" && (
								<div
									style={{
										position: "relative",
										background: "#f8f9fa",
									}}
									dangerouslySetInnerHTML={{
										__html: localStorage.getItem("customHomeMessage"),
									}}
								/>
							))
						}
					</div>
					<RestaurantList user={user} slides={promo_slides.otherSlides} getItSlides={promo_slides.getItSlides} topPickupSlides={promo_slides.topPickupSlides} />
					<Footer active_nearme={true} />
				</div>

				<Dialog
					maxWidth={false}
					fullWidth={true}
					fullScreen={true}
					open={this.state.open}
					onClose={this.toggleSchedulePopup}
					style={{ margin: "auto", position: "absolute", bottom: "0", top: "60%" }}
					PaperProps={{
						style: {
							backgroundColor: "#fff",
							overflowY: "hidden",
						},
					}}
				>
					<div>
						<GpsSelector fetchGpsAutomaticallyAndroid={true} />
						<div className="p-15 popularLocationPopup">
							{popular_locations && popular_locations.length > 0 && (
								<React.Fragment>
									<h4 className="text-muted h4">{localStorage.getItem("searchPopularPlaces")}</h4>

									<div style={{ overflowY: "scroll", height: "11rem" }}>
										{popular_locations.map((location) => (
											<button
												key={location.id}
												type="button"
												className="btn btn-rounded btn-alt-secondary btn-md mb-15 mr-15"
												style={{
													position: "relative",
													backgroundColor:
														location.is_default && localStorage.getItem("storeColor"),
													color: location.is_default && "#fff",
												}}
												onClick={() => {
													this.handlePopularLocationClick(location);
												}}
											>
												<Ink duration="500" />
												{location.name}
											</button>
										))}
									</div>
								</React.Fragment>
							)}
						</div>
					</div>
				</Dialog>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	promo_slides: state.promo_slides.promo_slides,
	restaurant_category_slides: state.restaurant_category_slides.restaurant_category_slides,
	user: state.user.user,
	locations: state.locations.locations,
	languages: state.languages.languages,
	language: state.languages.language,
	popular_locations: state.popular_locations.popular_locations,
});

export default connect(
	mapStateToProps,
	{
		getPromoSlides,
		getRestaurantCategorySlides,
		saveNotificationToken,
		getSingleLanguageData,
		getUserNotifications,
		resetInfo,
		resetItems,
		resetBackup,
	}
)(Home);
