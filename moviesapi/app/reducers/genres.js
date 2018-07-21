export default (state = [], action) => {
    switch (action.type) {
        case 'GET_ALL_GENRES':
            return action.payload;
        case 'ADD_GENRE':            
            return [
                ...state, 
                action.payload
            ];
        case 'EDIT_GENRE':
            return state.map(item => {
                if(item.id === action.payload.id) {
                    item.name = action.payload.name;
                };

                return item;
            });
        case 'REMOVE_GENRE':
            return state.filter((item) => item.id !== action.id);
        default:
            return state;
    }
};