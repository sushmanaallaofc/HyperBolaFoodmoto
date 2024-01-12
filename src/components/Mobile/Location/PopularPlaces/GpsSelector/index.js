import React, { Component } from "react";
import Ink from "react-ink";
import { GET_ADDRESS_FROM_COORDINATES } from "../../../../../configs";
import Axios from "axios";

class GpsSelector extends Component {
	static contextTypes = {
		router: () => null,
	};

	state = {
		gps_loading: false,
	};

	componentDidMount() {
		if (this.props.fetchGpsAutomaticallyAndroid) {
			if (navigator.userAgent === "FoodomaaAndroidWebViewUA") {
				if (window.Android !== "undefined") {
					if (localStorage.getItem("userAlreadySelectedLocation") === null) {
						this.getMyLocation();
					}
				}
			}
		}
	}

	getMyLocation = () => {
		this.startLoading();
		const location = navigator && navigator.geolocation;
		if (location) {
			location.getCurrentPosition(
				(position) => {
					this.reverseLookup(position.coords.latitude, position.coords.longitude);
				},
				(error) => {
					this.setState({ gps_loading: false });
					this.stopLoading();
					console.log(error);
					if (navigator.userAgent !== "FoodomaaAndroidWebViewUA") {
						alert(localStorage.getItem("gpsAccessNotGrantedMsg"));
					}
				},
				{ timeout: 5000 }
			);
		} else {
			this.stopLoading();
		}
	};

	reverseLookup = (lat, lng) => {
		Axios.post(GET_ADDRESS_FROM_COORDINATES, {
			lat: lat,
			lng: lng,
		})
			.then((response) => {
				console.log(response);
				const myLocation = [
					{
						formatted_address: response.data,
						geometry: {
							location: {
								lat: lat,
								lng: lng,
							},
						},
					},
				];
				this.handleGeoLocationClick(myLocation);
			})
			.catch(function(error) {
				console.warn(error.response.data);
			});
	};

	handleGeoLocationClick = (results) => {
		const saveGeoLocation = new Promise((resolve) => {
			localStorage.setItem("geoLocation", JSON.stringify(results[0]));
			resolve("GeoLocation Saved");
		});
		saveGeoLocation.then(() => {
			this.stopLoading();
			if (this.props.fetchGpsAutomaticallyAndroid) {
				//set user location but with business flag (do not redirect to address saving)
				const userSetAddress = {
					lat: JSON.parse(localStorage.getItem("geoLocation")).geometry.location.lat,
					lng: JSON.parse(localStorage.getItem("geoLocation")).geometry.location.lng,
					address: JSON.parse(localStorage.getItem("geoLocation")).formatted_address,
					house: null,
					tag: null,
					city: null,
					state: null,
					businessLocation: true,
				};
				const saveUserSetAddress = new Promise((resolve) => {
					localStorage.setItem("userSetAddress", JSON.stringify(userSetAddress));
					localStorage.setItem("userAlreadySelectedLocation", "true");
					resolve("Location Saved");
				});
				saveUserSetAddress.then(() => {
					window.location.reload();
				});
			} else {
				this.context.router.history.push("/my-location");
			}
		});
	};

	startLoading = () => {
		document.getElementById("gpsLoadingScreen").classList.remove("hidden");
	};

	stopLoading = () => {
		document.getElementById("gpsLoadingScreen").classList.add("hidden");
	};

	render() {
		return (
			<React.Fragment>
				<div
					className="d-flex justify-content-center align-items-center gps-selection-block"
					style={{
						position: "relative",
					}}
					onClick={this.getMyLocation}
				>
					<div className="liFJG">
						<div className="J5Oaw _3bkgS">
							<div data-aut-id="locationItem" className="_1jtbH">
								<span className="_164_b _1k7ch" role="listbox" id="N5UMO" data-aut-id="">
								<svg width="48px" height="48px" viewBox="0 0 1024 1024" data-aut-id="icon" className="" fillRule="evenodd">
									<path className="rui-4K4Y7" d="M640 512c0 70.692-57.308 128-128 128s-128-57.308-128-128c0-70.692 57.308-128 128-128s128 57.308 128 128zM942.933 469.333h-89.6c-17.602-157.359-141.307-281.064-297.136-298.527l-1.531-0.139v-89.6h-85.333v89.6c-157.359 17.602-281.064 141.307-298.527 297.136l-0.139 1.531h-89.6v85.333h89.6c17.602 157.359 141.307 281.064 297.136 298.527l1.531 0.139v89.6h85.333v-89.6c157.359-17.602 281.064-141.307 298.527-297.136l0.139-1.531h89.6zM512 772.267c-143.741 0-260.267-116.525-260.267-260.267s116.525-260.267 260.267-260.267c143.741 0 260.267 116.525 260.267 260.267v0c0 143.741-116.525 260.267-260.267 260.267v0z"></path>
								</svg>
								</span>
								<div className="_3z-s0">
									<div className="_1nWq6"><span>Use current location</span></div>
									<span className="_3Aqq7">{localStorage.getItem("useGpsMessage")}</span>
								</div>
							</div>
						</div>
					</div>
					<Ink duration="500" />
				</div>
				
			</React.Fragment>
		);
	}
}

export default GpsSelector;
