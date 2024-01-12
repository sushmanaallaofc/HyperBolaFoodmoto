import React, { Component } from "react";

import ContentLoader from "react-content-loader";
import LazyLoad from "react-lazyload";
import { NavLink } from "react-router-dom";
import Ink from "react-ink";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

class PromoSlider extends Component {
	render() {
		const { slides, size, secondarySlider } = this.props;
		const responsive = {
			desktop: {
			  breakpoint: { max: 3000, min: 1024 },
			  items: 3,
			  partialVisibilityGutter: 60
			},
			tablet: {
			  breakpoint: { max: 1024, min: 464 },
			  items: 2,
			  partialVisibilityGutter: 60
			},
			mobile: {
			  breakpoint: { max: 464, min: 300 },
			  items: 1,
			  partialVisibilityGutter: 80
			},
		};
		return (
			<React.Fragment>
				{slides.length === 0 ? (
				<ContentLoader
					height={170}
					width={400}
					speed={1.2}
					primaryColor="#f3f3f3"
					secondaryColor="#ecebeb"
				>
					<rect x="20" y="0" rx="4" ry="4" width="168" height="168" />
					<rect x="228" y="0" rx="4" ry="4" width="168" height="168" />
				</ContentLoader>
				):(
				<React.Fragment>
					<Carousel
						additionalTransfrom={0}
						swipeable={true}
						arrows={false}
						autoPlay={true}
						autoPlaySpeed={5000}
						centerMode={false}
						className={""}
						containerClass={""}
						customTransition={"all .5s linear"}
						dotListClass={""}
						draggable={true}
						focusOnSelect={false}
						infinite={true}
						itemClass={""}
						keyBoardControl={true}
						minimumTouchDrag={20}
						partialVisible={true}
						pauseOnHover={true}
						renderArrowsWhenDisabled={false}
						renderButtonGroupOutside={false}
						renderDotsOutside={true}
						responsive={responsive}
						rewind={false}
						rewindWithAnimation={false}
						rtl={false}
						shouldResetAutoplay={true}
						showDots={false}
						sliderClass={""}
						>
						{slides.map((slide) => slide && (
							<a key={slide.data.id} className="banner-carousel--banner full" href={slide.url}>
								<div className="image-overlay">
								<div className="image-overlay--overlay "></div>
								<img src={slide.data.image} alt="Banner" />
								</div>
							</a>
						))}
					</Carousel>
				</React.Fragment>
				)}
				
			</React.Fragment>
			// <React.Fragment>
			// 	<div
			// 		className={
			// 			secondarySlider
			// 				? "slider-wrapper secondary-slider-wrapper my-20"
			// 				: "slider-wrapper bg-light py-20 my-0"
			// 		}
			// 	>
			// 		{slides.length === 0 ? (
			// 			<ContentLoader
			// 				height={170}
			// 				width={400}
			// 				speed={1.2}
			// 				primaryColor="#f3f3f3"
			// 				secondaryColor="#ecebeb"
			// 			>
			// 				<rect x="20" y="0" rx="4" ry="4" width="168" height="168" />
			// 				<rect x="228" y="0" rx="4" ry="4" width="168" height="168" />
			// 			</ContentLoader>
			// 		) : (
			// 			slides.map((slide) =>
			// 				slide.data.model === "3" ? (
			// 					<a
			// 						href={slide.url}
			// 						className="slider-wrapper__img-wrapper"
			// 						key={slide.data.id}
			// 						style={{ position: "relative" }}
			// 					>
			// 						{/* if customURL then use anchor tag */}
			// 						<LazyLoad>
			// 							<img
			// 								src={slide.data.image}
			// 								alt={slide.data.name}
			// 								className={`slider-wrapper__img slider-cust-img ${!secondarySlider &&
			// 									"slider-wrapper__img-shadow"} custom-promo-img`}
			// 								style={{
			// 									height: (12 / 5) * size + "rem",
			// 									width: (12 / 5) * size + "rem",
			// 								}}
			// 							/>
			// 						</LazyLoad>
			// 						<Ink duration="500" hasTouch={true} />
			// 					</a>
			// 				) : (
			// 					<NavLink
			// 						to={"../" + slide.url}
			// 						className="slider-wrapper__img-wrapper"
			// 						key={slide.data.id}
			// 						style={{ position: "relative" }}
			// 					>
			// 						<LazyLoad>
			// 							<img
			// 								src={slide.data.image}
			// 								alt={slide.data.name}
			// 								className={`slider-wrapper__img slider-cust-img ${!secondarySlider &&
			// 									"slider-wrapper__img-shadow"} custom-promo-img`}
			// 								style={{
			// 									height: (12 / 5) * size + "rem",
			// 									width: (12 / 5) * size + "rem",
			// 								}}
			// 							/>
			// 						</LazyLoad>
			// 						<Ink duration="500" hasTouch={true} />
			// 					</NavLink>
			// 				)
			// 			)
			// 		)}
			// 	</div>
			// </React.Fragment>
		);
	}
}

export default PromoSlider;
