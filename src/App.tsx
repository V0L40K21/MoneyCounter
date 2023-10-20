import {ThemeProvider} from '@mui/material'
import {LocalizationProvider} from '@mui/x-date-pickers-pro'
import {AdapterDayjs} from '@mui/x-date-pickers-pro/AdapterDayjs'
import locale from 'dayjs/locale/ru'

import './App.css'
import MainRouter from './pages/router'
import {appTheme} from './utils/app.constants'
import {useEffect} from 'react'

const App = () => {
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
