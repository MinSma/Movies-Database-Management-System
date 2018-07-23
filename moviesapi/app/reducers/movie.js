export default (state = [], action) => {
    switch (action.type) {
        case 'GET_MOVIE_BY_ID':
            return action.payload;
        default:
            return state;
    }
};