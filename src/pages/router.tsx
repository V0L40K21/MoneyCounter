import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'

import LoginPage from './login'

const MainRouter = () => (
	<BrowserRouter>
		<Routes>
			<Route
				path={'/moneycounter'}
				element={
					<Navigate
						replace
						to={'/'}
					/>
				}
			/>
			<Route
				path={'/'}
				Component={LoginPage}
			/>
		</Routes>
	</BrowserRouter>
)

export default MainRouter
