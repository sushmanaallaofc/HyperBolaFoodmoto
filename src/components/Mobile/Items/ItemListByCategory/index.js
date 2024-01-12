import React, { Component } from "react";
import { addProduct, removeProduct } from "../../../../services/cart/actions";

import Collapsible from "react-collapsible";
import ContentLoader from "react-content-loader";
import Customization from "../Customization";

import Ink from "react-ink";
import ItemBadge from "./ItemBadgeByCategory";
import { Link } from "react-router-dom";

import RecommendedItems from "./RecommendedItemsByCategory";
import ShowMore from "react-show-more";

import { connect } from "react-redux";
import { searchItem, clearSearch } from "../../../../services/items/actions";

import ProgressiveImage from "react-progressive-image";
import LazyLoad from "react-lazyload";
import { debounce } from "../../../helpers/debounce";
import MeatCategories from "../MeatCategories";

class ItemListByCategory extends Component {
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
	};

	componentDidMount() {
		document.addEventListener("mousedown", this.handleClickOutside);
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

	render() {
		const { addProduct, removeProduct, cartProducts, restaurant } = this.props;
		const { data } = this.state;
		const isItemExistInCart = (item_id) => {
            let cc = cartProducts.find(cartItem => {
                return cartItem.id === item_id
            });
            if(cc !== undefined) {
                return true;
            }
            return false;
        }
		return (
			<React.Fragment>
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
							<div key={category} id={category + index}>
								<div className={`Collapsible ${this.props.divHide === true ? 'mt-5' : 'mt-50'} `}>
									<div className="Collapsible__contentOuter">
										<div className="Collapsible__contentInner">
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
															<Link to={"/stores/" + restaurant.slug + "/" + item.id}>
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
																						width: "156px",
																			height: "144px",
																			borderRadius:12
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
															<di to={restaurant.slug + "/" + item.id} onClick={e => e.preventDefault()}>
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
																						width: "156px",
																			height: "144px",
																			borderRadius:12
																					}}
																					src={src}
																					alt={item.name}
																					className="flex-item-image"
																				/>
																			)}
																		</ProgressiveImage>
																	)}

																</React.Fragment>
															</di>
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
										</div>
									</div>
								</div>
							</div>
							</React.Fragment>
						))}
					<div className="mb-5" />
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	cartProducts: state.cart.products,
});

export default connect(
	mapStateToProps,
	{ addProduct, removeProduct, searchItem, clearSearch }
)(ItemListByCategory);
