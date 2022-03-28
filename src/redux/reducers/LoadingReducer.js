import { DISPLAY_LOADING, HIDE_LOADING } from "../../util/constants/LoadingConst";

const initialState = {
    isLoading:false
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
    switch (action.type) {

        case DISPLAY_LOADING:
            state.isLoading = true;
            return { ...state };
        // eslint-disable-next-line no-duplicate-case
        case HIDE_LOADING:{
            state.isLoading = false;
            return { ...state};
        }

            

        default:
            return state;
    }
};
