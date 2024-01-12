import React, { Component } from "react";

import Flip from "react-reveal/Flip";

import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import Meta from "../../helpers/meta";
// import PopularPlaces from "./PopularPlaces";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { geocodeByPlaceId } from "react-google-places-autocomplete";
import { getPopularLocations } from "../../../services/popularLocations/actions";

import { getAddresses, setDefaultAddress } from "../../../services/addresses/actions";
import { clearRestaurantList } from "../../../services/restaurant/actions";
import AddressList from "../Account/Addresses/AddressList";
import Ink from "react-ink";
import GpsSelector from "./PopularPlaces/GpsSelector";

class Location extends Component {
	state = {
		google_script_loaded: false,
		loading_popular_location: true,
		gps_loading: false,
	};
	static contextTypes = {
		router: () => null,
	};

	componentDidMount() {
		this.props.getPopularLocations();

		if (this.searchInput) {
			this.searchInput.focus();
		}

		const existingScript = document.getElementById("googleMaps");
		if (!existingScript) {
			const script = document.createElement("script");
			script.src =
				"https://maps.googleapis.com/maps/api/js?key=" +
				localStorage.getItem("googleApiKey") +
				"&libraries=places";
			script.id = "googleMaps";
			document.body.appendChild(script);
			script.onload = () => {
				this.setState({ google_script_loaded: true });
			};
		}

		const { user } = this.props;
		if (user.success) {
			this.props.getAddresses(user.data.id, user.data.auth_token, this.state.restaurant_id);
		}
	}

	componentWillUnmount() {
		//remove script when component unmount
		const existingScript = document.getElementById("googleMaps");
		if (existingScript) {
			existingScript.parentNode.removeChild(existingScript);
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.popular_locations !== nextProps.popular_locations) {
			this.setState({ loading_popular_location: false });
		}
	}

	handleSetDefaultAddress = (address_id, address) => {
		// console.log("Address FULL", address);
		const { user } = this.props;
		if (user.success) {
			this.props.setDefaultAddress(user.data.id, address_id, user.data.auth_token).then(() => {
				const saveUserSetAddress = new Promise((resolve) => {
					const userSetAddress = {
						lat: address.latitude,
						lng: address.longitude,
						address: address.address,
						house: address.house,
						tag: address.tag,
						city: address.city,
						state: address.state,
					};
					localStorage.setItem("userSetAddress", JSON.stringify(userSetAddress));
					resolve("Address Saved");
				});
				saveUserSetAddress.then(() => {
					if (localStorage.getItem("fromCart") === "1") {
						localStorage.removeItem("fromCart");
						this.context.router.history.push("/cart");
					} else {
						//remove restaurants list...
						this.props.clearRestaurantList();
						this.context.router.history.push("/");
					}
				});
			});
		}
	};

	handlePopularLocationClick = (location) => {
		const userSetAddress = {
			lat: location.latitude,
			lng: location.longitude,
			address: location.name,
			house: null,
			tag: null,
			businessLocation: true,
		};
		localStorage.setItem("userSetAddress", JSON.stringify(userSetAddress));

		const saveUserSetAddress = new Promise((resolve) => {
			localStorage.setItem("userSetAddress", JSON.stringify(userSetAddress));
			localStorage.setItem("userAlreadySelectedLocation", "true");
			resolve("Location Saved");
		});
		saveUserSetAddress.then(() => {
			// this.context.router.history.push("/");
			window.location.replace("/");
		});
	};

	handleGeoLocationClick = (results) => {
		const saveGeoLocation = new Promise((resolve) => {
			localStorage.setItem("geoLocation", JSON.stringify(results[0]));
			resolve("GeoLocation Saved");
		});
		saveGeoLocation.then(() => {
			this.context.router.history.push("/my-location");
		});
	};

