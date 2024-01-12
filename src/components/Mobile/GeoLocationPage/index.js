import React, { Component } from "react";

import ContentLoader from "react-content-loader";
import DelayLink from "../../helpers/delayLink";
// import Geocode from "react-geocode";
import GoogleMap from "./GoogleMap";
import Ink from "react-ink";
import { connect } from "react-redux";
import { saveAddress } from "../../../services/addresses/actions";
import { Redirect } from "react-router";
import Meta from "../../helpers/meta";
import { GET_ADDRESS_FROM_COORDINATES } from "../../../configs";
import Axios from "axios";
import SimpleReactValidator from "simple-react-validator";
import Loading from "../../helpers/loading";
import { clearRestaurantList } from "../../../services/restaurant/actions";

export class GeoLocationPage extends Component {
	constructor() {
		super();
		this.validator = new SimpleReactValidator({
			autoForceUpdate: this,
			messages: {
				required: localStorage.getItem("fieldValidationMsg"),
			},
		});
	}

	static contextTypes = {
		router: () => null,
	};

	state = {
		location: "",
		dragging: false,
		house: null,
		tag: null,
		city: null,
		state: null,
		error: false,
		loading: false,
	};

	componentDidMount() {
		document.addEventListener("mousedown", this.handleClickOutside);
	}

	handleAddressInput = (event) => {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	};

	reverseLookup = (lat, lng) => {
		Axios.post(GET_ADDRESS_FROM_COORDINATES, {
			lat: lat,
			lng: lng,
		})
			.then((response) => {
				// console.log(response.data);
				this.setState({ location: response.data, dragging: false });
			})
			.catch(function(error) {
				alert(error.response.data);
				console.warn(error.response.data);
			});
	};

	onMarkerDragEnd = (map) => {
		console.log(map);
		console.log({ lat: map.center.lat(), lng: map.center.lng() });
		localStorage.setItem("userLat", map.center.lat());
		localStorage.setItem("userLng", map.center.lng());
		this.reverseLookup(map.center.lat(), map.center.lng());
	};
	handleDragging = () => {
		this.setState({ dragging: true });
		this.refs.confirmGpsLocation.style.height = "44.7vh";
	};

	handleSaveNewAddress = () => {
		const { user } = this.props;

		if (localStorage.getItem("flatApartmentAddressRequired") === "true") {
			if (this.validator.fieldValid("house")) {
				this.__saveAddressToLS(user);
			} else {
				console.log("validation failed");
				this.validator.showMessages();
			}
		} else {
			this.__saveAddressToLS(user);
		}
	};

