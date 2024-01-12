import React, { Component } from "react";

class DesktopLoginPopup extends Component {
	render() {
		return (
			<React.Fragment>
                <div className="_3vi_e snipcss0-0-0-1 snipcss-nvOKG" style={{left: 'auto', right: '0px', transform: 'translate(0%, 0px)'}}>
                    <div className="_12S7_ snipcss0-1-1-2">
                    <div className="snipcss0-2-2-3">
                        <div style={{paddingLeft: '40px', paddingRight: '352px', width: '754px'}} className="snipcss0-3-3-4">
                        <div className="_3pYe- snipcss0-4-4-5" style={{height: '130px'}}>
                            <span className="_22fFW icon-close-thin snipcss0-5-5-6">
                            </span>
                            <div className="_1Tg1D snipcss0-5-5-7">
                            Login
                            </div>
                            <div className="HXZeD snipcss0-5-5-8">
                            </div>
                            <div className="_2r91t snipcss0-5-5-9">
                            or 
                            <a className="_3p4qh snipcss0-6-9-10">
                                create an account
                            </a>
                            </div>
                            <img className="_2tuBw _12_oN jdo4W snipcss0-5-5-11" width={100} height={105} alt="" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r" />
                        </div>
                        <form className="snipcss0-4-4-12">
                            <div className="snipcss0-5-12-13">
                            <div className="_3Um38 _3lG1r snipcss0-6-13-14">
                                <input className="_381fS snipcss0-7-14-15" type="tel" name="mobile" id="mobile" tabIndex={1} autoComplete="off" />
                                <div className="_2EeI1 snipcss0-7-14-16">
                                </div>
                                <label className="_1Cvlf snipcss0-7-14-17" htmlFor="mobile">
                                Phone number
                                </label>
                            </div>
                            </div>
                            <div className="_25qBi _2-hTu snipcss0-5-12-18">
                            <a className="a-ayg snipcss0-6-18-19">
                                <input type="submit" style={{display: 'none'}} className="snipcss0-7-19-20" />
                                Login
                            </a>
                            </div>
                            <div className="_1FvHn snipcss0-5-12-21">
                            By clicking on Login, I accept the 
                            <a className="IBw2l snipcss0-6-21-22" href="/terms-and-conditions">
                                Terms &amp; Conditions
                            </a>
                            &amp; 
                            <a className="IBw2l snipcss0-6-21-23" href="/privacy-policy">
                                Privacy Policy
                            </a>
                            </div>
                        </form>
                        </div>
                    </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default DesktopLoginPopup;
