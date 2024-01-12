import React, { Component } from "react";

import DelayLink from "../../../helpers/delayLink";
import Collapsible from "react-collapsible";
import PagePopup from "./PagePopup";
import VATNumber from "./VATNumber";
import ChangePhoneNumber from "./ChangePhoneNumber";
import Ink from "react-ink";

import Flip from "react-reveal/Flip";
import DeleteMyAccount from "./DeleteMyAccount";

class UserMenu extends Component {
	state = {
		open: false,
		open_delete: false,
		open_change_phone: false,
	};
	handleVATNumber = () => {
		this.setState({ open: !this.state.open });
	};
	handleDeleteAccount = () => {
		this.setState({ open_delete: !this.state.open_delete });
	};
	handleChangePhoneNumber = () => {
		this.setState({ open_change_phone: !this.state.open_change_phone });
	};

	render() {
		const { pages } = this.props;
		return (
			<React.Fragment>
				<div className="user-collaps">
				<Collapsible trigger={localStorage.getItem("accountMyAccount")} transitionTime={200} open={true}>
					<div className="category-list-item">
						<DelayLink to={"/my-addresses"} delay={200}>
							<div className="display-flex py-2">
								<div className="flex-auto text-right">
									<i className="si si-arrow-right" />
								</div>
								<div className="flex-auto border-0">{localStorage.getItem("accountManageAddress")}</div>
								<div className="mr-10 border-0">
									<i className="icon-home" />
								</div>
							</div>
						</DelayLink>
					</div>

					<div className="category-list-item">
						<DelayLink to={"/my-favorite-stores"} delay={200}>
							<div className="display-flex py-2">
								<div className="flex-auto text-right">
									<i className="si si-arrow-right" />
								</div>
								<div className="flex-auto border-0">{localStorage.getItem("accountMyFavouriteStores")}</div>
								<div className="mr-10 border-0">
									<i className="icon-heartInverse" />
								</div>
							</div>
						</DelayLink>
					</div>

					<div className="category-list-item">
						<DelayLink to={"/my-orders"} delay={200}>
							<div className="display-flex py-2">
								<div className="flex-auto text-right">
									<i className="si si-arrow-right" />
								</div>
								<div className="flex-auto border-0">{localStorage.getItem("accountMyOrders")}</div>
								<div className="mr-10 border-0">
									<i className="icon-CartInverse-v3" />
								</div>
							</div>
						</DelayLink>
					</div>
					<div className="category-list-item">
						<DelayLink to={"/my-wallet"} delay={200}>
							<div className="display-flex py-2">
								<div className="flex-auto text-right">
									<i className="si si-arrow-right" />
								</div>
								<div className="flex-auto border-0">{localStorage.getItem("accountMyWallet")}</div>
								<div className="mr-10 border-0">
									<i className="si si-wallet" />
								</div>
							</div>
						</DelayLink>
					</div>
					{localStorage.getItem("showCustomerVatNumber") === "true" && (
					<div className="category-list-item" onClick={this.handleVATNumber}>
						<div className="display-flex py-2">
							<div className="flex-auto text-right">
								<i className="si si-arrow-right" />
							</div>
							<div className="flex-auto border-0">{localStorage.getItem("accountTaxVatText")}</div>
							<div className="mr-10 border-0">
								<i className="si si-tag" />
							</div>
						</div>
					</div>
					)}
					{localStorage.getItem("allowChangeNumber") === "true" && (
					<div className="category-list-item" onClick={this.handleChangePhoneNumber}>
						<div className="display-flex py-2">
							<div className="flex-auto text-right">
								<i className="si si-arrow-right" />
							</div>
							<div className="flex-auto border-0">{localStorage.getItem("changePhoneNumberText")}</div>
							<div className="mr-10 border-0">
								<i className="si si-phone" />
							</div>
						</div>
					</div>
					)}
					{localStorage.getItem("showDeleteMyAccount") === "true" && (
					<div className="category-list-item" onClick={this.handleDeleteAccount}>
						<div className="display-flex py-2">
							<div className="flex-auto text-right">
								<i className="si si-arrow-right" />
							</div>
							<div className="flex-auto border-0">{localStorage.getItem("deleteMyAccountText")}</div>
							<div className="mr-10 border-0">
								<i className="si si-trash" />
							</div>
						</div>
					</div>
					)}
				</Collapsible>
				<Collapsible trigger={localStorage.getItem("accountHelpFaq")} transitionTime={200}>
					{pages.map(page => (
						<div key={page.id} className="category-list-item">
							<PagePopup page={page}></PagePopup>
						</div>
					))}
				</Collapsible>
				</div>
				<VATNumber handlePopup={this.handleVATNumber} open={this.state.open} user_info={this.props.user_info} />
				<DeleteMyAccount handlePopup={this.handleDeleteAccount} open={this.state.open_delete} user_info={this.props.user_info} />
				<ChangePhoneNumber handlePopup={this.handleChangePhoneNumber} open={this.state.open_change_phone} user_info={this.props.user_info} />
			</React.Fragment>
		);
	}
}

export default UserMenu;
