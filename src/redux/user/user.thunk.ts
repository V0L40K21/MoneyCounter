import {createAsyncThunk} from '@reduxjs/toolkit'

import api from '../../utils/axios.config'
import {setError} from '../app/app.slice'
import {AppDispatch, RootState} from '../store'
import {TError, TLoginDto, TProfileRes, TTokenRes} from '../types'

export const register = createAsyncThunk<
	string,
	TLoginDto,
	{rejectValue: TError; dispatch: AppDispatch}
>(
	'user/register',
	async (dto, {dispatch, rejectWithValue}) =>
		await api
			.post<TTokenRes>('/user', dto)
			.then(({data}) => data.access_token)
			.catch(e => {
				dispatch(setError(e))
				return rejectWithValue(e)
			})
)

export const login = createAsyncThunk<
	string,
	TLoginDto,
	{rejectValue: TError; dispatch: AppDispatch}
>(
	'user/login',
	async (dto, {dispatch, rejectWithValue}) =>
		await api
			.post<TTokenRes>('/auth/signIn', dto)
			.then(({data}) => data.access_token)
			.catch(e => {
				dispatch(setError(e))
				return rejectWithValue(e)
			})
)

export const getProfile = createAsyncThunk<
	string,
	undefined,
	{rejectValue: TError; dispatch: AppDispatch; state: RootState}
>(
	'user/getProfile',
	async (_, {dispatch, rejectWithValue, getState}) =>
		await api
			.get<TProfileRes>('/auth/profile', {
				headers: {Authorization: 'Bearer ' + getState().user.token}
			})
			.then(({data}) => data.email)
			.catch(e => {
				dispatch(setError(e))
				return rejectWithValue(e)
			})
)
