import React, { Component } from "react";

import BackWithSearch from "../../Elements/BackWithSearch";
import ContentLoader from "react-content-loader";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import StoreCoupons from "./StoreCoupons"
import { setFavoriteRest } from "../../../../services/items/actions";
import { Card, Icon } from "@material-ui/core";
import Ink from "react-ink";
import WebShare from "../../WebShare";

class RestaurantInfo extends Component {
	state = {
		withLinkToRestaurant: false,
		isFavorite: false,
		showTooltip: false,
	};

	componentDidMount() {
		this.setState({ withLinkToRestaurant: this.props.withLinkToRestaurant });

		if (this.props.history.location.state && this.props.history.location.state.fromExplorePage) {
			this.setState({ withLinkToRestaurant: this.props.history.location.state.fromExplorePage });
		}

		this.registerScrollEvent();
	}

	componentWillUnmount() {
		this.removeScrollEvent();
	}

	toggleTooltip = () => {
		this.setState({ showTooltip: !this.state.showTooltip });
	  }
	

	fixedRestaurantInfo = (hidden) => {
		if (this.child) {
			if (hidden) {
				this.child.heading.classList.add("hidden");
			} else {
				this.child.heading.classList.remove("hidden");
			}
		}
	};

	registerScrollEvent() {
		window.addEventListener("scroll", this.scrollFunc);
	}
	removeScrollEvent() {
		window.removeEventListener("scroll", this.scrollFunc);
	}
	scrollFunc = () => {
		this.setState({ showTooltip: false });
		if (document.documentElement.scrollTop > 55) {
			let hidden = false;
			this.fixedRestaurantInfo(hidden);
		}
		if (document.documentElement.scrollTop < 55) {
			let hidden = true;
			this.fixedRestaurantInfo(hidden);
		}
	};

