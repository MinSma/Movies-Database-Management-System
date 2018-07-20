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
                if(item.id === action.id) {
                    item.name = action.values.name;
                };

                return item;
            });
        case 'REMOVE_ACTOR':
            return state.filter((item) => item.id !== action.id);
        default:
            return state;
    }
};