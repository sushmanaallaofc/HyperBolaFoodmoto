import { GET_RESTAURANT_CATEGORY_SLIDER } from "./actionTypes";

const initialState = {
    restaurant_category_slides: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_RESTAURANT_CATEGORY_SLIDER:
            return { ...state, restaurant_category_slides: action.payload };
        default:
            return state;
    }
}
