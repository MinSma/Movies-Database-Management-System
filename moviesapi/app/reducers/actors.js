export default (state = [], action) => {
    switch (action.type) {
        case 'GET_ALL_ACTORS':
            return action.payload;
        case 'ADD_ACTOR':
            return [
                ...state,
                action.payload
            ];
        case 'EDIT_ACTOR':
            return state.map(item => {
                if(item.id === action.payload.id) {
                    item.firstName = action.payload.firstName;
                    item.lastName = action.payload.lastName;
                };

                return item;
            });
        case 'REMOVE_ACTOR':
            return state.filter((item) => item.id !== action.id);
        default:
            return state;
    }
};