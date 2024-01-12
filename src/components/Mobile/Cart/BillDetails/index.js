import React, { Component } from "react";

import { connect } from "react-redux";
import { formatPrice } from "../../../helpers/formatPrice";
import { couponApplied } from "../../../../services/coupon/actions";

class BillDetails extends Component {
	state = {
		delivery_charges: 0,
		store_surge_fee: 0,
		distance: 0,
		tips: 0,
		couponAppliedAmount: 0,
		totalItemTax: 0,
	};

	componentDidMount() {
		if (localStorage.getItem("userSelected") === "SELFPICKUP") {
			this.setState({ delivery_charges: 0 });
		} else {
			if (parseFloat(this.props.restaurant_info.free_delivery_subtotal) > 0) {
				if (parseFloat(this.props.total) >= parseFloat(this.props.restaurant_info.free_delivery_subtotal)) {
					console.log("Free Delivery 😍");
					this.setState({ delivery_charges: 0 });
				} else {
					this.surgeDeliveryCharge(this.props.total, this.props.restaurant_info.delivery_charges);
					// this.setState({ delivery_charges: this.props.restaurant_info.delivery_charges });
				}
			} else {
				this.surgeDeliveryCharge(this.props.total, this.props.restaurant_info.delivery_charges);
				// this.setState({ delivery_charges: this.props.restaurant_info.delivery_charges });
			}
		}
		this.setState({ store_surge_fee: this.getStoreSurgeCalculation(this.props) });
	}

	componentWillReceiveProps(nextProps) {
		if (localStorage.getItem("userSelected") === "DELIVERY") {
			if (this.props.restaurant_info.delivery_charges !== nextProps.restaurant_info.delivery_charges) {
				this.surgeDeliveryCharge(nextProps.total, nextProps.restaurant_info.delivery_charges);
				// this.setState({ delivery_charges: nextProps.restaurant_info.delivery_charges });
			}

			if (this.props.total !== nextProps.total) {
				if (nextProps.restaurant_info.delivery_charge_type !== "DYNAMIC") {
					if (parseFloat(nextProps.restaurant_info.free_delivery_subtotal) > 0) {
						if (
							parseFloat(nextProps.total) >= parseFloat(nextProps.restaurant_info.free_delivery_subtotal)
						) {
							console.log("Free Delivery 😍");
							this.setState({ delivery_charges: 0 });
						} else {
							this.surgeDeliveryCharge(nextProps.total, nextProps.restaurant_info.delivery_charges);
							// this.setState({ delivery_charges: nextProps.restaurant_info.delivery_charges });
						}
					} else {
						this.surgeDeliveryCharge(nextProps.total, nextProps.restaurant_info.delivery_charges);
						// this.setState({ delivery_charges: nextProps.restaurant_info.delivery_charges });
					}
					return;
				}
			}
		}
		this.setState({ store_surge_fee: this.getStoreSurgeCalculation(this.props) });

		// if (nextProps.distance) {
		if (localStorage.getItem("userSelected") === "DELIVERY") {
			if (nextProps.restaurant_info.delivery_charge_type === "DYNAMIC") {
				this.setState({ distance: nextProps.distance }, () => {
					if (parseFloat(nextProps.restaurant_info.free_delivery_subtotal) > 0) {
						if (
							parseFloat(nextProps.total) >= parseFloat(nextProps.restaurant_info.free_delivery_subtotal)
						) {
							console.log("Free Delivery 😍");
							this.setState({ delivery_charges: 0 });
						} else {
							//check if restaurant has dynamic delivery charge..
							this.calculateDynamicDeliveryCharge(nextProps.total);
						}
					} else {
						//check if restaurant has dynamic delivery charge..
						this.calculateDynamicDeliveryCharge(nextProps.total);
					}
				});
			} else {
				this.setState({ distance: nextProps.distance });
			}
		}
		// }
	}

