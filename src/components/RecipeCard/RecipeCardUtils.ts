import { fetchData } from "../../utils/fetch"

export const pinRecipeToggle = async (e, props) => {
		e.preventDefault()
		const {recipes, setRecipes, is_pinned, setRecipeSearchCopy, ...rest} = props
		await fetchData(`../v1/recipes/pinned/${props.id}`, 
					{
						method: "PATCH",
						"Content-Type": "application/json"
				})
		if (props.is_pinned) {
			if (setRecipeSearchCopy) {
			setRecipeSearchCopy(prev => {
				return prev.map(rec => {
				if (rec.id === props.id) {
					return {...rest, is_pinned: false}
				}
				return rec
			})	
			})
			}
			props.setRecipes(prev => {
				return prev.map((rec) => {
				if (rec.id === props.id) {
				  return { ...rest, is_pinned: false};
				}
				return rec;
				})
			  })
		} else {
			if (setRecipeSearchCopy) {
			setRecipeSearchCopy(prev => {
				return prev.map(rec => {
				if (rec.id === props.id) {
					return {...rest, is_pinned: true}
				}
				return rec
			})	
			})
			}
			props.setRecipes(prev => {
				return prev.map((rec) => {
				if (rec.id === props.id) {
				  return { ...rest, is_pinned: true};
				}
				return rec;
				})
			  })
		}
	}
