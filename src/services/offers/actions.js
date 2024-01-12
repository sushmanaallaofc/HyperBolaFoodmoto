import { GET_OFFERS } from "./actionTypes";
import { GET_OFFERS_URL } from "../../configs";
import Axios from "axios";

export const getOffers = (lat, lng) => (dispatch) => {
	Axios.post(GET_OFFERS_URL, {
		latitude: lat,
		longitude: lng,
	})
	.then((response) => {
		const promo_slides = response.data;
		return dispatch({ type: GET_OFFERS, payload: promo_slides });
	})
	.catch(function(error) {
		console.log(error);
	});
};