	calculateDynamicDeliveryCharge = (total) => {
		const { restaurant_info } = this.props;

		const distanceFromUserToRestaurant = this.state.distance;
		console.log("Distance from user to restaurant 2: " + distanceFromUserToRestaurant + " km");
		if (parseFloat(distanceFromUserToRestaurant) > parseFloat(restaurant_info.base_delivery_distance)) {
			const extraDistance = parseFloat(distanceFromUserToRestaurant) -  parseFloat(restaurant_info.base_delivery_distance);
			console.log("Extra Distance: " + extraDistance + " km");

			const extraCharge =
				(extraDistance / restaurant_info.extra_delivery_distance) * restaurant_info.extra_delivery_charge;
			console.log("Extra Charge: " + extraCharge);

			let dynamicDeliveryCharge = parseFloat(restaurant_info.base_delivery_charge) + parseFloat(extraCharge);
			console.log("Total Charge: " + dynamicDeliveryCharge);
			if (localStorage.getItem("enDelChrRnd") === "true") {
				dynamicDeliveryCharge = Math.ceil(dynamicDeliveryCharge);
			}
			// console.log('ramesh1', dynamicDeliveryCharge);
			this.surgeDeliveryCharge(total, dynamicDeliveryCharge);
			// this.setState({ delivery_charges: dynamicDeliveryCharge });
		} else {
			// this.setState({ delivery_charges: restaurant_info.base_delivery_charge });
			this.surgeDeliveryCharge(total, restaurant_info.base_delivery_charge);
		}
	};

	surgeDeliveryCharge = (total, deliveryCharge) =>{
		const restaurantInfo = this.props.restaurant_info;
		if (restaurantInfo && restaurantInfo.surge_settings) {
			const { surge_settings } = this.props.restaurant_info;
			const distanceFromUserToRestaurant = this.state.distance;
			// //distance based surge_settings
			if (surge_settings.enable_surge_below_distance && parseFloat(distanceFromUserToRestaurant) <= parseFloat(surge_settings.below_distance)) {
				// if the delivery charge type is DYNAMIC, calculate dynamic charge
				if (surge_settings.below_distance_delivery_charge_type === 'DYNAMIC') {
					this.calculateDistanceSurgeCharge('below', surge_settings);
				} 
				// if the delivery charge type is FIXED, set the fixed surge delivery charge
				else {
					this.setState({ delivery_charges: surge_settings.below_distance_delivery_charge });
				}
			} else if (surge_settings.enable_surge_above_distance && parseFloat(distanceFromUserToRestaurant) > parseFloat(surge_settings.above_distance)) {
				// if the delivery charge type is DYNAMIC, calculate dynamic charge
				if (surge_settings.above_distance_delivery_charge_type === 'DYNAMIC') {
					this.calculateDistanceSurgeCharge('above', surge_settings);
				} 
				// if the delivery charge type is FIXED, set the fixed surge delivery charge
				else {
					this.setState({ delivery_charges: surge_settings.above_distance_delivery_charge });
				}
			} else {
				// total based surge_settings
				// if order total is below the specified amount and surge pricing is enabled for this case
				if (surge_settings.enable_surge_below_order && parseFloat(total) <= parseFloat(surge_settings.below_order_amount)) {
					// if the delivery charge type is DYNAMIC, calculate dynamic charge
					if (surge_settings.below_order_delivery_charge_type === 'DYNAMIC') {
						this.calculateSurgeCharge('below', surge_settings);
					} 
					// if the delivery charge type is FIXED, set the fixed surge delivery charge
					else {
						this.setState({ delivery_charges: surge_settings.below_order_delivery_charge });
					}
				}
				// if order total is above the specified amount and surge pricing is enabled for this case
				else if (surge_settings.enable_surge_above_order && parseFloat(total) > parseFloat(surge_settings.above_order_amount)) {
					// if the delivery charge type is DYNAMIC, calculate dynamic charge
					if (surge_settings.above_order_delivery_charge_type === 'DYNAMIC') {
						this.calculateSurgeCharge('above', surge_settings);
					} 
					// if the delivery charge type is FIXED, set the fixed surge delivery charge
					else {
						this.setState({ delivery_charges: surge_settings.above_order_delivery_charge });
					}
				} 
				// if none of the surge pricing conditions apply, set the regular delivery charge
				else {
					this.setState({ delivery_charges: deliveryCharge });
				}
			}
		} else {
			this.setState({ delivery_charges: deliveryCharge });
		}
	};

