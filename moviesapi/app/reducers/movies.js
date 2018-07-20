export default (state = [], action) => {
    switch (action.type) {
        case 'GET_ALL_MOVIES':
            return action.payload;
        case 'ADD_MOVIE':
            return [
                ...state,
                action.payload
            ];
        default:
            return state;
    }
};