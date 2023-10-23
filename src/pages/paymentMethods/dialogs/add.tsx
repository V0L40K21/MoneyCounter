import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField
} from '@mui/material'
import {CSSProperties, Dispatch, FC, SetStateAction} from 'react'

import AppLoader from '../../../components/appLoader'
import {useAppDispatch, useAppSelector} from '../../../redux/hooks'
import {createPaymentMethod} from '../../../redux/paymentMethods/paymentMethod.thunk'

type TProps = {
	name: string
	open: boolean
	balance: string
	closeDialog: () => void
	setName: Dispatch<SetStateAction<string>>
	setBalance: Dispatch<SetStateAction<string>>
}

const AddPaymentMethodDialog: FC<TProps> = ({
	open,
	closeDialog,
	name,
	setName,
	balance,
	setBalance
}) => {
	const dispatch = useAppDispatch()
	const {loading} = useAppSelector(state => state.payments)
	const handleSave = async () => {
		if (name && +balance) {
			await dispatch(createPaymentMethod({name, balance: +balance}))
		}
		closeDialog()
	}
	return (
		<Dialog
			open={open}
			onClose={closeDialog}
		>
			<AppLoader loading={loading} />
			<DialogTitle>Добавление метода платежей</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Для того, чтобы добавить метод платежей, заполните поля и нажмите кнопку
					"Добавить"
				</DialogContentText>
				<TextField
					autoFocus
					label={'Название'}
					type={'text'}
					fullWidth
					variant={'standard'}
					value={name}
					onChange={({target}) => setName(target.value)}
					sx={styles.input}
				/>
				<TextField
					label={'Баланс'}
					inputMode={'numeric'}
					fullWidth
					variant={'standard'}
					value={balance}
					onChange={({target}) => setBalance(target.value)}
					sx={styles.input}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={closeDialog}>Отмена</Button>
				<Button
					onClick={handleSave}
					variant={'outlined'}
				>
					Добавить
				</Button>
			</DialogActions>
		</Dialog>
	)
}

const styles: {[key: string]: CSSProperties} = {}

export default AddPaymentMethodDialog
