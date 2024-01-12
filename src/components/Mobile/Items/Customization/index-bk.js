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
		const { product, cartProducts } = this.props;
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
				{isItemExistInCart(product.id) ? (
				<button
					type="button"
					className=" btn-add-remove btn-list-item-p"
					style={{
						color: localStorage.getItem("cartColor-bg"),
					}}
					onClick={this.handlePopupOpen}
				>
					<span className="btn-inc">+</span>
					<Ink duration="500" />
				</button>
				):(
				<button
					type="button"
					className=" btn-add-remove btn-custom-add btn-list-item-add"
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
							<div className="_2qxe4">Available Quantities</div>
								{Object.keys(product.addons).map((category) => (
								<div className="a7UZQ" key={product.addons[category][0].addon_category.id}>
									{product.addons[category].length && (
									<React.Fragment>
									<div className="xyVES _2QcnG">
										<div className="-X69V" />
									</div>
									<div className="_2yeOo">
										<div className="ywD98">650 ml</div>
										<div className="rupee">195</div>
									</div>
									</React.Fragment>
									)}
								</div>
								))}
							</div>
							<div className="_2SVSR">
								<div className="_2jmtx">
								<div>Item total <span className="rupee">195</span></div>
								<span className="_3EnLm">Add Item</span>
								</div>
							</div>
						</div>
					</div>
				</Drawer>
				<Modal open={this.state.open} onClose={this.handlePopupClose} closeIconSize={32}>
				<div className="custom-pop" style={{ margin:"-2.4rem", backgroundColor: "#f2f6fc" }}>
					<div style={{ padding:"1.2rem" }}>
						{Object.keys(product.addons).map((category) => (
						<React.Fragment key={product.id}>
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
						))}
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
									{/* <p className="addon-category-name mb-2">{addon_category.name}</p> */}
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
			</React.Fragment>
		);
	}
}

export default Customization;
