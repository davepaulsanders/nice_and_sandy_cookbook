export const fetchData = async (url: string) => {
	const resp = await fetch(url)
	if (resp.status !== 200) throw new Error(`Request failed with ${resp.status}`)
	const data = resp.json()
	return data
}
