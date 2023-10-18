import {AnyAction, createSlice} from '@reduxjs/toolkit'

import {getProfile, login} from './user.thunk'

interface IUserState {
	token: string
	email: string
	loading: boolean
}

const initialState: IUserState = {
	token: '',
	email: '',
	loading: false
}

const isPendingAction = (action: AnyAction) => action.type.endsWith('/pending')
const isRejectedAction = (action: AnyAction) => action.type.endsWith('/rejected')

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		clearUserState: () => initialState
	},
	extraReducers: builder => {
		builder
			.addCase(login.fulfilled, (state, action) => ({
				...state,
				token: action.payload,
				loading: false
			}))
			.addCase(getProfile.fulfilled, (state, action) => ({
				...state,
				email: action.payload,
				loading: false
			}))
			.addMatcher(isPendingAction, state => ({
				...state,
				loading: true
			}))
			.addMatcher(isRejectedAction, (state, action) => ({
				...state,
				loading: false
			}))
	}
})

export const {clearUserState} = userSlice.actions
export default userSlice.reducer
