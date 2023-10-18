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
import {createCategory} from '../../../redux/categories/category.thunk'
import {useAppDispatch, useAppSelector} from '../../../redux/hooks'

type TProps = {
	name: string
	open: boolean
	closeDialog: () => void
	setName: Dispatch<SetStateAction<string>>
}

const AddCategoryDialog: FC<TProps> = ({open, closeDialog, name, setName}) => {
	const dispatch = useAppDispatch()
	const {loading} = useAppSelector(state => state.categories)
	const handleSave = async () => {
		await dispatch(createCategory({name}))
		closeDialog()
	}
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
					Добавить
				</Button>
			</DialogActions>
		</Dialog>
	)
}

const styles: {[key: string]: CSSProperties} = {}

export default AddCategoryDialog
