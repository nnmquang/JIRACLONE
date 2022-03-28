



const historyState = {
    history:{}
};

export const HistoryReducer = (state = historyState,action) => {
    // eslint-disable-next-line default-case
    switch(action.type) {
        case 'ADD_HISTORY' : {
            state.history = action.history;
            return {...state}
        }
        default:return {...state}
    }
}
