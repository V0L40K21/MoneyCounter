import {Button, Divider} from '@mui/material'
import dayjs from 'dayjs'
import {CSSProperties, FC, useState} from 'react'

import {TPurchase} from '../../redux/types'
import {appColors} from '../../utils/app.constants'
import AddPurchaseDialog from './dialogs/add'

type TProps = {
	purchases: TPurchase[]
	inOut: 'inc' | 'dec'
}

const PurchasesList: FC<TProps> = ({purchases, inOut}) => {
	const [openAddDialog, setOpenAddDialog] = useState(false)
	return (
		<div style={{overflow: 'hidden', height: '80vh'}}>
			<div
				style={{
					overflowY: 'auto',
					height: '90%'
				}}
			>
				<Button
					variant={'outlined'}
					sx={{marginBottom: '10px'}}
					onClick={() => setOpenAddDialog(true)}
				>
					Добавить транзакцию
				</Button>
				{purchases.map(p => (
					<div
						style={styles.wrapper}
						key={p._id}
					>
						<div>
							<p>
								Сумма: {p.inOut === 'dec' && '-'}
								{p.amount.toLocaleString()} 〒
							</p>
							<p>Категория: {p.category?.name}</p>
						</div>
						<div>
							<p>Счёт: {p.paymentMethod?.name}</p>
							<p>Дата: {dayjs(p.createdAt * 1000).format('DD.MM.YYYY HH:mm')}</p>
						</div>
					</div>
				))}
			</div>
			<Divider />
			<div>
				Итого: {purchases.reduce((sum, p) => (sum += p.amount), 0).toLocaleString()}{' '}
				〒
			</div>
			<AddPurchaseDialog
				open={openAddDialog}
				closeDialog={() => setOpenAddDialog(false)}
				inOut={inOut}
			/>
		</div>
	)
}

const styles: {[key: string]: CSSProperties} = {
	wrapper: {
		display: 'flex',
		border: `1px solid ${appColors.main}`,
		backgroundColor: 'white',
		borderRadius: '10px',
		padding: '10px',
		marginBottom: '10px',
		alignItems: 'center',
		justifyContent: 'space-between'
	}
}

export default PurchasesList
