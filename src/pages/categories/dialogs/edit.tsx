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
import {TCategory, TPaymentMethod} from '../../../redux/types'
import {editCategory} from '../../../redux/categories/category.thunk'

type TProps = {
	open: boolean
	closeDialog: () => void
	category: TCategory
}

const EditCategoryDialog: FC<TProps> = ({open, closeDialog, category}) => {
	const dispatch = useAppDispatch()
	const {loading} = useAppSelector(state => state.categories)

	const [name, setName] = useState(category.name)
	const handleSave = async () => {
		await dispatch(editCategory({_id: category._id, name}))
		closeDialog()
	}
	return (
		<Dialog
			open={open}
			onClose={closeDialog}
		>
			<AppLoader loading={loading} />
			<DialogTitle>Изменение категории</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Измените нужные поля для категории "{category.name}" и нажмите кнопку
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

export default EditCategoryDialog
