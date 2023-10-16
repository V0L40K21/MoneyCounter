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
