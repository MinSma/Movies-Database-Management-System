export default (state = [], action) => {
    switch (action.type) {
        case 'GET_ALL_GENRES':
            return action.payload;
        default:
            return state;
    }
};