	calculateSurgeCharge = (type, surge_settings) => {
		const distanceFromUserToRestaurant = this.state.distance;
	
		const base_delivery_distance = surge_settings[`${type}_order_base_delivery_distance`];
		const base_delivery_charge = surge_settings[`${type}_order_base_delivery_charge`];
		const extra_delivery_distance = surge_settings[`${type}_order_extra_delivery_distance`];
		const extra_delivery_charge = surge_settings[`${type}_order_extra_delivery_charge`];
	
		if (distanceFromUserToRestaurant > base_delivery_distance) {
			const extraDistance = distanceFromUserToRestaurant - base_delivery_distance;
	
			const extraCharge = (extraDistance / extra_delivery_distance) * extra_delivery_charge;
	
			let surgeDeliveryCharge = parseFloat(base_delivery_charge) + parseFloat(extraCharge);
			
			if (localStorage.getItem("enDelChrRnd") === "true") {
				surgeDeliveryCharge = Math.ceil(surgeDeliveryCharge);
			}
	
			this.setState({ delivery_charges: surgeDeliveryCharge });
		} else {
			this.setState({ delivery_charges: base_delivery_charge });
		}
	};

	calculateDistanceSurgeCharge = (type, surge_settings) => {
		const distanceFromUserToRestaurant = this.state.distance;
	
		const base_delivery_distance = surge_settings[`${type}_distance_base_delivery_distance`];
		const base_delivery_charge = surge_settings[`${type}_distance_base_delivery_charge`];
		const extra_delivery_distance = surge_settings[`${type}_distance_extra_delivery_distance`];
		const extra_delivery_charge = surge_settings[`${type}_distance_extra_delivery_charge`];
	
		if (distanceFromUserToRestaurant > base_delivery_distance) {
			const extraDistance = distanceFromUserToRestaurant - base_delivery_distance;
	
			const extraCharge = (extraDistance / extra_delivery_distance) * extra_delivery_charge;
	
			let surgeDeliveryCharge = parseFloat(base_delivery_charge) + parseFloat(extraCharge);
			
			if (localStorage.getItem("enDelChrRnd") === "true") {
				surgeDeliveryCharge = Math.ceil(surgeDeliveryCharge);
			}
	
			this.setState({ delivery_charges: surgeDeliveryCharge });
		} else {
			this.setState({ delivery_charges: base_delivery_charge });
		}
	};	

	getStoreSurgeCalculation = (props) => {
		const { total, restaurant_info } = props;
		let surge_fee = 0;
	
		if (restaurant_info.enable_store_surge === 1) {
			let store_surge_fee = (restaurant_info.store_surge_type === "PERCENTAGE") 
				? (total * parseFloat(restaurant_info.store_surge_rate) / 100) 
				: parseFloat(restaurant_info.store_surge_rate);
			surge_fee += store_surge_fee;
		}
		if (restaurant_info.demand_surge_rate > 0) {
			let demand_surge_fee = parseFloat(restaurant_info.demand_surge_rate);
			surge_fee += demand_surge_fee;
		}
	
		return formatPrice(surge_fee);
	};
	

