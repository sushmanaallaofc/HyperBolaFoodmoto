import React, { Component } from "react";
import './Offers.css';

class CloneOffers extends Component {

    render() {
        return(
            <React.Fragment>
                <div className="_2yoTv">
                    <div>
                    <h2 className="PJmu0 _2mLeE" aria-label="All offers. 1723 offers available."><div className="sc-bczRLJ DtTZL">All Offers (1723)</div></h2>
                        <div options="[object Object]">
                            <div>
                                <div data-testid="restaurant-card-block">
                                    <a data-testid="resturant-card-anchor-container" className="styles_container__fLC0R" href="/restaurants/a2b-adyar-ananda-bhavan-bilekahalli-bannerghatta-main-road-bangalore-1532" id="restaurant-card-1532" aria-label="Restaurant name: A2B - Adyar Ananda Bhavan, 
                                        Cuisines: South Indian, North Indian, Sweets, Chinese,
                                        Area: Bannerghatta Main Road,
                                        3 Kilometers away,
                                        Rating: 4.3,
                                        Delivers in: 23 mins,
                                        Cost is: RUPEES 300 for two,
                                        Offer Available: Get 20% OFF,
                                        Double tap to open restaurant menu." tabIndex={0} role="button" style={{marginBottom: '16px'}}>
                                        <div className="sc-kDDrLX CDNkr">
                                            <div width="136px" height="164px" className="sc-eCYdqJ khlPcf">
                                                <img className="sc-gsnTZi daNBwx" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/xklnwrywflwdnspfriu1" alt="" />
                                                <div className="sc-hKMtZM NEFyg sc-jSMfEi dvSibR">
                                                    <div className="sc-bczRLJ egnNvf" />
                                                    <div className="sc-bczRLJ bJooBR">20% OFF</div>
                                                    <div className="sc-bczRLJ ilqGVg">UPTO ₹50</div>
                                                </div>
                                            </div>
                                            <div className="content-container">
                                                <div className="content-inner-container">
                                                    <div>
                                                    <span className="sc-bczRLJ IVtlA sw-restaurant-card-title-container">
                                                    <img className="sc-gsnTZi bXdSMh sc-jqUVSM haguvY" src="data:image/png;base64,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" width="20px" height="20px" alt="" />A2B - Adyar Ananda Bhavan
                                                    </span>
                                                    </div>
                                                    <div className="sw-restaurant-card-subtext-container">
                                                        <svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" margintop="-2px" className="sc-iBkjds fPTvPe">
                                                        <circle cx={10} cy={10} r={9} fill="url(#RatingMulticolored20_svg__a)" />
                                                        <path d="M10.082 12.865a.16.16 0 0 0-.164 0l-2.602 1.532a.5.5 0 0 1-.739-.551l.699-2.822a.16.16 0 0 0-.054-.162L4.955 8.99a.5.5 0 0 1 .28-.884l3-.232a.16.16 0 0 0 .135-.096l1.17-2.714a.5.5 0 0 1 .92 0l1.17 2.714a.161.161 0 0 0 .135.096l3 .232a.5.5 0 0 1 .28.884l-2.267 1.872a.16.16 0 0 0-.054.162l.698 2.822a.5.5 0 0 1-.739.55l-2.601-1.531Z" fill="#fff" />
                                                        <defs>
                                                            <linearGradient id="RatingMulticolored20_svg__a" x1={10} y1={1} x2={10} y2={19} gradientUnits="userSpaceOnUse">
                                                            <stop stopColor="#21973B" />
                                                            <stop offset={1} stopColor="#128540" />
                                                            </linearGradient>
                                                        </defs>
                                                        </svg>
                                                        <div className="sc-bczRLJ jAcueU"><span className="sc-bczRLJ bgrgSi">4.3 • </span>23 MINS</div>
                                                    </div>
                                                    <div className="sw-restaurant-card-descriptions-container">
                                                        <div>
                                                            <div className="sw-restaurant-card-descriptions">
                                                                <div className="description1">
                                                                <div className="sc-bczRLJ CrZuv">South Indian, North Indian, Sweets, Chinese</div>
                                                                </div>
                                                                <div className="sc-bczRLJ CrZuv description2">Bannerghatta Main Road</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                    <div options="[object Object]">
                                        <div></div>
                                    </div>
                                </div>
                            </div>
                            <div></div>
                        </div>
                        <div>
                            <div className="_25Ucs" data-testid="restaurant-placeholder">
                                <div className="_1NiyK" />
                                <div className="_1YTWr">
                                <div className="jMXtD _3m1-t" />
                                <div className="jMXtD cGqgs" />
                                <div className="jMXtD _2WpAd" />
                                <div className="jMXtD _1eBWx" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}

export default CloneOffers;