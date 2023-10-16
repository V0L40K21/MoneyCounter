import {Alert, Snackbar} from '@mui/material'
import {CSSProperties, FC, ReactElement, useEffect, useState} from 'react'

import {useAppDispatch, useAppSelector} from '../redux/hooks'
import {setError} from '../redux/app/app.slice'

type TProps = {children: ReactElement}

const MainContainer: FC<TProps> = ({children}) => {
	const dispatch = useAppDispatch()
	const {error} = useAppSelector(state => state.app)
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
		}
	}, [error])
	return (
		<div style={styles.container}>
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
