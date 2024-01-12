import React, { Component } from "react";
import { addProduct, removeProduct } from "../../../../../services/cart/actions";

import Customization from "../../Customization";
import Fade from "react-reveal/Fade";
import Ink from "react-ink";
import LazyLoad from "react-lazyload";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ShowMore from "react-show-more";
import ProgressiveImage from "react-progressive-image";
import ItemBadge from "../ItemBadge";
class RecommendedItems extends Component {
	// static contextTypes = {
	// 	router: () => null,
	// };
	constructor(props) {
		super(props);
		this.state = {
		  isSlideOpen: false,
		  backgroundColor: 'white', // Initial background color
		};
	  }
	
	  handleImageClick = () => {
		this.setState({
		  isSlideOpen: !this.state.isSlideOpen,
		  backgroundColor: 'rgba(255, 255, 255, 0.8)', // Lighter background color
		});
	  };
	forceStateUpdate = () => {
		setTimeout(() => {
			this.forceUpdate();
			this.props.update();
		}, 100);
	};

	componentDidUpdate(prevProps) {
		if (prevProps.cartProducts.length !== this.props.cartProducts.length) {
		  this.forceUpdate();
		}
	}
	handleItemClick(itemInfo) {
		this.props.onItemClick(itemInfo);
	  }
	render() {
		const { addProduct, removeProduct, product, cartProducts, restaurant } = this.props;
		product.quantity = 1;
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
			{
				restaurant.store_type && restaurant.store_type.store_ui === "restaurant" &&
				<React.Fragment>
				{localStorage.getItem("recommendedLayoutV2") === "true" ? (
					<div key={product.id} className="product-slider-item">
						<div className="block border-radius-275 recommended-item-shadow">
							<div
								className="block-content recommended-item-content py-5 mb-5"
								style={{ position: "relative", height: "17.5rem" }}
							>
								<React.Fragment>
									{product.image !== null ? (
										<Link to={restaurant.slug + "/" + product.id}>
										<LazyLoad>
											<img
												src={product.image}
												alt={product.name}
												className="recommended-item-image"
												/>
										</LazyLoad>
										</Link>
									):(
										<Link to={restaurant.slug + "/" + product.id}>
										<LazyLoad>
											<img
												src="/assets/img/various/green_placeholder.png"
												alt={product.name}
												className="recommended-item-image"
												/>
										</LazyLoad>
										</Link>
									)}

									<React.Fragment>
										{cartProducts.find((cp) => cp.id === product.id) !== undefined && (
											<Fade duration={150}>
												<div
													className="quantity-badge-recommended"
													style={{
														backgroundColor: localStorage.getItem("storeColor"),
													}}
												>
													<span>
														{product.addons && Object.keys(product.addons).length ? (
															<React.Fragment>
																<i
																	className="si si-check"
																	style={{ lineHeight: "1.3rem" }}
																/>
															</React.Fragment>
														) : (
															<React.Fragment>
																{
																	cartProducts.find((cp) => cp.id === product.id)
																		.quantity
																}
															</React.Fragment>
														)}
													</span>
												</div>
											</Fade>
										)}
									</React.Fragment>
								</React.Fragment>
								<div className="my-2 recommended-item-meta">
									<div className="px-5 text-left recommended-v2-ellipsis-meta">
										{localStorage.getItem("showVegNonVegBadge") === "true" ? (
											product.is_veg !== null ? (
												<div className="d-flex justify-content-between align-items-center">
													{product.is_veg ? (
														<React.Fragment>
															<img
																src="/assets/img/various/veg-icon-bg.png"
																alt="Veg"
																style={{ width: "1rem", alignSelf: "center" }}
																className="mr-1 my-1"
															/>
															<span className="meta-name">{product.name}</span>
														</React.Fragment>
													) : (
														<React.Fragment>
															<img
																src="/assets/img/various/non-veg-icon-bg.png"
																alt="Non-Veg"
																style={{ width: "1rem", alignSelf: "center" }}
																className="mr-1 my-1"
															/>
															<span className="meta-name">{product.name}</span>
														</React.Fragment>
													)}
												</div>
											) : (
												<div className="d-flex justify-content-between align-items-center">
												<span className="meta-name">{product.name}</span>
												</div>
											)
										) : (
											<span className="meta-name">{product.name}</span>
										)}
									</div>
									<div className="ml-2">
										<span className="meta-price">
											{localStorage.getItem("hidePriceWhenZero") === "true" &&
											product.price === "0.00" ? (
												<span style={{ height: "20px", display: "block" }}> </span>
											) : (
												<React.Fragment>
													{product.old_price > 0 && (
														<span className="strike-text mr-1">
															{" "}
															{localStorage.getItem("currencySymbolAlign") === "left" &&
																localStorage.getItem("currencyFormat")}{" "}
															{product.old_price}
															{localStorage.getItem("currencySymbolAlign") === "right" &&
																localStorage.getItem("currencyFormat")}
														</span>
													)}

													<span>
														{localStorage.getItem("currencySymbolAlign") === "left" &&
															localStorage.getItem("currencyFormat")}{" "}
														{product.price}
														{localStorage.getItem("currencySymbolAlign") === "right" &&
															localStorage.getItem("currencyFormat")}
													</span>
												</React.Fragment>
											)}
										</span>
									</div>
									<div
										className="btn-group btn-group-sm my-5"
										role="group"
										aria-label="btnGroupIcons1"
										style={{ height: "40px", left: "25%" }}
									>
										{product.is_active ? (
											<React.Fragment>
												{isItemExistInCart(product.id) ? (
												<React.Fragment>
												{product.addons && Object.keys(product.addons).length ? (
													<React.Fragment>
													<button
														// disabled
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
																product.id
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
															removeProduct(product);
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
																product.id
														).quantity}
													</button>
													</React.Fragment>
												)}
												{Object.keys(product.addons).length ? (
													<Customization
														product={product}
														addProduct={addProduct}
														cartProducts={cartProducts}
														update={this.props.forceStateUpdate}
														forceUpdate={this.forceStateUpdate}
														store_type={this.props.restaurant.store_type}
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
															addProduct(product);
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
												{Object.keys(product.addons).length ? (
													<Customization
														product={product}
														addProduct={addProduct}
														cartProducts={cartProducts}
														update={this.props.forceStateUpdate}
														forceUpdate={this.forceStateUpdate}
														store_type={this.props.restaurant.store_type}
													/>
												) : (
												<button
													type="button"
													className="btn btn-add-remove btn-custom-add btn-list-item-add"
													style={{
														color: localStorage.getItem("cartColor-bg"),
													}}
													onClick={() => {
														product.quantity = 1;
														addProduct(product);
														this.forceStateUpdate();
													}}
												>
													Add
													<Ink duration="500" />
												</button>
												)}
											</React.Fragment>
											)}
											</React.Fragment>
											
										) : (
											<div className="d-flex align-items-center item-not-avail">
												{localStorage.getItem("cartItemNotAvailable")}
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				) : (
					<div key={product.id}
						className="category-list-item"
						style={{
							display: "flex",
							justifyContent: "space-between",
						}}
					>
						<div className={`${product.image !== null && product.addons && Object.keys(product.addons).length > 0 && "customized-item-list-img"} ${product.image === null && product.addons && Object.keys(product.addons).length > 0 && "blank-image-no-desc"} list-item-img-sec`}>
						<React.Fragment>
						{product.image !== null ? (
							<React.Fragment>
								<Link to={restaurant.slug + "/" + product.id}>
									<React.Fragment>
										<ProgressiveImage
											src={product.image}
											placeholder="/assets/img/various/blank.png"
										>
											{(src, loading) => (
												<img
													style={product.image === null ? {
														opacity: loading ? "0.5" : "1",
														width: "120px",
														height: "10px",
													} : {
														opacity: loading ? "0.5" : "1",
													}}
													src={src}
													alt={product.name}
													className="flex-item-image"
												/>
											)}
										</ProgressiveImage>
									</React.Fragment>
								</Link>
							</React.Fragment>
						):(
							<React.Fragment>
								<Link to={restaurant.slug + "/" + product.id} onClick={e => e.preventDefault()}>
									<React.Fragment>
										<ProgressiveImage
											src={product.image}
											placeholder="/assets/img/various/blank.png"
										>
											{(src, loading) => (
												<img
													style={product.image === null ? {
														opacity: loading ? "0.5" : "1",
														width: "120px",
													} : {
														opacity: loading ? "0.5" : "1",
													}}
													src={src}
													alt={product.name}
													className="flex-item-image"
												/>
											)}
										</ProgressiveImage>
									</React.Fragment>
								</Link>
							</React.Fragment>
						)}
						</React.Fragment>
						</div>
						<div className="list-items-new">
							{localStorage.getItem("showVegNonVegBadge") === "true" &&
							product.is_veg !== null && (
								<React.Fragment>
									{product.is_veg ? (
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
								product.image !== null ? "flex-item-name" : "flex-item-name"
							}
						>
							<span className="item-name">{product.name}</span>{" "}
							<span className="item-badge-collection"></span>
							<span className="item-price">
								{localStorage.getItem("hidePriceWhenZero") === "true" &&
								product.price === "0.00" ? null : (
									<React.Fragment>
										{product.old_price > 0 && (
											<span className="strike-text mr-1">
												{" "}
												{localStorage.getItem("currencySymbolAlign") ===
													"left" &&
													localStorage.getItem("currencyFormat")}{" "}
												{product.old_price}
												{localStorage.getItem("currencySymbolAlign") ===
													"right" &&
													localStorage.getItem("currencyFormat")}
											</span>
										)}

										<span>
											{localStorage.getItem("currencySymbolAlign") ===
												"left" &&
												localStorage.getItem("currencyFormat")}{" "}
											{product.price}
											{localStorage.getItem("currencySymbolAlign") ===
												"right" &&
												localStorage.getItem("currencyFormat")}
										</span>

										{product.old_price > 0 &&
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
														((parseFloat(product.old_price) -
															parseFloat(product.price)) /
															parseFloat(product.old_price)) *
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
						</div>

						<div className={`item-actions pull-right pb-0 ${localStorage.getItem("showVegNonVegBadge") === "true" && product.is_veg !== null && product.image === null ? "mt-15" : null}`} style={product.image === null ? {top:"5px"} : null}>
							<div
								className="btn-group btn-group-sm"
								role="group"
								aria-label="btnGroupIcons1"
								style={{ height: "32px"}}
							>
								{product.is_active ? (
									<React.Fragment>
										{isItemExistInCart(product.id) ? (
										<React.Fragment>
										{product.addons &&
											Object.keys(product.addons).length ? (
												<React.Fragment>
												<button
													disabled
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
															product.id
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
														product.quantity = 1;
														removeProduct(product);
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
															product.id
													).quantity}
												</button>
												</React.Fragment>
											)}
											{product.addons &&
											Object.keys(product.addons).length ? (
												<Customization
													product={product}
													addProduct={addProduct}
													cartProducts={cartProducts}
													forceUpdate={this.forceStateUpdate}
													store_type={this.props.restaurant.store_type}
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
														addProduct(product);
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
											{product.addons &&
											Object.keys(product.addons).length ? (
												<Customization
													product={product}
													addProduct={addProduct}
													cartProducts={cartProducts}
													forceUpdate={this.forceStateUpdate}
													store_type={this.props.restaurant.store_type}
												/>
											) : (
											<button
												type="button"
												className="btn btn-add-remove btn-custom-add btn-list-item-add"
												style={{
													color: localStorage.getItem("cartColor-bg"),
												}}
												onClick={() => {
													product.quantity = 1;
													addProduct(product);
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
										<span className="itemNotAvail"> {localStorage.getItem("cartItemNotAvailable")}</span>
									</div>
								)}
							</div>
							{product.addons && Object.keys(product.addons).length > 0 && (
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
				)}
			</React.Fragment>
			}
			{
				restaurant.store_type && restaurant.store_type.name === "Resturant V2" &&
				<React.Fragment>
					{localStorage.getItem("recommendedLayoutV2") === "true" ? (
						<div key={product.id} className="product-slider-item"  style={{padding:0}}>
							<div className="block border-radius-275 recommended-item-shadow">
								<div
									className="block-content recommended-item-content py-5 mb-5"
									style={{ position: "relative", height: "17.5rem" }}
								>
									
									<React.Fragment>
										{product.image !== null ? (
											<Link to={restaurant.slug + "/" + product.id}>
											<LazyLoad>
												<img
													src={product.image}
													alt={product.name}
													className="recommended-item-image"
													/>
													
											</LazyLoad>
											</Link>
										):(
											<Link to={restaurant.slug + "/" + product.id}>
											<LazyLoad>
												<img
													src={product.image}
													alt={product.name}
													className="recommended-item-image"
													/>
											</LazyLoad>
											</Link>
										)}

										<React.Fragment>
											{cartProducts.find((cp) => cp.id === product.id) !== undefined && (
												<Fade duration={150}>
													<div
														className="quantity-badge-recommended"
														style={{
															backgroundColor: localStorage.getItem("storeColor"),
														}}
													>
														<span>
															{product.addons && Object.keys(product.addons).length ? (
																<React.Fragment>
																	<i
																		className="si si-check"
																		style={{ lineHeight: "1.3rem" }}
																	/>
																</React.Fragment>
															) : (
																<React.Fragment>
																	{
																		cartProducts.find((cp) => cp.id === product.id)
																			.quantity
																	}
																</React.Fragment>
															)}
														</span>
													</div>
												</Fade>
											)}
										</React.Fragment>
									</React.Fragment>
									<div className="my-2 recommended-item-meta">
										<div className="px-5 text-left recommended-v2-ellipsis-meta">
											{localStorage.getItem("showVegNonVegBadge") === "true" ? (
												product.is_veg !== null ? (
													<div className="d-flex justify-content-between align-items-center">
														{product.is_veg ? (
															<React.Fragment>
																<img
																	src="/assets/img/various/veg-icon-nobg.png"
																	alt="Veg"
																	style={{ width: "1rem", alignSelf: "center" }}
																	className="mr-1 my-1"
																/>
																<span className="meta-name">{product.name}</span>
															</React.Fragment>
														) : (
															<React.Fragment>
																<img
																	src="/assets/img/various/nonveg-icon-nobg.png"
																	alt="Non-Veg"
																	style={{ width: "1rem", alignSelf: "center" }}
																	className="mr-1 my-1"
																/>
																<span className="meta-name">{product.name}</span>
															</React.Fragment>
														)}
													</div>
												) : (
													<div className="d-flex justify-content-between align-items-center">
													<span className="meta-name">{product.name}</span>
													</div>
												)
											) : (
												<span className="meta-name">{product.name}</span>
											)}
										</div>
										<div className="ml-2">
											<span className="meta-price">
												{localStorage.getItem("hidePriceWhenZero") === "true" &&
												product.price === "0.00" ? (
													<span style={{ height: "20px", display: "block" }}> </span>
												) : (
													<React.Fragment>
														{product.old_price > 0 && (
															<span className="strike-text mr-1">
																{" "}
																{localStorage.getItem("currencySymbolAlign") === "left" &&
																	localStorage.getItem("currencyFormat")}{" "}
																{product.old_price}
																{localStorage.getItem("currencySymbolAlign") === "right" &&
																	localStorage.getItem("currencyFormat")}
															</span>
														)}

														<span>
															{localStorage.getItem("currencySymbolAlign") === "left" &&
																localStorage.getItem("currencyFormat")}{" "}
															{product.price}
															{localStorage.getItem("currencySymbolAlign") === "right" &&
																localStorage.getItem("currencyFormat")}
														</span>
													</React.Fragment>
												)}
											</span>
											{product.desc !== null ? (
																						<div className="item-desc-short" style={{ color: "rgba(40,44,63,.45)" }}>
																							<ShowMore
																								lines={2}
																								more={localStorage.getItem("showMoreButtonText")}
																								less={localStorage.getItem("showLessButtonText")}
																								anchorclassName="show-more ml-1"
																							>
																								<div
																									dangerouslySetInnerHTML={{
																										__html: product.desc,
																									}}
																								/>
																							</ShowMore>
																						</div>
																					) : null}
										</div>
										<div
											className="btn-group btn-group-sm my-5"
											role="group"
											aria-label="btnGroupIcons1"
											style={{ height: "40px", left: "25%",width:120 ,height:38,top: 55,
											right: -5,
											borderRadius: 10}}
										>
											{product.is_active ? (
												<React.Fragment>
													{isItemExistInCart(product.id) ? (
													<React.Fragment>
													{product.addons && Object.keys(product.addons).length ? (
														<React.Fragment>
														<button
															// disabled
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
																	product.id
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
																removeProduct(product);
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
																	product.id
															).quantity}
														</button>
														</React.Fragment>
													)}
													{Object.keys(product.addons).length ? (
														<Customization
															product={product}
															addProduct={addProduct}
															cartProducts={cartProducts}
															update={this.props.forceStateUpdate}
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
																addProduct(product);
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
													{Object.keys(product.addons).length ? (
														<Customization
															product={product}
															addProduct={addProduct}
															cartProducts={cartProducts}
															update={this.props.forceStateUpdate}
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
															product.quantity = 1;
															addProduct(product);
															this.forceStateUpdate();
														}}
													>
														Add
														<Ink duration="500" />
													</button>
													)}
												</React.Fragment>
												)}
												</React.Fragment>
												
											) : (
												<div className="d-flex align-items-center item-not-avail">
													{localStorage.getItem("cartItemNotAvailable")}
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					) : (
						<div key={product.id}
							className="category-list-item"
							style={{
								display: "flex",
								justifyContent: "space-between",
							}}
						>
							
							<div className={`${product.image !== null && product.addons && Object.keys(product.addons).length > 0 && ""} ${product.image === null && product.addons && Object.keys(product.addons).length > 0 && "blank-image-no-desc"} list-item-img-sec`}
							style={{    marginLeft: 12,
								maxHeight: 164,
								minWidth: 156}}>
							<React.Fragment>
							{product.image !== null ? (
								<React.Fragment>
									<Link to={restaurant.slug + "/" + product.id}>
									</Link>
										<React.Fragment>
											<ProgressiveImage
											
												src={product.image}
												placeholder="/assets/img/various/blank.png"
											>
												{(src, loading) => (
													<img
													onClick={() => this.handleItemClick({data:product,open:true})}
													style={{
														opacity: loading ? "0.5" : "1",
														width: "156px",
														height: "144px",
														borderRadius:12,
														marginBottom:30
													}}
														
														src={src}
														alt={product.name}
														className="flex-item-image-v2"
													/>
												)}
											</ProgressiveImage>
											
										</React.Fragment>
										
								</React.Fragment>
							):(
								<React.Fragment>
									<Link to={restaurant.slug + "/" + product.id} onClick={e => e.preventDefault()}>
										<React.Fragment>
											<ProgressiveImage
												src={product.image}
												placeholder="/assets/img/various/blank.png"
											>
												{(src, loading) => (
													<img
													onClick={() => this.handleItemClick({data:product,open:true})}
														style={{
															opacity: loading ? "0.5" : "1",
															width: "156px",
															height: "144px",
															borderRadius:12,
															marginBottom:30
														}}
														src={src}
														alt={product.name}
														className="flex-item-image-v2"
													/>
												)}
											</ProgressiveImage>
										</React.Fragment>
									</Link>
								</React.Fragment>
							)}
							</React.Fragment>
							<div className={`item-actions pull-right pb-0 ${localStorage.getItem("showVegNonVegBadge") === "true" && product.is_veg !== null && product.image === null ? "mt-15" : null}`} 
							style={{top : product.image === null ? "5px" : null,top:116,right:16}}>
								<div
									className="btn-group btn-group-sm"
									role="group"
									aria-label="btnGroupIcons1"
									style={{ height: "32px",width:120,height:38,
									borderRadius: 10}}
								>
									{product.is_active ? (
										<React.Fragment>
											{isItemExistInCart(product.id) ? (
											<React.Fragment>
											{product.addons &&
												Object.keys(product.addons).length ? (
													<React.Fragment>
													<button
														disabled
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
														style={{height:38}}>
														{cartProducts.find(
															(cp) =>
																cp.id ===
																product.id
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
															product.quantity = 1;
															removeProduct(product);
															this.forceStateUpdate();
														}}
													>
														<span className="btn-dec">-</span>
														<Ink duration="500" />
													</button>
													<button type="button" className="btn btn-quantity-v2 btn-list-item-q-v2"
														style={{height:38,}}>
														{cartProducts.find(
															(cp) =>
																cp.id ===
																product.id
														).quantity}
													</button>
													</React.Fragment>
												)}
												{product.addons &&
												Object.keys(product.addons).length ? (
													<Customization
														product={product}
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
															addProduct(product);
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
												{product.addons &&
												Object.keys(product.addons).length ? (
													<Customization
														product={product}
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
														product.quantity = 1;
														addProduct(product);
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
											<span className="itemNotAvail"> {localStorage.getItem("cartItemNotAvailable")}</span>
										</div>
									)}
								</div>
								{product.addons && Object.keys(product.addons).length > 0 && (
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
							
							<div className="list-items-new">
								{localStorage.getItem("showVegNonVegBadge") === "true" &&
								product.is_veg !== null && (
									<React.Fragment>
										{product.is_veg ? (
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
									product.image !== null ? "flex-item-name" : "flex-item-name"
								}
							>
								<div className="item-badge-collection">
								<div className="item-new-badge">
								<ItemBadge item={product}  type={restaurant.store_type} noVegBadge={product.is_veg !== null ? true : false} />
								</div>
							</div>
								<div className="item-name" style={{fontWeight: 'bold',
									fontSize: 18,
									lineHght: 20,
									letterSpacing: -0.3,
									color: 'rgba(2, 6, 12, 0.75)',
									fontFamily:'Basis Grotesque Pro',
									lineHeight:'20px'}}	>
								{product.name}
								</div>{" "}
								<span style={{fontWeight: 400,
									fontSize: 18,
									letterSpacing: -0.3,
									color: 'rgba(2, 6, 12, 0.92)',
									fontFamily:'Basis Grotesque Pro'}}>
									{localStorage.getItem("hidePriceWhenZero") === "true" &&
									product.price === "0.00" ? null : (
										<React.Fragment>
											{product.old_price > 0 && (
												<span className="strike-text mr-1">
													{" "}
													{localStorage.getItem("currencySymbolAlign") ===
														"left" &&
														localStorage.getItem("currencyFormat")}{" "}
													{product.old_price}
													{localStorage.getItem("currencySymbolAlign") ===
														"right" &&
														localStorage.getItem("currencyFormat")}
												</span>
											)}

											<span>
												{localStorage.getItem("currencySymbolAlign") ===
													"left" &&
													localStorage.getItem("currencyFormat")}{" "}
												{product.price}
												{localStorage.getItem("currencySymbolAlign") ===
													"right" &&
													localStorage.getItem("currencyFormat")}
											</span>

											{product.old_price > 0 &&
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
															((parseFloat(product.old_price) -
																parseFloat(product.price)) /
																parseFloat(product.old_price)) *
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
								{product.desc !== null ? (
																						<div className="item-desc-short" style={{ color: "rgba(40,44,63,.45)" }}>
																							<ShowMore
																								lines={2}
																								more={localStorage.getItem("showMoreButtonText")}
																								less={localStorage.getItem("showLessButtonText")}
																								anchorclassName="show-more ml-1"
																							>
																								<div
																									dangerouslySetInnerHTML={{
																										__html: product.desc,
																									}}
																								/>
																							</ShowMore>
																						</div>
																					) : null}
							</div>
							</div>

							
							
						</div>
						
					)}
					
				</React.Fragment>
			}
		</React.Fragment>
			
		);
	}
}

const mapStateToProps = (state) => ({
	cartProducts: state.cart.products,
});

export default connect(
	mapStateToProps,
	{ addProduct, removeProduct }
)(RecommendedItems);
