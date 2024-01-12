import React, { Component } from "react";
import {
	getRestaurantInfo,
	getRestaurantItems,
	getRestaurantInfoForLoggedInUser,
	resetInfo,
} from "../../../services/items/actions";

import FloatCart from "../FloatCart";
import ItemList from "./ItemList";
import Meta from "../../helpers/meta";
import { Redirect } from "react-router";
import RestaurantInfo from "./RestaurantInfo";
import { connect } from "react-redux";
import Ink from "react-ink";
import Fade from "react-reveal/Fade";
import Flip from "react-reveal/Flip";
import { getSettings } from "../../../services/settings/actions";
import { addProduct, removeProduct } from "../../../services/cart/actions";
import { getAllLanguages, getSingleLanguageData } from "../../../services/languages/actions";
import Customization from "./Customization";
class Items extends Component {
	static contextTypes = {
		router: () => null,
	};
	state = {
		is_active: 1,
		loading: true,
		menuListOpen: false,
		menuClicked: false,
		clickedItem: null,
		update: true,
	};

	handleItemClick(clickedItemInfo) {
		this.setState({ clickedItem: clickedItemInfo });
		document.getElementsByTagName("html")[0].classList.add("noscroll");
		document.getElementsByTagName("body")[0].classList.add("noscroll");
	  }
	

	
	componentDidMount() {
		this.handleItemClick = this.handleItemClick.bind(this);
		this.props.getSettings();
		this.props.getAllLanguages();

		//if currentLocation doesnt exists in localstorage then redirect the user to firstscreen
		//else make API calls
		const { user } = this.props;
		let info = user.success
			? this.props.getRestaurantInfoForLoggedInUser(this.props.restaurant)
			: this.props.getRestaurantInfo(this.props.restaurant);
		if (info) {
			info.then((response) => {
				if (response) {
					if (response.payload.id) {
						//get items
						this.props.getRestaurantItems(this.props.restaurant);
					} else {
						//404, redirect to homepage
						this.context.router.history.push("/");
					}

					if (response.payload.delivery_type === 1) {
						localStorage.setItem("userSelected", "DELIVERY");
					}
					if (response.payload.delivery_type === 2) {
						localStorage.setItem("userSelected", "SELFPICKUP");
					}
					if (
						response.payload.delivery_type === 3 &&
						localStorage.getItem("userPreferredSelection") === "DELIVERY"
					) {
						// localStorage.setItem("userSelected", "DELIVERY");
					}
					if (
						response.payload.delivery_type === 3 &&
						localStorage.getItem("userPreferredSelection") === "SELFPICKUP"
					) {
						// localStorage.setItem("userSelected", "SELFPICKUP");
					}
					if (response.payload.is_active === "undefined") {
						this.setState({ loading: true });
					}
					if (response.payload.is_active === 1 || response.payload.is_active === 0) {
						this.setState({ loading: false });
						this.setState({ is_active: response.payload.is_active });
					}
				}
			});
		}

		if (localStorage.getItem("userSelected") === null) {
			localStorage.setItem("userSelected", "DELIVERY");
		}
		document.addEventListener("mousedown", this.handleClickOutside);
	}

