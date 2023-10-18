import {Button} from '@mui/material'
import {CSSProperties, FC, useEffect, useState} from 'react'

import AppLoader from '../../components/appLoader'
import MainContainer from '../../components/mainContainer'
import {useAppDispatch, useAppSelector} from '../../redux/hooks'
import {getPaymentMethods} from '../../redux/paymentMethods/paymentMethod.thunk'
import AddPaymentMethodDialog from './dialogs/add'
import PaymentMethodsList from './list'
import {getCategories} from '../../redux/categories/category.thunk'
import CategoriesList from './list'
import AddCategoryDialog from './dialogs/add'

type TProps = {}

const CategoriesPage: FC<TProps> = () => {
	const dispatch = useAppDispatch()
	const {loading, categories} = useAppSelector(state => state.categories)
	const [addOpen, setAddOpen] = useState(false)
	const [name, setName] = useState('')
	const closeDialog = () => {
		setName('')
		setAddOpen(false)
	}
	useEffect(() => {
		dispatch(getCategories())
	}, [dispatch])
	return (
		<MainContainer>
			<div style={styles.container}>
				<AppLoader loading={loading} />
				<CategoriesList categories={categories} />
				<div style={styles.content}></div>
				<div style={styles.btns}>
					<Button
						variant={'outlined'}
						onClick={() => setAddOpen(true)}
					>
						Добавить
					</Button>
				</div>
				<AddCategoryDialog
					open={addOpen}
					closeDialog={closeDialog}
					name={name}
					setName={setName}
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

export default CategoriesPage
