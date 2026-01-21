import React, { useEffect, useRef } from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import { assets } from "../assets/assets.js";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
	const { search, setSearch, showSearch, setShowSearch } = React.useContext(ShopContext);
	const [visible, setVisible] = React.useState(false);
	const location = useLocation();
	const inputRef = useRef(null);

	useEffect(() => {
		if (location.pathname.includes("collection")) setVisible(true);
		else setVisible(false);
	}, [location]);

	useEffect(() => {
		if (showSearch && visible && inputRef.current) {
			inputRef.current.focus();
		}
	}, [showSearch, visible]);

	return (
		<div
			className={`transition-all duration-400 ease-in-out overflow-hidden ${
				showSearch && visible ? "opacity-100 max-h-40" : "opacity-0 max-h-0"
			} border-t border-b border-gray-300 bg-gray-50 text-center`}
		>
			{showSearch && visible && (
				<>
					<div className="inline-flex justify-center items-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
						<input
							ref={inputRef}
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							type="text"
							placeholder="Search"
							className="flex-1 outline-none bg-inherit text-sm"
						/>
						<img src={assets.search_icon} className="w-4" alt="" />
					</div>
					<img
						className="inline w-3 cursor-pointer"
						onClick={() => setShowSearch(false)}
						src={assets.cross_icon}
						alt=""
					/>
				</>
			)}
		</div>
	);
};

export default SearchBar;