	setFavoriteRestaurant = () => {
		console.log("clciking")
		const { restaurant_info, user } = this.props;
		if (user.success) {
			if (restaurant_info.is_favorited) {
				this.refs.heartIcon.classList.remove("is-active");
			} else {
				this.refs.heartIcon.classList.add("is-active");
			}
			this.props.setFavoriteRest(user.data.auth_token, restaurant_info.id);
		}
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.restaurant_info !== prevState.restaurant_info) {
			return {
				data: nextProps.restaurant_info,
			};
		} else {
			return null;
		}
	}
	static contextTypes = {
		router: () => null,
	};
	render() {
		const { history, restaurant, user } = this.props;
		return (
			<React.Fragment>
			{
				this.props.restaurant.store_type && (this.props.restaurant.store_type.store_ui === "restaurant" || this.props.restaurant.store_type.store_ui === "meet") &&
				<React.Fragment>
				<div className="bg-white">
					<BackWithSearch
						ref={(node) => {
							this.child = node;
						}}
						history={history}
						boxshadow={false}
						has_restaurant_info={true}
						restaurant={restaurant}
						disable_search={true}
						homeButton={true}
						shareButton={true}
					/>
					{restaurant.length === 0 ? (
						<div style={{ paddingTop:"35px" }}>
						<ContentLoader
							className="custom-gradle-bg"
							height={170}
							width={400}
							speed={1.2}
							primaryColor="#f3f3f3"
							secondaryColor="#ecebeb"
						>
							<rect x="20" y="70" rx="4" ry="4" width="80" height="78" />
							<rect x="144" y="85" rx="0" ry="0" width="115" height="18" />
							<rect x="144" y="115" rx="0" ry="0" width="165" height="16" />
						</ContentLoader>
						</div>
					) : (
						<React.Fragment>
							<Link
								to={"../../stores/" + restaurant.slug}
								className={`store-info-itemspage ${this.state.withLinkToRestaurant ? "" : "no-click"}`}
							>
								<div style={{ paddingTop:"51px" }}>
									<div className="custom-gradle-bg">
										<div className="row">
											<div className={`${restaurant.is_appview === 0 ? "col-8" : "col-10"}`}>
												<div className="ml-5 px-15 mt-5 w-100">
													<h4 className="res-info-name mb-5 text-dark break-word">{restaurant.name}</h4>
													<div className="font-size-sm truncate-text res-info-desc">
														{restaurant.description}
													</div>
													<div className="font-size-sm truncate-text res-info-desc">
														{restaurant.landmark} {restaurant.distance && (",")} {restaurant.distance && restaurant.distance.toFixed(1) (" Kms")}
													</div>
													{restaurant.is_pureveg === 1 && (
														<p className="mb-0">
															<span className="font-size-sm pr-1 res-info-desc">
																{localStorage.getItem("pureVegText")}
															</span>
															<img
																src="/assets/img/various/pure-veg.png"
																alt="PureVeg"
																style={{ width: "20px" }}
															/>
														</p>
													)}
												</div>
											</div>
											{restaurant.is_appview === 0 ? (
											<div className="col-4">
												<div className="mt-5 pb-15 mr-15">
													<button className="RestaurantRatings_wrapper__2294i">
														<span className="RestaurantRatings_avgRating__1TOWY">
														<img src="/assets/img/various/ratings-icon-v2.png"
													style={{width:20,height:20,marginBottom:2}} />
															<span className="ml-1">{restaurant.avgRating === "0" ? (
															<React.Fragment>
																{restaurant.rating}
															</React.Fragment>
														) : (
															<Link to={"/reviews/" + restaurant.slug} style={{ display: "contents" }} className="yes-click">
															{restaurant.avgRating}
															</Link>
														)}</span>
														</span>
														<span className="RestaurantRatings_totalRatings__3d6Zc">100+ ratings</span>
													</button>
												</div>
											</div>
											):(
												<div className="col-2">
													{user.success && (
														<span className="favStore" onClick={this.setFavoriteRestaurant}>
															<div
																ref="heartIcon"
																className={`heart ${restaurant.is_favorited && "is-active"}`}
															/>
														</span>
													)}
												</div>
											)}
										</div>
										<hr className="mr-15 ml-15 res-ino-division-hr" />
										{restaurant.is_appview === 0 ? (
										<div className="col-12 res-info-time-wrap" style={{ display: 'flex', alignItems: 'center' }}>
											<div className="float-left col-4 p-0 store-distance-block">
												<i className="si si-clock" /> {restaurant.delivery_time}{" "}
												{localStorage.getItem("homePageMinsText")}
											</div>
											<div className="d-flex col-6 p-0 store-avgprice-block text-lowercase">
												<i className="si si-wallet mr-2" />{" "}
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
											<div className="col">
												{user.success && (
													<span className="favStore" onClick={this.setFavoriteRestaurant}>
														<div
															ref="heartIcon"
															className={`new heart ${restaurant.is_favorited && "is-active"}`}
														/>
													</span>
												)}
											</div>
										</div>
										):(
										<div className="container">
											<div className="row">
												<div className="col-4 text-center">
												<span className="icon-star"></span><span className="ml-1 new-time-wrap">{restaurant.avgRating === "0" ? (
													<React.Fragment>
														{restaurant.rating}
													</React.Fragment>
												) : (
													<React.Fragment>
													<Link to={"/reviews/" + restaurant.slug} style={{ display: "contents" }} className="yes-click new-time-wrap"> {restaurant.avgRating}
													</Link>
													</React.Fragment>
												)}</span>
												<p className="mb-1 res-info-new-wraper">100+ ratings</p>
												</div>
												<div className="col-4 text-center">
												<span className="new-time-wrap">{restaurant.delivery_time}{" "}{localStorage.getItem("homePageMinsText")}</span>
												<p className="mb-1 res-info-new-wraper">Delivery Time</p>
												</div>
												<div className="col-4 text-center">
												<span>{localStorage.getItem("currencySymbolAlign") === "left" && (
														<React.Fragment>
															<span className="new-time-wrap">
															{localStorage.getItem("currencyFormat")}
															{restaurant.price_range}{" "}
															</span>
														</React.Fragment>
													)}
													{localStorage.getItem("currencySymbolAlign") === "right" && (
														<React.Fragment>
															<span className="new-time-wrap">
															{restaurant.price_range}
															{localStorage.getItem("currencyFormat")}{" "}
															</span>
														</React.Fragment>
													)}
												</span>
												<p className="mb-1 res-info-new-wraper">{localStorage.getItem("homePageForTwoText")}</p>
												</div>
											</div>
										</div>
										)}
										<hr className="mr-15 ml-15 res-ino-division-hr" />
									</div>
								</div>
							</Link>
							{/* {user.success && (
								<span onClick={this.setFavoriteRestaurant}>
									<div
										ref="heartIcon"
										className={`heart ${restaurant.is_favorited && "is-active"}`}
									/>
								</span>
							)} */}
						</React.Fragment>
					)}
				</div>
				<StoreCoupons coupons={restaurant.coupons} restaurant={restaurant}/>
				{restaurant.custom_message !== "<p><br></p>" &&
					restaurant.custom_message !== "null" &&
					(restaurant.custom_message !== "" && (
						<div
							style={{
								position: "relative",
								background: "#fff",
							}}
							dangerouslySetInnerHTML={{
								__html: restaurant.custom_message,
							}}
						/>
					))}
			</React.Fragment>
			
			}
			
			{
				this.props.restaurant.store_type &&  this.props.restaurant.store_type.name === "Resturant V2" &&
				<React.Fragment>
				<div style={bgStyle} className="">
					{/* <BackWithSearch
						ref={(node) => {
							this.child = node;
						}}
						history={history}
						boxshadow={false}
						has_restaurant_info={true}
						restaurant={restaurant}
						disable_search={true}
						shareButton={true}
					/> */}
					<button
						type="button"
						className={`btn search-navs-btns custom-bg`}
						style={{ background:'none' }}
						onClick={() => {
							setTimeout(() => {
							this.context.router.history.goBack();
						}, 200);
					}}
						>
					{/* <i className="si si-arrow-left" /> */}
					<svg className="uHGrw _17EkR" viewBox="0 0 32 32" height="18" width="18"><path d="M3.333 14.984l28.667-0v2.097l-0.16 0.006h-28.506l-0.16-0.16v-1.782l0.16-0.16zM1.114 14.986l10.079-10.079 0.121-0.108 1.465 1.467-0.101 0.127-10.079 10.079h-0.226l-1.26-1.26v-0.226zM12.679 25.676l0.108 0.117-1.468 1.484-0.126-0.115-10.079-10.079v-0.226l1.26-1.26h0.226l10.079 10.079zM3.268 12.87l0.272 0.116-0.022 6.125-0.272 0.114-3.245-3.18 0.111-0.112 3.157-3.062z"></path></svg>
					
					</button>
					{restaurant.length === 0 ? (
						<div style={{ paddingTop:"35px" }}>
						<ContentLoader
							className="custom-gradle-bg"
							height={170}
							width={400}
							speed={1.2}
							primaryColor="#f3f3f3"
							secondaryColor="#ecebeb"
						>
							<rect x="20" y="70" rx="4" ry="4" width="80" height="78" />
							<rect x="144" y="85" rx="0" ry="0" width="115" height="18" />
							<rect x="144" y="115" rx="0" ry="0" width="165" height="16" />
						</ContentLoader>
						</div>
					) : (
						<React.Fragment>
							<Link
								to={"../../stores/" + restaurant.slug}
								className={`store-info-itemspage ${this.state.withLinkToRestaurant ? "" : "no-click"}`}
							>
								
							</Link>
							<div className="res-info-page">
									<div className="custom-gradle-bg" style={cardStyles}>
										
										<div className="row">
											<div className={`${restaurant.is_appview === 0 ? "col-8" : "col-10"}`}>
												<div className="ml-5 px-15 mt-15 w-100">
													<h4 className="res-info-name" style={{margin:0}}>{restaurant.name}</h4>
													
													{/* <div className="font-size-sm truncate-text res-info-desc">
														{restaurant.landmark} {restaurant.distance && (",")} {restaurant.distance && restaurant.distance.toFixed(1) (" Kms")}
													</div> */}
													{restaurant.is_pureveg === 1 && (
														<p className="mb-0">
															<span className="font-size-sm pr-1 res-info-desc">
																{localStorage.getItem("pureVegText")}
															</span>
															<img
																src="/assets/img/various/pure-veg.png"
																alt="PureVeg"
																style={{ width: "20px" }}
															/>
														</p>
													)}
												</div>
											</div>
											{restaurant.is_appview === 0 ? (
												<>
											<div className="col-4 d-flex" >
												<WebShare link={window.location.href} store_type={restaurant.store_type}/>
												<div className="d-flex align-items-center">
												{user.success && (
													<span className="favStore" onClick={this.setFavoriteRestaurant}>
														{/* <div
															ref="heartIcon"
															className={`new heart ${restaurant.is_favorited && "is-active"}`}
															style={{right:-8,top:-24}}
														/> */}
														{
															restaurant.is_favorited ?

															<img
																		src="/assets/img/various/icon_heart_selected.png"
																		alt="Veg"
																		ref="heartIcon"
																		style={{ width:20 }}
																		className={`new heart-v2 ${restaurant.is_favorited && "is-active"}`}
																	/>
															
																	:

															<img
																		src="/assets/img/various/icon_heart_unselected.png"
																		alt="Veg"
																		ref="heartIcon"
																		style={{ width:20 }}
																		className={`new heart-v2 ${restaurant.is_favorited && "is-active"}`}
																	/>
														}
														
													</span>
												)}
												</div>

												{/* <div className="mt-5 pb-15 mr-15">
													<button className="RestaurantRatings_wrapper__2294i">
														<span className="RestaurantRatings_avgRating__1TOWY">
															<span className="icon-star"></span><span className="ml-1">{restaurant.avgRating === "0" ? (
															<React.Fragment>
																{restaurant.rating}
															</React.Fragment>
														) : (
															<Link to={"/reviews/" + restaurant.slug} style={{ display: "contents" }} className="yes-click">
															{restaurant.avgRating}
															</Link>
														)}</span>
														</span>
														<span className="RestaurantRatings_totalRatings__3d6Zc">100+ ratings</span>
													</button>
												</div> */}
											</div>
												</>
											):(
												<div className="col-2">
													{user.success && (
														<span className="favStore" onClick={this.setFavoriteRestaurant}>
															{
															restaurant.is_favorited ?

															<img
																		src="/assets/img/various/icon_heart_selected.png"
																		alt="Veg"
																		ref="heartIcon"
																		style={{ width:20 }}
																		className={`new heart-v2 ${restaurant.is_favorited && "is-active"}`}
																	/>
															
																	:

															<img
																		src="/assets/img/various/icon_heart_unselected.png"
																		alt="Veg"
																		ref="heartIcon"
																		style={{ width:20 }}
																		className={`new heart-v2 ${restaurant.is_favorited && "is-active"}`}
																	/>
														}
															
														</span>
													)}
												</div>
											)}
										</div>
										<div className="d-flex align-items-center RestaurantRatings_avgRating__1TOWY" style={{margin: '0px 16px',border:'none'}}>
															<img src="/assets/img/various/ratings-icon-v2.png"
													style={{width:20,height:20,marginBottom:2}} />
													<div className="ml-1 mr-2" style={{color:'black'}}>{restaurant.avgRating === "0" ? (
															<React.Fragment className="res-info-ratings">
																{restaurant.rating}
															</React.Fragment>
														) : (
															<Link to={"/reviews/" + restaurant.slug} style={{ display: "contents" }} className="yes-click res-info-ratings">
															{restaurant.avgRating}
															</Link>
														)}</div>
														<div className="res-info-ratings" style={{color:'black'}}>(100+ ratings)</div> 
														<div style={{position:'relative'}}>

														<img    onClick={this.toggleTooltip}
													src="/assets/img/various/info-icon.png"
													alt="Non-Veg"
													className="mr-1 veg-non-veg-badge"
													style={{background:'white',width:20,height:20,marginLeft:5,marginBottom:3}}
												/>
												{
													this.state.showTooltip && 
												<span style={{position:'absolute',top:20,left:0,background:'black',color:'white',width:200,padding:10,borderRadius:20}}>
													<span className="d-flex  align-items-center">
													<span>Ratings are verified and based on recent orders </span>
													<div  onClick={this.toggleTooltip} className="d-flex justify-content-center align-items-center" style={{background:'gray',borderRadius:'50%',width:20,height:20,
													padding:5,textAlign:'center',fontWeight:500,fontSize:12}}>
																X
													</div>
													</span>	
												</span>
												}
														</div>

														<div  style={{color:'black'}} className="ml-2 store-avgprice-block text-lowercase res-info-ratings">
												
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
										{/* {console.log(restaurant,"checkoutt")} */}
										<div className="res-info-desc">
											{restaurant.description}
										</div>
										<hr className="res-ino-division-hr" />
										{restaurant.is_appview === 0 ? (
										<div className="col-12 res-info-time-wrap" 
										style={{ display: 'flex', alignItems: 'center',margin:'0px 20px',padding:'4px 0px' }}>

											<div style={{display: 'flex',flexDirection: 'column',alignItems: 'center'}}>
												<div style={{width:7,height:7,borderRadius:50,background:'rgb(196, 196, 196)'}}></div>
												<div style={{width:1,height:23,background:'rgb(196, 196, 196)'}}></div>
												<div style={{width:7,height:7,borderRadius:50,background:'rgb(196, 196, 196)'}}></div>
											</div>

											<div style={{display: 'flex',flexDirection: 'column',justifyContent:'space-between',marginLeft:12,paddingRight:16,width:'100%'}}>
												<div className="d-flex align-items-center" style={{marginBottom:7}}>
													<div className="res-info-header" style={{marginRight:15}} >
														Outlet
													</div>
													<div className="res-info-header-text">
														{restaurant.address}
													</div>
												</div>
												<div className="d-flex align-items-center">
													<div className="res-info-header">
													{restaurant.delivery_time}{" "}
												{localStorage.getItem("homePageMinsText")}
													</div>
													<div className="res-info-header-text">
														Delivery to Madhapur
													</div>
												</div>
											</div>
											
											
											{/* <div className="float-left col-4 p-0 store-distance-block">
												<i className="si si-clock" /> {restaurant.delivery_time}{" "}
												{localStorage.getItem("homePageMinsText")}
											</div>
											<div className="d-flex col-6 p-0 store-avgprice-block text-lowercase">
												<i className="si si-wallet mr-2" />{" "}
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
											</div> */}
											{/* <div className="col">
												{user.success && (
													<span className="favStore" onClick={this.setFavoriteRestaurant}>
														<div
															ref="heartIcon"
															className={`new heart ${restaurant.is_favorited && "is-active"}`}
														/>
													</span>
												)}
											</div> */}
										</div>
										):(
										<div className="container">
											<div className="row">
												<div className="col-4 text-center">
												<img src="/assets/img/various/ratings-icon-v2.png"
													style={{width:20,height:20,marginBottom:2}} />
												<span className="ml-1 new-time-wrap">{restaurant.avgRating === "0" ? (
													<React.Fragment>
														{restaurant.rating}
													</React.Fragment>
												) : (
													<React.Fragment>
													<Link to={"/reviews/" + restaurant.slug} style={{ display: "contents" }} className="yes-click new-time-wrap"> {restaurant.avgRating}
													</Link>
													</React.Fragment>
												)}</span>
												<p className="mb-1 res-info-new-wraper">100+ ratings</p>
												</div>
												<div className="col-4 text-center">
												<span className="new-time-wrap">{restaurant.delivery_time}{" "}{localStorage.getItem("homePageMinsText")}</span>
												<p className="mb-1 res-info-new-wraper">Delivery Time</p>
												</div>
												<div className="col-4 text-center">
												<span>{localStorage.getItem("currencySymbolAlign") === "left" && (
														<React.Fragment>
															<span className="new-time-wrap">
															{localStorage.getItem("currencyFormat")}
															{restaurant.price_range}{" "}
															</span>
														</React.Fragment>
													)}
													{localStorage.getItem("currencySymbolAlign") === "right" && (
														<React.Fragment>
															<span className="new-time-wrap">
															{restaurant.price_range}
															{localStorage.getItem("currencyFormat")}{" "}
															</span>
														</React.Fragment>
													)}
												</span>
												<p className="mb-1 res-info-new-wraper">{localStorage.getItem("homePageForTwoText")}</p>
												</div>
											</div>
										</div>
										)}
										<hr className="res-ino-division-hr" />
										<div className="d-flex align-items-center" style={{margin:'0px 16px',paddingBottom:16}} >
										<img style={{height:20,width:20,marginRight:8}} 
										src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_40,h_40/v1648635511/Delivery_fee_new_cjxumu" 
										alt="DISTANCE_FEE_NON_FOOD_LM" aria-hidden="true" class="sc-gzzPqb fWNlIS"/>
										<span className="res-info-header" style={{color:'rgba(2, 6, 12, 0.6)'}}>
											{restaurant.distance ? <>{restaurant.distance.toFixed(1)} (" Kms")</> : <>3.9 kms</>}
										</span>
										
										<span className="res-info-header-text">
											<span>|</span> {restaurant.delivery_charges ? <>{localStorage.getItem("currencyFormat")}{restaurant.delivery_charges} Delivery fee will apply</> : <>{localStorage.getItem("currencyFormat")}51 Delivery fee will apply</>}
										</span>
											{/* {restaurant.landmark} {restaurant.distance && (",")}  */}
										</div>
									</div>
								</div>
							{/* {user.success && (
								<span onClick={this.setFavoriteRestaurant}>
									<div
										ref="heartIcon"
										className={`heart ${restaurant.is_favorited && "is-active"}`}
									/>
								</span>
							)} */}
						</React.Fragment>
						
					)}
				</div>
				
				<div style={{margin:"16px 16px",boxShadow:'rgb(184 184 184 / 20%) 0px 2px 8px 0px',
                                 border:'1px solid #e0e0e0',borderRadius:20}}>
					<StoreCoupons coupons={restaurant.coupons} restaurant={restaurant}/>
				</div>
				{restaurant.custom_message !== "<p><br></p>" &&
					restaurant.custom_message !== "null" &&
					(restaurant.custom_message !== "" && (
						<div
							style={{
								position: "relative",
								background: "#fff",
							}}
							dangerouslySetInnerHTML={{
								__html: restaurant.custom_message,
							}}
						/>
					))}
					<div class="res-info-menu-head-cont">
						<div class="res-info-menu-head-text">
						<img
											src="/assets/img/various/menu-icon.png"
											alt="Veg"
											style={{height:20}}
										/>
						</div>
					</div>
			</React.Fragment>
			
			}
			</React.Fragment>
			
		);
	}
}

const bgStyle = {
	background: "linear-gradient(white, #DDDDE4)",
	padding:18,
	borderRadius:'0px 0px 35px 35px'
  };
const cardStyles = {
	borderRadius:20,
	background:'white',
  };
const mapStateToProps = (state) => ({
	restaurant_info: state.items.restaurant_info,
	user: state.user.user,
});

export default connect(
	mapStateToProps,
	{ setFavoriteRest }
)(RestaurantInfo);





