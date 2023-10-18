import {createAsyncThunk} from '@reduxjs/toolkit'

import api from '../../utils/axios.config'
import {setError} from '../app/app.slice'
import {AppDispatch, RootState} from '../store'
import {TCategory, TCreateCategoryDto, TError} from '../types'

export const createCategory = createAsyncThunk<
	TCategory,
	TCreateCategoryDto,
	{rejectValue: TError; dispatch: AppDispatch; state: RootState}
>(
	'categories/create',
	async (dto, {dispatch, rejectWithValue, getState}) =>
		await api
			.post<TCategory>('/category', dto, {
				headers: {Authorization: 'Bearer ' + getState().user.token}
			})
			.then(({data}) => data)
			.catch(e => {
				dispatch(setError(e))
				return rejectWithValue(e)
			})
)

export const getCategories = createAsyncThunk<
	TCategory[],
	undefined,
	{rejectValue: TError; dispatch: AppDispatch; state: RootState}
>(
	'categories/get',
	async (dto, {dispatch, rejectWithValue, getState}) =>
		await api
			.get<TCategory[]>('/category', {
				headers: {Authorization: 'Bearer ' + getState().user.token}
			})
			.then(({data}) => data)
			.catch(e => {
				dispatch(setError(e))
				return rejectWithValue(e)
			})
)

export const deleteCategory = createAsyncThunk<
	TCategory,
	string,
	{rejectValue: TError; dispatch: AppDispatch; state: RootState}
>(
	'categories/delete',
	async (_id, {dispatch, rejectWithValue, getState}) =>
		await api
			.delete<TCategory>(`/category/${_id}`, {
				headers: {Authorization: 'Bearer ' + getState().user.token}
			})
			.then(({data}) => data)
			.catch(e => {
				dispatch(setError(e))
				return rejectWithValue(e)
			})
)

export const editCategory = createAsyncThunk<
	TCategory,
	{_id: string} & TCreateCategoryDto,
	{rejectValue: TError; dispatch: AppDispatch; state: RootState}
>(
	'categories/edit',
	async ({_id, name}, {dispatch, rejectWithValue, getState}) =>
		await api
			.patch<TCategory>(
				`/category/${_id}`,
				{name},
				{
					headers: {Authorization: 'Bearer ' + getState().user.token}
				}
			)
			.then(({data}) => data)
			.catch(e => {
				dispatch(setError(e))
				return rejectWithValue(e)
			})
)
