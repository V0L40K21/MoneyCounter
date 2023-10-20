import {FC, ReactNode} from 'react'

type TProps = {
	children?: ReactNode
	index: number
	value: number
}

const TabPanel: FC<TProps> = ({children, index, value, ...other}) => {
	return (
		<div
			role={'tabpanel'}
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			{value === index && <div style={{padding: 3}}>{children}</div>}
		</div>
	)
}

export default TabPanel
