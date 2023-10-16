import {createTheme} from '@mui/material'

export const appColors = {
	main: '#B18845',
	second: '#FEF8B4'
}

export const appTheme = createTheme({
	palette: {
		primary: {
			main: appColors.main
		},
		secondary: {
			main: appColors.second
		}
	}
})
