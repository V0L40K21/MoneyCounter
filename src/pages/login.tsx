import {Backdrop, Button, CircularProgress, TextField} from '@mui/material'
import {CSSProperties, useState} from 'react'

import MainContainer from '../components/mainContainer'
import {useAppDispatch, useAppSelector} from '../redux/hooks'
import {login} from '../redux/user/user.thunk'
import {appColors} from '../utils/app.constants'

const LoginPage = () => {
	const dispatch = useAppDispatch()
	const {loading} = useAppSelector(state => state.user)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const handleLogin = () => {
		dispatch(login({email, password}))
	}
	return (
		<MainContainer>
			<div style={styles.container}>
				<Backdrop
					sx={{color: appColors.main, zIndex: theme => theme.zIndex.drawer + 1}}
					open={loading}
				>
					<CircularProgress color='inherit' />
				</Backdrop>
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
