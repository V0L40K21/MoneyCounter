import {createTheme} from '@mui/material'

export const appColors = {
	main: '#B18845',
	second: '#FEF8B4',
	other1: '#483D03',
	other2: '#BBBAC6',
	other3: '#875053'
}

export const appTheme = createTheme({
	palette: {
		primary: {
			main: appColors.main
		},
		secondary: {
			main: appColors.second
		}
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					height: '40px'
				}
			}
		},
		MuiInputBase: {
			defaultProps: {
				size: 'small'
			}
		}
	}
})
