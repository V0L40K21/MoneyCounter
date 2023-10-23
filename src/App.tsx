import {ThemeProvider} from '@mui/material'
import {LocalizationProvider} from '@mui/x-date-pickers-pro'
import {AdapterDayjs} from '@mui/x-date-pickers-pro/AdapterDayjs'
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from 'chart.js'
import locale from 'dayjs/locale/ru'
import {useEffect} from 'react'

import './App.css'
import MainRouter from './pages/router'
import {appTheme} from './utils/app.constants'

const App = () => {
	ChartJS.register(ArcElement, Tooltip, Legend)
	useEffect(() => {
		document.title = 'MoneyCounter'
	}, [])
	return (
		<LocalizationProvider
			dateAdapter={AdapterDayjs}
			adapterLocale={locale.name}
		>
			<ThemeProvider theme={appTheme}>
				<MainRouter />
			</ThemeProvider>
		</LocalizationProvider>
	)
}

export default App
