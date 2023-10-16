import {PayloadAction, createSlice} from '@reduxjs/toolkit'

import {TError} from '../types'

interface IAppState {
	loading: boolean
	error: TError | null
}

const initialState: IAppState = {
	error: null,
	loading: false
}

const appSlice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		setError: (state, action: PayloadAction<TError | null>) => ({
			...state,
			error: action.payload
		})
	}
})

export const {setError} = appSlice.actions

export default appSlice.reducer
