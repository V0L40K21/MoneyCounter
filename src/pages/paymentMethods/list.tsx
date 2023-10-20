import {Delete, Edit} from '@mui/icons-material'
import {IconButton, Typography} from '@mui/material'
import {CSSProperties, FC, useState} from 'react'

import {TPaymentMethod} from '../../redux/types'
import {appColors} from '../../utils/app.constants'
import DeletePaymentMethodDialog from './dialogs/delete'
import EditPaymentMethodDialog from './dialogs/edit'

type TProps = {
	methods: TPaymentMethod[]
}

const PaymentMethodsList: FC<TProps> = ({methods}) => {
	const [deleteOpen, setDeleteOpen] = useState(false)
	const [editOpen, setEditOpen] = useState(false)
	const [selectedMethod, setSelectedMethod] = useState<TPaymentMethod | undefined>()
	const closeDialog = () => {
		setSelectedMethod(undefined)
		setDeleteOpen(false)
		setEditOpen(false)
	}
	return (
		<div style={styles.container}>
			{!methods.length && (
				<Typography
					variant={'h5'}
					align={'center'}
					color={appColors.main}
				>
					У вас пока нет методов платежей
				</Typography>
			)}
			{methods.map(method => (
				<div
					key={method._id}
					style={styles.wrapper}
				>
					<Typography
						variant={'h6'}
						color={appColors.main}
					>
						{method.name}
					</Typography>
					{method.balance.toLocaleString()} 〒
					<div>
						<IconButton
							onClick={() => {
								setSelectedMethod(method)
								setEditOpen(true)
							}}
						>
							<Edit color={'primary'} />
						</IconButton>
						<IconButton
							onClick={() => {
								setSelectedMethod(method)
								setDeleteOpen(true)
							}}
						>
							<Delete color={'primary'} />
						</IconButton>
					</div>
				</div>
			))}
			{selectedMethod && (
				<DeletePaymentMethodDialog
					open={deleteOpen}
					closeDialog={closeDialog}
					method={selectedMethod}
				/>
			)}
			{selectedMethod && (
				<EditPaymentMethodDialog
					open={editOpen}
					closeDialog={closeDialog}
					method={selectedMethod}
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

export default PaymentMethodsList
