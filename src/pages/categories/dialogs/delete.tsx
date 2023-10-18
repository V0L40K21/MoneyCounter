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
import {deleteCategory} from '../../../redux/categories/category.thunk'
import {useAppDispatch, useAppSelector} from '../../../redux/hooks'
import {TCategory} from '../../../redux/types'

type TProps = {
	open: boolean
	closeDialog: () => void
	category: TCategory
}

const DeleteCategoryDialog: FC<TProps> = ({open, closeDialog, category}) => {
	const dispatch = useAppDispatch()
	const {loading} = useAppSelector(state => state.categories)
	const handleDelete = async () => {
		await dispatch(deleteCategory(category._id))
		closeDialog()
	}
	return (
		<Dialog
			open={open}
			onClose={closeDialog}
		>
			<AppLoader loading={loading} />
			<DialogTitle>Удаление категории</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Вы уверены, что хотите удалить категорию "{category.name}"?
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

export default DeleteCategoryDialog
