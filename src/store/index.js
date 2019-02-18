import {applyMiddleware,createStore} from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';
// import initialData from './initialize'
import reducers from './reducers';
import Api from '../lib/api';

const middlewares = [thunk];

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);
  middlewares.push(logger);
}

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['app','redirects']
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = createStore(persistedReducer,{},applyMiddleware(...middlewares))
export const persistor = persistStore(store)
Api.setStore(store);
