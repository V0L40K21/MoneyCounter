import {DateRange, DateRangePicker} from '@mui/x-date-pickers-pro'
import dayjs, {Dayjs} from 'dayjs'
import {CSSProperties, FC, useEffect, useState} from 'react'

import AppLoader from '../../components/appLoader'
import MainContainer from '../../components/mainContainer'
import MainTabs from '../../components/mainTabs'
import {useAppDispatch, useAppSelector} from '../../redux/hooks'
import {getPurchases} from '../../redux/purchases/purchase.thunk'

type TProps = {}

const MainPage: FC<TProps> = () => {
	const dispatch = useAppDispatch()
	const {loading, increments, decrements} = useAppSelector(state => state.purchases)
	const [range, setRange] = useState<DateRange<Dayjs>>([
		dayjs().subtract(1, 'w'),
		dayjs()
	])
	useEffect(() => {
		dispatch(getPurchases(range))
	}, [dispatch, range])
	return (
		<MainContainer>
			<div style={styles.container}>
				<AppLoader loading={loading} />
				<DateRangePicker
					localeText={{start: 'С', end: 'По'}}
					sx={{marginTop: '10px'}}
					format={'DD.MM.YYYY'}
					maxDate={dayjs()}
					onAccept={setRange}
					value={range}
				/>
				<MainTabs
					increments={increments}
					decrements={decrements}
				/>
			</div>
		</MainContainer>
	)
}

const styles: {[key: string]: CSSProperties} = {
	container: {
		height: '100%'
	}
}

export default MainPage
