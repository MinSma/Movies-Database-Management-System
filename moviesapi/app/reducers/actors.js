export default (state = [], action) => {
    switch (action.type) {
        case 'GET_ALL_ACTORS':
            return action.payload;
        default:
            return state;
    }
};