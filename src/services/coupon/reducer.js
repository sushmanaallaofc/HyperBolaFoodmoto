import { APPLY_COUPON, COUPON_ERROR, USER_COUPONS } from "./actionTypes";

const initialState = {
	coupon: [],
	coupon_error: "",
	usercoupons: "",
};

export default function(state = initialState, action) {
	switch (action.type) {
		case APPLY_COUPON:
			return { ...state, coupon: action.payload };
		case COUPON_ERROR:
			return { ...state, coupon_error: action.payload };
		case USER_COUPONS:
			return { ...state, usercoupons: action.payload };

		default:
			return state;
	}
}
