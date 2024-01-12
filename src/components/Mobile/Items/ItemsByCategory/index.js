import React, { Component } from "react";
import { getCategoryItems } from "../../../../services/items/actions";
import BackWithSearch from "../../../Mobile/Elements/BackWithSearch";
import {
	getRestaurantInfo,
	getRestaurantItems,
	getRestaurantInfoForLoggedInUser,
	resetInfo,
} from "../../../../services/items/actions";
import FloatCart from "../../FloatCart";
import { connect } from "react-redux";
import Meta from "../../../helpers/meta";
import ItemListByCategory from "../ItemListByCategory";
import CategoryItem from "../../CategoryItem";
import ContentLoader from "react-content-loader";

class ItemsByCategory extends Component {
    static contextTypes = {
		router: () => null,
	};
    state = {
		is_active: 1,
		loading: true,
		menuListOpen: false,
		menuClicked: false,
        updated_restaurant_items: [],
        activeCategory: 'All',
        dataLoaded: false,
        itemTags: [],
	};

    categoriesContainerRef = React.createRef();

    handleCategoryClick = (category) => {
        this.setState({ activeCategory: category }, () => {
            const filteredItems = {};
    
            if (category === 'All') {
                this.setState({ updated_restaurant_items: this.props.restaurant_items });
            } else {
                Object.entries(this.props.restaurant_items.items).forEach(([key, value]) => {
                    filteredItems[key] = value.filter((item) =>
                        item.item_tags.some((tag) => tag.name === category)
                    );
                });
    
                this.setState({ updated_restaurant_items: { recommended:null, items: filteredItems } });
            }
    
            const container = this.categoriesContainerRef.current;
            const selectedItem = container.querySelector('.selected');
    
            if (selectedItem) {
                selectedItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        });
    };    
    
    componentDidMount() {
        const { match } = this.props;
        const categoryId = match.params.categoryId;
        const restaurantSlug = match.params.restaurant;

        const { user } = this.props;
		let info = user.success
			? this.props.getRestaurantInfoForLoggedInUser(restaurantSlug)
			: this.props.getRestaurantInfo(restaurantSlug);
        if (info) {
            info.then((response) => {
                if (response) {
                    if (response.payload.id) {
                        //get items
                        this.props.getRestaurantItems(restaurantSlug, categoryId);
                    } else {
                        //404, redirect to homepage
                        this.context.router.history.push("/");
                    }
                    if (response.payload.is_active === "undefined") {
						this.setState({ loading: true });
					}
					if (response.payload.is_active === 1 || response.payload.is_active === 0) {
						this.setState({ loading: false });
						this.setState({ is_active: response.payload.is_active });
					}
                }
            });
        }
    
        // Fetch the items belonging to the category and restaurant using the categoryId and restaurantSlug
        // this.props.getCategoryItems(restaurantSlug, categoryId);
    }

    componentDidUpdate(prevProps) {
        // Check if the restaurant_items have been updated
        if (this.props.restaurant_items !== prevProps.restaurant_items) {
            // Update the local state
            this.setState({
                updated_restaurant_items: this.props.restaurant_items,
            });
            this.setState({
                dataLoaded: true,
            });
        }

        // Update the itemTags state with the response data
        if (this.props.restaurant_items.itemTagsByItem && (this.props.restaurant_items.itemTagsByItem !== prevProps.restaurant_items.itemTagsByItem)) {
            const categoryTags = this.props.restaurant_items.itemTagsByItem;
            const tags = Object.values(categoryTags).flat();

            // Ensure the categories are unique
            const uniqueTags = Array.from(new Set(tags.map(tag => tag.name))).map(name => tags.find(tag => tag.name === name));

            // Add the "All" category if not already there
            if (!uniqueTags.some(tag => tag.name === 'All')) {
                uniqueTags.unshift({ id: 'all', name: 'All' });
            }

            this.setState({ itemTags: uniqueTags });
        }
    }

    componentWillReceiveProps(nextProps) {
		if (!this.state.is_active) {
			document.getElementsByTagName("html")[0].classList.add("page-inactive");
		}
	}

    componentWillUnmount() {
		this.props.resetInfo();
	}

    render(){
        const {restaurant_items, history} = this.props;
        const { updated_restaurant_items } = this.state;
        const itemTagsNotEmpty = this.state.itemTags.length > 1;
        var categoryKey = null;
        if (updated_restaurant_items && updated_restaurant_items['items']) {
            categoryKey = Object.keys(updated_restaurant_items['items'])[0];
        }
        return (
            <React.Fragment>
                <Meta
					seotitle="Items by category"
					seodescription={localStorage.getItem("seoMetaDescription")}
					ogtype="website"
					ogtitle={localStorage.getItem("seoOgTitle")}
					ogdescription={localStorage.getItem("seoOgDescription")}
					ogurl={window.location.href}
					twittertitle={localStorage.getItem("seoTwitterTitle")}
					twitterdescription={localStorage.getItem("seoTwitterDescription")}
				/>
                <BackWithSearch
                    boxshadow={true}
                    has_title={true}
                    title={categoryKey}
                    disable_search={true}
                    homeButton={false}
                    hasStore={true}
                    hasSubtitle={true}
                    subtitle={this.props.restaurant_info.name}
                />
                <div className="bg-white">
                {this.state.dataLoaded ? (
                    <React.Fragment>
                        <div className="pt-50">
                            {itemTagsNotEmpty && (
                                <div className="_2dyHF _14LJv _2U5Mt pt-10 pb-10">
                                    <div>
                                        <div className="_3u3dE _2pFtB" ref={this.categoriesContainerRef}>
                                            {this.state.itemTags.map((category) => (
                                                <CategoryItem
                                                    key={category.id}
                                                    label={category.name}
                                                    active={category.name === this.state.activeCategory}
                                                    onClick={() => this.handleCategoryClick(category.name)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div className=""></div>
                                </div>
                            )}
                            <ItemListByCategory
                                data={this.state.updated_restaurant_items}
                                restaurant={this.props.restaurant_info}
                                menuClicked={false}
                                divHide={!itemTagsNotEmpty}
                                shouldItemsListUpdate={localStorage.getItem("cleared")}
                                restaurant_backup_items={this.props.restaurant_backup_items}
                            />
                        </div>
                    <div>
                        {!this.state.loading && (
                            <React.Fragment>
                                {this.state.is_active ? (
                                    <FloatCart />
                                ) : (
                                    <div className="auth-error no-click">
                                        <div className="error-shake">{localStorage.getItem("notAcceptingOrdersMsg")}</div>
                                    </div>
                                )}
                            </React.Fragment>
                        )}
                    </div>
                    </React.Fragment>
                ):(
                    <React.Fragment>
                        <div className="pt-50">
                        <ContentLoader
                            height={378}
                            width={400}
                            speed={1.2}
                            primaryColor="#f3f3f3"
                            secondaryColor="#ecebeb"
                        >
                            <rect x="20" y="20" rx="4" ry="4" width="80" height="78" />
                            <rect x="144" y="30" rx="0" ry="0" width="115" height="18" />
                            <rect x="144" y="60" rx="0" ry="0" width="165" height="16" />

                            <rect x="20" y="145" rx="4" ry="4" width="80" height="78" />
                            <rect x="144" y="155" rx="0" ry="0" width="115" height="18" />
                            <rect x="144" y="185" rx="0" ry="0" width="165" height="16" />

                            <rect x="20" y="270" rx="4" ry="4" width="80" height="78" />
                            <rect x="144" y="280" rx="0" ry="0" width="115" height="18" />
                            <rect x="144" y="310" rx="0" ry="0" width="165" height="16" />
                        </ContentLoader>
                        </div>
                    </React.Fragment>
                )}
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = (state) => ({
	restaurant_info: state.items.restaurant_info,
    cartTotal: state.total.data,
	restaurant_items: state.items.restaurant_items,
    restaurant_backup_items: state.items.restaurant_backup_items,
    user: state.user.user,
});

export default connect(mapStateToProps, {
	getCategoryItems,
    getRestaurantInfo,
		getRestaurantItems,
		getRestaurantInfoForLoggedInUser,
		resetInfo,
})(ItemsByCategory);