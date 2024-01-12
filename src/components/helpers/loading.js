import React, { Component } from "react";
import PickupLoading from "../Mobile/Loadings/Pickup/PickupLoading";
import TaskLoading from "../Mobile/Loadings/Pickup/TaskLoading";

class Loading extends Component {
	render() {
		const { page } = this.props;
		const DefaultLoading = () => (
			localStorage.getItem("useSimpleSpinner") === "true" ? (
			   <div className="height-100 overlay-loading ongoing-payment-spin">
				  <div className="spin-load" />
			   </div>
			) : (
			   <div className="height-100 overlay-loading">
				  <div>
					 <img src="/assets/img/loading-food.gif" alt={localStorage.getItem("pleaseWaitText")} />
				  </div>
			   </div>
			)
		 );
		return (
			<React.Fragment>
				{ page === "pickup" ? (
				<PickupLoading />
				): page === "task" ? (
				<TaskLoading />
				):(
				<DefaultLoading />
				)}
			</React.Fragment>
		);
	}
}

export default Loading;
