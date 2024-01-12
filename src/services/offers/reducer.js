import { GET_OFFERS } from "./actionTypes";

const initialState = {
    offers: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_OFFERS:
            return { ...state, offers: action.payload };
        default:
            return state;
    }
}
