import React, { Component, useState } from "react";
import { addProduct, removeProduct } from "../../../../services/cart/actions";

import Collapsible from "react-collapsible";
import ContentLoader from "react-content-loader";
import Customization from "../Customization";

import Ink from "react-ink";
import ItemBadge from "./ItemBadge";
import { Link } from "react-router-dom";

import RecommendedItems from "./RecommendedItems";
import ShowMore from "react-show-more";

import { connect } from "react-redux";
import { searchItem, clearSearch } from "../../../../services/items/actions";

import ProgressiveImage from "react-progressive-image";
import LazyLoad from "react-lazyload";
import { debounce } from "../../../helpers/debounce";
import MeatCategories from "../MeatCategories";

class ItemList extends Component {

	static contextTypes = {
		router: () => null,
	};
	state = {
		update: true,
		items_backup: [],
		searching: false,
		data: [],
		filterText: null,
		filter_items: [],
		items: [],
		queryLengthError: false,
		isVegActive: false,
		isNonVegActive: false,
		isBestSeller: false,
		divRef: React.createRef(),
		isSticky: false,
		showBestSellerButton: false,
		activeCategory:null,
		categoryRefs: [],
	};

	
	
	handleShowBestSeller(){
		if(this.state.showBestSellerButton == false){
			for(let item in this.state.data.recommended){
				if(this.state.data.recommended[item].is_popular == 1){
					this.setState({ showBestSellerButton: true });
					return
				}

			}
			for(let category in this.state.data.items){
				for(let item in this.state.data.items[category]){
					if(this.state.data.items[category][item].is_popular == 1){
						this.setState({ showBestSellerButton: true });
						return
					}
				}

			}

		}
	}

	

