import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import { Drawer, List, ListItem, ListItemText } from "@material-ui/core";
import { withRouter } from 'react-router-dom';

class PickupSearchLocation extends Component {
    static contextTypes = {
		router: () => null,
	};

    render() {
        return (
            <React.Fragment>
                <div className="pnwyq _12s3o">
                    <div className="_34fNe">
                        <div className="_2uP5n" style={{marginTop: '0px'}}>
                        <button data-testid="simpleheader-back" className="_2_0N8" aria-label="double tap to go back">
                            <div style={{height: '23px'}}>
                            <svg width={21} height={21} viewBox="0 0 21 21" fill="none" aria-hidden="true" strokecolor="rgba(2, 6, 12, 0.92)" fillcolor="rgba(2, 6, 12, 0.92)">
                                <path d="M9.35613 3.45006C9.7599 3.07325 10.3927 3.09511 10.7695 3.49888C11.1463 3.90266 11.1245 4.53544 10.7207 4.91225L5.89328 9.41726C5.65564 9.63903 5.45297 9.82863 5.27991 9.99493L18.9938 9.99493C19.5461 9.99493 19.9938 10.4426 19.9938 10.9949C19.9938 11.5472 19.5461 11.9949 18.9938 11.9949L5.2162 11.9949C5.4027 12.1757 5.62584 12.3845 5.89326 12.6341L10.6626 17.085C11.0664 17.4618 11.0882 18.0946 10.7114 18.4984C10.3346 18.9021 9.7018 18.924 9.29803 18.5472L4.48094 14.0517C3.93464 13.5419 3.45138 13.091 3.1139 12.6762C2.74838 12.2269 2.44919 11.6972 2.44919 11.0257C2.44919 10.3541 2.74839 9.82444 3.11392 9.37513C3.4514 8.96029 3.93465 8.50938 4.48095 7.99965L9.35613 3.45006Z" fill="rgba(2, 6, 12, 0.92)" fillOpacity="0.92" />
                            </svg>
                            </div>
                        </button>
                        <div className="xxDtq">
                            <h1 aria-hidden="false" className="HlFcO">
                            <div fontWeight={700} className="sc-bczRLJ hrBTKN">Set pick up location</div>
                            </h1>
                        </div>
                        </div>
                        <div className="_2_95H bottomOffsetPadBottom _3WJDQ" style={{backgroundColor: 'rgb(240, 240, 245)'}}>
                        <div className="_1ySgr">
                            <div className="_3InQ3">
                            <div>
                                <svg width={16} height={17} viewBox="0 0 16 17" fill="none" aria-hidden="true" strokecolor="rgba(2, 6, 12, 0.92)" fillcolor="rgba(2, 6, 12, 0.92)">
                                <path fillRule="evenodd" clipRule="evenodd" d="M10.0239 7.20439C10.0239 9.30968 8.31725 11.0164 6.21196 11.0164C4.10667 11.0164 2.4 9.30968 2.4 7.20439C2.4 5.09911 4.10667 3.39243 6.21196 3.39243C8.31725 3.39243 10.0239 5.09911 10.0239 7.20439ZM9.46785 11.2745C8.57581 11.989 7.44379 12.4164 6.21196 12.4164C3.33347 12.4164 1 10.0829 1 7.20439C1 4.32591 3.33347 1.99243 6.21196 1.99243C9.09045 1.99243 11.4239 4.32591 11.4239 7.20439C11.4239 8.43603 10.9967 9.56788 10.2824 10.4599L14.4096 14.2079C14.7528 14.5196 14.767 15.0543 14.441 15.3838C14.115 15.7132 13.5803 15.7047 13.2651 15.365L9.46785 11.2745Z" fill="rgba(2, 6, 12, 0.92)" fillOpacity="0.92" />
                                </svg>
                            </div>
                            </div>
                            <input className="_413F8" placeholder=" " type="text" style={{border: '1px solid rgb(186, 187, 192)', borderRadius: '12px', fontFamily: '"Basis Grotesque Pro"', fontSize: '16px', fontWeight: 400, lineHeight: '19px', letterSpacing: '-0.3px'}} />
                            <label className="_17bpx">
                            <div data-index={0} className="_1sDdr">
                                <div className="sc-bczRLJ gRUFcn">Search for building, area, or street</div>
                            </div>
                            </label>
                        </div>
                        <div data-clicked="false" className="SFAnt" style={{marginBottom: '0px'}}>
                            <div className="R9pSm _10XaM">
                            <div stroke="border_Secondary" className="sc-gKXOVf fXJgqR _1DOkS _3otPM">
                                <div className="_1tqfV icon-sniper-v2" style={{border: '1px solid rgb(226, 226, 231)', color: 'rgb(241, 87, 0)'}} />
                                <div className="eIYtR" tabIndex={0} style={{gap: '4px'}}>
                                <div className="sc-bczRLJ cSxxDX _2GWuL">Use Current Location</div>
                                <div className="sc-bczRLJ lfLUmo" />
                                </div>
                                <div role="button" className="_1h3FL _2IHDN" tabIndex={0}>
                                <svg width={12} height={13} viewBox="0 0 12 13" fill="none" aria-hidden="true" strokecolor="rgba(2, 6, 12, 0.92)" fillcolor="rgba(2, 6, 12, 0.92)">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M2.92132 2.30362C3.24538 1.92672 3.81361 1.88388 4.19051 2.20793L8.10108 5.5702C8.11161 5.57926 8.12223 5.58838 8.13292 5.59756C8.30943 5.74917 8.5066 5.91852 8.65206 6.08431C8.82307 6.27919 9.02931 6.58536 9.02931 7.01089C9.02931 7.43643 8.82307 7.7426 8.65207 7.93749C8.50661 8.10327 8.30945 8.27262 8.13294 8.42423C8.12224 8.43342 8.11162 8.44254 8.1011 8.45159L4.22848 11.7813C3.85158 12.1054 3.28334 12.0625 2.95928 11.6856C2.63523 11.3087 2.67806 10.7405 3.05496 10.4164L6.92758 7.08673C6.9591 7.05963 6.98835 7.03447 7.01565 7.0109C6.98835 6.98734 6.9591 6.96218 6.92758 6.93508L3.01701 3.57281C2.64011 3.24875 2.59727 2.68052 2.92132 2.30362Z" fill="rgba(2, 6, 12, 0.92)" fillOpacity="0.92" />
                                </svg>
                                </div>
                            </div>
                            </div>
                            <div className="_3G3n5">
                            <div className="sc-bczRLJ hrBTKN">Your saved addresses in City</div>
                            </div>
                            <div className="_36iSH">
                            <div className="_1z9TC">
                                <div className="sc-gKXOVf lpaofD">
                                <div className="R9pSm">
                                    <div className="sc-gKXOVf ccUTIK _1DOkS _2rwnM _2VCi4 _1hV80">
                                    <div className="_1tqfV icon-friends-and-family" style={{border: '1px solid rgb(226, 226, 231)', color: 'rgb(241, 87, 0)'}} />
                                    <div className="eIYtR" tabIndex={0} style={{gap: '4px'}}>
                                        <div className="sc-bczRLJ cSxxDX">suresh</div>
                                        <div className="sc-bczRLJ lfLUmo">39, i.a.f road, bharathiyar nagar, navajeevan nagar, deena dayalan nagar, pattabiram, tamil nadu 600072, india</div>
                                    </div>
                                    <div role="button" aria-label="Suresh Address" className="_1h3FL" tabIndex={0}><span className="_3XQob" /></div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div className="_2fu7V _32fAq" style={{paddingBottom: '0px'}}>
                            <div className="sc-bczRLJ dwiIGr">To select addresses from other cities, please update your location on the Genie home page.</div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(PickupSearchLocation)