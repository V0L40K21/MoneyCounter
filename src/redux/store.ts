import {configureStore} from '@reduxjs/toolkit'
import {combineReducers} from 'redux'
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import app from './app/app.slice'
import user from './user/user.slice'
import payments from './paymentMethods/paymentMethod.slice'

const reducers = combineReducers({
	app,
	user,
	payments
})

const persistConfig = {
	key: 'root',
	storage
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({serializableCheck: false})
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)
export default store
