import {AnyAction, createSlice} from '@reduxjs/toolkit'

import {login} from './user.thunk'
import {TError} from '../types'

interface IUserState {
	token: string
	loading: boolean
	error?: TError
}

const initialState: IUserState = {
	token: '',
	loading: false
}

const isPendingAction = (action: AnyAction) => action.type.endsWith('/pending')
const isRejectedAction = (action: AnyAction) => action.type.endsWith('/rejected')

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(login.fulfilled, (state, action) => ({
				...state,
				token: action.payload,
				loading: false
			}))
			.addMatcher(isPendingAction, state => ({
				...state,
				loading: true
			}))
			.addMatcher(isRejectedAction, (state, action) => ({
				...state,
				error: action.payload,
				loading: false
			}))
	}
})

export default userSlice.reducer
