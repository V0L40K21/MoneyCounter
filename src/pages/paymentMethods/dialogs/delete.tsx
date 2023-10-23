import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle
} from '@mui/material'
import {FC} from 'react'

import AppLoader from '../../../components/appLoader'
import {useAppDispatch, useAppSelector} from '../../../redux/hooks'
import {deletePaymentMethod} from '../../../redux/paymentMethods/paymentMethod.thunk'
import {TPaymentMethod} from '../../../redux/types'

type TProps = {
	open: boolean
	closeDialog: () => void
	method: TPaymentMethod
}

const DeletePaymentMethodDialog: FC<TProps> = ({open, closeDialog, method}) => {
	const dispatch = useAppDispatch()
	const {loading} = useAppSelector(state => state.payments)
	const handleDelete = async () => {
		await dispatch(deletePaymentMethod(method._id))
		closeDialog()
	}
	return (
		<Dialog
			open={open}
			onClose={closeDialog}
		>
			<AppLoader loading={loading} />
			<DialogTitle>Удаление метода платежей</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Удаление метода плтежей повлечет за собой удаление связанных транзакций.Вы
					уверены, что хотите удалить метод платежей "{method.name}"?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={closeDialog}>Отмена</Button>
				<Button
					onClick={handleDelete}
					variant={'outlined'}
				>
					Удалить
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default DeletePaymentMethodDialog
