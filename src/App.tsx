import {ThemeProvider} from '@mui/material'

import './App.css'
import MainRouter from './pages/router'
import {appTheme} from './utils/app.constants'

const App = () => (
	<ThemeProvider theme={appTheme}>
		<MainRouter />
	</ThemeProvider>
)

export default App
