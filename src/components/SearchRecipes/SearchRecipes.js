"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var SearchRecipes = function (_a) {
    var setSearch = _a.setSearch, cachedRecipes = _a.cachedRecipes, recipes = _a.recipes, setRecipes = _a.setRecipes;
    var _b = (0, react_1.useState)(""), searchInputVal = _b[0], setSearchInputVal = _b[1];
    var _c = (0, react_1.useState)([]), filteredRecipes = _c[0], setFilteredRecipes = _c[1];
    var _d = (0, react_1.useState)(true), hideSearchList = _d[0], setHideSearchList = _d[1];
    var resetRecipes = function (e) {
        setSearch(false);
        setRecipes(cachedRecipes.current);
        setSearchInputVal("");
    };
    var searchRecipes = function (val) {
        var reg = new RegExp("".concat(val), "i");
        setRecipes(cachedRecipes.current.filter(function (recp) {
            if (reg.test(recp.label)) {
                return recp;
            }
            else {
                return;
            }
        }));
    };
    var handleChange = function (e) {
        setSearch(true);
        setSearchInputVal(e.target.value);
        searchRecipes(e.target.value);
        if (e.target.value === "") {
            setHideSearchList(true);
            setSearch(false);
        }
        else {
            setHideSearchList(false);
        }
    };
    var handleIndividualRecipeClick = function (recp) {
        setHideSearchList(true);
        setSearch(true);
        setRecipes([recp]);
        //setFilteredRecipes(cachedRecipes.current)
    };
    return (<div className="flex flex-col items-center">
			<input placeholder="Search recipes" className="relative rounded-md h-[3rem] w-[20rem] py-[8px] mt-4 text-xl pl-2" type="text" value={searchInputVal} onChange={handleChange}/>
			{!hideSearchList && (<ul className="absolute z-[1000] top-[285px]">
								 {recipes.map(function (recp) { return <li className="py-2 hover:bg-slate-200 hover:cursor-pointer bg-white w-[20rem] mx-auto" onClick={function () { return handleIndividualRecipeClick(recp); }}>{recp.label}</li>; })}
			</ul>)}
			<button className="mt-6 bg-tan-500 text-black rounded-md border py-2 px-8 bg-medg border-1 border-lightg" onClick={resetRecipes}>Reset</button>
		</div>);
};
exports.default = SearchRecipes;
