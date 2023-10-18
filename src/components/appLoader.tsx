import {Backdrop, CircularProgress} from '@mui/material'
import {FC} from 'react'

import {appColors} from '../utils/app.constants'

type TProps = {loading: boolean}

const AppLoader: FC<TProps> = ({loading}) => {
	return (
		<Backdrop
			sx={{color: appColors.main, zIndex: theme => theme.zIndex.drawer + 1}}
			open={loading}
		>
			<CircularProgress color='inherit' />
		</Backdrop>
	)
}

export default AppLoader
