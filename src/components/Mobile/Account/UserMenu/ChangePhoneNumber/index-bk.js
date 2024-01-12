import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import { updateNewPhoneNumber, generateOtpForPhoneNumberUpdate } from "../../../../../services/user/actions";
import SimpleReactValidator from "simple-react-validator";
import { UPDATE_NEW_PHONE_NUMBER_URL } from "../../../../../configs";
import { updateUserInfo, saveVATNumber } from "../../../../../services/user/actions";
import { connect } from "react-redux";
import OtpInput from "react-otp-input";
import axios from "axios";

class ChangePhoneNumber extends Component {
	constructor() {
		super();
		this.validator = new SimpleReactValidator({
			autoForceUpdate: this,
			messages: {
				required: localStorage.getItem("fieldValidationMsg"),
			},
		});
	}
	state = {
		loading: false,
		newPhoneNumber: null,
		otp: "",
		phone: "",
		email: "",
		numInputs: "6",
		newUser: false,
		otpRequested: false,
		error: false,
		countryCodeSelect: "",
		showResendOtp: false,
		countdownStart: false,
		success_msg: false,
		countDownSeconds: 30,
		email_phone_already_used: false,
	};

	componentDidMount() {
		const countryCode = localStorage.getItem("phoneCountryCode");
		const countryCodesArr = countryCode.split(",");
		this.setState({ countryCodeSelect: countryCodesArr[0].replace(/\s/g, "") });
	}

	handleInputChange = (event) => {
		if (event.target.name === "phone") {
			this.setState({ email_phone_already_used: false, error: false });
			this.setState({ phone: this.state.countryCodeSelect + event.target.value.replace(/^0+/, "") });
			this.setState({ onlyPhone: event.target.value.replace(/^0+/, "") });
		} else {
			this.setState({ [event.target.name]: event.target.value.trim() });
		}
	};

	handleOtpInput = (e) => {
		this.setState({ otp: e.target.value });
	};

	__sendOtp = (event) => {
		event.preventDefault();
        const isValidPhoneNumber = this.validatePhoneNumber(this.state.phone);
		const { user } = this.props;
		if (isValidPhoneNumber && this.validator.fieldValid("phone") && this.state.phone !== this.props.user.data.phone) {
		// if (this.validator.fieldValid("phone")) {
			this.setState({ loading: true });
			this.props.generateOtpForPhoneNumberUpdate(user.data.auth_token, this.state.phone, this.props.user.data.email).then((response) => {
                if (response && response.payload.success) {
                    console.log('test successful');
                    document.getElementById("loginForm").classList.add("hidden");
                    this.setState({ otpRequested: true });
                    document.getElementById("otpForm").classList.remove("hidden");
                    //start countdown
                    this.setState({ countdownStart: true });
                    this.handleCountDown();
                } else if (response && response.payload.success === false){
                    console.log('false successful');
                    this.setState({ loading: false });
                    this.setState({ email_phone_already_used: true });
                }
            });
		} else {
			this.setState({ loading: false });
			console.log("validation failed");
			this.setState({ email_phone_already_used: true });
		}
	};

    validatePhoneNumber = () => {
        const { phone } = this.state;
    
        // Check if the phone number is not empty, starts with '+91', and has exactly 10 digits
        const isValid = this.validator.fieldValid("phone") && phone.startsWith("+91") && phone.length === 13;
    
        if (!isValid) {
          this.validator.showMessageFor("phone");
        }
    
        return isValid;
    };
	
	handleCountDown = () => {
		setTimeout(() => {
			this.setState({ showResendOtp: true });
			clearInterval(this.intervalID);
		}, 30000 + 1000);
		this.intervalID = setInterval(() => {
			console.log("interval going on");
			this.setState({
				countDownSeconds: this.state.countDownSeconds - 1,
			});
		}, 1000);
	};

	resendOtp = () => {
		if (this.validator.fieldValid("phone")) {
			this.setState({ countDownSeconds: 15, showResendOtp: false });
			this.props.generateOtpForPhoneNumberUpdate(this.state.phone, this.state.email).then((response) => {
				if (!response.payload.otp) {
					this.setState({ error: false });
				}
			});
		}
	};

	__loginWithOtp = () => {
		const { user } = this.props;
		axios.post(UPDATE_NEW_PHONE_NUMBER_URL, {
			token: user.data.auth_token,
			phone: this.state.phone,
			otp: this.state.otp,
			email: user.data.email,
		})
		.then((response) => {
			console.log("response", response.data);
			if(response.data){
				this.props.updateUserInfo(user.data.id, user.data.auth_token);
				this.props.handlePopup();
				this.setState({ success_msg: true });
				setTimeout(() => {
					this.setState({ success_msg: false });
				}, 2000);
			}
		})
		.catch(function(error) {
			console.log(error);
		});
	};

