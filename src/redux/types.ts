export type TTokenRes = {
	access_token: string
}

export type TLoginDto = {
	email: string
	password: string
}

export type TError = {
	statusCode: number
	message: string
}

export type TProfileRes = {
	_id: string
	email: string
	iat: number
	exp: number
}

export type TCreatePMDto = {
	name: string
	balance: number
}

export type TCreateCategoryDto = {
	name: string
}

export type TPaymentMethod = {
	balance: number
	createdAt: number
	updatedAt?: number
	name: string
	owner: TOwner
	_id: string
}

export type TCategory = {
	createdAt: number
	updatedAt?: number
	name: string
	owner: TOwner
	_id: string
}

export type TOwner = {
	_id: string
	email: string
}
