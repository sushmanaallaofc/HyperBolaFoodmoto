import React, { Component } from "react";
import { getMeatCategories } from "../../../../services/items/actions";
import ContentLoader from 'react-content-loader';

import { Link } from "react-router-dom";

import { connect } from "react-redux";

class MeatCategories extends Component {
	static contextTypes = {
		router: () => null,
	};

	state = {
		categories: [],
		isLoading: true,
	};

	componentDidMount() {
        if (this.props.restaurant_id) {
            this.setState({ isLoading: true }); // set loading state to true
            this.props.getMeatCategories(this.props.restaurant_id);
        }
    }

	componentDidUpdate(prevProps) {
        if (this.props.restaurant_id && this.props.restaurant_id !== prevProps.restaurant_id) {
            this.setState({ isLoading: true }); // set loading state to true
            this.props.getMeatCategories(this.props.restaurant_id);
        }

        // check if meat_categories has been updated
        if (this.props.meat_categories !== prevProps.meat_categories) {
            this.setState({ isLoading: false }); // set loading state to false
        }
    }

	render() {
		const { meat_categories } = this.props;
		// console.log('meat_categories', meat_categories);
		const { isLoading } = this.state;

        if (isLoading) {
            return (
				<React.Fragment>
				<div className="wJEDv"><div className="_2zd3X"></div><div className="ME4en"></div></div>
				<div className="_23Hiw">
					<div className="_3GFW5"></div>
					<div className="_3GFW5"></div>
					<div className="_3GFW5"></div>
					<div className="_3GFW5"></div>
					<div className="_3GFW5"></div>
					<div className="_3GFW5"></div>
				</div>
				</React.Fragment>
			);
        }
		return (
			<React.Fragment>
				{meat_categories && (
					<React.Fragment>
					<div className="_2I9Zv">
						<div className="HQSFG">
						<div className="lHmbE">
							<div className="_1UZ2f">Shop by category</div>
						</div>
						</div>
						<div className="_2K51s">
						{Object.keys(meat_categories).map((key) => {
							const category = meat_categories[key];
							return (
							<div key={category.id} className="_1NUFN">
								<Link
								to={`/store/${this.props.restaurant_slug}/category/${category.id}`}
								key={category.id}
								>
								<div>
									<div
									className="_2eB-D"
									style={{
										backgroundImage: `url(${category.meat_image})`,
									}}
									>
									<div className="_3R2Fs">
										<div className="_2D-c5">{category.name}</div>
									</div>
									</div>
								</div>
								</Link>
							</div>
							);
						})}
						</div>
					</div>
					</React.Fragment>
				)}
				</React.Fragment>
		);
	}	
}

const mapStateToProps = (state) => ({
	meat_categories: state.items.meat_categories,
});

export default connect(mapStateToProps, {
	getMeatCategories,
})(MeatCategories);