	processDefaultCountryCode = () => {
		const countryCode = localStorage.getItem("phoneCountryCode");
		const countryCodesArr = countryCode.split(",");
		if (countryCodesArr.length === 0) {
			return <span className="country-code" />;
		}
		if (countryCodesArr.length === 1) {
			return <span className="country-code">{countryCodesArr[0].replace(/\s/g, "")}</span>;
		}
		if (countryCodesArr.length > 1) {
			return (
				<select name="countryCodeSelect"
					onChange={this.handleCountryCodeChange}
					className="country-code--dropdown"
				>
					{countryCodesArr.map((countryCode) => (
						<option key={countryCode} value={countryCode.replace(/\s/g, "")}>
							{countryCode.replace(/\s/g, "")}
						</option>
					))}
				</select>
			);
		}
	};

	componentWillUnmount() {
		//clear countdown
		clearInterval(this.intervalID);
	}


	render() {
		const { user } = this.props;
		return (
			<React.Fragment>
				{this.state.email_phone_already_used && (
					<div className="auth-error">
						<div className="error-shake">Invalid Phone Number</div>
					</div>
				)}
				{this.state.success_msg && (
					<div className="auth-error mb-50">
						<div className="error-shake">Phone Number Updated</div>
					</div>
				)}
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
							<div className="col-12 py-3 d-flex justify-content-between align-items-center">
								<h1 className="mt-2 mb-0 font-weight-black h4 text-center">
									{!this.state.otpRequested ? localStorage.getItem("enterNewNumberText") : localStorage.getItem("enterOTPText")}
								</h1>
							</div>
							<form onSubmit={this.__sendOtp} id="loginForm">
								<div className="form-group">
									<div className="col-md-9 pb-5">
										<div>
											{this.processDefaultCountryCode()}
											<span>
												<input
													name="phone"
													type="tel"
													onChange={this.handleInputChange}
													className="form-control phone-number-country-code auth-input"
													placeholder={localStorage.getItem("loginLoginPhoneLabel")}
												/>
												{this.validator.message("phone", this.state.phone, [
													"required",
													{ regex: ["^\\+[1-9]\\d{1,14}$"] },
													{ min: ["8"] },
												])}
											</span>
										</div>

										<div className="mt-20 button-block">
											<button
												type="submit"
												className="btn btn-md btn-block text-white"
												style={{
													backgroundColor: localStorage.getItem("storeColor"),
													height: "3rem",
													textTransform: "uppercase",
												}}
												disabled={this.state.newPhoneNumber === "" ? true : false}
											>
												{localStorage.getItem("sendOTPText")}
											</button>
										</div>
									</div>
								</div>
							</form>
							<form id="otpForm" className="hidden">
								<div className="form-group px-15 pt-30">
									<div className="col-md-9">
										
										<input
											name="otp"
											style={{  border: "1px solid #ccc", padding: "20px" }}
											type="number"
											onChange={this.handleOtpInput}
											min="1000000" max="999999"
											className="form-control edit-address-input"
											autoFocus={true}
										/>
									</div>

									<div className="col-md-9 mt-20">
										<button
											type="submit"
											onClick={this.__loginWithOtp}
											className="btn btn-md btn-block text-white"
											style={{
												backgroundColor: localStorage.getItem("storeColor"),
												height: "3rem",
												textTransform: "uppercase",
											}}
											disabled={this.state.otp.length < this.state.numInputs}
											>
											{localStorage.getItem("verifyOtpBtnText")}
										</button>
									</div>

									<div className="mt-30 mb-10">
										{this.state.showResendOtp && (
											<div className="resend-otp" onClick={this.resendOtp}>
												{localStorage.getItem("resendOtpMsg")} {this.state.phone}
											</div>
										)}

										{this.state.countDownSeconds > 0 && (
											<div className="resend-otp countdown">
												{localStorage.getItem("resendOtpCountdownMsg")} {this.state.countDownSeconds}
											</div>
										)}
									</div>
								</div>
							</form>
						</React.Fragment>
					</div>
				</Dialog>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state) => ({
	user: state.user.user,
	vat_number: state.user.vat_number,
});

export default connect(
	mapStateToProps,
	{ updateUserInfo, saveVATNumber, generateOtpForPhoneNumberUpdate, updateNewPhoneNumber }
)(ChangePhoneNumber);
