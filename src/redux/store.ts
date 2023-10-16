import {configureStore} from '@reduxjs/toolkit'
import {AnyAction, CombinedState, combineReducers} from 'redux'
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk, {ThunkDispatch} from 'redux-thunk'

import app from './app/app.slice'
import user from './user/user.slice'

const reducers = combineReducers({
	app,
	user
})

const persistConfig = {
	key: 'root',
	storage
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
	reducer: persistedReducer,
	middleware: [thunk]
})

export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch
export type AppDispatch = ThunkDispatch<CombinedState<{}>, null, AnyAction>
export const persistor = persistStore(store)
export default store
