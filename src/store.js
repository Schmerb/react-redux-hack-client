import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import { loadAuthToken } from './local-storage';
import authReducer from 'reducers/auth';
import protectedDataReducer from 'reducers/protected-data';
import displayReducer from 'reducers/display';
import chatReducer from 'reducers/chat';
import cryptoReducer from 'reducers/crypto';
import { setAuthToken } from 'actions/auth';

const store = createStore(
    combineReducers({
        form: formReducer,
        auth: authReducer,
        protectedData: protectedDataReducer,
        display: displayReducer,
        chat: chatReducer,
        crypto: cryptoReducer
    }),
    applyMiddleware(thunk)
);

// Hydrate the authToken from localStorage if it exist
const authToken = loadAuthToken();
if (authToken) {
    const token = authToken;
    console.log('setting auth token');
    store.dispatch(setAuthToken(token));
}

export default store;