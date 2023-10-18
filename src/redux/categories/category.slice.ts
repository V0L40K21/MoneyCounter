import {AnyAction, createSlice} from '@reduxjs/toolkit'

import {TCategory} from '../types'
import {
	createCategory,
	deleteCategory,
	editCategory,
	getCategories
} from './category.thunk'

interface ICategoryState {
	categories: TCategory[]
	loading: boolean
}

const initialState: ICategoryState = {
	categories: [],
	loading: false
}

const isPendingAction = (action: AnyAction) =>
	action.type.endsWith('/pending') && action.type.includes('categories')
const isRejectedAction = (action: AnyAction) =>
	action.type.endsWith('/rejected') && action.type.includes('categories')

const categoriesSlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {
		clearCategoryState: () => initialState
	},
	extraReducers: builder => {
		builder
			.addCase(getCategories.fulfilled, (state, action) => ({
				...state,
				categories: action.payload,
				loading: false
			}))
			.addCase(createCategory.fulfilled, (state, action) => {
				const newArr: TCategory[] = [...state.categories, action.payload]
				return {...state, categories: newArr, loading: false}
			})
			.addCase(deleteCategory.fulfilled, (state, action) => {
				const newArr: TCategory[] = state.categories.filter(
					category => category._id !== action.payload._id
				)
				return {...state, categories: newArr, loading: false}
			})
			.addCase(editCategory.fulfilled, (state, action) => {
				const newArr: TCategory[] = [
					...state.categories.filter(
						category => category._id !== action.payload._id
					),
					action.payload
				]
				return {...state, categories: newArr, loading: false}
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

export const {clearCategoryState} = categoriesSlice.actions
export default categoriesSlice.reducer
