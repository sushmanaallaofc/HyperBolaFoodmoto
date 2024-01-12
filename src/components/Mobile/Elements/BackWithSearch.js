import React, { Component } from "react";

import Ink from "react-ink";
import LightSpeed from "react-reveal/LightSpeed";
import WebShare from "../WebShare";

class BackWithSearch extends Component {
	static contextTypes = {
		router: () => null,
	};

	render() {
		const { restaurant } = this.props;
		return (
			<React.Fragment>
				<div className="col-12 p-0 fixed" style={{ zIndex: "9" }}>
					<div className="block m-0">
						<div className={`block-content p-0 ${this.props.dark && "nav-dark"}`}>
							<div className={`input-group ${this.props.boxshadow && "search-box"}`}>
								{!this.props.disable_back_button && (
									<div className="input-group-prepend">
										{this.props.back_to_home && (
											<button
												type="button"
												className="btn search-navs-btns custom-bg"
												style={{ position: "relative" }}
												onClick={() => {
													setTimeout(() => {
														this.context.router.history.push("/");
													}, 200);
												}}
											>
												{/* <i className="si si-arrow-left" /> */}
												<svg className="uHGrw _17EkR" viewBox="0 0 32 32" height="18" width="18"><path d="M3.333 14.984l28.667-0v2.097l-0.16 0.006h-28.506l-0.16-0.16v-1.782l0.16-0.16zM1.114 14.986l10.079-10.079 0.121-0.108 1.465 1.467-0.101 0.127-10.079 10.079h-0.226l-1.26-1.26v-0.226zM12.679 25.676l0.108 0.117-1.468 1.484-0.126-0.115-10.079-10.079v-0.226l1.26-1.26h0.226l10.079 10.079zM3.268 12.87l0.272 0.116-0.022 6.125-0.272 0.114-3.245-3.18 0.111-0.112 3.157-3.062z"></path></svg>
												<Ink duration="500" />
											</button>
										)}

										{this.props.goto_orders_page && (
											<button
												type="button"
												className="btn search-navs-btns custom-bg"
												style={{ position: "relative" }}
												onClick={() => {
													setTimeout(() => {
														this.context.router.history.push("/my-orders");
													}, 200);
												}}
											>
												{/* <i className="si si-arrow-left" /> */}
												<svg className="uHGrw _17EkR" viewBox="0 0 32 32" height="18" width="18"><path d="M3.333 14.984l28.667-0v2.097l-0.16 0.006h-28.506l-0.16-0.16v-1.782l0.16-0.16zM1.114 14.986l10.079-10.079 0.121-0.108 1.465 1.467-0.101 0.127-10.079 10.079h-0.226l-1.26-1.26v-0.226zM12.679 25.676l0.108 0.117-1.468 1.484-0.126-0.115-10.079-10.079v-0.226l1.26-1.26h0.226l10.079 10.079zM3.268 12.87l0.272 0.116-0.022 6.125-0.272 0.114-3.245-3.18 0.111-0.112 3.157-3.062z"></path></svg>
												<Ink duration="500" />
											</button>
										)}
										{this.props.goto_accounts_page && (
											<button
												type="button"
												className="btn search-navs-btns custom-bg"
												style={{ position: "relative" }}
												onClick={() => {
													setTimeout(() => {
														this.context.router.history.push("/my-account");
													}, 200);
												}}
											>
												{/* <i className="si si-arrow-left" /> */}
												<svg className="uHGrw _17EkR" viewBox="0 0 32 32" height="18" width="18"><path d="M3.333 14.984l28.667-0v2.097l-0.16 0.006h-28.506l-0.16-0.16v-1.782l0.16-0.16zM1.114 14.986l10.079-10.079 0.121-0.108 1.465 1.467-0.101 0.127-10.079 10.079h-0.226l-1.26-1.26v-0.226zM12.679 25.676l0.108 0.117-1.468 1.484-0.126-0.115-10.079-10.079v-0.226l1.26-1.26h0.226l10.079 10.079zM3.268 12.87l0.272 0.116-0.022 6.125-0.272 0.114-3.245-3.18 0.111-0.112 3.157-3.062z"></path></svg>
												<Ink duration="500" />
											</button>
										)}
										{!this.props.back_to_home &&
											!this.props.goto_orders_page &&
											!this.props.goto_accounts_page && (
												<button
													type="button"
													className={`btn search-navs-btns custom-bg ${this.props.dark && "nav-dark"}`}
													style={{ position: "relative" }}
													onClick={() => {
														setTimeout(() => {
															this.context.router.history.goBack();
														}, 200);
													}}
												>
													{/* <i className="si si-arrow-left" /> */}
													<svg className="uHGrw _17EkR" viewBox="0 0 32 32" height="18" width="18"><path d="M3.333 14.984l28.667-0v2.097l-0.16 0.006h-28.506l-0.16-0.16v-1.782l0.16-0.16zM1.114 14.986l10.079-10.079 0.121-0.108 1.465 1.467-0.101 0.127-10.079 10.079h-0.226l-1.26-1.26v-0.226zM12.679 25.676l0.108 0.117-1.468 1.484-0.126-0.115-10.079-10.079v-0.226l1.26-1.26h0.226l10.079 10.079zM3.268 12.87l0.272 0.116-0.022 6.125-0.272 0.114-3.245-3.18 0.111-0.112 3.157-3.062z"></path></svg>
													<Ink duration="500" />
												</button>
											)}
									</div>
								)}
								<p
									className={`form-control search-input d-flex align-items-center custom-bg ${this.props.dark &&
										"nav-dark"}`}
								>
									{this.props.logo && (
										<img
											src="/assets/img/logos/logo.png"
											alt={localStorage.getItem("storeName")}
											width="120"
										/>
									)}
									{this.props.has_title ? (
										<React.Fragment>
											{this.props.from_checkout ? (
												<span className="nav-page-title" id="checkoutNavPageTitle">
													{localStorage.getItem("cartToPayText")}{" "}
													<span style={{ color: localStorage.getItem("cartColorBg") }}>
														{localStorage.getItem("currencySymbolAlign") === "left" &&
															localStorage.getItem("currencyFormat")}
														{this.props.title}
														{localStorage.getItem("currencySymbolAlign") === "right" &&
															localStorage.getItem("currencyFormat")}
													</span>
												</span>
											) : (
												this.props.hasStore === true ? (
													this.props.hasSubtitle === true ? (
													<React.Fragment>
														<span className="wk7IU">
														<span className="_38vxc">{this.props.title}</span><br></br>
														<span className="_3XxTy">{this.props.subtitle}</span>
													</span>
													</React.Fragment>
													):(
													<React.Fragment>
													<span className="wk7IU">
														<span className="_38vxc">{this.props.title}</span><br></br>
														<span className="_3XxTy"> {this.props.totalCartItem} Item</span> | <span className="_3XxTy">ETA {this.props.eta} {localStorage.getItem("homePageMinsText")}</span>
													</span>
													</React.Fragment>
													)
												):(
													<span className="nav-page-title">{this.props.title}</span>
												)
											)}
										</React.Fragment>
									) : null}
									{this.props.has_delivery_icon && (
										<LightSpeed left>
											<img
												src="/assets/img/various/delivery-bike.png"
												alt={this.props.title}
												className="nav-page-title"
											/>
										</LightSpeed>
									)}
								</p>
								{this.props.has_restaurant_info ? (
									<div
										className="fixed-restaurant-info hidden"
										ref={(node) => {
											this.heading = node;
										}}
									>
										<span className="font-w700 fixedRestaurantName">
											{this.props.restaurant.name}
										</span>
										<br />
										<span className="font-w400 fixedRestaurantTime text-lowercase">
											<i className="si si-clock" /> {this.props.restaurant.delivery_time}{" "}
											{localStorage.getItem("homePageMinsText")}
										</span>
									</div>
								) : null}
								<div className="input-group-append custom-bg">
									{!this.props.disable_search && (
										<button
											type="submit"
											className="btn search-navs-btns"
											style={{ position: "relative" }}
										>
											<i className="si si-magnifier" />
											<Ink duration="500" />
										</button>
									)}
									{this.props.homeButton && (
										<button
											type="button"
											className="btn search-navs-btns nav-home-btn custom-bg"
											style={{ position: "relative" }}
											onClick={() => {
												setTimeout(() => {
													this.context.router.history.push("/");
												}, 200);
											}}
										>
											<i className="icon-home" />
											<Ink duration="500" />
										</button>
									)}
									{this.props.shareButton && <WebShare link={window.location.href} store_type={restaurant.store_type} />}
								</div>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default BackWithSearch;
