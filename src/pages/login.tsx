import {Button, TextField} from '@mui/material'
import {CSSProperties, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'

import AppLoader from '../components/appLoader'
import MainContainer from '../components/mainContainer'
import {useAppDispatch, useAppSelector} from '../redux/hooks'
import {login} from '../redux/user/user.thunk'

const LoginPage = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const {loading, token} = useAppSelector(state => state.user)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const handleLogin = () => {
		dispatch(login({email, password}))
	}
	useEffect(() => {
		token && navigate('/paymentMethods')
	}, [token])
	return (
		<MainContainer>
			<div style={styles.container}>
				<AppLoader loading={loading} />
				<TextField
					fullWidth
					label={'E-Mail'}
					autoFocus
					type={'email'}
					value={email}
					onChange={({target}) => setEmail(target.value)}
					sx={styles.input}
				/>
				<TextField
					fullWidth
					label={'Пароль'}
					type={'password'}
					value={password}
					onChange={({target}) => setPassword(target.value)}
					sx={styles.input}
				/>
				<Button
					variant={'outlined'}
					onClick={handleLogin}
				>
					Войти
				</Button>
				<Button>Зарегистрироваться</Button>
			</div>
		</MainContainer>
	)
}

const styles: {[key: string]: CSSProperties} = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		width: '45vw',
		padding: '15px',
		borderRadius: '15px',
		justifyContent: 'center'
	},
	input: {
		marginBottom: '15px'
	}
}

export default LoginPage
