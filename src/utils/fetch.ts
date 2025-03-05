export const fetchData = async (url: string, options={}) => {
	const resp = await fetch(url, options)
	if (resp.status !== 200) throw new Error(`Request failed with ${resp.status}`)
	const data = resp.json()
	return data
}
