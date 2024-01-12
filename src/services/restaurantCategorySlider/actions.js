import { GET_RESTAURANT_CATEGORY_SLIDER } from "./actionTypes";
import { GET_RESTAURANTS_SLIDES_URL } from "../../configs";
import Axios from "axios";

export const getRestaurantCategorySlides = (lat, lng) => (dispatch) => {
	Axios.post(GET_RESTAURANTS_SLIDES_URL, {
		latitude: lat,
		longitude: lng,
	})
		.then((response) => {
			const restaurant_category_slides = response.data;
			return dispatch({ type: GET_RESTAURANT_CATEGORY_SLIDER, payload: restaurant_category_slides });
		})
		.catch(function(error) {
			console.log(error);
		});
};
