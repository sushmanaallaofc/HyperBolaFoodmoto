import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import { Drawer, List, ListItem, ListItemText } from "@material-ui/core";
import { withRouter } from 'react-router-dom';

class Task extends Component {
    static contextTypes = {
		router: () => null,
	};

    handlePickupAddressButton = () => {
        // Navigate to the desired page when the button is clicked
        setTimeout(() => {
        // Navigate to the desired page after the delay
        this.props.history.push('/pickup-and-drop/search-location');
        }, 200);
    };

    render() {
        return (
            <React.Fragment>
                <div className="pnwyq _12s3o">
                    <div className="_34fNe" data-testid="flex-layout-container" style={{background: 'rgb(240, 240, 245)'}}>
                        <div className="_3Gv9D statusBarPadTop _34b1C">
                        <div className="_2NsHQ _34b1C">
                            <button data-testid="simpleheader-back" className="_3Mk1y" aria-label="double tap to go back">
                            <div className="_1lk8E">
                                <svg width={21} height={21} viewBox="0 0 21 21" fill="none" aria-hidden="true" strokecolor="rgba(2, 6, 12, 0.92)" fillcolor="rgba(2, 6, 12, 0.92)">
                                <path d="M9.35613 3.45006C9.7599 3.07325 10.3927 3.09511 10.7695 3.49888C11.1463 3.90266 11.1245 4.53544 10.7207 4.91225L5.89328 9.41726C5.65564 9.63903 5.45297 9.82863 5.27991 9.99493L18.9938 9.99493C19.5461 9.99493 19.9938 10.4426 19.9938 10.9949C19.9938 11.5472 19.5461 11.9949 18.9938 11.9949L5.2162 11.9949C5.4027 12.1757 5.62584 12.3845 5.89326 12.6341L10.6626 17.085C11.0664 17.4618 11.0882 18.0946 10.7114 18.4984C10.3346 18.9021 9.7018 18.924 9.29803 18.5472L4.48094 14.0517C3.93464 13.5419 3.45138 13.091 3.1139 12.6762C2.74838 12.2269 2.44919 11.6972 2.44919 11.0257C2.44919 10.3541 2.74839 9.82444 3.11392 9.37513C3.4514 8.96029 3.93465 8.50938 4.48095 7.99965L9.35613 3.45006Z" fill="rgba(2, 6, 12, 0.92)" fillOpacity="0.92" />
                                </svg>
                            </div>
                            </button>
                            <div className="_3opUd">
                            <div fontWeight={600} aria-hidden="false" data-testid="simpleheader-title" className="sc-bczRLJ bQhaLl _1K3sR">Pick up or Send anything</div>
                            </div>
                        </div>
                        </div>
                        <div className="_2_95H bottomOffsetPadBottom" id="main-container">
                        <div className="_1w4ab">
                            <div className="_1-Wk4">
                                <div className="_1Knm7 _1ZDQh" onClick={this.handlePickupAddressButton} style={{background: 'rgb(241, 87, 0)', color: 'rgb(255, 238, 229)', padding: '16px 12px', borderRadius: '16px', marginBottom: '12px'}}>
                                    <div className="_11TQ_"><img className="sc-gsnTZi jVTwij" src="https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_60/Genie_2_0_Assets/TaskSrceenDeliveryStages/IconAddressPickUp" alt="IconAddressPickUp" /></div>
                                    <div className="sc-bczRLJ ejDvS _1cFOU">Set pick up location</div>
                                </div>
                                <div className="r3y3o" style={{borderColor: 'rgba(2, 6, 12, 0.45)'}} />
                            </div>
                            <div data-testid="PUDO_LOCATION_CARD">
                            <div className="_1Knm7 _3h-18" data-testid="PUDO_EMPTY_LOCATION_CARD" style={{padding: '16px 12px', borderRadius: '16px', marginBottom: '12px'}}>
                                <div className="_11TQ_ rIjPt"><img className="sc-gsnTZi jVTwij" src="https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_60/Genie_2_0_Assets/TaskSrceenDeliveryStages/IconAddressDrop" alt="IconAddressDrop" /></div>
                                <div className="sc-bczRLJ jaOZXC _1cFOU">Set drop location</div>
                            </div>
                            </div>
                            <div data-testid="PUDO_TIPS" className="_3TfES" style={{padding: '20px 16px', borderRadius: '24px', margin: '20px 0px'}}>
                            <div className="_2iVog" style={{marginBottom: '20px'}}>
                                <div aria-label="Things to keep in mind" className="sc-bczRLJ gMzRfV">Things to keep in mind</div>
                            </div>
                            <div className="_3rNk1" style={{marginTop: '16px'}}>
                                <div className="gmGOC" style={{marginRight: '12px'}}><img className="sc-gsnTZi bSGDDC" src="https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_96/Genie_2_0_Assets/TaskPage/BoxPacked" alt="BoxPacked" /></div>
                                <div className="sc-bczRLJ dwiIGr _2wS_g" aria-label="Avoid sending high value and fragile items.">Avoid sending high value and fragile items.</div>
                            </div>
                            <div className="_3rNk1" style={{marginTop: '16px'}}>
                                <div className="gmGOC" style={{marginRight: '12px'}}><img className="sc-gsnTZi bSGDDC" src="https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_96/Genie_2_0_Assets/TaskPage/Delivery" alt="Delivery" /></div>
                                <div className="sc-bczRLJ dwiIGr _2wS_g" aria-label="Items should fit in a backpack.">Items should fit in a backpack.</div>
                            </div>
                            <div className="_3rNk1" style={{marginTop: '16px'}}>
                                <div className="gmGOC" style={{marginRight: '12px'}}><img className="sc-gsnTZi bSGDDC" src="https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_96/Genie_2_0_Assets/TaskPage/Illegal_items" alt="ItemType" /></div>
                                <div className="sc-bczRLJ dwiIGr _2wS_g" aria-label="Transporting illegal items is prohibited.">Transporting illegal items is prohibited.</div>
                            </div>
                            </div>
                        </div>
                        <div data-testid="GO_FOOTER_CARD" className="_39638" style={{paddingBottom: '0px', borderRadius: '20px 20px 0px 0px'}}>
                            <div data-testid="GO_FOOTER_DETAILS" style={{padding: '20px 16px'}}>
                            <div className="_1bdf0">
                                <img className="_3R2dA" src="https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_40,h_40//Genie_2_0_Assets/CartPageAssets/StarIcon" alt="StarIcon"/>
                                <div className="_3WSDp">
                                <div className="sc-bczRLJ dqiUGf">Delivery charges</div>
                                <div className="_2B5j0">
                                    <div className="_254ri">
                                    <div fontWeight={700} className="sc-bczRLJ hFLhLw">Starting at ₹55 for first 2 kms</div>
                                    <div className="fBP8Z">
                                        <svg className="_1Eaan Zjroz lIoVy" viewBox="0 0 16 16" data-testid="delivery-fee-tooltip">
                                        <path d="M7.041.247c1.85 0 3.431.656 4.744 1.968 1.312 1.313 1.968 2.894 1.968 4.744 0 1.85-.656 3.431-1.968 4.743-1.313 1.312-2.894 1.969-4.744 1.969-1.85 0-3.431-.657-4.743-1.969C.986 10.39.329 8.81.329 6.96c0-1.85.657-3.431 1.969-4.744C3.61.903 5.19.247 7.04.247zm0 12.43c1.577 0 2.924-.56 4.041-1.677 1.118-1.118 1.676-2.465 1.676-4.041 0-1.577-.558-2.924-1.676-4.041C9.965 1.8 8.618 1.242 7.042 1.242 5.464 1.242 4.117 1.8 3 2.918c-1.117 1.117-1.676 2.464-1.676 4.04C1.324 8.536 1.883 9.883 3 11c1.118 1.117 2.465 1.676 4.041 1.676zM6.267 4.34c0-.491.245-.737.737-.737.491 0 .737.246.737.737 0 .492-.246.737-.737.737-.492 0-.737-.245-.737-.737zm1.422 5.488h.516v.259l-2.196-.03v-.259h.516V5.926h-.516v-.258l1.68.03v4.13z" />
                                        </svg>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(Task)