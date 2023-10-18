import {Alert, Snackbar} from '@mui/material'
import {CSSProperties, FC, ReactElement, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'

import {setError} from '../redux/app/app.slice'
import {useAppDispatch, useAppSelector} from '../redux/hooks'
import {clearUserState} from '../redux/user/user.slice'
import MainMenu from './mainMenu'

type TProps = {children: ReactElement}

const MainContainer: FC<TProps> = ({children}) => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const {error} = useAppSelector(state => state.app)
	const {token} = useAppSelector(state => state.user)
	const [snakOpen, setSnackOpen] = useState(false)
	const handleSnackClose = (
		event: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === 'clickaway') {
			return
		}
		setSnackOpen(false)
		dispatch(setError(null))
	}
	useEffect(() => {
		if (error) {
			setSnackOpen(true)
			error.statusCode === 401 &&
				setTimeout(() => {
					dispatch(clearUserState())
					navigate('/')
				}, 3000)
		}
	}, [dispatch, error, navigate])
	return (
		<div style={styles.container}>
			{token && <MainMenu />}
			{children}
			<img
				src={require('../assets/coins.png')}
				alt={'coins'}
				style={styles.img}
			/>
			<Snackbar
				open={snakOpen}
				autoHideDuration={3000}
				onClose={handleSnackClose}
			>
				<Alert
					onClose={handleSnackClose}
					severity={'error'}
					sx={{width: '100%'}}
				>
					{error?.message}
				</Alert>
			</Snackbar>
		</div>
	)
}

const styles: {[key: string]: CSSProperties} = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		flex: 1,
		height: '100vh',
		width: '100vw',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative'
	},
	img: {
		position: 'absolute',
		bottom: 0,
		right: 0,
		height: '45vh',
		width: '45vw'
	}
}

export default MainContainer
