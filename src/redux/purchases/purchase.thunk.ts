import {DateRange} from '@mui/x-date-pickers-pro'
import {createAsyncThunk} from '@reduxjs/toolkit'
import {Dayjs} from 'dayjs'

import api from '../../utils/axios.config'
import {setError} from '../app/app.slice'
import {AppDispatch, RootState} from '../store'
import {TAddPurchaseDto, TError, TPurchase} from '../types'

export const getPurchases = createAsyncThunk<
	TPurchase[],
	DateRange<Dayjs>,
	{rejectValue: TError; dispatch: AppDispatch; state: RootState}
>(
	'purchases/get',
	async (dateRange, {dispatch, rejectWithValue, getState}) =>
		await api
			.get<TPurchase[]>('/purchase', {
				params: {dateRange},
				headers: {Authorization: 'Bearer ' + getState().user.token}
			})
			.then(({data}) => data)
			.catch(e => {
				dispatch(setError(e))
				return rejectWithValue(e)
			})
)

export const addPurchase = createAsyncThunk<
	TPurchase,
	TAddPurchaseDto,
	{rejectValue: TError; dispatch: AppDispatch; state: RootState}
>('purchases/add', async (dto, {dispatch, rejectWithValue, getState}) => {
	const path = `/purchase/${dto.inOut === 'inc' ? 'increment' : 'decrement'}`
	return await api
		.post<TPurchase>(path, dto, {
			headers: {Authorization: 'Bearer ' + getState().user.token}
		})
		.then(({data}) => data)
		.catch(e => {
			dispatch(setError(e))
			return rejectWithValue(e)
		})
})
