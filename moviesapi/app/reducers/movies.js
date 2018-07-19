export default (state = [], action) => {
    switch (action.type) {
        case 'GET_ALL_MOVIES':
            return action.payload;
        default:
            return state;
    }
};