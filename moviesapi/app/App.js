import { hot } from 'react-hot-loader';
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainPage from './components/MainPage';
import ActorsPage from './components/ActorsPage';
import GenresPage from './components/GenresPage';

const App = () => (
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path={'/actors'} component={ActorsPage} />
                <Route path={'/genres'} component={GenresPage} />
                <Route path={'/'} component={MainPage} />
            </Switch>
        </BrowserRouter>
    </Provider>
);

export default hot(module)(App);