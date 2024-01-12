import React, { Component } from "react";

class ItemBadge extends Component {
	render() {
		const {noVegBadge} =this.props;
		return (
			<>
			{
				this.props.type ?
				<>
				<React.Fragment>
					
					<div className="item-badge-collection" >
						
						{this.props.item.is_popular === 1 ? (
							<img
							src="/assets/img/various/bestseller-icon.png"
							alt="Veg"
							className=""
							width={74}
							height={16}
						/>
						) : null}
						
					</div>
					
				</React.Fragment>
				
				
				</>
				:
				<>
				<React.Fragment>
					{noVegBadge === false ? (null):(
					<span className="item-badge-collection">
						{console.log(this.props.type)}
						{this.props.item.is_recommended === 1 ? (
							<span
								className="item-badge"
								style={{ backgroundColor: localStorage.getItem("recommendedBadgeColor") }}
							>
								{localStorage.getItem("recommendedBadgeText")}
							</span>
						) : null}
						{this.props.item.is_popular === 1 ? (
							<span
								className="item-badge"
								style={{ backgroundColor: localStorage.getItem("popularBadgeColor") }}
							>
								{localStorage.getItem("popularBadgeText")}
							</span>
						) : null}
						{this.props.item.is_new === 1 ? (
							<span className="item-badge" style={{ backgroundColor: localStorage.getItem("newBadgeColor") }}>
								{localStorage.getItem("newBadgeText")}
							</span>
						) : null}
					</span>
					)}
					
				</React.Fragment>
				</>
			}
			</>
		);
	}
}

export default ItemBadge;
