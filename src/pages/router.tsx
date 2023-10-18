import {BrowserRouter, Route, Routes} from 'react-router-dom'

import LoginPage from './login'
import PaymentMethodsPage from './paymentMethods'

const MainRouter = () => (
	<BrowserRouter basename={'/moneycounter'}>
		<Routes>
			<Route
				index
				path={'/'}
				element={<LoginPage />}
			/>
			<Route
				path={'/paymentMethods'}
				element={<PaymentMethodsPage />}
			/>
		</Routes>
	</BrowserRouter>
)

export default MainRouter