	componentWillReceiveProps(nextProps) {
		if (!this.state.is_active) {
			document.getElementsByTagName("html")[0].classList.add("page-inactive");
		}
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

	handleMenuOpen = () => {
		this.setState({ menuListOpen: true });
		document.getElementsByTagName("html")[0].classList.add("noscroll");
		document.getElementsByTagName("body")[0].classList.add("noscroll");
	};

	handleClickOutside = (event) => {
		if (this.refs.menuItemBlock && !this.refs.menuItemBlock.contains(event.target)) {
			document.getElementsByTagName("html")[0].classList.remove("noscroll");
			document.getElementsByTagName("body")[0].classList.remove("noscroll");
			this.setState({ menuListOpen: false });
		}
	};

	//when menu-item clicked, go to that division and change menuListOpen =false
	handleMenuItemClick = (event) => {
		this.setState({ menuClicked: true });
		// console.log(event.currentTarget.dataset.name);
		const categoryBlock = document.getElementById(event.currentTarget.dataset.name);

		setTimeout(
			() => {
				categoryBlock.scrollIntoView();
				window.scrollBy(0, -40);
				this.setState({ menuListOpen: false });
				document.getElementsByTagName("html")[0].classList.remove("noscroll");
				document.getElementsByTagName("body")[0].classList.remove("noscroll");
			},
			this.state.menuClicked ? 0 : 500
		);
	};

    

	componentWillUnmount() {
		this.props.resetInfo();
		document.removeEventListener("mousedown", this.handleClickOutside);
		document.getElementsByTagName("html")[0].classList.remove("page-inactive");
		document.getElementsByTagName("html")[0].classList.remove("noscroll");
		document.getElementsByTagName("body")[0].classList.remove("noscroll");
	}
	componentDidUpdate(prevProps) {
		if (prevProps.cartProducts.length !== this.props.cartProducts.length) {
		  this.forceUpdate();
		}
	}
	forceStateUpdate = () => {
		setTimeout(() => {
			this.forceUpdate();
			if (this.state.update) {
				this.setState({ update: false });
			} else {
				this.setState({ update: true });
			}
		}, 100);
	};
	render() {
		const { addProduct, removeProduct, cartProducts, restaurant } = this.props;
		
		const isItemExistInCart = (item_id) => {
            let cc = cartProducts.find(cartItem => {
                return cartItem.id === item_id
            });
            if(cc !== undefined) {
                return true;
            }
            return false;
        }
		if (localStorage.getItem("hideDesktopView") !== "true" &&  window.innerWidth > 768) {
			return <Redirect to="/" />;
		}

		if (localStorage.getItem("storeColor") === null) {
			return <Redirect to={"/"} />;
		}

		return (
			<React.Fragment >
				<Meta
					seotitle={`${this.props.restaurant_info.name} | ${localStorage.getItem("seoMetaTitle")}`}
					seodescription={localStorage.getItem("seoMetaDescription")}
					ogtype="website"
					ogtitle={`${this.props.restaurant_info.name} | ${localStorage.getItem("seoOgTitle")}`}
					ogdescription={localStorage.getItem("seoOgDescription")}
					ogurl={window.location.href}
					twittertitle={`${this.props.restaurant_info.name} | ${localStorage.getItem("seoTwitterTitle")}`}
					twitterdescription={localStorage.getItem("seoTwitterDescription")}
				/>
				<div key={this.props.restaurant} style={{opacity: this.state.clickedItem && this.state.clickedItem.open 
                                                         ? 0.4: 1}}>
				
				
					<RestaurantInfo
						history={this.props.history}
						restaurant={this.props.restaurant_info}
						withLinkToRestaurant={false}
					/>
					<ItemList onItemClick={this.handleItemClick}
						data={this.props.restaurant_items}
						restaurant={this.props.restaurant_info}
						menuClicked={this.state.menuClicked}
						shouldItemsListUpdate={localStorage.getItem("cleared")}
						restaurant_backup_items={this.props.restaurant_backup_items}
					/>
				</div>
				{this.props.restaurant_info && this.props.restaurant_info.name && (
				<React.Fragment>
					<div className="pt-15 RestaurantLicence_wrapper__4BYQV">
						<div className="RestaurantLicence_licence__Oo5_q" aria-hidden="true">
						<img src="/assets/img/various/fssai.png" className="RestaurantLicence_image__2-5G_" alt="FSSAI" />
						{this.props.restaurant_info.certificate ? (
						<p className="RestaurantLicence_licenceText__2XEQc">{localStorage.getItem("certificateCodeText")} {this.props.restaurant_info.certificate}</p>):( <p className="RestaurantLicence_licenceText__2XEQc">License Applied</p>)}
						</div>
					</div>
					<div className="RestaurantFooterAddress_wrapper__16xqp" aria-hidden="true">
						<p className="RestaurantFooterAddress_name__deVKZ">{this.props.restaurant_info.name}</p>
						{this.props.restaurant_info.landmark && (<p className="mb-2">(Outlet:{this.props.restaurant_info.landmark})</p>)}
						{this.props.restaurant_info.address && (
						<div className="RestaurantFooterAddress_address__37uUA">
							<div className="RestaurantFooterAddress_icon__2Kjdg"></div>
							<i className="icon-markerDark mr-2 mt-1"></i><p className="text-uppercase">{this.props.restaurant_info.address}{this.props.restaurant_info.pincode &&("-")}{this.props.restaurant_info.pincode}</p>
						</div>
						)}
					</div>
				</React.Fragment>
				)}
				{/* Slide Up */}
				{this.state.clickedItem && (
					    
						<div  className="float-cart float-cart--open" style={{background:'white',color:'black',bottom:-16,
						height:'60%',width:'100%',left:0,zIndex:500,
						borderTopRightRadius:20,borderTopLeftRadius:20,
						borderBottomLeftRadius:0,borderBottomRightRadius:0,
						boxShadow:"2px 2px 5px 5px rgba(0, 0, 0, 0.3)",padding:0}}>
							
							<div>
							<img style={{borderTopRightRadius:20,borderTopLeftRadius:20,
						borderBottomLeftRadius:0,borderBottomRightRadius:0,width:'100%'}} 
						
						src={this.state.clickedItem.data.image}/>
						
						<div
						onClick={() => {this.handleItemClick()
							document.getElementsByTagName("html")[0].classList.remove("noscroll");
							document.getElementsByTagName("body")[0].classList.remove("noscroll");
							window.location.reload(true)}}	

						 className="d-flex justify-content-center align-items-center" style={{background:'white',width:30,height:30,
						position:'absolute',top:10,right:10,borderRadius:50,fontSize:20}}>
							<img   style={{width:18,height:18}}
						src="/assets/img/various/cross-icon.png"/>
						</div>
							</div>
							<div className="d-flex justify-content-between" style={{padding:10}}>
								<div>
									<div>
										{this.state.clickedItem.data.is_veg ?  (
										<img
											src="/assets/img/various/veg-icon-bg.png"
											alt="Veg"
											className="mr-1 veg-non-veg-badge"
										/>
									) : (
										<img
											src="/assets/img/various/non-veg-icon-bg.png"
											alt="Non-Veg"
											className="mr-1 veg-non-veg-badge"
										/>
									)
										}
									</div>
									<div className="item-name" style={{fontWeight: 'bold',
								fontSize: 18,
								lineHght: 20,
								letterSpacing: -0.3,
								color: 'rgba(2, 6, 12, 0.75)',
								fontFamily:'Basis Grotesque Pro',
								lineHeight:'20px'}}>
										{this.state.clickedItem.data.name}
									</div>

									<span style={{fontWeight: 400,
								fontSize: 18,
								letterSpacing: -0.3,
								color: 'rgba(2, 6, 12, 0.92)',
								fontFamily:'Basis Grotesque Pro'}}>
								{localStorage.getItem("hidePriceWhenZero") === "true" &&
								this.state.clickedItem.data.price === "0.00" ? null : (
									<React.Fragment>
										{this.state.clickedItem.data.old_price > 0 && (
											<span className="strike-text mr-1">
												{" "}
												{localStorage.getItem("currencySymbolAlign") ===
													"left" &&
													localStorage.getItem("currencyFormat")}{" "}
												{this.state.clickedItem.data.old_price}
												{localStorage.getItem("currencySymbolAlign") ===
													"right" &&
													localStorage.getItem("currencyFormat")}
											</span>
										)}

										<span>
											{localStorage.getItem("currencySymbolAlign") ===
												"left" &&
												localStorage.getItem("currencyFormat")}{" "}
											{this.state.clickedItem.data.price}
											{localStorage.getItem("currencySymbolAlign") ===
												"right" &&
												localStorage.getItem("currencyFormat")}
										</span>

										{this.state.clickedItem.data.old_price > 0 &&
										localStorage.getItem("showPercentageDiscount") ===
											"true" ? (
											<React.Fragment>
												<p
													className="price-percentage-discount mb-0"
													style={{
														color: localStorage.getItem(
															"cartColorBg"
														),
													}}
												>
													{parseFloat(
														((parseFloat(this.state.clickedItem.data.old_price) -
															parseFloat(this.state.clickedItem.data.price)) /
															parseFloat(this.state.clickedItem.data.old_price)) *
															100
													).toFixed(0)}
													{localStorage.getItem(
														"itemPercentageDiscountText"
													)}
												</p>
											</React.Fragment>
										) : (
											<br />
										)}
									</React.Fragment>
								)}
							</span>
							
								
								</div>
								<div>
								<div className={`item-actions pull-right pb-0 ${localStorage.getItem("showVegNonVegBadge") === "true" && this.state.clickedItem.data.is_veg !== null && this.state.clickedItem.data.image === null ? "mt-15" : null}`} 
								
								style={{top : this.state.clickedItem.data.image === null ? "5px" : null,top:116,right:16}}>
															<div
																className="btn-group btn-group-sm"
																role="group"
																aria-label="btnGroupIcons1"
																style={{height:38,width:120,
																	borderRadius: 10}}
															>
																{this.state.clickedItem.data.is_active ? (
																	<React.Fragment>
																		{isItemExistInCart(this.state.clickedItem.data.id) ? (
																		<React.Fragment>
																		{this.state.clickedItem.data.addons && Object.keys(this.state.clickedItem.data.addons) &&
																			this.state.clickedItem.data.addons && Object.keys(this.state.clickedItem.data.addons).length ? (
																				<React.Fragment>
																				<button
																					onClick={() => {
																						this.context.router.history.push("/cart");
																					}}
																					type="button"
																					className="btn btn-add-remove-v2 btn-list-item-m-v2"
																					style={{
																						color: localStorage.getItem("cartColor-bg"),
																						borderRadius:'10px 0px 0px 10px',
																						height:38,
																						
																					}}
																				>
																					<span className="btn-dec">-</span>
																					<Ink duration="500" />
																				</button>
																				<button type="button" className="btn btn-quantity-v2 btn-list-item-q-v2"
																				style={{height:38,
																					}}>
																					{cartProducts.find(
																						(cp) =>
																							cp.id ===
																							this.state.clickedItem.data.id
																					).quantity}
																				</button>
																				</React.Fragment>
																			) : (
																				<React.Fragment>
																				<button
																					type="button"
																					className="btn btn-add-remove-v2 btn-list-item-m-v2"
																					style={{
																						color: localStorage.getItem("cartColor-bg"),
																						borderRadius:'10px 0px 0px 10px',
																						height:38,
																						
																					}}
																					onClick={() => {
																						this.state.clickedItem.data.quantity = 1;
																						removeProduct(this.state.clickedItem.data);
																						this.forceStateUpdate();
																					}}
																				>
																					<span className="btn-dec">-</span>
																					<Ink duration="500" />
																				</button>
																				<button type="button" className="btn btn-quantity-v2 btn-list-item-q-v2"
																				style={{height:38,
																					}}>
																					{cartProducts.find(
																						(cp) =>
																							cp.id ===
																							this.state.clickedItem.data.id
																					).quantity}
																				</button>
																				</React.Fragment>
																			)}
																			{this.state.clickedItem.data.addons && Object.keys(this.state.clickedItem.data.addons) &&
																			this.state.clickedItem.data.addons && Object.keys(this.state.clickedItem.data.addons).length ? (
																				<Customization
																					product={this.state.clickedItem.data}
																					addProduct={addProduct}
																					cartProducts={cartProducts}
																					forceUpdate={this.forceStateUpdate}
																					store_type={this.props.restaurant.store_type}
																				/>
																			) : (
																				<React.Fragment>
																				<button
																					type="button"
																					className="btn btn-add-remove-v2 btn-list-item-p-v2"
																					style={{
																						color: localStorage.getItem("cartColor-bg"),
																						borderRadius:'0px 10px 10px 0px',
																						height:38,
																						
																					}}
																					onClick={() => {
																						addProduct(this.state.clickedItem.data);
																						this.forceStateUpdate();
																					}}
																					>
																					<span className="btn-inc">+</span>
																					<Ink duration="500" />
																				</button>
																				</React.Fragment>
																			)}
																		</React.Fragment>
																		):(
																		<React.Fragment>
																			{this.state.clickedItem.data.addons && Object.keys(this.state.clickedItem.data.addons) &&
																			this.state.clickedItem.data.addons && Object.keys(this.state.clickedItem.data.addons).length ? (
																				<Customization
																					product={this.state.clickedItem.data}
																					addProduct={addProduct}
																					cartProducts={cartProducts}
																					forceUpdate={this.forceStateUpdate}
																					store_type={this.props.restaurant.store_type}
																				/>
																			) : (
																			<button
																				type="button"
																				className=" btn-add-remove-v2 btn-custom-add btn-list-item-add-v2"
																				style={{
																					color: localStorage.getItem("cartColor-bg"),
																					outline:'none'
																				}}
																				onClick={() => {
																					this.state.clickedItem.data.quantity = 1;
																					addProduct(this.state.clickedItem.data);
																					this.forceStateUpdate();
																				}}
																			>
																				Add
																			</button>
																			)}
																		</React.Fragment>
																		)}
																	</React.Fragment>
																	
																) : (
																	<div className="u3m9n">
																		<span className="itemNotAvail">{localStorage.getItem("cartItemNotAvailable")}</span>
																	</div>
																)}
															</div>
															{this.state.clickedItem.data.addons && Object.keys(this.state.clickedItem.data.addons) && this.state.clickedItem.data.addons && Object.keys(this.state.clickedItem.data.addons).length > 0 && (
																<React.Fragment>
																	<span
																		className="customizable-item-text d-block text-center"
																	>
																		{/* {localStorage.getItem("customizableItemText")} */}
																	</span>
																	<br />
																</React.Fragment>
															)}
														</div>
								</div>
							</div>
							{this.state.clickedItem.data.desc !== null ? (
																<div className="item-desc-short" 
																style={{padding:10}}
																>
																	
																	<div 
																			dangerouslySetInnerHTML={{
																				__html: this.state.clickedItem.data.desc,
																			}}
																		/>
																</div>
															) : null}
							
						</div>
						
       			)}
				<div>
				
				</div>

				{/* Floating Cart */}
				
				<div>
					{!this.state.loading && (
						<React.Fragment>
							{this.state.is_active ? (
								<FloatCart store_type = {this.props.restaurant_info.store_type} />
							) : (
								<div className="auth-error no-click">
									<div className="error-shake">{localStorage.getItem("notAcceptingOrdersMsg")}</div>
								</div>
							)}
						</React.Fragment>
					)}
				</div>

				{/* Floating Menu Button */}
				{
					this.props.restaurant_info.store_type && this.props.restaurant_info.store_type.store_ui === "restaurant" &&
					<React.Fragment>
				<div className="menu-list-container">
					{this.state.menuListOpen ? (
						<React.Fragment>
							<div className="menu-open-backdrop" />
							<div className="menu-items-block" ref="menuItemBlock">
								<div className="menu-item-block-inner">
									{this.props.restaurant_items.items && (
										<React.Fragment>
											{Object.keys(this.props.restaurant_items.items).map((category, index) => (
												<div
													className="menu-item-block-single"
													key={category}
													onClick={this.handleMenuItemClick}
													data-name={category + index}
												>
													<Fade bottom duration={150 * index}>
														<div className="menu-item-block-single-name">{category}</div>
														<div className="menu-item-block-single-quantity">
															{
																Object.keys(this.props.restaurant_items.items[category])
																	.length
															}
														</div>
													</Fade>
												</div>
											))}
										</React.Fragment>
									)}
								</div>
							</div>
						</React.Fragment>
					) : (
						<div
							className="menu-button-block-main"
							onClick={this.handleMenuOpen}
							style={{ bottom: this.props.cartTotal.productQuantity > 0 ? "5rem" : "2rem" }}
						>
							<Flip bottom>
								<button
									className="btn btn-menu-list"
									style={{ backgroundColor: localStorage.getItem("storeColor") }}
								>
									<i className="icon-menu mr-1" /> {localStorage.getItem("itemsMenuButtonText")}
									<Ink duration="500" hasTouch={false} />
								</button>
							</Flip>
						</div>
					)}
				</div>
				</React.Fragment>
				}
				{this.props.restaurant_info.store_type && this.props.restaurant_info.store_type.name === "Resturant V2" ? (
				<React.Fragment>
				<div className="menu-list-container">
					{this.state.menuListOpen ? (
						<React.Fragment>
							<div className="menu-open-backdrop" />
							<div className="menu-items-block" ref="menuItemBlock">
								<div className="menu-item-block-inner">
									{this.props.restaurant_items.items && (
										<React.Fragment>
											{Object.keys(this.props.restaurant_items.items).map((category, index) => (
												<div
													className="menu-item-block-single"
													key={category}
													onClick={this.handleMenuItemClick}
													data-name={category + index}
												>
													<Fade bottom duration={150 * index}>
														<div className="menu-item-block-single-name">{category}</div>
														<div className="menu-item-block-single-quantity">
															{
																Object.keys(this.props.restaurant_items.items[category])
																	.length
															}
														</div>
													</Fade>
												</div>
											))}
										</React.Fragment>
									)}
								</div>
							</div>
						</React.Fragment>
					) : (
						<div
							className="menu-button-block-main-v2"
							onClick={this.handleMenuOpen}
							style={{ bottom: this.props.cartTotal.productQuantity > 0 ? "5rem" : "2rem" }}
						>
							
							<Flip bottom>
								<button
									className="btn btn-menu-list-v2"
									// localStorage.getItem("storeColor")
									style={{ backgroundColor:"black",width:72,height:72 }}
								>
									<div className="mb-2">
									<i className="icon-menu" />
									</div>
									<div style={{fontSize:12,fontWeight:600}}>
									{localStorage.getItem("itemsMenuButtonText")}
									{}
									</div>
									 
									<Ink duration="500" hasTouch={false} />
								</button>
							</Flip>
						</div>
					)}
				</div>
				</React.Fragment>
				):(
					<React.Fragment>
						
					</React.Fragment>
				)}
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	restaurant_info: state.items.restaurant_info,
	restaurant_items: state.items.restaurant_items,
	cartTotal: state.total.data,
	settings: state.settings.settings,
	languages: state.languages.languages,
	language: state.languages.language,
	user: state.user.user,
	restaurant_backup_items: state.items.restaurant_backup_items,
	cartProducts: state.cart.products,
});

export default connect(
	mapStateToProps,
	{
		getRestaurantInfo,
		getRestaurantItems,
		getSettings,
		getAllLanguages,
		getSingleLanguageData,
		getRestaurantInfoForLoggedInUser,
		resetInfo,
		addProduct, 
		removeProduct
	}
)(Items);



