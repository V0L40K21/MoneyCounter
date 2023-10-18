import {Delete, Edit} from '@mui/icons-material'
import {IconButton, Typography} from '@mui/material'
import {CSSProperties, FC, useState} from 'react'

import {TCategory} from '../../redux/types'
import {appColors} from '../../utils/app.constants'
import DeleteCategoryDialog from './dialogs/delete'
import EditCategoryDialog from './dialogs/edit'

type TProps = {
	categories: TCategory[]
}

const CategoriesList: FC<TProps> = ({categories}) => {
	const [deleteOpen, setDeleteOpen] = useState(false)
	const [editOpen, setEditOpen] = useState(false)
	const [selectedCategory, setSelectedCategory] = useState<TCategory | undefined>()
	const closeDialog = () => {
		setSelectedCategory(undefined)
		setDeleteOpen(false)
		setEditOpen(false)
	}
	return (
		<div style={styles.container}>
			{!categories.length && (
				<Typography
					variant={'h5'}
					align={'center'}
					color={appColors.main}
				>
					У вас пока нет категорий
				</Typography>
			)}
			{categories.map(category => (
				<div
					key={category._id}
					style={styles.wrapper}
				>
					<Typography
						variant={'h6'}
						color={appColors.main}
					>
						{category.name}
					</Typography>
					<div>
						<IconButton
							onClick={() => {
								setSelectedCategory(category)
								setEditOpen(true)
							}}
						>
							<Edit color={'primary'} />
						</IconButton>
						<IconButton
							onClick={() => {
								setSelectedCategory(category)
								setDeleteOpen(true)
							}}
						>
							<Delete color={'primary'} />
						</IconButton>
					</div>
				</div>
			))}
			{selectedCategory && (
				<DeleteCategoryDialog
					open={deleteOpen}
					closeDialog={closeDialog}
					category={selectedCategory}
				/>
			)}
			{selectedCategory && (
				<EditCategoryDialog
					open={editOpen}
					closeDialog={closeDialog}
					category={selectedCategory}
				/>
			)}
		</div>
	)
}

const styles: {[key: string]: CSSProperties} = {
	container: {
		width: '100%',
		padding: '10px'
	},
	wrapper: {
		display: 'flex',
		border: `1px solid ${appColors.main}`,
		borderRadius: '10px',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: '10px',
		marginBottom: '10px',
		width: '70%',
		flexWrap: 'wrap'
	}
}

export default CategoriesList
