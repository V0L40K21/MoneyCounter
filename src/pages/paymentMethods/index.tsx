import {Button} from '@mui/material'
import {CSSProperties, FC, useEffect, useState} from 'react'

import AppLoader from '../../components/appLoader'
import MainContainer from '../../components/mainContainer'
import {useAppDispatch, useAppSelector} from '../../redux/hooks'
import {getPaymentMethods} from '../../redux/paymentMethods/paymentMethod.thunk'
import AddPaymentMethodDialog from './dialogs/add'
import PaymentMethodsList from './list'

type TProps = {}

const PaymentMethodsPage: FC<TProps> = () => {
	const dispatch = useAppDispatch()
	const {loading, paymentMethods} = useAppSelector(state => state.payments)
	const [addOpen, setAddOpen] = useState(false)
	const [name, setName] = useState('')
	const [balance, setBalance] = useState(0)
	const closeDialog = () => {
		setName('')
		setBalance(0)
		setAddOpen(false)
	}
	useEffect(() => {
		dispatch(getPaymentMethods())
	}, [dispatch])
	return (
		<MainContainer>
			<div style={styles.container}>
				<AppLoader loading={loading} />
				<PaymentMethodsList methods={paymentMethods} />
				<div style={styles.content}></div>
				<div style={styles.btns}>
					<Button
						variant={'outlined'}
						onClick={() => setAddOpen(true)}
					>
						Добавить
					</Button>
				</div>
				<AddPaymentMethodDialog
					open={addOpen}
					closeDialog={closeDialog}
					name={name}
					setName={setName}
					balance={balance}
					setBalance={setBalance}
				/>
			</div>
		</MainContainer>
	)
}

const styles: {[key: string]: CSSProperties} = {
	container: {
		display: 'flex',
		height: '100%',
		width: '100%'
	},
	content: {
		display: 'flex',
		flexDirection: 'column',
		flex: 1.7,
		padding: '15px'
	},
	btns: {
		display: 'flex',
		flexDirection: 'column',
		flex: 0.3,
		padding: '15px'
	},
	input: {
		marginBottom: '10px'
	}
}

export default PaymentMethodsPage
