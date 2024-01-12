import React, { Component } from "react";

import Ink from "react-ink";

import Modal from "react-responsive-modal";
import { Drawer } from "@material-ui/core";

class Customization extends Component {
	state = {
		open: false,
	};

	_processAddons = (product) => {
		let addons = [];
		addons["selectedaddons"] = [];

		let radio = document.querySelectorAll("input[type=radio]:checked");
		for (let i = 0; i < radio.length; i++) {
			addons["selectedaddons"].push({
				addon_category_name: radio[i].name,
				addon_id: radio[i].getAttribute("data-addon-id"),
				addon_name: radio[i].getAttribute("data-addon-name"),
				price: radio[i].value,
			});
		}

		let checkboxes = document.querySelectorAll("input[type=checkbox]:checked");

		for (let i = 0; i < checkboxes.length; i++) {
			addons["selectedaddons"].push({
				addon_category_name: checkboxes[i].name,
				addon_id: checkboxes[i].getAttribute("data-addon-id"),
				addon_name: checkboxes[i].getAttribute("data-addon-name"),
				price: checkboxes[i].value,
			});
		}

		this.props.addProduct(Object.assign(addons, product));
	};

	handlePopupOpen = () => {
		this.setState({ open: true });
		//for forcing state update every 100ms to prevent misuse of changing addon price
		this.rerenderInterval = setInterval(() => {
			this.props.forceUpdate();
		}, 100);
	};
	handlePopupClose = () => {
		this.setState({ open: false });
		this.props.forceUpdate();
		clearInterval(this.rerenderInterval);
	};

	componentWillUnmount() {
		clearInterval(this.rerenderInterval);
	}

