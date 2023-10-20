import {AnyAction, createSlice} from '@reduxjs/toolkit'

import {TPurchase} from '../types'
import {addPurchase, getPurchases} from './purchase.thunk'

interface IPurchaseState {
	increments: TPurchase[]
	decrements: TPurchase[]
	loading: boolean
}

const initialState: IPurchaseState = {
	increments: [],
	decrements: [],
	loading: false
}

const isPendingAction = (action: AnyAction) => action.type.endsWith('/pending')
const isRejectedAction = (action: AnyAction) => action.type.endsWith('/rejected')

const purchaseSlice = createSlice({
	name: 'purchase',
	initialState,
	reducers: {
		clearPurchaseState: () => initialState
	},
	extraReducers: builder => {
		builder
			.addCase(getPurchases.fulfilled, (state, action) => {
				const increments = action.payload.filter(p => p.inOut === 'inc')
				const decrements = action.payload.filter(p => p.inOut === 'dec')
				return {
					...state,
					increments,
					decrements,
					loading: false
				}
			})
			.addCase(addPurchase.fulfilled, (state, action) => ({
				...state,
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

export const {clearPurchaseState} = purchaseSlice.actions
export default purchaseSlice.reducer
