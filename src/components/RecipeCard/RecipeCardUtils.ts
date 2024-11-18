export const pinRecipeToggle = (e, props) => {
		e.preventDefault()
		const {recipes, setRecipes, is_pinned, ...rest} = props
		if (props.is_pinned) {
			props.setRecipes(prev => {
				return prev.map((rec) => {
				if (rec.id === props.id) {
				  return { ...rest, is_pinned: false};
				}
				return rec;
				})
			  })

		} else {
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
