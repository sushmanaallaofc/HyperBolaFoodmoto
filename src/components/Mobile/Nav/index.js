import React, { Component } from "react";

import Lottie from 'react-lottie-player';
import lottieJson from './lf20_axmpecmo.json';
import Ink from "react-ink";
import { Link } from "react-router-dom";

import PWAInstallation from "../PWAInstallation";

// import { Tooltip } from "@material-ui/core";
// import { withStyles } from "@material-ui/core/styles";

// const HtmlTooltip = withStyles((theme) => ({
// 	tooltip: {
// 		backgroundColor: "#4caf50",
// 		color: "#f4f4f5",
// 		fontSize: "0.75rem",
// 		padding: "6px 8px",
// 		margin: " 10px -8px",
// 		fontWeight: "400",
// 	},
// 	arrow: {
// 		color: "#4caf50",
// 	},
// }))(Tooltip);

class Nav extends Component {
	static contextTypes = {
		router: () => null,
	};
	// state = {
	// 	tooltipOpen: true,
	// };

	// componentDidMount() {
	// 	this.registerScrollEvent();
	// }

	// registerScrollEvent() {
	// 	window.addEventListener("scroll", this.scrollFunc);
	// }

	// removeScrollEvent() {
	// 	window.removeEventListener("scroll", this.scrollFunc);
	// }

	// scrollFunc = () => {
	// 	if (document.documentElement.scrollTop > 150) {
	// 		this.setState({ tooltipOpen: false });
	// 	} else {
	// 		this.setState({ tooltipOpen: true });
	// 	}
	// };

	render() {
		// console.log('userSetAddress', localStorage.getItem("userSetAddress"));
		return (
			<React.Fragment>
				<div className="col-12 p-0 sticky-top custom-bg">
					<div className="block m-0">
						<div className="block-content p-0">
							<div className="row">
								<div className="col-6 custom-bg">
								{!this.props.disable_back_button && (
									<div className="input-group-prepend">
										<button
											type="button"
											className="btn search-navs-btns"
											style={{ position: "relative" }}
										>
											{/* <i className="si si-arrow-left" /> */}
											<svg className="uHGrw _17EkR" viewBox="0 0 32 32" height="18" width="18"><path d="M3.333 14.984l28.667-0v2.097l-0.16 0.006h-28.506l-0.16-0.16v-1.782l0.16-0.16zM1.114 14.986l10.079-10.079 0.121-0.108 1.465 1.467-0.101 0.127-10.079 10.079h-0.226l-1.26-1.26v-0.226zM12.679 25.676l0.108 0.117-1.468 1.484-0.126-0.115-10.079-10.079v-0.226l1.26-1.26h0.226l10.079 10.079zM3.268 12.87l0.272 0.116-0.022 6.125-0.272 0.114-3.245-3.18 0.111-0.112 3.157-3.062z"></path></svg>
											<Ink duration="500" />
										</button>
									</div>
								)}
								<button
									type="submit"
									className="btn nav-location truncate-text custom-bg"
									style={{ position: "relative", maxWidth: window.innerWidth - 130 }}
									onClick={() => {
										this.context.router.history.push("/search-location");
									}}
								>
									<span className="home-address-icon mb-1">
										{localStorage.getItem("userSetAddress") && (
											<React.Fragment>
												<svg width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.89429 18.3846H12.0643" stroke="#282C3F" strokeOpacity="0.9" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.98989 1C3.9613 1 1.5 3.45532 1.5 6.47656C1.5 10.584 6.98989 15.2057 6.98989 15.2057C6.98989 15.2057 12.4798 10.584 12.4798 6.47656C12.4798 3.45532 10.0185 1 6.98989 1Z" stroke="#282C3F" strokeOpacity="0.9" strokeWidth="1.7" strokeLinejoin="round"></path><path d="M6.98955 3.73492C8.36202 3.73492 9.48495 4.82084 9.48495 6.14807C9.48495 7.4753 8.3745 8.56121 6.98955 8.56121C5.61707 8.56121 4.49414 7.4753 4.49414 6.14807C4.49414 4.82084 5.61707 3.73492 6.98955 3.73492Z" fill="#E46D47"></path></svg><strong className="ml-2 home-address mt-1">
												{JSON.parse(localStorage.getItem("userSetAddress")).tag !== null ? (
													<strong className="home-address text-capitalize mr-1">
														{JSON.parse(localStorage.getItem("userSetAddress")).tag}
													</strong>
												) : "Other"}
												</strong>
												<img className="home-img-right" src="/assets/img/various/vector-home-right.svg" alt="img-right" />
											</React.Fragment>
										)}
									</span>
									<p className="home-header-address">
									<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit mr-2"><g><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></g></svg>
									{localStorage.getItem("userSetAddress") && (
										<React.Fragment>
											{JSON.parse(localStorage.getItem("userSetAddress")).businessLocation ===
											true ? (
												<span>
													{JSON.parse(localStorage.getItem("userSetAddress")).address}
												</span>
											) : (
												<span>
													{JSON.parse(localStorage.getItem("userSetAddress")).house !==
													null ? (
														<span>
															{JSON.parse(localStorage.getItem("userSetAddress"))
																.house.length > 25 ? 
																`${JSON.parse( localStorage.getItem("userSetAddress")).house.substring(0, 25)} ...`
																: JSON.parse(localStorage.getItem("userSetAddress")).house
															}
														</span>
													) : (
														<span>
															{JSON.parse(localStorage.getItem("userSetAddress"))
																.address.length > 25
																? `${JSON.parse(
																		localStorage.getItem("userSetAddress")
																	).address.substring(0, 25)} ...`
																: JSON.parse(localStorage.getItem("userSetAddress"))
																		.address}
														</span>
													)}
												</span>
											)}
										</React.Fragment>
									)}
									<i
										className="si si-arrow-right nav-location-icon"
										style={{ color: localStorage.getItem("storeColor") }}
									/>
									</p>
									<Ink duration="500" />
								</button>
								{/* <p className="form-control search-input">
									{this.props.logo &&
										(this.props.logoLink ? (
											<Link to="/">
												<img
													src={`/assets/img/logos/${localStorage.getItem("storeLogo")}`}
													alt={localStorage.getItem("storeName")}
													className="store-logo"
												/>
											</Link>
										) : (
											<img
												src={`/assets/img/logos/${localStorage.getItem("storeLogo")}`}
												alt={localStorage.getItem("storeName")}
												className="store-logo"
											/>
										))}
								</p> */}
								</div>
								<div className="col-6 custom-bg">
									<div className="header-offers">
										{/* <button
											type="submit"
											className="btn nav-location truncate-text"
											style={{ position: "relative", maxWidth: window.innerWidth - 130 }}
											onClick={() => {
												this.context.router.history.push("/search-location");
											}}
										>
											<span><i className="icon-Offers-outline"></i>Offers</span>
											<Ink duration="500" />
										</button> */}
										<button
											type="submit"
											className="btn nav-location truncate-text custom-bg"
											style={{ position: "relative", maxWidth: window.innerWidth - 130 }}
											onClick={() => {
												this.context.router.history.push("/offers");
											}}
										>
											<Lottie
												loop
												animationData={lottieJson}
												className="lottie-offers"
												play
												style={{
													position: 'absolute',
													left: 'calc(50% - 27px)', // Assuming that the 55px width is causing the blurring
													top: 'calc(50% - 27px)', // Adjust based on your actual element size
													width: '55px',
												  }}
											/>
											<span><i className="icon-Offers-outline offers-icon mr-1"></i><span className="offers offer-on-off">Offers</span></span>
											<Ink duration="500" />
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Nav;