	render() {
		if (localStorage.getItem("hideDesktopView") !== "true" &&  window.innerWidth > 768) {
			return <Redirect to="/" />;
		}
		if (localStorage.getItem("storeColor") === null) {
			return <Redirect to={"/"} />;
		}
		const { user, addresses } = this.props;

		return (
			<React.Fragment>
				<Meta
					seotitle={localStorage.getItem("seoMetaTitle")}
					seodescription={localStorage.getItem("seoMetaDescription")}
					ogtype="website"
					ogtitle={localStorage.getItem("seoOgTitle")}
					ogdescription={localStorage.getItem("seoOgDescription")}
					ogurl={window.location.href}
					twittertitle={localStorage.getItem("seoTwitterTitle")}
					twitterdescription={localStorage.getItem("seoTwitterDescription")}
				/>

				<div className="col-12 p-0 pt-0 mb-15">
					<div className="input-group search-box">
						<div className="input-group-prepend">
							<button
								type="button"
								className="btn search-navs-btns location-back-button"
								style={{ position: "relative" }}
								onClick={() => this.context.router.history.goBack()}
							>
								<svg className="uHGrw _17EkR" viewBox="0 0 32 32" height="18" width="18"><path d="M3.333 14.984l28.667-0v2.097l-0.16 0.006h-28.506l-0.16-0.16v-1.782l0.16-0.16zM1.114 14.986l10.079-10.079 0.121-0.108 1.465 1.467-0.101 0.127-10.079 10.079h-0.226l-1.26-1.26v-0.226zM12.679 25.676l0.108 0.117-1.468 1.484-0.126-0.115-10.079-10.079v-0.226l1.26-1.26h0.226l10.079 10.079zM3.268 12.87l0.272 0.116-0.022 6.125-0.272 0.114-3.245-3.18 0.111-0.112 3.157-3.062z"></path></svg>
								<Ink duration="500" />
							</button>
							<div className="form-control search-input d-flex align-items-center">
							<span className="select-location-title">Select your location</span>
							</div>
						</div>
					</div>
				</div>
				<div className="col-12 p-0 pt-0">
					{this.state.google_script_loaded && (
						<GooglePlacesAutocomplete
							debounce={750}
							withSessionToken={true}
							loader={
								<img
									src="/assets/img/various/spinner.svg"
									className="location-loading-spinner"
									alt="loading"
								/>
							}
							renderInput={(props) => (
								<div className="DIWmH p-5">
									<div className="_3-oFU">
										<div className="_1ZpCN">
											<svg width="25px" height="25px" viewBox="0 0 1024 1024" data-aut-id="icon" className="" fillRule="evenodd">
												<path className="rui-4K4Y7" d="M448 725.333c-152.917 0-277.333-124.416-277.333-277.333s124.416-277.333 277.333-277.333c152.917 0 277.333 124.416 277.333 277.333s-124.416 277.333-277.333 277.333v0zM884.437 824.107v0.021l-151.915-151.936c48.768-61.781 78.144-139.541 78.144-224.192 0-199.979-162.688-362.667-362.667-362.667s-362.667 162.688-362.667 362.667c0 199.979 162.688 362.667 362.667 362.667 84.629 0 162.411-29.376 224.171-78.144l206.144 206.144h60.352v-60.331l-54.229-54.229z"></path>
											</svg>
											<div className="_3_3--">
												<input
													{...props}
													className="_3_3--"
													placeholder={localStorage.getItem("searchAreaPlaceholder")}
													ref={(input) => {
														this.searchInput = input;
													}}
												/>
											</div>
										</div>
									</div>
								</div>
							)}
							renderSuggestions={(active, suggestions, onSelectSuggestion) => (
								<div className="-cMA-">
									<div className="_2HzJo">
										<div className="location-suggestions-container">
											{suggestions.map((suggestion, index) => (
												<Flip top delay={index * 50} key={suggestion.id}>
													<div
														className="location-suggestion"
														onClick={(event) => {
															onSelectSuggestion(suggestion, event);
															geocodeByPlaceId(suggestion.place_id)
																.then((results) => this.handleGeoLocationClick(results))
																.catch((error) => console.error(error));
														}}
													>
														<span className="location-main-name">
															{suggestion.structured_formatting.main_text}
														</span>
														<br />
														<span className="location-secondary-name">
															{suggestion.structured_formatting.secondary_text}
														</span>
													</div>
												</Flip>
											))}
											<img
												src="/assets/img/various/powered_by_google_on_white.png"
												alt="powered by Google"
												className="pl-15"
											/>
										</div>
									</div>
								</div>
							)}
						/>
					)}
				</div>
				<GpsSelector fetchGpsAutomaticallyAndroid={false} />

				{/* {localStorage.getItem("fromCart") === null && (
					<PopularPlaces
						loading={this.state.loading_popular_location}
						handlePopularLocationClick={this.handlePopularLocationClick}
						locations={popular_locations}
					/>
				)} */}

				{user.success && addresses.length > 0 && (
					<React.Fragment>
						<div className="p-15 mt-10 location-saved-address">
							<h1 className="text-muted h4">{localStorage.getItem("locationSavedAddresses")}</h1>
							{addresses.map((address) => (
								<AddressList
									handleDeleteAddress={this.handleDeleteAddress}
									deleteButton={false}
									key={address.id}
									address={address}
									user={user}
									fromCartPage={false}
									handleSetDefaultAddress={this.handleSetDefaultAddress}
								/>
							))}
						</div>
					</React.Fragment>
				)}
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	user: state.user.user,
	popular_locations: state.popular_locations.popular_locations,
	addresses: state.addresses.addresses,
});

export default connect(
	mapStateToProps,
	{ getPopularLocations, getAddresses, setDefaultAddress, clearRestaurantList }
)(Location);
