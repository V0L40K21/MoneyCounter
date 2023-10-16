import axios, {AxiosError} from 'axios'

const api = axios.create()
// 	{
// 	// baseURL: 'https://v0l40k21.github.io/moneycounter'
// 	//  'http://localhost:3000'
// })

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
