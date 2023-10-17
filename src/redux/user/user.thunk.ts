import {createAsyncThunk} from '@reduxjs/toolkit'

import api from '../../utils/axios.config'
import {TError, TLoginDto, TTokenRes} from '../types'
import {AppDispatch} from '../store'
import {setError} from '../app/app.slice'

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
