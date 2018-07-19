import { hot } from 'react-hot-loader';
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import MainPage from './components/MainPage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const App = () => (
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path={'/'} component={MainPage} />
            </Switch>
        </BrowserRouter>
    </Provider>
);

export default hot(module)(App);