	render() {
		const { product, cartProducts,store_type } = this.props;
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
					store_type && store_type.store_ui === "restaurant" &&
						<React.Fragment>
					{isItemExistInCart(product.id) ? (
					<button
						type="button"
						className="btn btn-add-remove btn-list-item-p"
						style={{
							color: localStorage.getItem("cartColor-bg")
						}}
						onClick={this.handlePopupOpen}
					>
						<span className="btn-inc">+</span>
						<Ink duration="500" />
					</button>
					):(
					<button
						type="button"
						className="btn btn-add-remove btn-custom-add btn-list-item-add"
						style={{
							color: localStorage.getItem("cartColor-bg"),
						}}
						onClick={this.handlePopupOpen}
					>
						Add
						<span className="E1J0B" aria-hidden="true"></span>
						<Ink duration="500" />
					</button>
					)}
					{localStorage.getItem("enableAddonDrawer") === "true" ? (
					<Drawer anchor="bottom" className="bottom-sheet address-bottom-sheet" open={this.state.open} onClose={this.handlePopupClose}>
					<div className="_1C9MZ _37xF_ _1EtzI">
						<div className="glG8N">
							<div className="_3pF6k">
								<div className="_1ZvQ3">
									{product.image !== null ? (
										<img src={product.image} className="_3svd9" />
									):null}
								</div>
								<div className="_1TDkx">{product.name} {product.price > 0 && (<span className="_3Qs0i"> - {localStorage.getItem("currencySymbolAlign") === "left" &&
										localStorage.getItem("currencyFormat")}{parseFloat(product.price)}{localStorage.getItem("currencySymbolAlign") === "right" &&
										localStorage.getItem("currencyFormat")}</span>)}</div>
							</div>
							<div className="_1LLwX">
								{Object.keys(product.addons).map((category) => (
								<React.Fragment key={product.addons[category][0].addon_category.id}>
								<div className="_2qxe4" key={product.addons[category][0].addon_category.id}>{product.addons[category][0].addon_category.name}</div>
								<div className="">
									{product.addons[category].length && (
									<React.Fragment>
										{product.addons[category].map((addon, index) => (
											<React.Fragment key={addon.id}>
											{/* <div className="xyVES _2QcnG">
												<div className="-X69V" />
											</div>
											<div className="_2yeOo">
												<div className="ywD98">650 ml</div>
												<div className="rupee">195</div>
											</div> */}
											<div className="form-group addon-list">
												<input
													type={
														product.addons[category][0].addon_category.type === "SINGLE" ? "radio" : "checkbox"
													}
													className={
														product.addons[category][0].addon_category.type === "SINGLE"
															? "magic-radio"
															: "magic-checkbox"
													}
													name={product.addons[category][0].addon_category.name}
													data-addon-id={addon.id}
													data-addon-name={addon.name}
													value={addon.price}
													defaultChecked={
														product.addons[category][0].addon_category.type === "SINGLE" && index === 0 && true
													}
													id={`uId${addon.id}`}
													onClick={() => {
														if (addon.addon_category.addon_limit > 0) {
															var uId = addon.addon_category.id;
															var checks = document.querySelectorAll(
																"#uId" + uId
															);
															var max = addon.addon_category.addon_limit;
															for (var i = 0; i < checks.length; i++) {
																checks[i].onclick = selectiveCheck;
																function selectiveCheck() {
																	var checkedChecks = document.querySelectorAll(
																		"#uId" + uId + ":checked"
																	);
																	if (checkedChecks.length >= max + 1)
																		return false;
																}
															}
														}
													}}
												/>
												{product.addons[category][0].addon_category.type === "SINGLE" && (
													<label htmlFor={addon.name} />
												)}

												<label className="text addon-label" htmlFor={addon.name}>
												<span className="custom-addon-label-name">
													{addon.name}{" "}
												</span>
												<br/>
												<span className="strike-text addon-label-price ml-1">
													{localStorage.getItem("hidePriceWhenZero") === "true" &&
													addon.old_price === "0.00" ? null : (
														<React.Fragment>
															{localStorage.getItem("currencySymbolAlign") ===
																"left" &&
																localStorage.getItem("currencyFormat")}
															{addon.old_price}{" "}
															{localStorage.getItem("currencySymbolAlign") ===
																"right" &&
																localStorage.getItem("currencyFormat")}
														</React.Fragment>
													)}
												</span>
												<span className="addon-label-price font-weight-bold ml-1">
													{localStorage.getItem("hidePriceWhenZero") === "true" &&
													addon.price === "0.00" ? null : (
														<React.Fragment>
															{localStorage.getItem("currencySymbolAlign") ===
																"left" &&
																localStorage.getItem("currencyFormat")}
															{addon.price}{" "}
															{localStorage.getItem("currencySymbolAlign") ===
																"right" &&
																localStorage.getItem("currencyFormat")}
														</React.Fragment>
													)}
												</span>
												{addon.old_price && addon.old_price > 0 && (
												<span
													className="price-percentage-discount ml-1"
													style={{
														color: localStorage.getItem(
															"cartColorBg"
														),
													}}
												>
													{parseFloat(
														((parseFloat(addon.old_price) -
															parseFloat(addon.price)) /
															parseFloat(addon.old_price)) *
															100
													).toFixed(0)}
													{localStorage.getItem(
														"itemPercentageDiscountText"
													)}
												</span>
												)} 
												</label>
											</div>
											</React.Fragment>
										))}
									</React.Fragment>
									)}
								</div>
								</React.Fragment>
								))}
							</div>
							<div className="_2SVSR">
								<div className="_2jmtx" onClick={() => {
										this._processAddons(product);
										this.handlePopupClose();
									}}>
								{/* <div>Item total <span className="rupee">195</span></div> */}
								<span className="_3EnLm">{localStorage.getItem("customizationDoneBtnText")}</span>
								</div>
							</div>
						</div>
					</div>
					</Drawer>
					):(

					<Modal open={this.state.open} onClose={this.handlePopupClose} closeIconSize={32}>
					<div className="custom-pop" style={{ margin:"-2.4rem", backgroundColor: "#f2f6fc" }}>
						<div style={{ padding:"1.2rem" }}>
							<div className="">
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
							<h3 className="pt-15 pl-15 custom-cat-name" style={{ marginBottom: "1px"}}>{product.name} {product.price > 0 && (<span className="_3Qs0i">- {localStorage.getItem("currencySymbolAlign") === "left" &&
										localStorage.getItem("currencyFormat")}{parseFloat(product.price)}{localStorage.getItem("currencySymbolAlign") === "right" &&
										localStorage.getItem("currencyFormat")}</span>)}</h3>
							</div>
							<React.Fragment key={product.id}>
								<button
									className="btn btn-lg btn-customization-done"
									onClick={() => {
										this._processAddons(product);
										this.handlePopupClose();
									}}
									style={{
										backgroundColor: localStorage.getItem("cartColorBg"),
										color: localStorage.getItem("cartColorText"),
									}}
								>
									{localStorage.getItem("customizationDoneBtnText")}
								</button>
							</React.Fragment>
						</div>
					<hr style={{ borderColor: "#ccc" }} />
					</div>
						<div
							style={{
								textAlign: "left",
							}}
						>
							{Object.keys(product.addons).map((category) => (
								<div key={product.addons[category][0].addon_category.id} className="addon-category-block mt-50">
									<React.Fragment>
										<p className="addon-category-name mb-2">{product.addons[category][0].addon_category.name}</p>
										{product.addons[category].length && (
											<React.Fragment>
												{product.addons[category].map((addon, index) => (
													<React.Fragment key={addon.id}>
														<div className="form-group addon-list">
															<input
															   
															   
																type={
																	product.addons[category][0].addon_category.type === "SINGLE" ? "radio" : "checkbox"
																}
																className={
																	product.addons[category][0].addon_category.type === "SINGLE"
																		? "magic-radio"
																		: "magic-checkbox"
																}
																
																name={product.addons[category][0].addon_category.name}
																data-addon-id={addon.id}
																data-addon-name={addon.name}
																value={addon.price}
																defaultChecked={
																	product.addons[category][0].addon_category.type === "SINGLE" && index === 0 && true
																}
																id={`uId${addon.id}`}
																onClick={() => {
																	if (addon.addon_category.addon_limit > 0) {
																		var uId = addon.addon_category.id;
																		var checks = document.querySelectorAll(
																			"#uId" + uId
																		);
																		var max = addon.addon_category.addon_limit;
																		for (var i = 0; i < checks.length; i++) {
																			checks[i].onclick = selectiveCheck;
																			function selectiveCheck() {
																				var checkedChecks = document.querySelectorAll(
																					"#uId" + uId + ":checked"
																				);
																				if (checkedChecks.length >= max + 1)
																					return false;
																			}
																		}
																	}
																}}
															/>
															{product.addons[category][0].addon_category.type === "SINGLE" && (
																<label htmlFor={addon.name} />
															)}

															<label className="text addon-label" htmlFor={addon.name}>
															<span className="custom-addon-label-name">
																{addon.name}{" "}
															</span>
																<span className="addon-label-price ml-1">
																	{localStorage.getItem("hidePriceWhenZero") === "true" &&
																	addon.price === "0.00" ? null : (
																		<React.Fragment>
																			{localStorage.getItem("currencySymbolAlign") ===
																				"left" &&
																				localStorage.getItem("currencyFormat")}
																			{addon.price}{" "}
																			{localStorage.getItem("currencySymbolAlign") ===
																				"right" &&
																				localStorage.getItem("currencyFormat")}
																		</React.Fragment>
																	)}
																</span>
															</label>
														</div>
													</React.Fragment>
												))}
											</React.Fragment>
										)}
										<hr className="mb-20" />
									</React.Fragment>
								</div>
							))}
						</div>
					</Modal>
					)}
						</React.Fragment>
				}
				{
					store_type && store_type.name === "Resturant V2" &&
						<React.Fragment>
							{isItemExistInCart(product.id) ? (
							<button
								type="button"
								className=" btn-add-remove-v2 btn-list-item-p-v2"
								style={{
									color: localStorage.getItem("cartColor-bg"),
									borderRadius:'0px 10px 10px 0px',
									height:38,
									outline:'none'
									
								}}
								onClick={this.handlePopupOpen}
							>
								<span className="btn-inc">+</span>
							</button>
							):(
							<button
								type="button"
								className=" btn-add-remove-v2 btn-custom-add btn-list-item-add-v2"
								style={{
									color: localStorage.getItem("cartColor-bg"),
									outline:'none'
								}}
								onClick={this.handlePopupOpen}
							>
								Add
								{/* <span className="E1J0B" aria-hidden="true"></span> */}
								<div style={{color:'gray',marginTop:10,fontWeight:200,
								fontSize:13,position:'absolute',right:24,textTransform:'capitalize'}}>Customisable</div>
								
							</button>
							)}

							<Modal open={this.state.open} onClose={this.handlePopupClose} closeIconSize={0}>
							<div className="custom-pop" style={{ margin:"-2.4rem", background:'#f1f0f5' }}>
								<div>
									<div className="">
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

								<div className="_3pF6k" style={{margin:'32px 16px 16px',background:'#f1f0f5',
									borderBottom:'#d5d4d9',padding:0
									}}>
										{/* <div className="_1ZvQ3">
											{product.image !== null ? (
												<img src={product.image} className="_3svd9" />
											):null}
										</div> */}
										<div>
										<div className="_1TDkx" 
										style={{fontFamily: 'Basis Grotesque Pro',fontWeight: 200,
													fontSize: 14,
													lineHeight:'18px',
													letterSpacing: '-0.3px',
													color: 'rgba(2, 6, 12, 0.6)'}}>
														{product.name} 
														{product.price > 0 && (<span className=""> - {localStorage.getItem("currencySymbolAlign") === "left" &&
												localStorage.getItem("currencyFormat")}{parseFloat(product.price)}{localStorage.getItem("currencySymbolAlign") === "right" &&
												localStorage.getItem("currencyFormat")}</span>)}</div>
										
									<div style={{fontFamily: 'Basis Grotesque Pro',fontWeight: 800,
													fontSize: 20,
													lineHeight:'24px',
													letterSpacing: '-0.3px',
													color: 'rgba(2, 6, 12, 0.75)',
													marginBottom:12,
													marginTop:4}}>
											Customise as per your taste
									</div>
										</div>
										<div
											onClick={this.handlePopupClose}	
											className="d-flex justify-content-center align-items-center" style={{background:'white',width:30,height:30,
											position:'absolute',top:10,right:10,borderRadius:50,fontSize:20}}>
												<img   style={{width:18,height:18}}
											src="/assets/img/various/cross-icon.png"/>
										</div>
									</div>
									
									</div>
									<React.Fragment key={product.id}>
										<button
											className="btn btn-lg btn-customization-done"

											onClick={() => {
												this._processAddons(product);
												this.handlePopupClose();
											}}
											style={{
												// localStorage.getItem("cartColorBg")
												backgroundColor:"rgb(28, 166, 114)" ,
												color: localStorage.getItem("cartColorText"),
												borderRadius:20,
												width:'90%',
												margin: '0px 20px'
											}}
										>
											Add Item{/* {localStorage.getItem("customizationDoneBtnText")} */}
										</button>
									</React.Fragment>
								</div>
							
							</div>
								<div
									style={{
										textAlign: "left",
										marginTop:44
									}}
								>
									{Object.keys(product.addons).map((category) => (
										<div key={product.addons[category][0].addon_category.id} className="addon-category-block">
											<React.Fragment>
												<div className=""  style={{
										fontFamily:"Basis Grotesque Pro",
										fontWeight:700,fontSize:17,lineHeight:'19px',letterSpacing:'-0.3px',
										color:'rgba(2, 6, 12, 0.75)',textTransform:'capitalize'}}>
													{product.addons[category][0].addon_category.name}
												</div>
												<div style={{
										marginBottom:18,
										fontFamily:"Basis Grotesque Pro",
										fontWeight:300,fontSize:14,lineHeight:'19px',letterSpacing:'-0.3px',
										color:'rgba(2, 6, 12, 0.75)'}}>
											{
												product.addons[category][0].addon_category.type === "SINGLE" ?
												<>
												Select any 1
												</>
												:
												<>
												Select multiple
												</>
											}
										</div>
										<div style={{background:'white',padding:'20px 16px 0px',borderRadius:16}}>

												{product.addons[category].length && (
													<React.Fragment>
														{product.addons[category].map((addon, index) => (
															<React.Fragment key={addon.id}>
																<div className="form-group addon-list" style={{paddingBottom:20}}>
																	<input
																	    disabled={addon.is_active == 0 ? true : false}
																		type={
																			product.addons[category][0].addon_category.type === "SINGLE" ? "radio" : "checkbox"
																		}
																		className={"magic-checkbox-v2"}
																		name={product.addons[category][0].addon_category.name}
																		data-addon-id={addon.id}
																		data-addon-name={addon.name}
																		value={addon.price}
																		defaultChecked={
																			product.addons[category][0].addon_category.type === "SINGLE" && index === 0 && true
																		}
																		id={`uId${addon.id}`}
																		onClick={() => {
																			if (addon.addon_category.addon_limit > 0) {
																				var uId = addon.addon_category.id;
																				var checks = document.querySelectorAll(
																					"#uId" + uId
																				);
																				var max = addon.addon_category.addon_limit;
																				for (var i = 0; i < checks.length; i++) {
																					checks[i].onclick = selectiveCheck;
																					function selectiveCheck() {
																						var checkedChecks = document.querySelectorAll(
																							"#uId" + uId + ":checked"
																						);
																						if (checkedChecks.length >= max + 1)
																							return false;
																					}
																				}
																			}
																		}}
																	/>
																	{product.addons[category][0].addon_category.type === "SINGLE" && (
																		<label htmlFor={addon.name} />
																	)}

																	<label className="text addon-label" htmlFor={addon.name} style={{fontFamily:'Basis Grotesque Pro',
																fontWeight: 200,
																fontSize: 16,
																lineHeight:'19px',
																letterSpacing:'-0.3px',
																color: 'rgba(2, 6, 12, 0.75)',
																textTransform:'capitalize'}}>
																	<span className="custom-addon-label-name">
																		{addon.name}{" "}
																	</span>
																		<span className="addon-label-price ml-1">
																			{localStorage.getItem("hidePriceWhenZero") === "true" &&
																			addon.price === "0.00" ? null : (
																				<React.Fragment>
																					{localStorage.getItem("currencySymbolAlign") ===
																						"left" &&
																						localStorage.getItem("currencyFormat")}
																					{addon.price}{" "}
																					{localStorage.getItem("currencySymbolAlign") ===
																						"right" &&
																						localStorage.getItem("currencyFormat")}
																				</React.Fragment>
																			)}
																		</span>
																	</label>
																</div>
															</React.Fragment>
														))}
													</React.Fragment>
												)}

										</div>
												
											</React.Fragment>
										</div>
									))}
								</div>
							</Modal>
							
						</React.Fragment>
				}
			</React.Fragment>
			
		);
	}
}

export default Customization;
