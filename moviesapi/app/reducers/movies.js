export default (state = [], action) => {
    switch (action.type) {
        case 'GET_ALL_MOVIES':
            return action.payload;
        case 'ADD_MOVIE':
            return [
                ...state,
                action.payload
            ];
        case 'EDIT_MOVIE':
            return state.map(item => {
                if(item.id === action.payload.id) {
                    item.title = action.payload.title;
                    item.releaseDate = action.payload.releaseDate;
                    item.genreId = action.payload.genreId;
                };

                return item;
            });
        case 'REMOVE_MOVIE':
            return state.filter((item) => item.id !== action.id);
        default:
            return state;
    }
};