	// Calculating total with/without coupon/tax
	getTotalAfterCalculation = () => {
		const { total, restaurant_info, coupon, tips, cartProducts } = this.props;
		let calc = 0;
		let totalItemTax = 0;

		// if (restaurant_info.enable_item_tax) {
		// 	cartProducts.forEach((item) => {
		// 		let itemTotal = parseFloat(item.price) * item.quantity;
		// 		let tax_percentage = item.tax_percentage;

		// 		if (tax_percentage === null || tax_percentage === 0) {
		// 			tax_percentage = restaurant_info.tax_percentage > 0 ? restaurant_info.tax_percentage : 0;
		// 		}

		// 		let itemTax = (parseFloat(tax_percentage) / 100) * itemTotal;
		// 		calc = formatPrice(parseFloat(calc) + itemTax);
		// 		totalItemTax += itemTax;

		// 		// Calculate tax for addons
		// 		if (restaurant_info.enable_item_addon_tax) {
		// 			if (item.selectedaddons) {
		// 				item.selectedaddons.forEach((addon) => {
		// 					let addonTotal = parseFloat(addon.price) * item.quantity;
		// 					let addonTax = (parseFloat(tax_percentage) / 100) * addonTotal;
		// 					calc = formatPrice(parseFloat(calc) + addonTax);
		// 					totalItemTax += addonTax;
		// 				});
		// 			}
		// 		}
		// 	});
		// }
		
		if (coupon.code) {
			if (coupon.discount_type === "PERCENTAGE") {
				let percentage_discount = formatPrice((coupon.discount / 100) * parseFloat(total));
				if (coupon.max_discount) {
					if (parseFloat(percentage_discount) >= coupon.max_discount) {
						percentage_discount = coupon.max_discount;
					}
				}
				this.props.couponApplied(coupon, percentage_discount);
				const saveCouponAppliedAmount = new Promise((resolve) => {
					localStorage.setItem("couponAppliedAmount", percentage_discount);
					resolve("Saved");
				});
				saveCouponAppliedAmount.then(() => {
					this.checkAndSetAppliedAmount();
				});

				calc = formatPrice(
					formatPrice(
						parseFloat(total) -
							percentage_discount +
							parseFloat(restaurant_info.restaurant_charges || 0.0) +
							parseFloat(this.state.delivery_charges || 0.0) +
							parseFloat(this.state.store_surge_fee || 0.0)
					)
				);
			} else {
				calc = formatPrice(
					parseFloat(total) -
						(parseFloat(coupon.discount) || 0.0) +
						((parseFloat(restaurant_info.restaurant_charges) || 0.0) +
							(parseFloat(this.state.delivery_charges) || 0.0) +
							parseFloat(this.state.store_surge_fee || 0.0))
				);
			}
		} else {
			calc = formatPrice(
				parseFloat(total) +
					parseFloat(restaurant_info.restaurant_charges || 0.0) +
					parseFloat(this.state.delivery_charges || 0.0) +
					parseFloat(this.state.store_surge_fee || 0.0)
			);
		}

		if (localStorage.getItem("taxApplicable") === "true") {
			calc = formatPrice(
				parseFloat(
					parseFloat(calc) + parseFloat(parseFloat(localStorage.getItem("taxPercentage")) / 100) * calc
				)
			);
		}

		if (restaurant_info.enable_item_tax) {
			cartProducts.forEach((item) => {
				let itemTotal = parseFloat(item.price) * item.quantity;
				let tax_percentage = item.tax_percentage;

				if (tax_percentage === null || tax_percentage === 0) {
					tax_percentage = restaurant_info.tax_percentage > 0 ? restaurant_info.tax_percentage : 0;
				}

				let itemTax = (parseFloat(tax_percentage) / 100) * itemTotal;
				calc = formatPrice(parseFloat(calc) + itemTax);
				totalItemTax += itemTax;

				// Calculate tax for addons
				if (restaurant_info.enable_item_addon_tax) {
					if (item.selectedaddons) {
						item.selectedaddons.forEach((addon) => {
							let addonTotal = parseFloat(addon.price) * item.quantity;
							let addonTax = (parseFloat(tax_percentage) / 100) * addonTotal;
							calc = formatPrice(parseFloat(calc) + addonTax);
							totalItemTax += addonTax;
						});
					}
				}
			});
		}

		if (tips.value > 0) {
			calc = parseFloat(calc) + parseFloat(tips.value);
		}

		let totalAfterCalculation = formatPrice(calc);
  		return { totalAfterCalculation, totalItemTax };

		// return formatPrice(calc);
	};

	checkAndSetAppliedAmount = () => {
		let elem = "";
		if (localStorage.getItem("currencySymbolAlign") === "left") {
			elem = "(" + localStorage.getItem("currencyFormat") + localStorage.getItem("couponAppliedAmount") + ")";
		} else {
			elem = "(" + localStorage.getItem("couponAppliedAmount") + localStorage.getItem("currencyFormat") + ")";
		}

		if (this.refs.appliedAmount) {
			this.refs.appliedAmount.innerHTML = elem;
		}
	};

