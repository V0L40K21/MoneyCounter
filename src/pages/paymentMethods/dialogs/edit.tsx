import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField
} from '@mui/material'
import {CSSProperties, FC, useState} from 'react'

import AppLoader from '../../../components/appLoader'
import {useAppDispatch, useAppSelector} from '../../../redux/hooks'
import {editPaymentMethod} from '../../../redux/paymentMethods/paymentMethod.thunk'
import {TPaymentMethod} from '../../../redux/types'

type TProps = {
	open: boolean
	closeDialog: () => void
	method: TPaymentMethod
}

const EditPaymentMethodDialog: FC<TProps> = ({open, closeDialog, method}) => {
	const dispatch = useAppDispatch()
	const {loading} = useAppSelector(state => state.payments)

	const [name, setName] = useState(method.name)
	const [balance, setBalance] = useState(method.balance)
	const handleSave = async () => {
		await dispatch(editPaymentMethod({_id: method._id, name, balance}))
		closeDialog()
	}
	return (
		<Dialog
			open={open}
			onClose={closeDialog}
		>
			<AppLoader loading={loading} />
			<DialogTitle>Изменение метода платежей</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Измените нужные поля для метода платежей "{method.name}" и нажмите кнопку
					"Изменить"
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
					type={'number'}
					fullWidth
					variant={'standard'}
					value={balance}
					onChange={({target}) => setBalance(+target.value)}
					sx={styles.input}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={closeDialog}>Отмена</Button>
				<Button
					onClick={handleSave}
					variant={'outlined'}
				>
					Изменить
				</Button>
			</DialogActions>
		</Dialog>
	)
}

const styles: {[key: string]: CSSProperties} = {}

export default EditPaymentMethodDialog
