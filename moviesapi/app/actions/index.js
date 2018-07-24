const GET_ALL_GENRES = 'GET_ALL_GENRES';
const ADD_GENRE = 'ADD_GENRE';
const EDIT_GENRE = 'EDIT_GENRE';
const REMOVE_GENRE = 'REMOVE_GENRE';
const GET_ALL_ACTORS = 'GET_ALL_ACTORS';
const GET_ACTOR_BY_ID = 'GET_ACTOR_BY_ID';
const ADD_ACTOR = 'ADD_ACTOR';
const EDIT_ACTOR = 'EDIT_ACTOR';
const REMOVE_ACTOR = 'REMOVE_ACTOR';
const GET_ALL_MOVIES = 'GET_ALL_MOVIES';
const GET_MOVIE_BY_ID = 'GET_MOVIE_BY_ID';
const ADD_MOVIE = 'ADD_MOVIE';
const EDIT_MOVIE = 'EDIT_MOVIE';
const REMOVE_MOVIE = 'REMOVE_MOVIE';

var headers = {
    "Content-Type": "application/json",
    "Accept": "application/json"
};

var url = `http://localhost:54943`;

export const getAllGenres = () => (dispatch) => {
    fetch(`${url}/api/genres`, {
        method: 'GET',
        headers,
        credentials: 'include'
    }).then(response => {
        response.json()
            .then(data => {
                dispatch({
                    type: GET_ALL_GENRES,
                    payload: data
                });
            });
    }).catch((error) => console.log(error));
};

export const addGenre = (values) => (dispatch) => {
    fetch(`${url}/api/genres`, {
        method: 'POST',
        headers,
        body: JSON.stringify(values),
        credentials: 'include'
    }).then(response => {
        response.json()
            .then(data => {
                dispatch({
                    type: ADD_GENRE,
                    payload: data
                });
            });
    }).catch((error) => console.log(error));
};

export const editGenre = (genre) => (dispatch) => {
    fetch(`${url}/api/genres/${genre.id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(genre),
        credentials: 'include'
    }).then(response => {
        response.json()
            .then(data => {
                dispatch({
                    type: EDIT_GENRE,
                    payload: data
                });
            });
    }).catch((error) => console.log(error));
}

export const removeGenre = (id) => (dispatch) => {
    fetch(`${url}/api/genres/${id}`, {
        method: 'DELETE',
        headers,
        credentials: 'include'
    }).then(response => {
        if(response.status === 200 || response.status === 204) {
            dispatch({
                type: REMOVE_GENRE,
                id: id
            });
        };
    }).catch((error) => console.log(error));
}

export const getAllActors = () => (dispatch) => {
    fetch(`${url}/api/actors`, {
        method: 'GET',
        headers,
        credentials: 'include'
    }).then(response => {
        response.json()
            .then(data => {
                dispatch({
                    type: GET_ALL_ACTORS,
                    payload: data
                });
            });
    }).catch((error) => console.log(error));
};

export const getActorById = (id) => (dispatch) => {
    fetch(`${url}/api/actors/${id}`, {
        method: 'GET',
        headers,
        credentials: 'include'
    }).then(response => {
        response.json()
            .then(data => {
                dispatch({
                    type: GET_ACTOR_BY_ID,
                    payload: data
                });
            });
    }).catch((error) => console.log(error));
}

export const addActor = (values) => (dispatch) => {
    fetch(`${url}/api/actors`, {
        method: 'POST',
        headers,
        body: JSON.stringify(values),
        credentials: 'include'
    }).then(response => {
        response.json()
            .then(data => {
                dispatch({
                    type: ADD_ACTOR,
                    payload: data
                });
            });
    }).catch((error) => console.log(error));
};

export const editActor = (actor) => (dispatch) => {
    fetch(`${url}/api/actors/${actor.id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(actor),
        credentials: 'include'
    }).then(response => {
        response.json()
            .then(data => {
                dispatch({
                    type: EDIT_ACTOR,
                    payload: data
                });
            });
    }).catch((error) => console.log(error));
}

export const removeActor = (id) => (dispatch) => {
    fetch(`${url}/api/actors/${id}`, {
        method: 'DELETE',
        headers,
        credentials: 'include'
    }).then(response => {
        if(response.status === 200 || response.status === 204) {
            dispatch({
                type: REMOVE_ACTOR,
                id: id
            });
        };
    }).catch((error) => console.log(error));
}

export const getAllMovies = (text) => (dispatch) => {
    fetch(`${url}/api/movies?text=${text ? text : ''}`, {
        method: 'GET',
        headers,
        credentials: 'include'
    }).then(response => {
        response.json()
            .then(data => {
                dispatch({
                    type: GET_ALL_MOVIES,
                    payload: data
                });
            });
    }).catch((error) => console.log(error));
};

export const getMovieById = (id) => (dispatch) => {
    fetch(`${url}/api/movies/${id}`, {
        method: 'GET',
        headers,
        credentials: 'include'
    }).then(response => {
        response.json()
            .then(data => {
                dispatch({
                    type: GET_MOVIE_BY_ID,
                    payload: data
                });
            });
    }).catch((error) => console.log(error));
}

export const addMovie = (values) => (dispatch) => {
    fetch(`${url}/api/movies`, {
        method: 'POST',
        headers,
        body: JSON.stringify(values),
        credentials: 'include'
    }).then(response => {
        response.json()
            .then(data => {
                dispatch({
                    type: ADD_MOVIE,
                    payload: data
                });
            });
    }).catch((error) => console.log(error));
}

export const editMovie = (movie) => (dispatch) => {
    fetch(`${url}/api/movies/${movie.id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(movie),
        credentials: 'include'
    }).then(response => {
        response.json()
            .then(data => {
                dispatch({
                    type: EDIT_MOVIE,
                    payload: data
                });
            });
    }).catch((error) => console.log(error));
}

export const removeMovie = (id) => (dispatch) => {
    fetch(`${url}/api/movies/${id}`, {
        method: 'DELETE',
        headers,
        credentials: 'include'
    }).then(response => {
        if(response.status === 200 || response.status === 204) {
            dispatch({
                type: REMOVE_MOVIE,
                id: id
            });
        };
    }).catch((error) => console.log(error));
}

export const removeRelationship = (values) => (dispatch) => {
    fetch(`${url}/api/actors/relationship`, {
        method: 'DELETE',
        headers,
        body: JSON.stringify(values),
        credentials: 'include'
    }).catch((error) => console.log(error));
}

export const addRelationship = (values) => (dispatch) => {
    fetch(`${url}/api/actors/relationship`, {
        method: 'POST',
        headers,
        body: JSON.stringify(values),
        credentials: 'include'
    }).catch((error) => console.log(error));
}