	__saveAddressToLS = (user) => {
		if (user.success) {
			this.setState({ loading: true });

			console.log("Save loggedin user address");

			this.props.saveAddress(
				user.data.id,
				user.data.auth_token,
				localStorage.getItem("userLat"),
				localStorage.getItem("userLng"),
				this.state.location,
				this.state.house,
				this.state.tag,
				this.state.city,
				this.state.state,
				"get_only_default_address"
			);
		} else {
			// console.log("From GeoLocation page save address function");
			const userSetAddress = {
				lat: localStorage.getItem("userLat"),
				lng: localStorage.getItem("userLng"),
				address: this.state.location,
				house: this.state.house,
				tag: this.state.tag,
				city: this.state.city,
				state: this.state.state,
			};

			//else save in localstorage for future use (Later when user loggsin or registers, and orders, send this address to db)

			const saveUserSetAddress = new Promise((resolve) => {
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
		}
	};

	componentWillReceiveProps(nextProps) {
		console.log(nextProps.addresses);

		// * Saving the address makes an API call then the result of the API call is the address response, this is then listened with this method
		if (this.props.address !== nextProps.addresses) {
			console.log("Address saved");

			const userSetAddress = {
				lat: nextProps.addresses.latitude,
				lng: nextProps.addresses.longitude,
				address: nextProps.addresses.address,
				house: nextProps.addresses.house,
				tag: nextProps.addresses.tag,
				city: nextProps.addresses.city,
				state: nextProps.addresses.state,
			};

			const saveUserSetAddress = new Promise((resolve) => {
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
		}
	}

	inputFocus = () => {
		this.refs.confirmGpsLocation.style.height = "60vh";
	};
	handleClickOutside = (event) => {
		if (this.refs.confirmGpsLocation && !this.refs.confirmGpsLocation.contains(event.target)) {
			this.refs.confirmGpsLocation.style.height = "44.7vh";
		}
	};

	componentWillUnmount() {
		document.removeEventListener("mousedown", this.handleClickOutside);
	}

	getLocation = () => {
		this.setState({ location: JSON.parse(localStorage.getItem("geoLocation")).formatted_address });
	};

	render() {
		if (localStorage.getItem("hideDesktopView") !== "true" &&  window.innerWidth > 768) {
			return <Redirect to="/" />;
		}
		if (localStorage.getItem("storeColor") === null) {
			return <Redirect to={"/"} />;
		}
		return (
			<div>
				{console.log(localStorage.getItem("isAllowed"))}
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
				{this.state.loading && <Loading />}

				<GoogleMap
					reverseLookup={this.reverseLookup}
					onMarkerDragEnd={this.onMarkerDragEnd}
					handleDragging={this.handleDragging}
					dragging={this.state.dragging}
					location={this.getLocation}
				/>
				<button
					type="button"
					className="btn search-navs-btns"
					style={{
						position: "relative",
						borderRadius: "0 50px 50px 0",
						boxShadow: "0 2px 8px 1px #E0E0E0",
					}}
					onClick={this.context.router.history.goBack}
				>
					{/* <i className="si si-arrow-left" /> */}
					<svg className="uHGrw _17EkR" viewBox="0 0 32 32" height="18" width="18"><path d="M3.333 14.984l28.667-0v2.097l-0.16 0.006h-28.506l-0.16-0.16v-1.782l0.16-0.16zM1.114 14.986l10.079-10.079 0.121-0.108 1.465 1.467-0.101 0.127-10.079 10.079h-0.226l-1.26-1.26v-0.226zM12.679 25.676l0.108 0.117-1.468 1.484-0.126-0.115-10.079-10.079v-0.226l1.26-1.26h0.226l10.079 10.079zM3.268 12.87l0.272 0.116-0.022 6.125-0.272 0.114-3.245-3.18 0.111-0.112 3.157-3.062z"></path></svg>
					<Ink duration="500" />
				</button>
				<div className="confirm-gps-location" ref="confirmGpsLocation" onClick={this.inputFocus}>
					{this.state.dragging ? (
						<ContentLoader
							height={345}
							width={window.innerWidth}
							speed={1.2}
							primaryColor="#f3f3f3"
							secondaryColor="#ecebeb"
						>
							<rect x="20" y="15" rx="0" ry="0" width="110" height="16" />
							<rect x="20" y="45" rx="0" ry="0" width="280" height="20" />
							<rect x="315" y="45" rx="0" ry="0" width="70" height="20" />

							<rect x="20" y="100" rx="0" ry="0" width="110" height="16" />
							<rect x="20" y="130" rx="0" ry="0" width="280" height="20" />

							<rect x="20" y="180" rx="0" ry="0" width="110" height="16" />
							<rect x="20" y="210" rx="0" ry="0" width="280" height="20" />

							<rect x="0" y="280" rx="0" ry="0" width={window.innerWidth} height="60" />
						</ContentLoader>
					) : (
						<React.Fragment>
							<div className="p-15">
								<p className="mb-0 font-w600 text-muted set-location">{localStorage.getItem("yourLocationText")}</p>
								<div className="d-flex align-items-baseline">
									<p className="truncate-text mb-0" style={{ minWidth: "84%", fontWeight: "500" }}>
										{this.state.location}
									</p>
									<DelayLink
										to={"/search-location"}
										delay={400}
										className="change-address-text m-0 p-5 pull-right"
										style={{
											color: localStorage.getItem("storeColor"),
											position: "relative",
										}}
									>
										{localStorage.getItem("cartChangeLocation")}
										<Ink duration={400} />
									</DelayLink>
								</div>
								<hr />
								<div className="form-group m-0">
									<label className="col-12 edit-address-input-label p-0">
										{localStorage.getItem("editAddressAddress")}
										{localStorage.getItem("flatApartmentAddressRequired") === "true" &&
											this.validator.message("house", this.state.house, "required")}
									</label>
									<div className="col-md-9 p-0">
										<input
											type="text"
											name="house"
											onChange={this.handleAddressInput}
											className="form-control edit-address-input mb-2"
											value={this.state.house}
										/>
									</div>
									<div className="address-tags-block">
										<label className="col-12 edit-address-input-label p-0">
											{localStorage.getItem("editAddressTag")}
										</label>
										<div className="col-md-9 p-0">
											<input
												type="text"
												name="tag"
												onChange={this.handleAddressInput}
												className="form-control edit-address-input edit-address-tag mb-2"
												placeholder={localStorage.getItem("addressTagPlaceholder")}
												value={this.state.tag}
											/>
										</div>
									</div>
								</div>
							</div>
						</React.Fragment>
					)}
				</div>
				{!this.state.dragging && (
					<button
						type="button"
						className="btn-save-address"
						onClick={this.handleSaveNewAddress}
						style={{
							backgroundColor: localStorage.getItem("storeColor"),
							position: "fixed",
							bottom: "0",
						}}
					>
						{localStorage.getItem("buttonSaveAddress")}
						<Ink duration={200} />
					</button>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	user: state.user.user,
	addresses: state.addresses.addresses,
});

export default connect(
	mapStateToProps,
	{ saveAddress, clearRestaurantList }
)(GeoLocationPage);
