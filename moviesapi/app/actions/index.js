const GET_ALL_GENRES = 'GET_ALL_GENRES';
const ADD_GENRE = 'ADD_GENRE';
const GET_ALL_ACTORS = 'GET_ALL_ACTORS';
const ADD_ACTOR = 'ADD_ACTOR';
const GET_ALL_MOVIES = 'GET_ALL_MOVIES';
const ADD_MOVIE = 'ADD_MOVIE';

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

export const getAllMovies = () => (dispatch) => {
    fetch(`${url}/api/movies`, {
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