import React, { Component } from "react";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { Redirect } from "react-router";

class PickupAndDrop extends Component {
    static contextTypes = {
		router: () => null,
	};
    
    handleButtonClick = () => {
        // Navigate to the desired page when the button is clicked
        setTimeout(() => {
        // Navigate to the desired page after the delay
        this.props.history.push('/pickup-and-drop/task');
        }, 200);
    };

    goBackButton = () => {
        // Check if the history object is available
        if (this.props.history && this.props.history.length > 1) {
            // If there is a history stack, go back with a delay of 200 milliseconds
            setTimeout(() => {
                this.props.history.goBack();
            }, 200);
        } else {
          // If there is no history stack, redirect to the home page
          return <Redirect to="/" />;
        }
    };

    render() {
        const HoverDiv = styled.div`
        position: relative;
        text-align: center;
        transition: all 0.1s ease-in 0s;

        &:hover {
            transform: scale(0.95, 0.95);
            box-shadow: unset;
        }
        `;
        return (
            <React.Fragment>
                <div id="container">
                    <div className="pnwyq _12s3o">
                        <div className="_34fNe _1Xl7I">
                        <main className="_2_95H bottomOffsetPadBottom _1bINP">
                            <div className="gWV-A _2_95H bottomOffsetPadBottom">
                                <div className="T9q6i" style={{background: 'linear-gradient(142.25deg, rgb(237, 230, 255) 2.2%, rgb(207, 200, 250) 100%)'}}>
                                    <div className="_3P9hi">
                                        <div style={{justifyContent: 'center', alignItems: 'center', display: 'flex', userSelect: 'none', cursor: 'pointer', margin: '0px', padding: '0px', boxSizing: 'border-box', textSizeAdjust: '100%', WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}}>
                                            <button onClick={this.goBackButton} style={{backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '100%', width: '36px', height: '36px', marginRight: '8px', marginLeft: '0px', flex: '0 0 36px', justifyContent: 'center', alignItems: 'center', display: 'flex', color: 'rgb(255, 255, 255)', font: '300 14px / 16.8px ProximaNova, Arial, "Helvetica Neue", sans-serif', margin: '0px 8px 0px 0px', outline: 'rgb(255, 255, 255) none 0px', border: '0px none rgb(255, 255, 255)', cursor: 'pointer', padding: '0px', boxSizing: 'border-box', textSizeAdjust: '100%', WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}}>
                                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" color="#1B1E24" style={{width: '20px', height: '20px', userSelect: 'none', cursor: 'pointer', margin: '0px', padding: '0px', boxSizing: 'border-box', textSizeAdjust: '100%', WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', display: 'block', strokeWidth: '0px', stroke: 'rgb(27, 30, 36)', fill: 'rgb(27, 30, 36)'}}>
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M19.9004 9.99985C19.9004 10.4969 19.4974 10.8998 19.0004 10.8998L3.1733 10.8998L8.63679 16.3633C8.98826 16.7148 8.98826 17.2847 8.63679 17.6361C8.28532 17.9876 7.71547 17.9876 7.36399 17.6361L1.07122 11.3434C0.329227 10.6014 0.329227 9.39834 1.07122 8.65635L7.364 2.36358C7.71547 2.01211 8.28532 2.01211 8.63679 2.36358C8.98826 2.71505 8.98826 3.2849 8.63679 3.63637L3.17331 9.09985L19.0004 9.09985C19.4974 9.09985 19.9004 9.50279 19.9004 9.99985Z" fill="#1B1E24" fillOpacity="0.92" style={{userSelect: 'none', cursor: 'pointer', margin: '0px', padding: '0px', boxSizing: 'border-box', textSizeAdjust: '100%', WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}}></path>
                                                </svg>
                                            </button>
                                            <div tabIndex="0" role="button" style={{userSelect: 'none', cursor: 'pointer', margin: '0px', padding: '0px', boxSizing: 'border-box', textSizeAdjust: '100%', WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}}>
                                                <div style={{alignItems: 'center', display: 'flex', userSelect: 'none', cursor: 'pointer', margin: '0px', padding: '0px', boxSizing: 'border-box', textSizeAdjust: '100%', WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}}>
                                                    <div style={{userSelect: 'none', cursor: 'pointer', margin: '0px', padding: '0px', boxSizing: 'border-box', textSizeAdjust: '100%', WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}}></div>
                                                    <div style={{paddingLeft: '4px', height: '24px', textTransform: 'capitalize', wordBreak: 'break-word', width: 'auto !important', userSelect: 'none', cursor: 'pointer', margin: '0px', boxSizing: 'border-box', textSizeAdjust: '100%', WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)', WebkitFontSmoothing: 'antialiased', fontFamily: '"Basis Grotesque Pro"', fontSize: '20px', fontWeight: 800, lineHeight: '24px', letterSpacing: '-0.3px', color: 'rgb(27, 30, 36)', overflow: 'hidden', display: '-webkit-box', overflowWrap: 'break-word', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical'}}>Locating...</div>
                                                </div>
                                            </div>
                                            <button aria-label="double tap to go to user account" style={{marginLeft: 'auto', paddingLeft: '16px', background: 'rgba(0, 0, 0, 0) none repeat scroll 0px 0px / auto padding-box border-box', border: '0px none rgb(255, 255, 255)', justifyContent: 'center', alignItems: 'center', display: 'flex', color: 'rgb(255, 255, 255)', font: '300 14px / 16.8px ProximaNova, Arial, "Helvetica Neue", sans-serif', outline: 'rgb(255, 255, 255) none 0px', cursor: 'pointer', padding: '0px 0px 0px 16px', boxSizing: 'border-box', textSizeAdjust: '100%', WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'}}></button>
                                        </div>
                                        <div className="_3SY6X" style={{background: 'rgb(195, 196, 197)'}} />
                                    </div>
                                    <div>
                                        <div className="_1d0UB">
                                            <div className="sc-bczRLJ ZFzt">genie</div>
                                            <div className="_3rgaa">
                                                <div className="_3DgP-">
                                                <div className="sc-bczRLJ gKlOJy">Delivering from</div>
                                                <div style={{padding: '2px'}} />
                                                <div className="sc-bczRLJ bJwfsd">7 am - 3 am</div>
                                                </div>
                                            </div>
                                        </div>
                                        <img className="_2b0a4" fetchpriority="high" src="https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_720/Genie_2_0_Assets/LandingPage/Genie_Masthead/DefaultMastheadNew" alt="" />
                                        <div className="_3Nflb _2MOkA">
                                            <img className="ItGsB E_KIR _3_DNG" src="https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_720/Genie_2_0_Assets/LandingPage/Genie_Masthead/DefaultMastheadNew" alt="" />
                                            <div className="_3oXQD">
                                                <div className="_1aJAt">
                                                    <div style={{padding: '4px'}} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="_3GY2c">
                                    <div className="sc-gKXOVf fXJgqR _2gR2P" stroke="border_Secondary">
                                        <div className="_1_HUt" style={{width: '328px'}}>
                                        <div className="_1tijQ"><img className="sc-eCYdqJ hYGdzW BmGvj" data-savepage-src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_100/8911dbbde6f4498da8c4a70090e5fe54" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_100/31ed38be4266f413de96f3c42e95172f" alt="" /></div>
                                        <div className="_3N1Xk" style={{width: '278px'}}>
                                            <div className="sc-bczRLJ cMHvoK OrITg">Up to 25% off on first order</div>
                                            <div className="_2Xna2">
                                            <div className="sc-bczRLJ gGGSxJ">Use code GETGENIE at checkout</div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="_2a5TS">
                                        <div className="_3kHxl">
                                            <div className="sc-bczRLJ fBxNzp">Pick   up or send anything</div>
                                            <div style={{padding: '4px'}} />
                                            <div className="sc-bczRLJ dwiIGr">Sit back, relax and let Genie do the rest.</div>
                                            <div style={{padding: '8px'}} />
                                            <HoverDiv className="eyMJDE">
                                                <button onClick={this.handleButtonClick} type="button" className="sc-eCYdqJ gEVsFm _1w9Y8">
                                                    <span className="sc-bczRLJ fqEZIB">
                                                    <div className="_1q3y-">
                                                        <div className="sc-bczRLJ ejDvS">Set pick up &amp; drop location</div>
                                                        <div>
                                                        <svg width={21} height={21} viewBox="0 0 21 21" fill="none" aria-hidden="true" strokecolor="rgba(2, 6, 12, 0.92)" fillcolor="#FFFFFF">
                                                            <path d="M12.6335 3.4503C12.2297 3.07349 11.5969 3.09535 11.2201 3.49913C10.8433 3.9029 10.8652 4.53569 11.2689 4.9125L16.0963 9.41751C16.334 9.63928 16.5367 9.82888 16.7097 9.99518L2.99579 9.99518C2.4435 9.99518 1.99579 10.4429 1.99579 10.9952C1.99579 11.5475 2.4435 11.9952 2.99579 11.9952L16.7734 11.9952C16.5869 12.1759 16.3638 12.3847 16.0964 12.6343L11.327 17.0852C10.9233 17.462 10.9014 18.0948 11.2782 18.4986C11.655 18.9024 12.2878 18.9242 12.6916 18.5474L17.5087 14.0519C18.055 13.5422 18.5382 13.0913 18.8757 12.6764C19.2412 12.2271 19.5404 11.6975 19.5404 11.0259C19.5404 10.3543 19.2412 9.82469 18.8757 9.37537C18.5382 8.96054 18.055 8.50963 17.5087 7.99989L12.6335 3.4503Z" fill="#FFFFFF" fillOpacity="0.92" />
                                                        </svg>
                                                        </div>
                                                    </div>
                                                    </span>
                                                </button>
                                            </HoverDiv>
                                        </div>
                                    </div>
                                </div>
                                <div className="_1J3eK">
                                    <div className="sc-iqcoie bgLPDa">
                                        <div className="sc-evZas fmrKYA">
                                        <div className="sc-breuTD eNPQSk">
                                            <div className="sc-bczRLJ iPBpRQ title">Do more with Genie</div>
                                            <div className="sc-bczRLJ faZsZB" />
                                        </div>
                                        </div>
                                        <div className="sc-crXcEl eNxdgT">
                                        <div className="pickupRow">
                                            <div className="sc-ksZaOG QGvqQ">
                                            <div><button className="_3rf0c" style={{height: '244px', width: '296px'}}><img className="sc-eCYdqJ hmwUpb _1jWNp" data-savepage-src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_592,h_488/rng/md/carousel/production/4b7cffb03dd6bd982d72503aca86cbe3" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_592,h_488/rng/md/carousel/production/915696f8230ed1489036c0a853277cf5" alt="" /></button></div>
                                            </div>
                                            <div className="sc-ksZaOG QGvqQ">
                                            <div><button className="_3rf0c" style={{height: '244px', width: '296px'}}><img className="sc-eCYdqJ hmwUpb _1jWNp" data-savepage-src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_592,h_488/rng/md/carousel/production/c46b87714790a4dd490b55724000f1d8" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_592,h_488/rng/md/carousel/production/4bf0b6fe503e63a0c259f39106538ab4" alt="" /></button></div>
                                            </div>
                                            <div className="sc-ksZaOG QGvqQ">
                                            <div><button className="_3rf0c" style={{height: '244px', width: '296px'}}><img className="sc-eCYdqJ hmwUpb _1jWNp" data-savepage-src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_592,h_488/rng/md/carousel/production/51839a05cfa1cc7aa4c74e3669ade87f" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_592,h_488/rng/md/carousel/production/c8ed9ef1072fe1bbd115ce8a3581fbd8" alt="" /></button></div>
                                            </div>
                                            <div className="sc-ksZaOG QGvqQ">
                                            <div><button className="_3rf0c" style={{height: '244px', width: '296px'}}><img className="sc-eCYdqJ hmwUpb _1jWNp" data-savepage-src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_592,h_488/rng/md/carousel/production/9ed0b7d9a972fcfa55ef544e4b25c0e2" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_592,h_488/rng/md/carousel/production/e8d220d403b62d5baa01b1c8260143aa" alt="" /></button></div>
                                            </div>
                                            <div className="sc-ksZaOG QGvqQ">
                                            <div><button className="_3rf0c" style={{height: '244px', width: '296px'}}><img className="sc-eCYdqJ hmwUpb _1jWNp" data-savepage-src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_592,h_488/rng/md/carousel/production/c26d7f8ec77c771cd31ee08f11e46ca3" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_592,h_488/rng/md/carousel/production/36718bd5a87bf252bbfe4beffd505710" alt="" /></button></div>
                                            </div>
                                            <div className="sc-ksZaOG QGvqQ">
                                            <div><button className="_3rf0c" style={{height: '244px', width: '296px'}}><img className="sc-eCYdqJ hmwUpb _1jWNp" data-savepage-src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_592,h_488/rng/md/carousel/production/a0fe47e324162b1f929f0b8a0e44322e" src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_592,h_488/rng/md/carousel/production/ac9f61b8173ab8a1f35779f43ba21ce0" alt="" /></button></div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}
export default withRouter(PickupAndDrop);