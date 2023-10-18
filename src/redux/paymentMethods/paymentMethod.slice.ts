import {AnyAction, createSlice} from '@reduxjs/toolkit'

import {
	createPaymentMethod,
	deletePaymentMethod,
	editPaymentMethod,
	getPaymentMethods
} from './paymentMethod.thunk'
import {TPaymentMethod} from '../types'

interface IPaymentMethodState {
	paymentMethods: TPaymentMethod[]
	loading: boolean
}

const initialState: IPaymentMethodState = {
	paymentMethods: [],
	loading: false
}

const isPendingAction = (action: AnyAction) =>
	action.type.endsWith('/pending') && action.type.includes('paymentMethods')
const isRejectedAction = (action: AnyAction) =>
	action.type.endsWith('/rejected') && action.type.includes('paymentMethods')

const paymentMethodsSlice = createSlice({
	name: 'paymentMethods',
	initialState,
	reducers: {
		clearPMState: () => initialState
	},
	extraReducers: builder => {
		builder
			.addCase(getPaymentMethods.fulfilled, (state, action) => ({
				...state,
				paymentMethods: action.payload,
				loading: false
			}))
			.addCase(createPaymentMethod.fulfilled, (state, action) => {
				const newArr: TPaymentMethod[] = [...state.paymentMethods, action.payload]
				return {...state, paymentMethods: newArr, loading: false}
			})
			.addCase(deletePaymentMethod.fulfilled, (state, action) => {
				const newArr: TPaymentMethod[] = state.paymentMethods.filter(
					method => method._id !== action.payload._id
				)
				return {...state, paymentMethods: newArr, loading: false}
			})
			.addCase(editPaymentMethod.fulfilled, (state, action) => {
				const newArr: TPaymentMethod[] = [
					...state.paymentMethods.filter(
						method => method._id !== action.payload._id
					),
					action.payload
				]
				return {...state, paymentMethods: newArr, loading: false}
			})
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

export const {clearPMState} = paymentMethodsSlice.actions
export default paymentMethodsSlice.reducer
