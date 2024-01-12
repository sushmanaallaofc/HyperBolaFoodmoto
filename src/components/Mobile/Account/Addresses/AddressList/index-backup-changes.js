import React, { Component } from "react";

import Ink from "react-ink";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Zoom from "@material-ui/core/Zoom";
class AddressList extends Component {
	state = {
		dropdownItem: null,
	};

	handleSetDefaultAddress = (e, address) => {
		if (!e.target.classList.contains("si")) {
			this.props.handleSetDefaultAddress(address.id, address);
		}
	};

	handleDropdown = (event) => {
		this.setState({ dropdownItem: event.currentTarget });
	};

	handleDropdownClose = () => {
		this.setState({ dropdownItem: null });
	};

	render() {
		const { user, address } = this.props;
		return (
			<React.Fragment>
				<div className={ !address.is_operational && this.props.fromCartPage ? "bg-white _1xJn6 no-click" : "bg-white _1xJn6"} style={{ position: "relative" }} >
					<div className="_3I6rl">
						<div className="_2JQLE"><span className="icon-marker"></span></div>
						<div className={
								!address.is_operational && this.props.fromCartPage ? "address-not-usable _3IifR w-100" : "_3IifR w-100"
							}
						>
							{address.tag !== null && (
								<h6 className="mr-2 text-uppercase _1ZPIL">
									<span>{address.tag}</span>
								</h6>
							)}
							<div className="">
								{address.house !== null ? (
									<div className="mr-2 text-capitalize _1ZPIL">
										{address.tag === null ? (
											<span>{address.house}</span>
										) : (
											<span>{address.house}</span>
										)}
									</div>
								):(
									<div className="mr-2 text-capitalize _1ZPIL">
										{address.tag === null && (
											<span>Others</span>
										)}
									</div>
								)}
								<span className="mr-2 text-capitalize lF4FT text-sm08">{address.address}</span>
							</div>
							{user.data.default_address_id === address.id ? (
								<React.Fragment>
									<div className="_1cdSC"><span className="_2HLpnselect text-uppercase"><i className="icon-tickSharp" /> SELECTED</span></div>
								</React.Fragment>
							) : (
								<React.Fragment>
									{this.props.fromCartPage && (
										<React.Fragment>
											{!address.is_operational && (
												<span className="text-danger text-uppercase font-w600 text-sm08">
													{" "}
													<i className="si si-close" />{" "}
													{localStorage.getItem("addressDoesnotDeliverToText")}
												</span>
											)}
										</React.Fragment>
									)}
								</React.Fragment>
							)}
							<div>
							{!this.props.fromCartPage && this.props.deleteButton && (
								<React.Fragment>
									{user.data.default_address_id !== address.id && (
										<React.Fragment>
											<div className="_1cdSC"><span className="_2HLpnselect" onClick={(e) => this.handleSetDefaultAddress(e, address)}>SELECT</span><span className="_2HLpn" onClick={this.handleDropdown}>DELETE</span></div>
										</React.Fragment>
									)}
								</React.Fragment>
							)}
							</div>
						</div>
					</div>
				</div>
				<Menu
					id="simple-menu"
					keepMounted
					anchorEl={this.state.dropdownItem}
					open={Boolean(this.state.dropdownItem)}
					onClose={this.handleDropdownClose}
					TransitionComponent={Zoom}
					MenuListProps={{ disablePadding: true }}
					elevation={3}
					getContentAnchorEl={null}
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "center",
					}}
					transformOrigin={{
						vertical: "top",
						horizontal: "center",
					}}
				>
					<MenuItem
						onClick={() => {
							this.props.handleDeleteAddress(address.id);
							this.handleDropdownClose();
						}}
					>
						{localStorage.getItem("deleteAddressText")}
					</MenuItem>
				</Menu>
			</React.Fragment>
		);
	}
}

export default AddressList;
