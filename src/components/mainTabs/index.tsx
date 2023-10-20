import {List, Tab, Tabs} from '@mui/material'
import {FC, SyntheticEvent, useState} from 'react'

import PurchasesList from '../../pages/main/purchasesList'
import {TPurchase} from '../../redux/types'
import TabPanel from './tabPanel'

type TProps = {
	increments: TPurchase[]
	decrements: TPurchase[]
}

const MainTabs: FC<TProps> = ({increments, decrements}) => {
	const [value, setValue] = useState<number>(0)
	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setValue(newValue)
	}
	const a11yProps = (index: number) => {
		return {
			id: `full-width-tab-${index}`,
			'aria-controls': `full-width-tabpanel-${index}`
		}
	}
	return (
		<div>
			<Tabs
				value={value}
				onChange={handleChange}
				textColor={'primary'}
				indicatorColor={'primary'}
				variant={'fullWidth'}
			>
				<Tab
					label={'Затраты'}
					{...a11yProps(0)}
				/>
				<Tab
					label={'Пополнения'}
					{...a11yProps(1)}
				/>
			</Tabs>
			<List>
				<TabPanel
					value={value}
					index={0}
				>
					<div>
						<PurchasesList
							purchases={decrements}
							inOut={'dec'}
						/>
					</div>
				</TabPanel>
				<TabPanel
					value={value}
					index={1}
				>
					<div>
						<PurchasesList
							purchases={increments}
							inOut={'inc'}
						/>
					</div>
				</TabPanel>
			</List>
		</div>
	)
}

export default MainTabs
