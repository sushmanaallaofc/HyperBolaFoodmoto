import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import { logoutUser, deleteMyAccount } from "../../../../../services/user/actions";
import { connect } from "react-redux";

class DeleteMyAccount extends Component {

	deleteAccount = () => {
		const { user } = this.props;
		this.props.deleteMyAccount(user.data.auth_token, user.data.id).then((data) => {
            console.log('data', data.success);
			if (data.success) {
				this.props.handlePopup();
				this.props.logoutUser();
			}
		});
	};

	render() {
		const { user } = this.props;
		return (
			<React.Fragment>
				<Dialog
					fullWidth={true}
					fullScreen={false}
					open={this.props.open}
					onClose={this.props.handlePopup}
					style={{ width: "100%", margin: "auto" }}
					PaperProps={{ style: { backgroundColor: "#fff", borderRadius: "4px" } }}
				>
					<div className="container" style={{ borderRadius: "5px" }}>
						<React.Fragment>
							<div className="col-12 py-3">
								<h1 className="mt-2 mb-2 font-weight-black h4 text-center">
									Delete My Account
								</h1>
                                <hr/>
                                <p className="mb-1 text-center">Are you sure you want to delete your account?</p>
							</div>
							<div className="d-flex justify-content-around align-items-center mb-20 mt-10">
                            <button
                                    type="submit"
                                    className="btn btn-md btn-secondary cancelOrderDialogBtn"
                                    style={{ width: '135px', height:'3.2rem', border: 'inherit' }}
                                    onClick={this.props.handlePopup}
                                >
                                    No
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-md btn-danger cancelOrderDialogBtn"
                                    style={{ width: '135px', height:'3.2rem'}}
                                    onClick={this.deleteAccount}
                                >
                                    Yes
                                </button>
                            </div>
						</React.Fragment>
					</div>
				</Dialog>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	user: state.user.user,
});

export default connect(
	mapStateToProps,
	{ logoutUser, deleteMyAccount }
)(DeleteMyAccount);