	render() {
		const { total, restaurant_info, coupon, tips, removeTip, cartProducts } = this.props;
		const { totalAfterCalculation, totalItemTax } = this.getTotalAfterCalculation();
		return (
			<React.Fragment>
				<div className="">
					<div
						className={`bg-white bill-details mb-200 ${!this.props.alreadyRunningOrders && "pt-10"}`}>
						<div className="p-15">
							<h2 className="bill-detail-text m-0">{localStorage.getItem("cartBillDetailsText")}</h2>
							<div className="display-flex">
								<div className="flex-auto">{localStorage.getItem("cartItemTotalText")}</div>
								<div className="flex-auto text-right">
									{localStorage.getItem("currencySymbolAlign") === "left" &&
										localStorage.getItem("currencyFormat")}
									{formatPrice(total)}
									{localStorage.getItem("currencySymbolAlign") === "right" &&
										localStorage.getItem("currencyFormat")}
								</div>
							</div>
							<hr />
							{coupon.code && (
								<React.Fragment>
									<div className="display-flex">
										<div className="flex-auto coupon-text">
											{localStorage.getItem("cartCouponText")}
										</div>
										<div className="flex-auto text-right coupon-text">
											<span>-</span>
											{coupon.discount_type === "PERCENTAGE" ? (
												<React.Fragment>
													{coupon.discount}%{" "}
													<span className="coupon-appliedAmount" ref="appliedAmount">
														{this.checkAndSetAppliedAmount()}
													</span>
												</React.Fragment>
											) : (
												<React.Fragment>
													{localStorage.getItem("currencySymbolAlign") === "left" &&
														localStorage.getItem("currencyFormat") + coupon.discount}

													{localStorage.getItem("currencySymbolAlign") === "right" &&
														coupon.discount + localStorage.getItem("currencyFormat")}
												</React.Fragment>
											)}
										</div>
									</div>
									<hr />
								</React.Fragment>
							)}
							{restaurant_info.restaurant_charges === "0.00" ||
							restaurant_info.restaurant_charges === null ? null : (
								<React.Fragment>
									<div className="display-flex">
										<div className="flex-auto">{localStorage.getItem("cartRestaurantCharges")}</div>
										<div className="flex-auto text-right">
											{localStorage.getItem("currencySymbolAlign") === "left" &&
												localStorage.getItem("currencyFormat")}
											{restaurant_info.restaurant_charges}
											{localStorage.getItem("currencySymbolAlign") === "right" &&
												localStorage.getItem("currencyFormat")}
										</div>
									</div>
									<hr />
								</React.Fragment>
							)}
							{localStorage.getItem("userSelected") !== "SELFPICKUP" && (
								<React.Fragment>
									{this.state.delivery_charges === 0 ? (
										<React.Fragment>
											<div className="display-flex">
												<div className="flex-auto">{localStorage.getItem("cartDeliveryCharges")}</div>
												<div className="flex-auto text-right">
													{localStorage.getItem("currencySymbolAlign") === "left" &&
														localStorage.getItem("currencyFormat")}
													0
													{localStorage.getItem("currencySymbolAlign") === "right" &&
														localStorage.getItem("currencyFormat")}
												</div>
											</div>
											<hr />
										</React.Fragment>
									) : (
										<React.Fragment>
											<div className="display-flex">
												<div className="flex-auto">
													{localStorage.getItem("cartDeliveryCharges")}{" | "}
													<span className="cart-delivery-distance">
														{parseFloat(this.state.distance).toFixed(1)}km
													</span>
													{this.props.restaurant_info.free_delivery_subtotal > 0 &&
														this.state.delivery_charges > 0 && (
															<React.Fragment>
																<br />
																<div className="freeDeliveryMessageBlock">
																	{localStorage.getItem("freeDeliveryPrefixText")}{" "}
																	<b>
																		{localStorage.getItem("currencySymbolAlign") ===
																			"left" && localStorage.getItem("currencyFormat")}
																		{parseFloat(
																			this.props.restaurant_info.free_delivery_subtotal
																		) - parseFloat(this.props.total)}
																		{localStorage.getItem("currencySymbolAlign") ===
																			"right" && localStorage.getItem("currencyFormat")}
																	</b>{" "}
																	{localStorage.getItem("freeDeliverySuffixText")}
																</div>
															</React.Fragment>
														)}
												</div>
												<div className="flex-auto text-right">
													{localStorage.getItem("currencySymbolAlign") === "left" &&
														localStorage.getItem("currencyFormat")}
													{formatPrice(this.state.delivery_charges)}
													{localStorage.getItem("currencySymbolAlign") === "right" &&
														localStorage.getItem("currencyFormat")}
												</div>
											</div>

											<hr />
										</React.Fragment>
									)}
								</React.Fragment>
							)}
							
							{this.state.store_surge_fee > 0 && (
								<React.Fragment>
									<div className="display-flex">
										<div className="flex-auto">{localStorage.getItem("storeSurgeCharges")}</div>
										<div className="flex-auto text-right">
											{localStorage.getItem("currencySymbolAlign") === "left" &&
												localStorage.getItem("currencyFormat")}
											{this.state.store_surge_fee}
											{localStorage.getItem("currencySymbolAlign") === "right" &&
												localStorage.getItem("currencyFormat")}
										</div>
									</div>
									<hr />
								</React.Fragment>
							)}

							{localStorage.getItem("taxApplicable") === "true" && (
								<React.Fragment>
									<div className="display-flex">
										<div className="flex-auto text-danger">{localStorage.getItem("taxText")}</div>
										<div className="flex-auto text-right text-danger">
											<span>+</span>
											{localStorage.getItem("taxPercentage")}%
										</div>
									</div>
									<hr />
								</React.Fragment>
							)}

							{totalItemTax > 0 && (
							<React.Fragment>
								<div className="display-flex">
									<div className="flex-auto text-danger">{localStorage.getItem("taxText")}</div>
									<div className="flex-auto text-right text-danger">
									<span>+</span>
									{localStorage.getItem("currencySymbolAlign") === "left" && localStorage.getItem("currencyFormat")}
										{totalItemTax.toFixed(2)}
									{localStorage.getItem("currencySymbolAlign") === "right" && localStorage.getItem("currencyFormat")}
									</div>
								</div>
								<hr />
							</React.Fragment>
							)}

							{tips.value !== 0 && (
								<React.Fragment>
									<div className="display-flex">
										<div className="flex-auto">{localStorage.getItem("tipText")}</div>
										<div className="flex-auto text-right">
											{localStorage.getItem("currencySymbolAlign") === "left" &&
												localStorage.getItem("currencyFormat")}
											{formatPrice(tips.value)}
											{localStorage.getItem("currencySymbolAlign") === "right" &&
												localStorage.getItem("currencyFormat")}
											<br />
											<span onClick={removeTip}>
												<u>{localStorage.getItem("cartRemoveTipText")}</u>
											</span>
										</div>
									</div>
									<hr />
								</React.Fragment>
							)}

							<div className="display-flex">
								<div className="flex-auto font-w700">{localStorage.getItem("cartToPayText")}</div>
								<div className="flex-auto text-right font-w700">
									{/* Calculating total after discount coupon or without discount coupon */}
									{localStorage.getItem("currencySymbolAlign") === "left" &&
										localStorage.getItem("currencyFormat")}
									{totalAfterCalculation.toFixed(2)}
									{localStorage.getItem("currencySymbolAlign") === "right" &&
										localStorage.getItem("currencyFormat")}
								</div>
							</div>
							{localStorage.getItem("userSelected") === "SELFPICKUP" && (
								<p className="my-2 mt-3 text-danger font-weight-bold">
									{localStorage.getItem("selectedSelfPickupMessage")}
								</p>
							)}
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	coupon: state.coupon.coupon,
	restaurant_info: state.items.restaurant_info,
});

export default connect(
	mapStateToProps,
	{ couponApplied }
)(BillDetails);
