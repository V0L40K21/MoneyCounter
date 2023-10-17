import axios, {AxiosError} from 'axios'

const api = axios.create({
	baseURL: 'https://moneycounter35.vercel.app/',
	// 	//  'http://localhost:3000'
	headers: {
		'Content-Type': 'application/json'
	}
})

api.interceptors.request.use(req => {
	console.info(`\n🚀 to ${req.url}\n`, req)
	return req
})
api.interceptors.response.use(
	res => {
		console.info(`\n🎁 from ${res.config.url}`, res)
		return res
	},
	(err: AxiosError) => {
		console.error(`🙈 from ${err.response?.config.url}`, err.response ?? err)
		throw err.response?.data ?? err
	}
)

export default api