	componentDidMount() {
		
		document.addEventListener("mousedown", this.handleClickOutside);

	}
	componentDidMount() {
		this.originalData = this.state.data; // Store original data
		this.handleShowBestSeller(); // Call the function when the component mounts
		const div = this.state.divRef.current;
		if (div != null) {
			this.setState({ initialOffsetTop: div.offsetTop });
		}

		window.addEventListener('scroll', this.handleScroll);
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.data) {
		  this.handleShowBestSeller();
		}
	  }

	componentWillUnmount() {
		window.removeEventListener('scroll',

			this.handleScroll);
		this.setState({ initialOffsetTop: null });
	}

	handleScroll = () => {
		const visibleCategory = this.state.categoryRefs.find(
			(ref) => ref.getBoundingClientRect().top <= window.innerHeight &&
			ref.getBoundingClientRect().bottom > 0
		  );
		  this.setState({
			activeCategory: visibleCategory ? visibleCategory.dataset.category : null,
		  });
		const div = this.state.divRef.current;
		if (div != null) {
			let isScrolledPastDiv = div.offsetTop <= window.scrollY;
			if (div.offsetTop === 0 && window.scrollY <= this.state.initialOffsetTop) {
				isScrolledPastDiv = !isScrolledPastDiv
			}
			if (this.state.isSticky && !isScrolledPastDiv) {
				console.log("up")
				this.setState({ isSticky: false });
				this.setState({ activeCategory: "" });
				
			} else if (!this.state.isSticky && isScrolledPastDiv) {
				console.log("down")
				this.setState({ isSticky: true });
			}
		}
	};

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

	searchForItem = (e) => {
		this.searchItem(e.target.value);
	};

	searchItem = debounce((event) => {
		if (event.length >= 3) {
			this.setState({ filterText: event });
			this.props.searchItem(
				this.state.items,
				event,
				localStorage.getItem("itemSearchText"),
				localStorage.getItem("itemSearchNoResultText")
			);
			this.setState({ searching: true, queryLengthError: false });
		} else {
			this.setState({ queryLengthError: true });
		}
		if (event.length === 0) {
			this.setState({ filterText: null, queryLengthError: false });
			// console.log("Cleared");

			this.props.clearSearch(this.state.items_backup);
			this.setState({ searching: false });
		}
	}, 500);

	inputFocus = () => {
		this.refs.searchGroup.classList.add("search-shadow-light");
	};

	handleClickOutside = (event) => {
		if (this.refs.searchGroup && !this.refs.searchGroup.contains(event.target)) {
			this.refs.searchGroup.classList.remove("search-shadow-light");
		}
	};

	componentWillUnmount() {
		document.removeEventListener("mousedown", this.handleClickOutside);
	}

	static getDerivedStateFromProps(props, state) {
		if (props.data !== state.data) {
			if (state.filterText !== null) {
				return {
					data: props.data,
				};
			} else if (state.filterText === null) {
				return {
					items_backup: props.data,
					data: props.data,
					filter_items: props.data.items,
				};
			}
		}
		if (props.restaurant_backup_items && state.items >= 0) {
			let arr = [];
			if (props.restaurant_backup_items.hasOwnProperty("items")) {
				Object.keys(props.restaurant_backup_items.items).forEach((keys) => {
					props.restaurant_backup_items.items[keys].forEach((itemsList) => {
						arr.push(itemsList);
					});
				});
			}
			return { items: arr };
		}
		return null;
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (nextState !== this.state.data) {
			return true;
		} else {
			return false;
		}
	}

	  
	  // Helper function to filter data
	  filterData(data, isVeg) {
		const filteredItems = {};
		const filteredRecommendedItems = [];
	  
		if(isVeg == "veg" || isVeg == "nonVeg"){

			for (const category in data.items) {
			  filteredItems[category] = data.items[category].filter(
				(item) => item.is_veg === (isVeg == "veg" ? 1 : 0)
			  );
			}
		  
			for (const item of data.recommended) {
			  if (item.is_veg === (isVeg == "veg" ? 1 : 0)) {
				filteredRecommendedItems.push(item);
			  }
			}
		}
		else{

			for (const category in data.items) {
			  filteredItems[category] = data.items[category].filter(
				(item) => item.is_popular === 1
			  );
			}
		  
			for (const item of data.recommended) {
			  if (item.is_popular === 1) {
				filteredRecommendedItems.push(item);
			  }
			}
		}
	  
		return { items: filteredItems, recommended: filteredRecommendedItems };
	  }

	handleVegToggle = async () => {
		this.setState({ isNonVegActive: false });
		this.setState({ isBestSeller: false });
		if (this.state.isVegActive == false) {
			let filteredRecommendedItems = []
			let dummyItems = []
			let filteredItems = []
			for (let category in this.state.data.items) {
				for (let item in this.state.data.items[category]) {
					if (this.state.data.items[category][item].is_veg == 1) {
						dummyItems.push(this.state.data.items[category][item])
					}
				}
				if (dummyItems.length == 0) {
					dummyItems = []
				}
				else {
					filteredItems[category] = dummyItems
				}
				dummyItems = []
			}

			for (const item in this.state.data.recommended) {

				if (this.state.data.recommended[item].is_veg == 1) {
					filteredRecommendedItems.push(this.state.data.recommended[item])
				}

			}
			const filteredData = this.filterData(this.originalData, "veg");
			this.state.data.items = filteredData.items
			this.state.data.recommended = filteredData.recommended;
		
		}
		else {
			
			this.state.data.items = this.originalData.items
			this.state.data.recommended = this.originalData.recommended;

		}
		this.setState({ isVegActive: !this.state.isVegActive });
	};
	handleNonVegToggle = () => {
		this.setState({ isVegActive: false });
		this.setState({ isBestSeller: false });
		if (this.state.isNonVegActive == false) {
			let filteredRecommendedItems = []
			let dummyItems = []
			let filteredItems = []
			for (let category in this.state.data.items) {
				for (let item in this.state.data.items[category]) {
					if (this.state.data.items[category][item].is_veg == 0) {
						dummyItems.push(this.state.data.items[category][item])
					}
				}
				if (dummyItems.length == 0) {
					dummyItems = []
				}
				else {
					filteredItems[category] = dummyItems
				}
				dummyItems = []
			}

			for (const item in this.state.data.recommended) {

				if (this.state.data.recommended[item].is_veg == 0) {
					filteredRecommendedItems.push(this.state.data.recommended[item])
				}

			}
			const filteredData = this.filterData(this.originalData, "nonVeg");
			this.state.data.items = filteredData.items
			this.state.data.recommended = filteredData.recommended;
		
		}
		else {
			this.state.data.items = this.originalData.items
			this.state.data.recommended = this.originalData.recommended;

		}
		this.setState({ isNonVegActive: !this.state.isNonVegActive });
	};
	

	handleBestSellerToggle = () => {
		this.setState({ isVegActive: false });
		this.setState({ isNonVegActive: false });
		if (this.state.isBestSeller == false) {
			let filteredRecommendedItems = []
			let dummyItems = []
			let filteredItems = []
			for (let category in this.state.data.items) {
				for (let item in this.state.data.items[category]) {
					if (this.state.data.items[category][item].is_popular == 1) {
						dummyItems.push(this.state.data.items[category][item])
					}
				}
				if (dummyItems.length == 0) {
					dummyItems = []
				}
				else {
					filteredItems[category] = dummyItems
				}
				dummyItems = []
			}
			console.log(filteredItems)

			for (const item in this.state.data.recommended) {

				if (this.state.data.recommended[item].is_popular == 1) {
					filteredRecommendedItems.push(this.state.data.recommended[item])
				}

			}
			const filteredData = this.filterData(this.originalData, "best");
			this.state.data.items = filteredData.items
			this.state.data.recommended = filteredData.recommended;
		
		}
		else {
			this.state.data.items = this.originalData.items
			this.state.data.recommended = this.originalData.recommended;

		}
		this.setState({ isBestSeller: !this.state.isBestSeller });
	};
	handleItemClick(itemInfo) {
		console.log("clickinggg")
		this.props.onItemClick(itemInfo);
	}
	render() {
		const { addProduct, removeProduct, cartProducts, restaurant } = this.props;
		const { data } = this.state;
		const isItemExistInCart = (item_id) => {
			let cc = cartProducts.find(cartItem => {
				return cartItem.id === item_id
			});
			if (cc !== undefined) {
				return true;
			}
			return false;
		}
		if (!restaurant && !restaurant.store_type) {
			return (<React.Fragment></React.Fragment>);
		} else {
			return (
				<React.Fragment>
					

{restaurant.store_type && restaurant.store_type.store_ui === "meat" ? (
					<React.Fragment>

						<div className="col-12 mt-10">
							<div className="input-group" ref="searchGroup" onClick={this.inputFocus}>
								<input
									type="text"
									className="form-control items-search-box"
									placeholder={localStorage.getItem("itemSearchPlaceholder")}
									onChange={this.searchForItem}
								/>
								<div className="input-group-append">
									<span className="input-group-text items-search-box-icon">
										<i className="si si-magnifier" />
									</span>
								</div>
							</div>
						</div>
						<div>
							{this.state.queryLengthError && (
								<div className="auth-error">
									<div className="">{localStorage.getItem("searchAtleastThreeCharsMsg")}</div>
								</div>
							)}
						</div>
					<MeatCategories restaurant_id={restaurant.id} restaurant_slug={restaurant.slug} />
					{this.state.filterText !== null &&(
						<React.Fragment>
						<div className={`${localStorage.getItem("recommendedLayoutV2") === "true" ? "bg-grey-light" : ""} ${this.state.filterText === null ? "hidden":""}`}>
							{data.items &&
								Object.keys(data.items).map((category, index) => (
									<React.Fragment key={category}>
									<hr className={`styles_separator__3hQmk`}/>
									<div key={category} id={category + index}>
										<Collapsible
											trigger={category}
											triggerStyle={{
												borderBottom:'1px solid #eaeaea'
											}}
											open={index === 0 ? true : localStorage.getItem("expandAllItemMenu") === "true" ? true : this.props.menuClicked}
										>
											{data.items[category].map((item) => (
												<React.Fragment key={item.id}>
													<span className="hidden">{(item.quantity = 1)}</span>
													<div
														className="category-list-item"
														style={{
															display: "flex",
															justifyContent: "space-between",
														}}
													>
														<div className={`${item.image !== null && item.addons && Object.keys(item.addons) && item.addons && Object.keys(item.addons).length > 0 && "customized-item-list-img"} ${item.image === null && item.addons && Object.keys(item.addons) && item.addons && Object.keys(item.addons).length > 0 && "blank-image-no-desc"} list-item-img-sec`}>
														{item.image !== null ? (
															<React.Fragment>
																<Link to={restaurant.slug + "/" + item.id}>
																	<React.Fragment>
																		{this.state.searching ? (
																			item.image === null ? (
																			<img
																				src="/assets/img/various/blank.png"
																				alt={item.name}
																				className="flex-item-image"
																			/>
																			):(
																			<img
																				src={item.image}
																				alt={item.name}
																				placeholder="/assets/img/various/blank.png"
																				className="flex-item-image"
																			/>
																			)
																			
																		) : (
																			<ProgressiveImage
																				src={item.image}
																				placeholder="/assets/img/various/blank.png"
																			>
																				{(src, loading) => (
																					<img
																						style={item.image === null ? {
																							opacity: loading ? "0.5" : "1",
																							width: "120px",
																							height: "10px",
																						} : {
																							opacity: loading ? "0.5" : "1",
																						}}
																						src={src}
																						alt={item.name}
																						className="flex-item-image"
																					/>
																				)}
																			</ProgressiveImage>
																		)}

																	</React.Fragment>
																</Link>
															</React.Fragment>
														):(
															<React.Fragment>
																<Link to={restaurant.slug + "/" + item.id} onClick={e => e.preventDefault()}>
																	<React.Fragment>
																		{this.state.searching ? (
																			item.image === null ? (
																			<img
																				src="/assets/img/various/blank.png"
																				alt={item.name}
																				className="flex-item-image"
																			/>
																			):(
																			<img
																				src={item.image}
																				alt={item.name}
																				placeholder="/assets/img/various/blank.png"
																				className="flex-item-image"
																			/>
																			)
																		) : (
																			<ProgressiveImage
																				src={item.image}
																				placeholder="/assets/img/various/blank.png"
																			>
																				{(src, loading) => (
																					<img
																						style={item.image === null ? {
																							opacity: loading ? "0.5" : "1",
																							width: "120px",
																							height: "10px",
																						} : {
																							opacity: loading ? "0.5" : "1",
																						}}
																						src={src}
																						alt={item.name}
																						className="flex-item-image"
																					/>
																				)}
																			</ProgressiveImage>
																		)}

																	</React.Fragment>
																</Link>
															</React.Fragment>
														)}
														</div>
														<span className="item-new-badge"><ItemBadge item={item} noVegBadge={ item.is_veg !== null ? true : false}/></span>
														<div className="list-items-new">
															{localStorage.getItem("showVegNonVegBadge") === "true" &&
															item.is_veg !== null && (
																<React.Fragment>
																	{item.is_veg ? (
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
																	)}
																</React.Fragment>
															)}
														<div
															className={
																item.image !== null ? "flex-item-name" : "flex-item-name"
															}
														>
															<span className="item-name">{item.name}</span>{" "}
															<span className="item-badge-collection"></span>
															<span className="item-price">
																{localStorage.getItem("hidePriceWhenZero") === "true" &&
																item.price === "0.00" ? null : (
																	<React.Fragment>
																		{item.old_price > 0 && (
																			<span className="strike-text mr-1">
																				{" "}
																				{localStorage.getItem("currencySymbolAlign") ===
																					"left" &&
																					localStorage.getItem("currencyFormat")}{" "}
																				{item.old_price}
																				{localStorage.getItem("currencySymbolAlign") ===
																					"right" &&
																					localStorage.getItem("currencyFormat")}
																			</span>
																		)}

																		<span>
																			{localStorage.getItem("currencySymbolAlign") ===
																				"left" &&
																				localStorage.getItem("currencyFormat")}{" "}
																			{item.price}
																			{localStorage.getItem("currencySymbolAlign") ===
																				"right" &&
																				localStorage.getItem("currencyFormat")}
																		</span>

																		{item.old_price > 0 &&
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
																						((parseFloat(item.old_price) -
																							parseFloat(item.price)) /
																							parseFloat(item.old_price)) *
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
															{item.desc !== null ? (
																<div className="item-desc-short" style={{ color: "rgba(40,44,63,.45)"}}>
																	<ShowMore
																		lines={1}
																		more={localStorage.getItem("showMoreButtonText")}
																		less={localStorage.getItem("showLessButtonText")}
																		anchorclassName="show-more ml-1"
																	>
																		<div
																			dangerouslySetInnerHTML={{
																				__html: item.desc,
																			}}
																		/>
																	</ShowMore>
																</div>
															) : null}
														</div>
														</div>

														<div className={`item-actions pull-right pb-0 ${localStorage.getItem("showVegNonVegBadge") === "true" && item.is_veg !== null && item.image === null ? "mt-15" : null}`} style={item.image === null ? {top:"5px"} : null}>
															<div
																className="btn-group btn-group-sm"
																role="group"
																aria-label="btnGroupIcons1"
																style={{ height: "32px"}}
															>
																{item.is_active ? (
																	<React.Fragment>
																		{isItemExistInCart(item.id) ? (
																		<React.Fragment>
																		{item.addons && Object.keys(item.addons) &&
																			item.addons && Object.keys(item.addons).length ? (
																				<React.Fragment>
																				<button
																					onClick={() => {
																						this.context.router.history.push("/cart");
																					}}
																					type="button"
																					className="btn btn-add-remove btn-list-item-m"
																					style={{
																						color: localStorage.getItem("cartColor-bg"),
																					}}
																				>
																					<span className="btn-dec"></span>
																					<Ink duration="500" />
																				</button>
																				<button type="button" className="btn btn-quantity btn-list-item-q">
																					{cartProducts.find(
																						(cp) =>
																							cp.id ===
																							item.id
																					).quantity}
																				</button>
																				</React.Fragment>
																			) : (
																				<React.Fragment>
																				<button
																					type="button"
																					className="btn btn-add-remove btn-list-item-m"
																					style={{
																						color: localStorage.getItem("cartColor-bg"),
																					}}
																					onClick={() => {
																						item.quantity = 1;
																						removeProduct(item);
																						this.forceStateUpdate();
																					}}
																				>
																					<span className="btn-dec"></span>
																					<Ink duration="500" />
																				</button>
																				<button type="button" className="btn btn-quantity btn-list-item-q">
																					{cartProducts.find(
																						(cp) =>
																							cp.id ===
																							item.id
																					).quantity}
																				</button>
																				</React.Fragment>
																			)}
																			{item.addons && Object.keys(item.addons) &&
																			item.addons && Object.keys(item.addons).length ? (
																				<Customization
																					product={item}
																					addProduct={addProduct}
																					cartProducts={cartProducts}
																					forceUpdate={this.forceStateUpdate}
																					store_type={restaurant.store_type}
																				/>
																			) : (
																				<React.Fragment>
																				<button
																					type="button"
																					className="btn btn-add-remove btn-list-item-p"
																					style={{
																						color: localStorage.getItem("cartColor-bg"),
																					}}
																					onClick={() => {
																						addProduct(item);
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
																			{item.addons && Object.keys(item.addons) &&
																			item.addons && Object.keys(item.addons).length ? (
																				<Customization
																					product={item}
																					addProduct={addProduct}
																					cartProducts={cartProducts}
																					forceUpdate={this.forceStateUpdate}
																					store_type={restaurant.store_type}
																				/>
																			) : (
																			<button
																				type="button"
																				className="btn btn-add-remove btn-custom-add btn-list-item-add"
																				style={{
																					color: localStorage.getItem("cartColor-bg"),
																				}}
																				onClick={() => {
																					item.quantity = 1;
																					addProduct(item);
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
															{item.addons && Object.keys(item.addons) && item.addons && Object.keys(item.addons).length > 0 && (
																<React.Fragment>
																	<span
																		className="customizable-item-text d-block text-center"
																	>
																		{localStorage.getItem("customizableItemText")}
																	</span>
																	<br />
																</React.Fragment>
															)}
														</div>
													</div>
												</React.Fragment>
											))}
										</Collapsible>
									</div>
									</React.Fragment>
								))}
							<div className="mb-5" />
						</div>
						</React.Fragment>
					)}
					</React.Fragment>
				):(
					<React.Fragment>
					</React.Fragment>
				)}
				{restaurant.store_type && restaurant.store_type.store_ui === "restaurant" ?(
					<React.Fragment>
					<div className="col-12 mt-10">
						<div className="input-group" ref="searchGroup" onClick={this.inputFocus}>
							<input
								type="text"
								className="form-control items-search-box"
								placeholder={localStorage.getItem("itemSearchPlaceholder")}
								onChange={this.searchForItem}
							/>
							<div className="input-group-append">
								<span className="input-group-text items-search-box-icon">
									<i className="si si-magnifier" />
								</span>
							</div>
						</div>
					</div>
					<div>
						{this.state.queryLengthError && (
							<div className="auth-error">
								<div className="">{localStorage.getItem("searchAtleastThreeCharsMsg")}</div>
							</div>
						)}
					</div>
					<div className={`${localStorage.getItem("recommendedLayoutV2") === "true" ? "bg-grey-light" : ""}`}>
						{!this.state.searching && (
							<div className="px-5">
								{!data.recommended && data.recommended !== null ? (
									<ContentLoader
										height={480}
										width={400}
										speed={1.2}
										primaryColor="#f3f3f3"
										secondaryColor="#ecebeb"
									>
										<rect x="10" y="22" rx="4" ry="4" width="185" height="137" />
										<rect x="10" y="168" rx="0" ry="0" width="119" height="18" />
										<rect x="10" y="193" rx="0" ry="0" width="79" height="18" />

										<rect x="212" y="22" rx="4" ry="4" width="185" height="137" />
										<rect x="212" y="168" rx="0" ry="0" width="119" height="18" />
										<rect x="212" y="193" rx="0" ry="0" width="79" height="18" />

										<rect x="10" y="272" rx="4" ry="4" width="185" height="137" />
										<rect x="10" y="418" rx="0" ry="0" width="119" height="18" />
										<rect x="10" y="443" rx="0" ry="0" width="79" height="18" />

										<rect x="212" y="272" rx="4" ry="4" width="185" height="137" />
										<rect x="212" y="418" rx="0" ry="0" width="119" height="18" />
										<rect x="212" y="443" rx="0" ry="0" width="79" height="18" />
									</ContentLoader>
								) : null}
								{data.recommended && data.recommended.length > 0 && (
									<React.Fragment>
									<hr className="styles_separator__3hQmk recc" aria-hidden="true"/>
									<h3 className="px-10 py-10 recommended-text mb-0">
										{localStorage.getItem("itemsPageRecommendedText")}
									</h3>
								{localStorage.getItem("recommendedLayoutV2") === "true" ? (
									<div className={ localStorage.getItem("recommendedLayoutV2") === "true" ? "product-slider" : null } >
										{!data.recommended ? null : data.recommended.map((item) => (
											<RecommendedItems
												restaurant={restaurant}
												shouldUpdate={this.state.update}
												update={this.forceStateUpdate}
												product={item}
												addProduct={addProduct}
												removeProduct={removeProduct}
												key={item.id}
											/>
										))}
									</div>
									):(
									<React.Fragment>
									<div className="Collapsible__contentOuter">
										<div className="Collapsible__contentInner">
										{!data.recommended ? null : data.recommended.map((item) => (
											<RecommendedItems
												restaurant={restaurant}
												shouldUpdate={this.state.update}
												update={this.forceStateUpdate}
												product={item}
												addProduct={addProduct}
												removeProduct={removeProduct}
												key={item.id}
											/>
										))}
										</div>
									</div>
									</React.Fragment>
									)}
								</React.Fragment>
								)}
							</div>
						)}
						{data.items &&
							Object.keys(data.items).map((category, index) => (
								<React.Fragment key={category}>
								<hr className={`styles_separator__3hQmk`}/>
								<div key={category} id={category + index}>
									<Collapsible
										trigger={category}
										triggerStyle={{
											borderBottom:'1px solid #eaeaea'
										}}
										open={index === 0 ? true : localStorage.getItem("expandAllItemMenu") === "true" ? true : this.props.menuClicked}
									>
										{data.items[category].map((item) => (
											<React.Fragment key={item.id}>
												<span className="hidden">{(item.quantity = 1)}</span>
												<div
													className="category-list-item"
													style={{
														display: "flex",
														justifyContent: "space-between",
													}}
												>
													<div className={`${item.image !== null && item.addons && Object.keys(item.addons) && item.addons && Object.keys(item.addons).length > 0 && "customized-item-list-img"} ${item.image === null && item.addons && Object.keys(item.addons) && item.addons && Object.keys(item.addons).length > 0 && "blank-image-no-desc"} list-item-img-sec`}>
													{item.image !== null ? (
														<React.Fragment>
															<Link to={restaurant.slug + "/" + item.id}>
																<React.Fragment>
																	{this.state.searching ? (
																		item.image === null ? (
																		<img
																			src="/assets/img/various/blank.png"
																			alt={item.name}
																			className="flex-item-image"
																		/>
																		):(
																		<img
																			src={item.image}
																			alt={item.name}
																			placeholder="/assets/img/various/blank.png"
																			className="flex-item-image"
																		/>
																		)
																		
																	) : (
																		<ProgressiveImage
																			src={item.image}
																			placeholder="/assets/img/various/blank.png"
																		>
																			{(src, loading) => (
																				<img
																					style={item.image === null ? {
																						opacity: loading ? "0.5" : "1",
																						width: "120px",
																						height: "10px",
																					} : {
																						opacity: loading ? "0.5" : "1",
																					}}
																					src={src}
																					alt={item.name}
																					className="flex-item-image"
																				/>
																			)}
																		</ProgressiveImage>
																	)}

																</React.Fragment>
															</Link>
														</React.Fragment>
													):(
														<React.Fragment>
															<Link to={restaurant.slug + "/" + item.id} onClick={e => e.preventDefault()}>
																<React.Fragment>
																	{this.state.searching ? (
																		item.image === null ? (
																		<img
																			src="/assets/img/various/blank.png"
																			alt={item.name}
																			className="flex-item-image"
																		/>
																		):(
																		<img
																			src={item.image}
																			alt={item.name}
																			placeholder="/assets/img/various/blank.png"
																			className="flex-item-image"
																		/>
																		)
																	) : (
																		<ProgressiveImage
																			src={item.image}
																			placeholder="/assets/img/various/blank.png"
																		>
																			{(src, loading) => (
																				<img
																					style={item.image === null ? {
																						opacity: loading ? "0.5" : "1",
																						width: "120px",
																						height: "10px",
																					} : {
																						opacity: loading ? "0.5" : "1",
																					}}
																					src={src}
																					alt={item.name}
																					className="flex-item-image"
																				/>
																			)}
																		</ProgressiveImage>
																	)}

																</React.Fragment>
															</Link>
														</React.Fragment>
													)}
													</div>
													<span className="item-new-badge"><ItemBadge item={item} noVegBadge={ item.is_veg !== null ? true : false}/></span>
													<div className="list-items-new">
														{localStorage.getItem("showVegNonVegBadge") === "true" &&
														item.is_veg !== null && (
															<React.Fragment>
																{item.is_veg ? (
																	<img
																		src="/assets/img/various/veg-icon-nobg.png"
																		alt="Veg"
																		className="mr-1 veg-non-veg-badge"
																	/>
																) : (
																	<img
																		src="/assets/img/various/nonveg-icon-nobg.png"
																		alt="Non-Veg"
																		className="mr-1 veg-non-veg-badge"
																	/>
																)}
															</React.Fragment>
														)}
													<div
														className={
															item.image !== null ? "flex-item-name" : "flex-item-name"
														}
													>
														<span className="item-name">{item.name}</span>{" "}
														<span className="item-badge-collection"></span>
														<span className="item-price">
															{localStorage.getItem("hidePriceWhenZero") === "true" &&
															item.price === "0.00" ? null : (
																<React.Fragment>
																	{item.old_price > 0 && (
																		<span className="strike-text mr-1">
																			{" "}
																			{localStorage.getItem("currencySymbolAlign") ===
																				"left" &&
																				localStorage.getItem("currencyFormat")}{" "}
																			{item.old_price}
																			{localStorage.getItem("currencySymbolAlign") ===
																				"right" &&
																				localStorage.getItem("currencyFormat")}
																		</span>
																	)}

																	<span>
																		{localStorage.getItem("currencySymbolAlign") ===
																			"left" &&
																			localStorage.getItem("currencyFormat")}{" "}
																		{item.price}
																		{localStorage.getItem("currencySymbolAlign") ===
																			"right" &&
																			localStorage.getItem("currencyFormat")}
																	</span>

																	{item.old_price > 0 &&
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
																					((parseFloat(item.old_price) -
																						parseFloat(item.price)) /
																						parseFloat(item.old_price)) *
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
														{item.desc !== null ? (
															<div className="item-desc-short" style={{ color: "rgba(40,44,63,.45)"}}>
																<ShowMore
																	lines={1}
																	more={localStorage.getItem("showMoreButtonText")}
																	less={localStorage.getItem("showLessButtonText")}
																	anchorclassName="show-more ml-1"
																>
																	<div
																		dangerouslySetInnerHTML={{
																			__html: item.desc,
																		}}
																	/>
																</ShowMore>
															</div>
														) : null}
													</div>
													</div>

													<div className={`item-actions pull-right pb-0 ${localStorage.getItem("showVegNonVegBadge") === "true" && item.is_veg !== null && item.image === null ? "mt-15" : null}`} style={item.image === null ? {top:"5px"} : null}>
														<div
															className="btn-group btn-group-sm"
															role="group"
															aria-label="btnGroupIcons1"
															style={{ height: "32px"}}
														>
															{item.is_active ? (
																<React.Fragment>
																	{isItemExistInCart(item.id) ? (
																	<React.Fragment>
																	{item.addons && Object.keys(item.addons) &&
																		item.addons && Object.keys(item.addons).length ? (
																			<React.Fragment>
																			<button
																				onClick={() => {
																					this.context.router.history.push("/cart");
																				}}
																				type="button"
																				className="btn btn-add-remove btn-list-item-m"
																				style={{
																					color: localStorage.getItem("cartColor-bg"),
																				}}
																			>
																				<span className="btn-dec"></span>
																				<Ink duration="500" />
																			</button>
																			<button type="button" className="btn btn-quantity btn-list-item-q">
																				{cartProducts.find(
																					(cp) =>
																						cp.id ===
																						item.id
																				).quantity}
																			</button>
																			</React.Fragment>
																		) : (
																			<React.Fragment>
																			<button
																				type="button"
																				className="btn btn-add-remove btn-list-item-m"
																				style={{
																					color: localStorage.getItem("cartColor-bg"),
																				}}
																				onClick={() => {
																					item.quantity = 1;
																					removeProduct(item);
																					this.forceStateUpdate();
																				}}
																			>
																				<span className="btn-dec"></span>
																				<Ink duration="500" />
																			</button>
																			<button type="button" className="btn btn-quantity btn-list-item-q">
																				{cartProducts.find(
																					(cp) =>
																						cp.id ===
																						item.id
																				).quantity}
																			</button>
																			</React.Fragment>
																		)}
																		{item.addons && Object.keys(item.addons) &&
																		item.addons && Object.keys(item.addons).length ? (
																			<Customization
																				product={item}
																				addProduct={addProduct}
																				cartProducts={cartProducts}
																				forceUpdate={this.forceStateUpdate}
																				store_type={restaurant.store_type}
																			/>
																		) : (
																			<React.Fragment>
																			<button
																				type="button"
																				className="btn btn-add-remove btn-list-item-p"
																				style={{
																					color: localStorage.getItem("cartColor-bg"),
																				}}
																				onClick={() => {
																					addProduct(item);
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
																		{item.addons && Object.keys(item.addons) &&
																		item.addons && Object.keys(item.addons).length ? (
																			<Customization
																				product={item}
																				addProduct={addProduct}
																				cartProducts={cartProducts}
																				forceUpdate={this.forceStateUpdate}
																				store_type={restaurant.store_type}
																			/>
																		) : (
																		<button
																			type="button"
																			className="btn btn-add-remove btn-custom-add btn-list-item-add"
																			style={{
																				color: localStorage.getItem("cartColor-bg"),
																			}}
																			onClick={() => {
																				item.quantity = 1;
																				addProduct(item);
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
														{item.addons && Object.keys(item.addons) && item.addons && Object.keys(item.addons).length > 0 && (
															<React.Fragment>
																<span
																	className="customizable-item-text d-block text-center"
																>
																	{localStorage.getItem("customizableItemText")}
																</span>
																<br />
															</React.Fragment>
														)}
													</div>
												</div>
											</React.Fragment>
										))}
									</Collapsible>
								</div>
								</React.Fragment>
							))}
						<div className="mb-5" />
					</div>
				</React.Fragment>
				):(
					<React.Fragment></React.Fragment>
				)}
					{restaurant.store_type && restaurant.store_type.name === "Resturant V2" ? (
						<React.Fragment>
							<div ref={this.state.divRef} className={`sticky-div ${this.state.isSticky ? 'sticky' : ''}`}
							style={{boxShadow: this.state.isSticky ? "0px 2px 8px 0px #e0e0e0" : 'none'}}>
								
								<div className="col-12 ">
									<div className="input-group" ref="searchGroup" onClick={this.inputFocus} >
										{this.state.isSticky &&
											<span onClick={() => {
												setTimeout(() => {
													this.context.router.history.goBack();
												}, 200);
											}} style={{ position: 'absolute', left: 16, top:5, zIndex: 2, fontSize: 24 }}>
												<img src="/assets/img/various/back-icon.png"
													style={{width:16}} />
											</span>}
										<input
											type="text"
											className="form-control items-search-box-v2"
											placeholder={localStorage.getItem("itemSearchPlaceholder")}
											onChange={this.searchForItem}
											style={{ borderRadius: '10px 0px 0px 10px',fontFamily:"Basis Grotesque Pro"}}
										/>
										<div className="input-group-append">
											<span className="input-group-text items-search-box-icon-v2">
												<i className="si si-magnifier" />
											</span>
										</div>
									</div>
								</div>
								
								{/* Veg Non Veg Best Seller Filters*/}
								<div className="veg-nonveg-filters-cont" style={{ paddingTop: 1, 
									marginBottom: this.state.isSticky ? 0 : 20,
									paddingBottom: this.state.isSticky ? 20 : 0 }}>
									<div className="veg-nonveg-cont-1">
										<div className="veg-nonveg-cont">
											<label className="veg-nonveg-label">
												<input type="checkbox" checked={true} className="veg-nonveg-checkbox" />
												{this.state.isVegActive ?
													<span type="VEG" className="veg-active-icon-cont" onClick={this.handleVegToggle}>
														<div className="nonveg-active-img">
															<img
																src="/assets/img/various/veg-icon-nobg.png"
																alt="Non-Veg"
																className="mr-1 veg-non-veg-badge"
																style={{ background: 'white', width: 20, height: 20 }}
															/>
														</div>
													</span>
													:
													<span type="VEG" className="veg-nonveg-icon-cont" onClick={this.handleVegToggle}>
														<div className="veg-nonveg-img">
															<img
																src="/assets/img/various/veg-icon-nobg.png"
																alt="Veg"
																className=" veg-non-veg-badge"
																style={{ background: 'white', width: 20, height: 20 }}
															/>
														</div>
													</span>

												}
											</label>
										</div>
									</div>

									<div className="veg-nonveg-cont-1">

										<div className="veg-nonveg-cont">
											<label className="veg-nonveg-label">
												<input type="checkbox" checked={true} className="veg-nonveg-checkbox" />

												{
													this.state.isNonVegActive ?
														<span type="NON_VEG" className="nonveg-active-icon-cont" onClick={this.handleNonVegToggle}>
															<div className="nonveg-active-img">
																<img
																	src="/assets/img/various/nonveg-icon-nobg.png"
																	alt="Non-Veg"
																	className="mr-1 veg-non-veg-badge"
																	style={{ background: 'white', width: 20, height: 20 }}
																/>
															</div>
														</span>


														:
														<span type="NON_VEG" className="veg-nonveg-icon-cont" onClick={this.handleNonVegToggle}>
															<div className="veg-nonveg-img">

																<img
																	src="/assets/img/various/nonveg-icon-nobg.png"
																	alt="Non-Veg"
																	className="mr-1 veg-non-veg-badge"
																	style={{ background: 'white', width: 20, height: 20 }}
																/>
															</div>
														</span>

												}

											</label>
										</div>
									</div>
									{
										this.state.showBestSellerButton &&

									<div className="veg-nonveg-cont-1">
										{
											this.state.isBestSeller ?
												<div className="bestseller-active-cont">
													<div className="bestseller-text-active-cont" onClick={this.handleBestSellerToggle}>
														<div type="NON_VEG" className="bestseller-text" style={{ marginRight: 8 }} >
															Bestseller
														</div>
														<span>
															X
														</span>
													</div>
												</div>

												:
												<div className="veg-nonveg-cont" style={{ padding: ' 0px 40px', justifyContent: 'center' }}>
													<div className="bestseller-text-cont" onClick={this.handleBestSellerToggle}>
														<div type="NON_VEG" className="bestseller-text" >
															Bestseller
														</div>
													</div>
												</div>

										}
									</div>
									}
								</div>
								{this.state.activeCategory && this.state.isSticky && (
									<div>
										<div style={{ borderBottom: '1px solid #eaeaea',marginBottom:8 }}>
										</div>
										<div style={{color:'rgba(2, 6, 12, 0.6)',
										fontFamily:'Basis Grotesque Pro',fontSize:16,fontWeight:700}}>
										{this.state.activeCategory}
										</div>
									</div>
								)}
							</div>

							<div>
								{this.state.queryLengthError && (
									<div className="auth-error">
										<div className="">{localStorage.getItem("searchAtleastThreeCharsMsg")}</div>
									</div>
								)}
							</div>
							<div className={`${localStorage.getItem("recommendedLayoutV2") === "true" ? "bg-grey-light" : ""}`}
							     >
								{!this.state.searching && (
									<div style={{margin:'24px 16px 16px'}}>
										{!data.recommended && data.recommended !== null  ? (
											<>
											{
												data.recommended && data.recommended.length !== 0 &&
													<ContentLoader
														height={480}
														width={400}
														speed={1.2}
														primaryColor="#f3f3f3"
														secondaryColor="#ecebeb"
													>
														<rect x="10" y="22" rx="4" ry="4" width="185" height="137" />
														<rect x="10" y="168" rx="0" ry="0" width="119" height="18" />
														<rect x="10" y="193" rx="0" ry="0" width="79" height="18" />

														<rect x="212" y="22" rx="4" ry="4" width="185" height="137" />
														<rect x="212" y="168" rx="0" ry="0" width="119" height="18" />
														<rect x="212" y="193" rx="0" ry="0" width="79" height="18" />

														<rect x="10" y="272" rx="4" ry="4" width="185" height="137" />
														<rect x="10" y="418" rx="0" ry="0" width="119" height="18" />
														<rect x="10" y="443" rx="0" ry="0" width="79" height="18" />

														<rect x="212" y="272" rx="4" ry="4" width="185" height="137" />
														<rect x="212" y="418" rx="0" ry="0" width="119" height="18" />
														<rect x="212" y="443" rx="0" ry="0" width="79" height="18" />
													</ContentLoader>
											}
											</>
										) : null}



										<div style={{ borderBottom: '1px solid #eaeaea',marginBottom:24 }}>
										</div>
										
										{data.recommended && data.recommended.length > 0 && (
											<React.Fragment>
												<div ref={(el) => (this.state.categoryRefs[0] = el)}
											data-category={"Recommended"}>
													
												<Collapsible
													trigger={ "Recommended" + " " + `(${data.recommended.length})`}
													triggerStyle={{
														fontWeight: 800,
														fontSize: 18,
														letterSpacing: -0.3,
														color: 'rgba(2, 6, 12, 0.92)',
														fontFamily:'Basis Grotesque Pro',
														padding:0,
														marginBottom:24,
														display: 'block',
														textDecoration: 'none',
														position: 'relative',
														background: '#ffffff'
													}}
													contentInnerClassName="collapse-inner-v2"
													open={data.recommended.length === 0 ? true : localStorage.getItem("expandAllItemMenu") === "true" ? true : this.props.menuClicked}
												>
													{/* <h3 className="px-10 py-20 recommended-text mb-0">
										{localStorage.getItem("itemsPageRecommendedText")} ({data.recommended.length})
									</h3> */}
													{localStorage.getItem("recommendedLayoutV2") === "true" ? (
														<div className={localStorage.getItem("recommendedLayoutV2") === "true" ? "product-slider" : null}  style={{padding:0}}>
															{!data.recommended ? null : data.recommended.map((item) => (
																<RecommendedItems
																   
																	onItemClick={this.props.onItemClick}
																	restaurant={restaurant}
																	shouldUpdate={this.state.update}
																	update={this.forceStateUpdate}
																	product={item}
																	addProduct={addProduct}
																	removeProduct={removeProduct}
																	key={item.id}
																/>
															))}
														</div>
													) : (
														<React.Fragment>
															{!data.recommended ? null : data.recommended.map((item) => (
																		<RecommendedItems
																		
																			onItemClick={this.props.onItemClick}
																			restaurant={restaurant}
																			shouldUpdate={this.state.update}
																			update={this.forceStateUpdate}
																			product={item}
																			addProduct={addProduct}
																			removeProduct={removeProduct}
																			key={item.id}
																		/>
																	))}
														</React.Fragment>
													)}
												</Collapsible>
												</div>
											</React.Fragment>
										)}
									</div>
								)}
								{data.items && data.items.length !== 0 &&
									Object.keys(data.items).map((category, index) => (
										<>
										{
											data.items[category].length !== 0 &&
										<React.Fragment key={category}>
											<hr className={`styles_separator__3hQmk`} />
											<div key={category} 
											id={category + index} 
											ref={(el) => (this.state.categoryRefs[index+1] = el)}
											data-category={category}
											style={{margin:'24px 16px 16px'}}>
												<Collapsible
													trigger={category + " " + `(${data.items[category].length})`}
													triggerStyle={{
														fontWeight: 800,
														fontSize: 18,
														letterSpacing: -0.3,
														color: 'rgba(2, 6, 12, 0.92)',
														padding:0,
														marginBottom:24
													}}
													contentInnerClassName="collapse-inner-v2"
													open={index === 0 ? true : localStorage.getItem("expandAllItemMenu") === "true" ? true : this.props.menuClicked}
												>
													{data.items[category].map((item) => (
														<React.Fragment key={item.id}>
															<span className="hidden">{(item.quantity = 1)}</span>
															<div
																className="category-list-item" 
																style={{
																	display: "flex",
																	justifyContent: "space-between",
																}}
															>
																<div className={`${item.image !== null && item.addons && Object.keys(item.addons) && item.addons && Object.keys(item.addons).length > 0 && ""} ${item.image === null && item.addons && Object.keys(item.addons) && item.addons && Object.keys(item.addons).length > 0 && "blank-image-no-desc"} list-item-img-sec`}
																style={{    marginLeft: 12,
																	maxHeight: 164,
																	minWidth: 156}}>
																	{item.image !== null ? (
																		<React.Fragment>
																			<Link to={restaurant.slug + "/" + item.id}>
																			</Link>
																			<React.Fragment>
																				{this.state.searching ? (
																					item.image === null ? (
																						<img
																							onClick={() => this.handleItemClick({ data: item, open: true })}

																							src="/assets/img/various/blank.png"
																							alt={item.name}
																							className="flex-item-image-v2"
																							style={{
																								width: "156px",
																								height: "144px",
																								borderRadius: 12,
																								marginBottom:15
																							}}
																						/>
																					) : (
																						<img
																							onClick={() => this.handleItemClick({ data: item, open: true })}
																							src={item.image}
																							alt={item.name}
																							placeholder="/assets/img/various/blank.png"
																							className="flex-item-image-v2"
																							style={{
																								width: "156px",
																								height: "144px",
																								borderRadius: 12,
																								marginBottom:15
																							}}
																						/>
																					)

																				) : (
																					<ProgressiveImage
																					
																						src={item.image}
																						placeholder="/assets/img/various/blank.png"
																					>
																						{(src, loading) => (
																							<img
																								style={{
																									opacity: loading ? "0.5" : "1",
																									width: "156px",
																									height: "144px",
																									borderRadius: 12,
																									marginBottom:15
																								}}
																								onClick={() => this.handleItemClick({ data: item, open: true })}
																								
																								src= {src}
																								alt={item.name}
																								className="flex-item-image-v2"
																							/>
																						)}
																					</ProgressiveImage>
																				)}

																			</React.Fragment>
																		</React.Fragment>
																	) : (
																		<React.Fragment>
																			<Link to={restaurant.slug + "/" + item.id} onClick={e => e.preventDefault()}>
																			</Link>
																			<React.Fragment>
																				{this.state.searching ? (
																					item.image === null ? (
																						<img
																							
																							onClick={() => this.handleItemClick({ data: item, open: true })}
																							src="/assets/img/various/blank.png"
																							alt={item.name}
																							className="flex-item-image-v2"
																							style={{
																								width: "156px",
																								height: "144px",
																								borderRadius: 12,
																								marginBottom:15
																							}}
																						/>
																					) : (
																						<img
																							
																							onClick={() => this.handleItemClick({ data: item, open: true })}
																							src={item.image}
																							alt={item.name}
																							placeholder="/assets/img/various/blank.png"
																							className="flex-item-image-v2"
																							style={{
																								width: "156px",
																								height: "144px",
																								borderRadius: 12,
																								marginBottom:15
																							}}
																						/>
																					)
																				) : (
																					<ProgressiveImage
																						
																						src={item.image}
																						placeholder="/assets/img/various/blank.png"
																					>
																						{(src, loading) => (
																							<img
																								style={{
																									opacity: loading ? "0.5" : "1",
																									width: "156px",
																									height: "144px",
																									borderRadius: 12,
																									marginBottom:15
																								}}
																								onClick={() => this.handleItemClick({ data: item, open: true })}
																								
																								src={src}
																								alt={item.name}
																								className="flex-item-image-v2"
																							/>
																						)}
																					</ProgressiveImage>
																				)}

																			</React.Fragment>
																		</React.Fragment>
																	)}
																	<div className={`item-actions pull-right pb-0 ${localStorage.getItem("showVegNonVegBadge") === "true" && item.is_veg !== null && item.image === null ? "mt-15" : null}`} 
																style={{top : item.image === null ? "5px" : null,top:116,right:16}}>
																	<div
																		className="btn-group btn-group-sm"
																		role="group"
																		aria-label="btnGroupIcons1"
																		style={{
																			width: 120, height: 38,
																			borderRadius: 10
																		}}
																	>
																		{item.is_active ? (
																			<React.Fragment>
																				{isItemExistInCart(item.id) ? (
																					<React.Fragment>
																						{item.addons && Object.keys(item.addons) &&
																							item.addons && Object.keys(item.addons).length ? (
																							<React.Fragment>
																								<button
																									onClick={() => {
																										this.context.router.history.push("/cart");
																									}}
																									type="button"
																									className="btn btn-add-remove-v2 btn-list-item-m-v2"
																									style={{
																										color: localStorage.getItem("cartColor-bg"),
																										borderRadius: '10px 0px 0px 10px',
																										height: 38,
																										
																									}}
																								>
																									<span className="btn-dec">-</span>
																								</button>
																								<button type="button" className="btn btn-quantity-v2 btn-list-item-q-v2"
																									style={{
																										height: 38,
																										
																									}}>
																									{cartProducts.find(
																										(cp) =>
																											cp.id ===
																											item.id
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
																										borderRadius: '10px 0px 0px 10px',
																										height: 38,
																										
																									}}
																									onClick={() => {
																										item.quantity = 1;
																										removeProduct(item);
																										this.forceStateUpdate();
																									}}
																								>
																									<span className="btn-dec">-</span>
																									<Ink duration="500" />
																								</button>
																								<button type="button" className="btn btn-quantity-v2 btn-list-item-q-v2"
																									style={{
																										height: 38,
																										
																									}}>
																									{cartProducts.find(
																										(cp) =>
																											cp.id ===
																											item.id
																									).quantity}
																								</button>
																							</React.Fragment>
																						)}
																						{item.addons && Object.keys(item.addons) &&
																							item.addons && Object.keys(item.addons).length ? (
																							<Customization
																								product={item}
																								addProduct={addProduct}
																								cartProducts={cartProducts}
																								forceUpdate={this.forceStateUpdate}
																								store_type={restaurant.store_type}
																							/>
																						) : (
																							<React.Fragment>
																								<button
																									type="button"
																									className="btn btn-add-remove-v2 btn-list-item-p-v2"
																									style={{
																										color: localStorage.getItem("cartColor-bg"),
																										borderRadius: '0px 10px 10px 0px',
																										height: 38,
																										outline:'none'
																									}}
																									onClick={() => {
																										addProduct(item);
																										this.forceStateUpdate();
																									}}
																								>
																									<span className="btn-inc">+</span>
																									<Ink duration="500" />
																								</button>
																							</React.Fragment>
																						)}
																					</React.Fragment>
																				) : (
																					<React.Fragment>
																						{item.addons && Object.keys(item.addons) &&
																							item.addons && Object.keys(item.addons).length ? (
																							<Customization
																								product={item}
																								addProduct={addProduct}
																								cartProducts={cartProducts}
																								forceUpdate={this.forceStateUpdate}
																								store_type={restaurant.store_type}
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
																									item.quantity = 1;
																									addProduct(item);
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
																	{item.addons && Object.keys(item.addons) && item.addons && Object.keys(item.addons).length > 0 && (
																		<React.Fragment>
																			<span
																				className="customizable-item-text d-block text-center"
																			>
																				{localStorage.getItem("customizableItemText")}
																			</span>
																			<br />
																		</React.Fragment>
																	)}
																</div>
																
																</div>
																
																<div className="list-items-new">
																	{localStorage.getItem("showVegNonVegBadge") === "true" &&
																		item.is_veg !== null && (
																			<React.Fragment>
																				{item.is_veg ? (
																					<img
																					src="/assets/img/various/veg-icon-nobg.png"
																					alt="Veg"
																					className="mr-1 veg-non-veg-badge"
																					style={{width:16,height:16}}
																				/>
																			) : (
																				<img
																					src="/assets/img/various/nonveg-icon-nobg.png"
																					alt="Non-Veg"
																					className="mr-1 veg-non-veg-badge"
																					style={{width:16,height:16}}
																				/>
																				)}
																			</React.Fragment>
																		)}
																	<div
																		className={
																			item.image !== null ? "flex-item-name" : "flex-item-name"
																		}
																	>
																		<div className="item-badge-collection">
																		<div className="item-new-badge">
																	<ItemBadge item={item} type={restaurant.store_type} noVegBadge={item.is_veg !== null ? true : false} />
																	</div>
																		</div>
																		<div className="item-name" style={{
																			fontWeight: 'bold',
																			fontSize: 18,
																			lineHght: 20,
																			letterSpacing: -0.3,
																			color: 'rgba(2, 6, 12, 0.75)',
																			fontFamily:'Basis Grotesque Pro',
																			lineHeight:'20px'
																		}}>
																			{item.name}
																		</div>{" "}
																		
																		<span style={{
																			fontWeight: 400,
																			fontSize: 18,
																			letterSpacing: -0.3,
																			color: 'rgba(2, 6, 12, 0.92)',
																			fontFamily:'Basis Grotesque Pro'
																		}}>
																			{localStorage.getItem("hidePriceWhenZero") === "true" &&
																				item.price === "0.00" ? null : (
																				<React.Fragment>
																					{item.old_price > 0 && (
																						<span className="strike-text mr-1">
																							{" "}
																							{localStorage.getItem("currencySymbolAlign") ===
																								"left" &&
																								localStorage.getItem("currencyFormat")}{" "}
																							{item.old_price}
																							{localStorage.getItem("currencySymbolAlign") ===
																								"right" &&
																								localStorage.getItem("currencyFormat")}
																						</span>
																					)}

																					<span>
																						{localStorage.getItem("currencySymbolAlign") ===
																							"left" &&
																							localStorage.getItem("currencyFormat")}{" "}
																						{item.price}
																						{localStorage.getItem("currencySymbolAlign") ===
																							"right" &&
																							localStorage.getItem("currencyFormat")}
																					</span>

																					{item.old_price > 0 &&
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
																									((parseFloat(item.old_price) -
																										parseFloat(item.price)) /
																										parseFloat(item.old_price)) *
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
																		{item.desc !== null ? (
																			<div className="item-desc-short" style={{ color: "rgba(40,44,63,.45)" }}>
																				<ShowMore
																					lines={2}
																					more={localStorage.getItem("showMoreButtonText")}
																					less={localStorage.getItem("showLessButtonText")}
																					anchorclassName="show-more ml-1"
																				>
																					<div
																						dangerouslySetInnerHTML={{
																							__html: item.desc,
																						}}
																					/>
																				</ShowMore>
																			</div>
																		) : null}
																	</div>
																</div>

																
															</div>
														</React.Fragment>
													))}
												</Collapsible>
											</div>
										</React.Fragment>
										}
										</>
									))}
								<div className="mb-5" />
							</div>

							{/* <div className="float-cart float-cart--open" style={{background:'white',color:'black',bottom:-5,height:300,width:'100%',left:0,zIndex:500}}>
						  
						  hellooo
						</div> */}

						</React.Fragment>
					) : (
						<React.Fragment></React.Fragment>
					)}
				</React.Fragment>
			);
		}
	}
}

const mapStateToProps = (state) => ({
	cartProducts: state.cart.products,
});

export default connect(
	mapStateToProps,
	{ addProduct, removeProduct, searchItem, clearSearch }
)(ItemList);









