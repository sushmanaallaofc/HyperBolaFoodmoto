import React, { Component } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import Meta from "../../helpers/meta";
import BackWithSearch from "../../Mobile/Elements/BackWithSearch";
import ContentLoader from "react-content-loader";
import Footer from "../Footer";
import Swing from "react-reveal/Swing";
import { getOffers } from "../../../services/offers/actions";
import DelayLink from "../../helpers/delayLink";
import Ink from "react-ink";
import LazyLoad from "react-lazyload";

class Offers extends Component {
	static contextTypes = {
		router: () => null,
	};

	state = {
		total: null,
		restaurants: [],
		loading: true,
		userPreferredSelectionDelivery: true,
		no_restaurants: false,
		isHomeDelivery: true,
		offers: [],
	};

	componentDidMount() {
		const userSetAddress = JSON.parse(localStorage.getItem("userSetAddress"));
    	this.props.getOffers(userSetAddress.lat, userSetAddress.lng);
		this.setState({ loading: true });

		if (localStorage.getItem("enSPU") === "true") {
			//when selfpickup is on
			if (localStorage.getItem("userPreferredSelection") === "DELIVERY") {
				this.setState({
					selfpickup: false,
					isHomeDelivery: true,
					userPreferredSelectionDelivery: true,
				});
			}
		} else {
			//when selfpickup is off by admin
			this.setState({
				selfpickup: false,
				isHomeDelivery: true,
				userPreferredSelectionDelivery: true,
			});
		}

		if (localStorage.getItem("userPreferredSelection") === null) {
			localStorage.setItem("userPreferredSelection", "DELIVERY");
			localStorage.setItem("userSelected", "DELIVERY");
			this.setState({ userPreferredSelectionDelivery: true, isHomeDelivery: true });
		}
	}


	componentWillUnmount() {
		//
	}

	componentDidUpdate(prevProps) {
		if (this.props.offers !== prevProps.offers) {
			const offersArray = Object.values(this.props.offers);
			this.setState({ offers: offersArray, loading: false });
		}
	}

	render() {
		if (localStorage.getItem("hideDesktopView") !== "true" &&  window.innerWidth > 768) {
			return <Redirect to="/" />;
		}
		const { user, offers } = this.state;

		return (
			<React.Fragment>
				<Meta
					seotitle={"Offers"}
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
					title={"Offers"}
					disable_search={true}
				/>
				<div className="block-content block-content-full mb-30">
					{this.state.no_restaurants && (
						<div style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							height: '80vh'
						}}>
							<div style={{
							textAlign: 'center'
							}}>
							<h1>Coming Soon</h1>
							<p>Offer page is currently under construction.</p>
							</div>
						</div>
					)}
				</div>
				<div className="height-100-percent bg-white mb-50">
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
							{offers.length === 0 ? (
								<div className="bg-white cart-empty-block">
								<Swing>
									<div className="d-flex justify-content-center">
										<img
											className="cart-empty-img"
											src="/assets/img/various/cart-empty.png"
											alt={`No offers found`}
										/>
									</div>
								</Swing>
								<h2 className="cart-empty-text mt-50 text-center">
									No Offer Available.
								</h2>
								{this.state.alreadyRunningOrders && (
									<div
										className="auth-error ongoing-order-notify"
										style={{
											position: "fixed",
											bottom: "4.5rem",
										}}
									>
										<DelayLink to="/my-orders" delay={250} className="ml-2">
											{localStorage.getItem("ongoingOrderMsg")}{" "}
											<i className="si si-arrow-right ml-1" style={{ fontSize: "0.7rem" }} />
											<Ink duration="500" />
										</DelayLink>
									</div>
								)}

								<Footer active_cart={true} />
							</div>
							) : (
								offers.map((restaurant, index) => (
									<React.Fragment key={restaurant.id}>
										<LazyLoad>
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
																		<img src="/assets/img/various/star_green.svg" alt="rating" style={{ width: "1.4rem", textAlign:"center" }} />
																		<span className="styles_restaurantMetaRating__4H1gt">{restaurant.avgRating === "0" ? parseFloat(restaurant.rating).toFixed(1) : parseFloat(restaurant.avgRating).toFixed(1)} </span>
																	</div>
																	<div style={{ paddingLeft: "10px" }}>
																		<span className="styles_restaurantMetaDot__1AKA9" />
																		<span className="styles_restaurantMetaRating__4H1gt">{restaurant.delivery_time}{" "}{localStorage.getItem("homePageMinsText")}</span>
																	</div>
																</div>
																<div className="styles_restaurantCuisines__3lBL4">
																	<span>{restaurant.description}</span>
																</div>
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
										</LazyLoad>
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
	user: state.user.user,
	offers: state.offers.offers,
});

export default connect(
	mapStateToProps,
	{ getOffers }
)(Offers);
