import {Divider} from '@mui/material'
import {CSSProperties, FC} from 'react'
import {Pie} from 'react-chartjs-2'

import {useAppSelector} from '../../redux/hooks'
import {appColors} from '../../utils/app.constants'

type TProps = {}

const MainDiagramsPage: FC<TProps> = () => {
	const {increments, decrements} = useAppSelector(state => state.purchases)
	const incObj: {[key: string]: number} = {}
	const decObj: {[key: string]: number} = {}
	increments.forEach(inc => {
		incObj[inc.category.name] = (incObj[inc.category.name] ?? 0) + inc.amount
	})
	decrements.forEach(dec => {
		decObj[dec.category.name] = (decObj[dec.category.name] ?? 0) + dec.amount
	})
	const incSum = Object.values(incObj).reduce((acc, val) => val + acc, 0)
	const decSum = Object.values(decObj).reduce((acc, val) => val + acc, 0)

	return (
		<div style={styles.container}>
			<div style={styles.pieContainer}>
				<div style={styles.pieWrapper}>
					Доходы
					<Pie
						data={{
							labels: Object.keys(incObj),
							datasets: [
								{
									data: Object.values(incObj),
									backgroundColor: Object.values(appColors),
									borderWidth: 1,
									borderColor: appColors.main
								}
							]
						}}
					/>
				</div>
				<div style={styles.pieWrapper}>
					Затраты
					<Pie
						data={{
							labels: Object.keys(decObj),
							datasets: [
								{
									data: Object.values(decObj),
									backgroundColor: Object.values(appColors),
									borderWidth: 1,
									borderColor: appColors.main
								}
							]
						}}
					/>
				</div>
			</div>
			<Divider />
			<p>Доходы: {incSum.toLocaleString()} 〒</p>
			<p>Затраты: {decSum.toLocaleString()} 〒</p>
			<p>Остаток: {(incSum - decSum).toLocaleString()} 〒</p>
		</div>
	)
}

const styles: {[key: string]: CSSProperties} = {
	pieContainer: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	pieWrapper: {
		display: 'flex',
		flexDirection: 'column',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		height: '30vh',
		margin: '15px 0'
	}
}

export default MainDiagramsPage
