import MenuIcon from '@mui/icons-material/Menu'
import {
	AppBar,
	Avatar,
	Box,
	Button,
	Container,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Tooltip,
	Typography
} from '@mui/material'
import {CSSProperties, FC, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'

import {useAppDispatch, useAppSelector} from '../redux/hooks'
import {getProfile} from '../redux/user/user.thunk'

type TProps = {}

const MainMenu: FC<TProps> = () => {
	const pages = {
		Главная: '/main',
		Категории: '/categories',
		'Способы платежей': '/paymentMethods'
	}
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const {email} = useAppSelector(state => state.user)
	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget)
	}
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget)
	}
	const handleCloseNavMenu = () => {
		setAnchorElNav(null)
	}
	const handleCloseUserMenu = () => {
		setAnchorElUser(null)
	}
	useEffect(() => {
		!email && dispatch(getProfile())
	}, [email])
	return (
		<AppBar position='static'>
			<Container maxWidth='xl'>
				<Toolbar disableGutters>
					<Typography
						variant={'h6'}
						noWrap
						component={'a'}
						href={'/moneycounter'}
						sx={{
							mr: 2,
							display: {xs: 'none', md: 'flex'},
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none'
						}}
					>
						MoneyCounter
					</Typography>
					{/*burgerItems*/}
					<Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
						<IconButton
							size='large'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleOpenNavMenu}
							color='secondary'
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id='menu-appbar'
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left'
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left'
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: {xs: 'block', md: 'none'}
							}}
						>
							{Object.entries(pages).map(([page, value]) => (
								<MenuItem
									key={value}
									onClick={() => {
										setAnchorElNav(null)
										navigate(value)
									}}
								>
									<Typography textAlign='center'>{page}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<Typography
						variant={'h5'}
						noWrap
						component={'a'}
						href={'/moneycounter'}
						sx={{
							mr: 2,
							display: {xs: 'flex', md: 'none'},
							flexGrow: 1,
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none'
						}}
					>
						MoneyCounter
					</Typography>
					<Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
						{Object.entries(pages).map(([page, value]) => (
							<Button
								key={value}
								onClick={() => {
									setAnchorElNav(null)
									navigate(value)
								}}
								sx={{my: 2, color: 'white', display: 'block'}}
							>
								{page}
							</Button>
						))}
					</Box>
					<Box sx={{flexGrow: 0}}>
						<Tooltip title={'Профиль'}>
							<IconButton
								onClick={handleOpenUserMenu}
								sx={{p: 0}}
							>
								<Avatar alt={email} />
							</IconButton>
						</Tooltip>
						<Menu
							sx={{mt: '45px'}}
							id='menu-appbar'
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right'
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right'
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							<MenuItem
								onClick={() => {
									setAnchorElUser(null)
									navigate('/')
								}}
							>
								<Typography textAlign='center'>Выйти</Typography>
							</MenuItem>
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	)
}

const styles: {[key: string]: CSSProperties} = {}

export default MainMenu
