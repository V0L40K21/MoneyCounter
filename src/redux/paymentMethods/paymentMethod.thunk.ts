import {createAsyncThunk} from '@reduxjs/toolkit'

import api from '../../utils/axios.config'
import {setError} from '../app/app.slice'
import {AppDispatch, RootState} from '../store'
import {TCreatePMDto, TError, TPaymentMethod} from '../types'

export const createPaymentMethod = createAsyncThunk<
	TPaymentMethod,
	TCreatePMDto,
	{rejectValue: TError; dispatch: AppDispatch; state: RootState}
>(
	'paymentMethods/create',
	async (dto, {dispatch, rejectWithValue, getState}) =>
		await api
			.post<TPaymentMethod>('/payment', dto, {
				headers: {Authorization: 'Bearer ' + getState().user.token}
			})
			.then(({data}) => data)
			.catch(e => {
				dispatch(setError(e))
				return rejectWithValue(e)
			})
)

export const getPaymentMethods = createAsyncThunk<
	TPaymentMethod[],
	undefined,
	{rejectValue: TError; dispatch: AppDispatch; state: RootState}
>(
	'paymentMethods/get',
	async (dto, {dispatch, rejectWithValue, getState}) =>
		await api
			.get<TPaymentMethod[]>('/payment', {
				headers: {Authorization: 'Bearer ' + getState().user.token}
			})
			.then(({data}) => data)
			.catch(e => {
				dispatch(setError(e))
				return rejectWithValue(e)
			})
)

export const deletePaymentMethod = createAsyncThunk<
	TPaymentMethod,
	string,
	{rejectValue: TError; dispatch: AppDispatch; state: RootState}
>(
	'paymentMethods/delete',
	async (_id, {dispatch, rejectWithValue, getState}) =>
		await api
			.delete<TPaymentMethod>(`/payment/${_id}`, {
				headers: {Authorization: 'Bearer ' + getState().user.token}
			})
			.then(({data}) => data)
			.catch(e => {
				dispatch(setError(e))
				return rejectWithValue(e)
			})
)

export const editPaymentMethod = createAsyncThunk<
	TPaymentMethod,
	{_id: string} & TCreatePMDto,
	{rejectValue: TError; dispatch: AppDispatch; state: RootState}
>(
	'paymentMethods/edit',
	async ({_id, name, balance}, {dispatch, rejectWithValue, getState}) =>
		await api
			.patch<TPaymentMethod>(
				`/payment/${_id}`,
				{name, balance},
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
