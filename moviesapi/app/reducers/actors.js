export default (state = [], action) => {
    switch (action.type) {
        case 'GET_ALL_ACTORS':
            return action.payload;
        case 'ADD_ACTOR':
            return [
                ...state,
                action.payload
            ];
        default:
            return state;
    }
};