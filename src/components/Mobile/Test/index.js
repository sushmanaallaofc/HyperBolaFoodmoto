import React, { Component } from "react";

import CategoryItem from "../CategoryItem";


const categories = [
	'All',
	'Indian Blends',
	'Indian Single Malts',
	'Imported Blends',
	'Imported Single Malts',
];

class Test extends Component {
	static contextTypes = {
		router: () => null,
	};
	state = {
		activeCategory: 'All',
	};

    categoriesContainerRef = React.createRef();

    handleCategoryClick = (category) => {
        this.setState({ activeCategory: category }, () => {
        const container = this.categoriesContainerRef.current;
        const selectedItem = container.querySelector('.selected');

        if (selectedItem) {
            selectedItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
        });
    };

	render() {
        const categories = [
            { id: 1, title: 'Category 1', image: 'https://via.placeholder.com/150' },
            { id: 2, title: 'Category 2', image: 'https://via.placeholder.com/150' },
            { id: 3, title: 'Category 3', image: 'https://via.placeholder.com/150' },
            { id: 4, title: 'Category 4', image: 'https://via.placeholder.com/150' },
            { id: 5, title: 'Category 5', image: 'https://via.placeholder.com/150' },
            { id: 6, title: 'Category 6', image: 'https://via.placeholder.com/150' },
            { id: 7, title: 'Category 7', image: 'https://via.placeholder.com/150' },
            { id: 8, title: 'Category 8', image: 'https://via.placeholder.com/150' },
          ];
        return (
            <React.Fragment>
                <div data-testid="coupons-for-you-container" className="_2KVDL">
                    <div className="sc-iBkjds sothb Q4Jln" stroke="border_Secondary">
                        <p className="novMV">Flat ₹120 off - Only today! Use INSTA120 | On orders above ₹299, double tap to get detail</p>
                        <div className="_2ZadY">
                        <div className="_4jq2u" style={{width: '1822px'}}>
                            <div>
                            <div data-testid="swipe-scroll-tracker">
                                <div className="_4ngcU">
                                <div className="_3aAhi">
                                    <div data-testid="coupons-for-you-card" className="_2XJFi" style={{width: '1822px'}}>
                                    <div className="_3oXCg"><img className="sc-eCYdqJ hYGdzW _2E1sj" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_100/dcd4tzq2ae0i3kkfggrk" /></div>
                                    <div className="t0Lji" style={{width: '1772px'}}>
                                        <div className="sc-bczRLJ cSxxDX _1AW35">Flat ₹120 off - Only today!</div>
                                        <div className="sc-bczRLJ gGGSxJ">Use INSTA120 | On orders above ₹299</div>
                                    </div>
                                    </div>
                                    <div data-testid="coupons-for-you-card" className="_2XJFi" style={{width: '1822px'}}>
                                    <div className="_3oXCg"><img className="sc-eCYdqJ hYGdzW _2E1sj" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_100/dcd4tzq2ae0i3kkfggrk" /></div>
                                    <div className="t0Lji" style={{width: '1772px'}}>
                                        <div className="sc-bczRLJ cSxxDX _1AW35">Flat ₹100 off </div>
                                        <div className="sc-bczRLJ gGGSxJ">Use HELLOIM | On orders above ₹299</div>
                                    </div>
                                    </div>
                                    <div data-testid="coupons-for-you-card" className="_2XJFi" style={{width: '1822px'}}>
                                    <div className="_3oXCg"><img className="sc-eCYdqJ hYGdzW _2E1sj" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_100/dcd4tzq2ae0i3kkfggrk" /></div>
                                    <div className="t0Lji" style={{width: '1772px'}}>
                                        <div className="sc-bczRLJ cSxxDX _1AW35">Flat ₹75 off</div>
                                        <div className="sc-bczRLJ gGGSxJ">Use SAVEBIG | On orders above ₹999</div>
                                    </div>
                                    </div>
                                    <div data-testid="coupons-for-you-card" className="_2XJFi" style={{width: '1822px'}}>
                                    <div className="_3oXCg"><img className="sc-eCYdqJ hYGdzW _2E1sj" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_100/03f54c5ee764ffe8fa39b3334e4ee641" /></div>
                                    <div className="t0Lji" style={{width: '1772px'}}>
                                        <div className="sc-bczRLJ cSxxDX _1AW35">15% off upto ₹125</div>
                                        <div className="sc-bczRLJ gGGSxJ">Use CITI125 | Orders above ₹750</div>
                                    </div>
                                    </div>
                                    <div data-testid="coupons-for-you-card" className="_2XJFi" style={{width: '1822px'}}>
                                    <div className="_3oXCg"><img className="sc-eCYdqJ hYGdzW _2E1sj" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_100/7606cbf42d8216b1e0cbf8dc35301f02" /></div>
                                    <div className="t0Lji" style={{width: '1772px'}}>
                                        <div className="sc-bczRLJ cSxxDX _1AW35">Flat ₹100 off</div>
                                        <div className="sc-bczRLJ gGGSxJ">Use ICICIAMZ100 | Orders above ₹700</div>
                                    </div>
                                    </div>
                                    <div data-testid="coupons-for-you-card" className="_2XJFi" style={{width: '1822px'}}>
                                    <div className="_3oXCg"><img className="sc-eCYdqJ hYGdzW _2E1sj" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_100/dcd4tzq2ae0i3kkfggrk" /></div>
                                    <div className="t0Lji" style={{width: '1772px'}}>
                                        <div className="sc-bczRLJ cSxxDX _1AW35">Flat ₹120 off - Only today!</div>
                                        <div className="sc-bczRLJ gGGSxJ">Use INSTA120 | On orders above ₹299</div>
                                    </div>
                                    </div>
                                    <div data-testid="coupons-for-you-card" className="_2XJFi" style={{width: '1822px'}}>
                                    <div className="_3oXCg"><img className="sc-eCYdqJ hYGdzW _2E1sj" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_100/dcd4tzq2ae0i3kkfggrk" /></div>
                                    <div className="t0Lji" style={{width: '1772px'}}>
                                        <div className="sc-bczRLJ cSxxDX _1AW35">Flat ₹100 off </div>
                                        <div className="sc-bczRLJ gGGSxJ">Use HELLOIM | On orders above ₹299</div>
                                    </div>
                                    </div>
                                    <div data-testid="coupons-for-you-card" className="_2XJFi" style={{width: '1822px'}}>
                                    <div className="_3oXCg"><img className="sc-eCYdqJ hYGdzW _2E1sj" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_100/dcd4tzq2ae0i3kkfggrk" /></div>
                                    <div className="t0Lji" style={{width: '1772px'}}>
                                        <div className="sc-bczRLJ cSxxDX _1AW35">Flat ₹75 off</div>
                                        <div className="sc-bczRLJ gGGSxJ">Use SAVEBIG | On orders above ₹999</div>
                                    </div>
                                    </div>
                                    <div data-testid="coupons-for-you-card" className="_2XJFi" style={{width: '1822px'}}>
                                    <div className="_3oXCg"><img className="sc-eCYdqJ hYGdzW _2E1sj" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_100/03f54c5ee764ffe8fa39b3334e4ee641" /></div>
                                    <div className="t0Lji" style={{width: '1772px'}}>
                                        <div className="sc-bczRLJ cSxxDX _1AW35">15% off upto ₹125</div>
                                        <div className="sc-bczRLJ gGGSxJ">Use CITI125 | Orders above ₹750</div>
                                    </div>
                                    </div>
                                    <div data-testid="coupons-for-you-card" className="_2XJFi" style={{width: '1822px'}}>
                                    <div className="_3oXCg"><img className="sc-eCYdqJ hYGdzW _2E1sj" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_100/7606cbf42d8216b1e0cbf8dc35301f02" /></div>
                                    <div className="t0Lji" style={{width: '1772px'}}>
                                        <div className="sc-bczRLJ cSxxDX _1AW35">Flat ₹100 off</div>
                                        <div className="sc-bczRLJ gGGSxJ">Use ICICIAMZ100 | Orders above ₹700</div>
                                    </div>
                                    </div>
                                    <div data-testid="coupons-for-you-card" className="_2XJFi" style={{width: '1822px'}}>
                                    <div className="_3oXCg"><img className="sc-eCYdqJ hYGdzW _2E1sj" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_100/dcd4tzq2ae0i3kkfggrk" /></div>
                                    <div className="t0Lji" style={{width: '1772px'}}>
                                        <div className="sc-bczRLJ cSxxDX _1AW35">Flat ₹120 off - Only today!</div>
                                        <div className="sc-bczRLJ gGGSxJ">Use INSTA120 | On orders above ₹299</div>
                                    </div>
                                    </div>
                                    <div data-testid="coupons-for-you-card" className="_2XJFi" style={{width: '1822px'}}>
                                    <div className="_3oXCg"><img className="sc-eCYdqJ hYGdzW _2E1sj" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_100/dcd4tzq2ae0i3kkfggrk" /></div>
                                    <div className="t0Lji" style={{width: '1772px'}}>
                                        <div className="sc-bczRLJ cSxxDX _1AW35">Flat ₹100 off </div>
                                        <div className="sc-bczRLJ gGGSxJ">Use HELLOIM | On orders above ₹299</div>
                                    </div>
                                    </div>
                                    <div data-testid="coupons-for-you-card" className="_2XJFi" style={{width: '1822px'}}>
                                    <div className="_3oXCg"><img className="sc-eCYdqJ hYGdzW _2E1sj" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_100/dcd4tzq2ae0i3kkfggrk" /></div>
                                    <div className="t0Lji" style={{width: '1772px'}}>
                                        <div className="sc-bczRLJ cSxxDX _1AW35">Flat ₹75 off</div>
                                        <div className="sc-bczRLJ gGGSxJ">Use SAVEBIG | On orders above ₹999</div>
                                    </div>
                                    </div>
                                    <div data-testid="coupons-for-you-card" className="_2XJFi" style={{width: '1822px'}}>
                                    <div className="_3oXCg"><img className="sc-eCYdqJ hYGdzW _2E1sj" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_100/03f54c5ee764ffe8fa39b3334e4ee641" /></div>
                                    <div className="t0Lji" style={{width: '1772px'}}>
                                        <div className="sc-bczRLJ cSxxDX _1AW35">15% off upto ₹125</div>
                                        <div className="sc-bczRLJ gGGSxJ">Use CITI125 | Orders above ₹750</div>
                                    </div>
                                    </div>
                                    <div data-testid="coupons-for-you-card" className="_2XJFi" style={{width: '1822px'}}>
                                    <div className="_3oXCg"><img className="sc-eCYdqJ hYGdzW _2E1sj" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_100/7606cbf42d8216b1e0cbf8dc35301f02" /></div>
                                    <div className="t0Lji" style={{width: '1772px'}}>
                                        <div className="sc-bczRLJ cSxxDX _1AW35">Flat ₹100 off</div>
                                        <div className="sc-bczRLJ gGGSxJ">Use ICICIAMZ100 | Orders above ₹700</div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="_1lbBR">
                        <div>
                            <div className="sc-bczRLJ ajmkn _1lQdH">1/5</div>
                        </div>
                        <div className="_1PqNv">
                            <div className="_3GplL JJXgV" style={{background: 'rgb(241, 87, 0)'}} />
                            <div className="_3GplL" style={{background: 'rgba(2, 6, 12, 0.6)'}} />
                            <div className="_3GplL" style={{background: 'rgba(2, 6, 12, 0.6)'}} />
                        </div>
                        </div>
                    </div>
                </div>
                {/* <div className="_2dyHF _14LJv _2U5Mt">
                <div>
                    <div className="_3u3dE _2pFtB" ref={this.categoriesContainerRef}>
                    {categories.map((category) => (
                        <CategoryItem
                        key={category}
                        label={category}
                        active={category === this.state.activeCategory}
                        onClick={() => this.handleCategoryClick(category)}
                        />
                    ))}
                    </div>
                </div>
                <div className=""></div>
                </div> */}
                <div className="l4FVG" style={{background: 'rgb(255, 255, 255)'}}>
                    <div className="XjI6m" style={{background: 'rgb(255, 255, 255)', marginBottom: '16px'}}>
                        <div className="JUktc">
                            <div className="sc-bczRLJ enrsjx">Household favourites</div>
                        </div>
                    </div>
                    <div className="meat-category-grid">
                    {categories.map((category) => (
                        <div key={category.id} className="meat-category">
                        <img src={category.image} alt={category.title} />
                        <p className="meat-category-text">{category.title}</p>
                        </div>
                    ))}
                    </div>
                    {/* <div className="sc-jgwFWF cNJZqw">
                        <div className="sc-bke1zw-0 fIuLDK">
                            <div className="sc-bke1zw-1 cPKzjJ">
                                <div className="jumbo-tracker">
                                    <div className="sc-bUqnYt bQogeA">
                                        <div className="sc-cBXKeB frFLzr">
                                            <div className="sc-frudsx foLuWL">
                                                <div height="100%" width="100%" className="sc-s1isp7-1 gMhjmN sc-zDqdV fLGUHU">
                                                    <div src className="sc-s1isp7-3 cVOEqG" />
                                                    <img alt="Biryani" src="https://b.zmtcdn.com/data/dish_images/d19a31d42d5913ff129cafd7cec772f81639737697.png?fit=around|120:120&crop=120:120;*,*" loading="lazy" className="sc-s1isp7-5 fyZwWD" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="sc-grYksN hXZmSN">Chicken BiryaniCutBiryan iCutBiryaniCutBiryaniCutBiryaniCut</div>
                                    </div>
                                </div>
                            </div>
                            <div className="sc-bke1zw-1 jFRvuA">
                            <div className="jumbo-tracker">
                                <div className="sc-bUqnYt bQogeA">
                                <div className="sc-cBXKeB frFLzr">
                                    <div className="sc-frudsx foLuWL">
                                    <div height="100%" width="100%" className="sc-s1isp7-1 gMhjmN sc-zDqdV fLGUHU">
                                        <div src className="sc-s1isp7-3 cVOEqG" />
                                        <img alt="Pizza" src="https://b.zmtcdn.com/data/o2_assets/d0bd7c9405ac87f6aa65e31fe55800941632716575.png?fit=around|120:120&crop=120:120;*,*" loading="lazy" className="sc-s1isp7-5 fyZwWD" />
                                    </div>
                                    </div>
                                </div>
                                <div className="sc-grYksN hXZmSN">Pizza</div>
                                </div>
                            </div>
                            </div>
                            <div className="sc-bke1zw-1 gbfcSI">
                            <div className="jumbo-tracker">
                                <div className="sc-bUqnYt bQogeA">
                                <div className="sc-cBXKeB frFLzr">
                                    <div className="sc-frudsx foLuWL">
                                    <div height="100%" width="100%" className="sc-s1isp7-1 gMhjmN sc-zDqdV fLGUHU">
                                        <div src className="sc-s1isp7-3 cVOEqG" />
                                        <img alt="Burger" src="https://b.zmtcdn.com/data/dish_images/ccb7dc2ba2b054419f805da7f05704471634886169.png?fit=around|120:120&crop=120:120;*,*" loading="lazy" className="sc-s1isp7-5 fyZwWD" />
                                    </div>
                                    </div>
                                </div>
                                <div className="sc-grYksN hXZmSN">Burger</div>
                                </div>
                            </div>
                            </div>
                            <div className="sc-bke1zw-1 fgbbXI">
                            <div className="jumbo-tracker">
                                <div className="sc-bUqnYt bQogeA">
                                <div className="sc-cBXKeB frFLzr">
                                    <div className="sc-frudsx foLuWL">
                                    <div height="100%" width="100%" className="sc-s1isp7-1 gMhjmN sc-zDqdV fLGUHU">
                                        <div src className="sc-s1isp7-3 cVOEqG" />
                                        <img alt="Chicken" src="https://b.zmtcdn.com/data/dish_images/197987b7ebcd1ee08f8c25ea4e77e20f1634731334.png?fit=around|120:120&crop=120:120;*,*" loading="lazy" className="sc-s1isp7-5 fyZwWD" />
                                    </div>
                                    </div>
                                </div>
                                <div className="sc-grYksN hXZmSN">Chicken</div>
                                </div>
                            </div>
                            </div>
                            <div className="sc-bke1zw-1 cPKzjJ">
                            <div className="jumbo-tracker">
                                <div className="sc-bUqnYt bQogeA">
                                <div className="sc-cBXKeB frFLzr">
                                    <div className="sc-frudsx foLuWL">
                                    <div height="100%" width="100%" className="sc-s1isp7-1 gMhjmN sc-zDqdV fLGUHU">
                                        <div src className="sc-s1isp7-3 cVOEqG" />
                                        <img alt="Wraps" src="https://b.zmtcdn.com/data/dish_photos/e24/1b0a01fed2d16f99d98037160591ce24.jpg?fit=around|120:120&crop=120:120;*,*" loading="lazy" className="sc-s1isp7-5 fyZwWD" />
                                    </div>
                                    </div>
                                </div>
                                <div className="sc-grYksN hXZmSN">Wraps</div>
                                </div>
                            </div>
                            </div>
                            <div className="sc-bke1zw-1 jFRvuA">
                            <div className="jumbo-tracker">
                                <div className="sc-bUqnYt bQogeA">
                                <div className="sc-cBXKeB frFLzr">
                                    <div className="sc-frudsx foLuWL">
                                    <div height="100%" width="100%" className="sc-s1isp7-1 gMhjmN sc-zDqdV fLGUHU">
                                        <div src className="sc-s1isp7-3 cVOEqG" />
                                        <img alt="Cake" src="https://b.zmtcdn.com/data/dish_images/d5ab931c8c239271de45e1c159af94311634805744.png?fit=around|120:120&crop=120:120;*,*" loading="lazy" className="sc-s1isp7-5 fyZwWD" />
                                    </div>
                                    </div>
                                </div>
                                <div className="sc-grYksN hXZmSN">Cake</div>
                                </div>
                            </div>
                            </div>
                            <div className="sc-bke1zw-1 gbfcSI">
                            <div className="jumbo-tracker">
                                <div className="sc-bUqnYt bQogeA">
                                <div className="sc-cBXKeB frFLzr">
                                    <div className="sc-frudsx foLuWL">
                                    <div height="100%" width="100%" className="sc-s1isp7-1 gMhjmN sc-zDqdV fLGUHU">
                                        <div src className="sc-s1isp7-3 cVOEqG" />
                                        <img alt="Momos" src="https://b.zmtcdn.com/data/o2_assets/5dbdb72a48cf3192830232f6853735301632716604.png?fit=around|120:120&crop=120:120;*,*" loading="lazy" className="sc-s1isp7-5 fyZwWD" />
                                    </div>
                                    </div>
                                </div>
                                <div className="sc-grYksN hXZmSN">Momos</div>
                                </div>
                            </div>
                            </div>
                            <div className="sc-bke1zw-1 fgbbXI">
                            <div className="jumbo-tracker">
                                <div className="sc-bUqnYt bQogeA">
                                <div className="sc-cBXKeB frFLzr">
                                    <div className="sc-frudsx foLuWL">
                                    <div height="100%" width="100%" className="sc-s1isp7-1 gMhjmN sc-zDqdV fLGUHU">
                                        <div src className="sc-s1isp7-3 cVOEqG" />
                                        <img alt="Thali" src="https://b.zmtcdn.com/data/o2_assets/52eb9796bb9bcf0eba64c643349e97211634401116.png?fit=around|120:120&crop=120:120;*,*" loading="lazy" className="sc-s1isp7-5 fyZwWD" />
                                    </div>
                                    </div>
                                </div>
                                <div className="sc-grYksN hXZmSN">Thali</div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div> */}
                </div>
                {/* <div>
                    <div className>
                        <div>
                        <div>
                            <div>
                            <div className="l4FVG" style={{background: 'rgb(255, 255, 255)'}}>
                                <div className="XjI6m" style={{background: 'rgb(255, 255, 255)', marginBottom: '16px'}}>
                                <div className="JUktc">
                                    <div className="sc-bczRLJ enrsjx">Household favourites</div>
                                </div>
                                </div>
                                <div className="_2srew" style={{marginBottom: 'unset', marginLeft: '-16px', marginRight: '-16px'}}>
                                <div className="rKVoK">
                                    <div className="_3aZ5w" style={{paddingRight: 'unset'}}>
                                    <div><button className="_23GWk _3ee0w" aria-label="Instamart banner, double tap to open" style={{height: '230px', width: '140px'}}><img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_460,w_280/rng/md/carousel/production/2ca57b270e4077a5f84f909016ad5573" className="_3goJ2 _8tpll" loading="lazy" style={{width: '100%', height: '100%', objectFit: 'cover', background: 'rgba(2, 6, 12, 0.15)'}} /></button></div>
                                    </div>
                                    <div className="_3aZ5w" style={{paddingRight: 'unset', paddingLeft: '16px'}}>
                                    <div><button className="_23GWk _3ee0w" aria-label="Instamart banner, double tap to open" style={{height: '230px', width: '140px'}}><img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_460,w_280/rng/md/carousel/production/ad7ec380f0e545ca413fcbf082c2ac90" className="_3goJ2 _8tpll" loading="lazy" style={{width: '100%', height: '100%', objectFit: 'cover', background: 'rgba(2, 6, 12, 0.15)'}} /></button></div>
                                    </div>
                                    <div className="_3aZ5w" style={{paddingRight: 'unset', paddingLeft: '16px'}}>
                                    <div><button className="_23GWk _3ee0w" aria-label="Instamart banner, double tap to open" style={{height: '230px', width: '140px'}}><img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_460,w_280/rng/md/carousel/production/37369995d3aadcdef1f8ad10c8b2a48a" className="_3goJ2 _8tpll" loading="lazy" style={{width: '100%', height: '100%', objectFit: 'cover', background: 'rgba(2, 6, 12, 0.15)'}} /></button></div>
                                    </div>
                                    <div className="_3aZ5w" style={{paddingRight: 'unset', paddingLeft: '16px'}}>
                                    <div><button className="_23GWk _3ee0w" aria-label="Instamart banner, double tap to open" style={{height: '230px', width: '140px'}}><img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_460,w_280/rng/md/carousel/production/450ba110202ced55c28eec267c0180ab" className="_3goJ2 _8tpll" loading="lazy" style={{width: '100%', height: '100%', objectFit: 'cover', background: 'rgba(2, 6, 12, 0.15)'}} /></button></div>
                                    </div>
                                    <div className="_3aZ5w" style={{paddingRight: 'unset', paddingLeft: '16px'}}>
                                    <div><button className="_23GWk _3ee0w" aria-label="Instamart banner, double tap to open" style={{height: '230px', width: '140px'}}><img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_460,w_280/rng/md/carousel/production/da0b501c69652a32d40ec08092d6e93c" className="_3goJ2 _8tpll" loading="lazy" style={{width: '100%', height: '100%', objectFit: 'cover', background: 'rgba(2, 6, 12, 0.15)'}} /></button></div>
                                    </div>
                                    <div className="_3aZ5w" style={{paddingLeft: '16px'}}>
                                    <div><button className="_23GWk _3ee0w" aria-label="Instamart banner, double tap to open" style={{height: '230px', width: '140px'}}><img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_460,w_280/rng/md/carousel/production/4fb953712a2d9837f63fc85577f677d5" className="_3goJ2 _8tpll" loading="lazy" style={{width: '100%', height: '100%', objectFit: 'cover', background: 'rgba(2, 6, 12, 0.15)'}} /></button></div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="_34TT2 NKMPw">
                        <div>
                        <div data-testid="must-try-banner" className="_19tV6" style={{background: 'rgb(10, 22, 43)'}}>
                            <div className="_RKKF">
                            <div className="sc-bczRLJ gluHRv">MUST TRY</div>
                            <div className="sc-bczRLJ gERbFE wgSEJ">New finds for you</div>
                            </div>
                            <div>
                            <div className="_1eVh6" data-testid="must-try-infinite-scroller">
                                <div className="_119NA _1SLh3">
                                <div>
                                    <div className="rtykX">
                                    <div data-testid="musttry-item-0-0" className="_3bzXP" style={{background: 'rgb(217, 171, 54)'}}><img className="sc-eCYdqJ hmwUpb ZxAj-" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/rng/md/carousel/production/0d450784940383f0a111bae833ac4260" /></div>
                                    <div data-testid="musttry-item-0-1" className="_3bzXP" style={{background: 'rgb(139, 166, 83)'}}><img className="sc-eCYdqJ hmwUpb ZxAj-" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/rng/md/carousel/production/aa9f426f023e8b6f68b7a8450fbd2464" /></div>
                                    <div data-testid="musttry-item-0-2" className="_3bzXP" style={{background: 'rgb(178, 145, 80)'}}><img className="sc-eCYdqJ hmwUpb ZxAj-" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/rng/md/carousel/production/096c76e825575dc4050b4fbfa8222340" /></div>
                                    </div>
                                    <div className="rtykX _3h0Tt">
                                    <div data-testid="musttry-item-3-0" className="_3bzXP" style={{background: 'rgb(178, 80, 80)'}}><img className="sc-eCYdqJ hmwUpb ZxAj-" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/rng/md/carousel/production/3d4956d165cecebba5ba85dbc489c00a" /></div>
                                    <div data-testid="musttry-item-3-1" className="_3bzXP" style={{background: 'rgb(83, 136, 166)'}}><img className="sc-eCYdqJ hmwUpb ZxAj-" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/rng/md/carousel/production/205be9efb12949c805388fc1bc1a7b84" /></div>
                                    <div data-testid="musttry-item-3-2" className="_3bzXP" style={{background: 'rgb(217, 171, 54)'}}><img className="sc-eCYdqJ hmwUpb ZxAj-" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/rng/md/carousel/production/0d450784940383f0a111bae833ac4260" /></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="rtykX">
                                    <div data-testid="musttry-item-0-0" className="_3bzXP" style={{background: 'rgb(217, 171, 54)'}}><img className="sc-eCYdqJ hmwUpb ZxAj-" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/rng/md/carousel/production/0d450784940383f0a111bae833ac4260" /></div>
                                    <div data-testid="musttry-item-0-1" className="_3bzXP" style={{background: 'rgb(139, 166, 83)'}}><img className="sc-eCYdqJ hmwUpb ZxAj-" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/rng/md/carousel/production/aa9f426f023e8b6f68b7a8450fbd2464" /></div>
                                    <div data-testid="musttry-item-0-2" className="_3bzXP" style={{background: 'rgb(178, 145, 80)'}}><img className="sc-eCYdqJ hmwUpb ZxAj-" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/rng/md/carousel/production/096c76e825575dc4050b4fbfa8222340" /></div>
                                    </div>
                                    <div className="rtykX _3h0Tt">
                                    <div data-testid="musttry-item-3-0" className="_3bzXP" style={{background: 'rgb(178, 80, 80)'}}><img className="sc-eCYdqJ hmwUpb ZxAj-" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/rng/md/carousel/production/3d4956d165cecebba5ba85dbc489c00a" /></div>
                                    <div data-testid="musttry-item-3-1" className="_3bzXP" style={{background: 'rgb(83, 136, 166)'}}><img className="sc-eCYdqJ hmwUpb ZxAj-" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/rng/md/carousel/production/205be9efb12949c805388fc1bc1a7b84" /></div>
                                    <div data-testid="musttry-item-3-2" className="_3bzXP" style={{background: 'rgb(217, 171, 54)'}}><img className="sc-eCYdqJ hmwUpb ZxAj-" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/rng/md/carousel/production/0d450784940383f0a111bae833ac4260" /></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="rtykX">
                                    <div data-testid="musttry-item-0-0" className="_3bzXP" style={{background: 'rgb(217, 171, 54)'}}><img className="sc-eCYdqJ hmwUpb ZxAj-" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/rng/md/carousel/production/0d450784940383f0a111bae833ac4260" /></div>
                                    <div data-testid="musttry-item-0-1" className="_3bzXP" style={{background: 'rgb(139, 166, 83)'}}><img className="sc-eCYdqJ hmwUpb ZxAj-" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/rng/md/carousel/production/aa9f426f023e8b6f68b7a8450fbd2464" /></div>
                                    <div data-testid="musttry-item-0-2" className="_3bzXP" style={{background: 'rgb(178, 145, 80)'}}><img className="sc-eCYdqJ hmwUpb ZxAj-" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/rng/md/carousel/production/096c76e825575dc4050b4fbfa8222340" /></div>
                                    </div>
                                    <div className="rtykX _3h0Tt">
                                    <div data-testid="musttry-item-3-0" className="_3bzXP" style={{background: 'rgb(178, 80, 80)'}}><img className="sc-eCYdqJ hmwUpb ZxAj-" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/rng/md/carousel/production/3d4956d165cecebba5ba85dbc489c00a" /></div>
                                    <div data-testid="musttry-item-3-1" className="_3bzXP" style={{background: 'rgb(83, 136, 166)'}}><img className="sc-eCYdqJ hmwUpb ZxAj-" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/rng/md/carousel/production/205be9efb12949c805388fc1bc1a7b84" /></div>
                                    <div data-testid="musttry-item-3-2" className="_3bzXP" style={{background: 'rgb(217, 171, 54)'}}><img className="sc-eCYdqJ hmwUpb ZxAj-" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/rng/md/carousel/production/0d450784940383f0a111bae833ac4260" /></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="rtykX">
                                    <div data-testid="musttry-item-0-0" className="_3bzXP" style={{background: 'rgb(217, 171, 54)'}}><img className="sc-eCYdqJ hmwUpb ZxAj-" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/rng/md/carousel/production/0d450784940383f0a111bae833ac4260" /></div>
                                    <div data-testid="musttry-item-0-1" className="_3bzXP" style={{background: 'rgb(139, 166, 83)'}}><img className="sc-eCYdqJ hmwUpb ZxAj-" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/rng/md/carousel/production/aa9f426f023e8b6f68b7a8450fbd2464" /></div>
                                    <div data-testid="musttry-item-0-2" className="_3bzXP" style={{background: 'rgb(178, 145, 80)'}}><img className="sc-eCYdqJ hmwUpb ZxAj-" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/rng/md/carousel/production/096c76e825575dc4050b4fbfa8222340" /></div>
                                    </div>
                                    <div className="rtykX _3h0Tt">
                                    <div data-testid="musttry-item-3-0" className="_3bzXP" style={{background: 'rgb(178, 80, 80)'}}><img className="sc-eCYdqJ hmwUpb ZxAj-" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/rng/md/carousel/production/3d4956d165cecebba5ba85dbc489c00a" /></div>
                                    <div data-testid="musttry-item-3-1" className="_3bzXP" style={{background: 'rgb(83, 136, 166)'}}><img className="sc-eCYdqJ hmwUpb ZxAj-" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/rng/md/carousel/production/205be9efb12949c805388fc1bc1a7b84" /></div>
                                    <div data-testid="musttry-item-3-2" className="_3bzXP" style={{background: 'rgb(217, 171, 54)'}}><img className="sc-eCYdqJ hmwUpb ZxAj-" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/rng/md/carousel/production/0d450784940383f0a111bae833ac4260" /></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="rtykX">
                                    <div data-testid="musttry-item-0-0" className="_3bzXP" style={{background: 'rgb(217, 171, 54)'}}><img className="sc-eCYdqJ hmwUpb ZxAj-" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/rng/md/carousel/production/0d450784940383f0a111bae833ac4260" /></div>
                                    <div data-testid="musttry-item-0-1" className="_3bzXP" style={{background: 'rgb(139, 166, 83)'}}><img className="sc-eCYdqJ hmwUpb ZxAj-" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/rng/md/carousel/production/aa9f426f023e8b6f68b7a8450fbd2464" /></div>
                                    <div data-testid="musttry-item-0-2" className="_3bzXP" style={{background: 'rgb(178, 145, 80)'}}><img className="sc-eCYdqJ hmwUpb ZxAj-" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/rng/md/carousel/production/096c76e825575dc4050b4fbfa8222340" /></div>
                                    </div>
                                    <div className="rtykX _3h0Tt">
                                    <div data-testid="musttry-item-3-0" className="_3bzXP" style={{background: 'rgb(178, 80, 80)'}}><img className="sc-eCYdqJ hmwUpb ZxAj-" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/rng/md/carousel/production/3d4956d165cecebba5ba85dbc489c00a" /></div>
                                    <div data-testid="musttry-item-3-1" className="_3bzXP" style={{background: 'rgb(83, 136, 166)'}}><img className="sc-eCYdqJ hmwUpb ZxAj-" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/rng/md/carousel/production/205be9efb12949c805388fc1bc1a7b84" /></div>
                                    <div data-testid="musttry-item-3-2" className="_3bzXP" style={{background: 'rgb(217, 171, 54)'}}><img className="sc-eCYdqJ hmwUpb ZxAj-" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300/rng/md/carousel/production/0d450784940383f0a111bae833ac4260" /></div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div className="_1ipy4">
                            <div className="sc-bczRLJ OfZPT qKtA6">Experience the collection</div>
                            <div className="UcTVY" style={{background: 'rgb(255, 240, 205)'}}>
                                <svg width={12} height={13} viewBox="0 0 12 13" fill="none" aria-hidden="true" strokecolor="rgba(2, 6, 12, 0.92)" fillcolor="rgba(2, 6, 12, 0.92)">
                                <path fillRule="evenodd" clipRule="evenodd" d="M2.92132 2.30362C3.24538 1.92672 3.81361 1.88388 4.19051 2.20793L8.10108 5.5702C8.11161 5.57926 8.12223 5.58838 8.13292 5.59756C8.30943 5.74917 8.5066 5.91852 8.65206 6.08431C8.82307 6.27919 9.02931 6.58536 9.02931 7.01089C9.02931 7.43643 8.82307 7.7426 8.65207 7.93749C8.50661 8.10327 8.30945 8.27262 8.13294 8.42423C8.12224 8.43342 8.11162 8.44254 8.1011 8.45159L4.22848 11.7813C3.85158 12.1054 3.28334 12.0625 2.95928 11.6856C2.63523 11.3087 2.67806 10.7405 3.05496 10.4164L6.92758 7.08673C6.9591 7.05963 6.98835 7.03447 7.01565 7.0109C6.98835 6.98734 6.9591 6.96218 6.92758 6.93508L3.01701 3.57281C2.64011 3.24875 2.59727 2.68052 2.92132 2.30362Z" fill="rgba(2, 6, 12, 0.92)" fillOpacity="0.92" />
                                </svg>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div> */}
            </React.Fragment>
        );
    }
}

export default Test;