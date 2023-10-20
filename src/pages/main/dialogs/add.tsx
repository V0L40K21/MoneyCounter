import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField
} from '@mui/material'
import {CSSProperties, FC, useEffect, useState} from 'react'

import AppLoader from '../../../components/appLoader'
import {useAppDispatch, useAppSelector} from '../../../redux/hooks'
import {addPurchase, getPurchases} from '../../../redux/purchases/purchase.thunk'
import dayjs from 'dayjs'

type TProps = {
	open: boolean
	closeDialog: () => void
	inOut: 'inc' | 'dec'
}

const AddPurchaseDialog: FC<TProps> = ({open, closeDialog, inOut}) => {
	const dispatch = useAppDispatch()
	const {categories} = useAppSelector(state => state.categories)
	const {paymentMethods} = useAppSelector(state => state.payments)
	const {loading} = useAppSelector(state => state.categories)
	const [category, setCategory] = useState<string | undefined>(
		categories[0]?._id ?? undefined
	)
	const [payment, setPayment] = useState<string | undefined>(
		paymentMethods[0]?._id ?? undefined
	)
	const [amount, setAmount] = useState('')
	const handleSave = async () => {
		if (category && payment && +amount) {
			await dispatch(
				addPurchase({
					inOut,
					category,
					amount: +amount,
					paymentMethod: payment
				})
			)
		}
		closeDialog()
		dispatch(getPurchases([dayjs().subtract(1, 'w'), dayjs()]))
	}
	useEffect(() => {
		if (!open) {
			setCategory(categories[0]?._id ?? undefined)
			setPayment(paymentMethods[0]?._id ?? undefined)
			setAmount('')
		}
	}, [open])
	return (
		<Dialog
			open={open}
			onClose={closeDialog}
		>
			<AppLoader loading={loading} />
			<DialogTitle>Добавление категории</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Для того, чтобы добавить категорию, заполните поля и нажмите кнопку
					"Добавить"
				</DialogContentText>
				<FormControl
					fullWidth
					sx={styles.select}
				>
					<InputLabel id={'category-label'}>Категория</InputLabel>
					<Select
						labelId={'category-label'}
						value={category}
						onChange={({target}) => setCategory(target.value)}
					>
						{categories.map(({name, _id}) => (
							<MenuItem
								value={_id}
								key={_id}
							>
								{name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<FormControl
					fullWidth
					sx={styles.select}
				>
					<InputLabel id={'category-label'}>Счёт</InputLabel>
					<Select
						labelId={'payment-label'}
						value={payment}
						onChange={({target}) => setPayment(target.value)}
					>
						{paymentMethods.map(({name, _id}) => (
							<MenuItem
								value={_id}
								key={_id}
							>
								{name}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<TextField
					label={'Сумма'}
					inputMode={'numeric'}
					fullWidth
					variant={'outlined'}
					value={amount}
					onChange={({target}) => setAmount(target.value)}
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

const styles: {[key: string]: CSSProperties} = {
	select: {
		marginTop: '15px',
		paddingTop: '10px'
	},
	input: {
		marginTop: '25px'
	}
}

export default AddPurchaseDialog
