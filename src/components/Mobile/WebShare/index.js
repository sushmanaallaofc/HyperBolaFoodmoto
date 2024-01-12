import React, { Component } from "react";
import Ink from "react-ink";

class WebShare extends Component {
	state = {
		shareButton: false,
		androidShareButton: false,
	};
	componentDidMount() {
		if (navigator.share) {
			this.setState({ shareButton: true });
		}
		if (navigator.userAgent === "FoodomaaAndroidWebViewUA") {
			if (window.Android !== "undefined") {
				this.setState({ shareButton: false, androidShareButton: true });
			}
		}
	}
	shareLink = (data) => {
		if (navigator.share) {
			navigator
				.share({
					url: data.link,
				})
				.then(() => console.log("Successful share"))
				.catch((error) => console.log("Error sharing", error));
		}
	};

	shareLinkViaAndroidApp = (data) => {
		if (navigator.userAgent === "FoodomaaAndroidWebViewUA") {
			if (window.Android !== "undefined") {
				window.Android.shareDataThroughIntent(data.link);
			}
		}
	};

	render() {
		const { store_type } = this.props;
		return (
			<React.Fragment>
				{this.state.shareButton && (
					<button
						type="button"
						className="btn search-navs-btns nav-share-btn custom-bg"
						style={{ position: "relative" }}
						onClick={() => this.shareLink(this.props)}
					>
						{
							store_type && store_type.name === "Resturant V2" ?
							<img  
								src="/assets/img/various/share-icon.png"
								alt="Non-Veg"
								className="mr-1 veg-non-veg-badge"
								style={{background:'white',width:20,height:20}}
												/>
							
							:
								<i className="si si-share" />
						}
						
							
						<Ink duration="500" />
					</button>
				)}
				{this.state.androidShareButton && (
					<button
						type="button"
						className="btn search-navs-btns nav-share-btn custom-bg"
						style={{ position: "relative" }}
						onClick={() => this.shareLinkViaAndroidApp(this.props)}
					>
						{
							store_type && store_type.name === "Resturant V2" ?
							<img  
								src="/assets/img/various/share-icon.png"
								alt="Non-Veg"
								className="mr-1 veg-non-veg-badge"
								style={{background:'white',width:20,height:20}}
												/>
							
							:
								<i className="si si-share" />
						}
						<Ink duration="500" />
					</button>
				)}
			</React.Fragment>
		);
	}
}

export default WebShare;
