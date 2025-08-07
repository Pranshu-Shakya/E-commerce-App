import React from "react";
import { assets } from "../assets/assets.js";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext.jsx";
import axios from "axios";

const Navbar = () => {
	const [visible, setVisible] = React.useState(false);
	const {
		setShowSearch,
		getCartCount,
		navigate,
		setCartItems,
		backendUrl,
		isAuthenticated,
		setIsAuthenticated,
	} = React.useContext(ShopContext);
	const [showDropdown, setShowDropdown] = React.useState(false);
	const location = useLocation();

	const logout = async () => {
		try {
			const response = await axios.post(
				`${backendUrl}/api/user/logout`,
				{},
				{ withCredentials: true }
			);
			if (response.data.success) {
				setCartItems({});
				setIsAuthenticated(false);
				setShowDropdown(false);
			}
			navigate("/login");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="flex items-center justify-between py-5 font-medium">
			<Link to="/">
				<img src={assets.logo} className="w-36" alt="" />
			</Link>

			<ul className="hidden sm:flex gap-5 text-sm text-gray-700">
				<NavLink to="/" className="flex flex-col items-center gap-1">
					<p className="">HOME</p>
					<hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
				</NavLink>
				<NavLink to="/collection" className="flex flex-col items-center gap-1">
					<p className="">COLLECTION</p>
					<hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
				</NavLink>
				<NavLink to="/about" className="flex flex-col items-center gap-1">
					<p className="">ABOUT</p>
					<hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
				</NavLink>
				<NavLink to="/contact" className="flex flex-col items-center gap-1">
					<p className="">CONTACT</p>
					<hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
				</NavLink>
			</ul>

			<div className="flex items-center gap-6">
				<img
					onClick={() => {
						if (!location.pathname.includes("collection")) {
							navigate("/collection");
							setTimeout(() => setShowSearch(true), 0);
						} else {
							setShowSearch((prev) => !prev);
						}
					}}
					src={assets.search_icon}
					className="w-5 cursor-pointer"
					alt=""
				/>

				<div
					className="relative"
					onMouseEnter={() => isAuthenticated && setShowDropdown(true)}
					onMouseLeave={() => isAuthenticated && setShowDropdown(false)}
				>
					<img
						onClick={() => {
							if (isAuthenticated) {
								setShowDropdown((prev) => !prev);
							} else {
								navigate("/login");
							}
						}}
						className="w-5 cursor-pointer"
						src={assets.profile_icon}
						alt=""
					/>
					{/* Dropdown Menu */}
					{isAuthenticated && (
						<div
							className={`absolute right-0 pt-4 transition-all duration-200 z-10 ${
								showDropdown ? "opacity-100 visible" : "opacity-0 invisible"
							}`}
							style={{ pointerEvents: showDropdown ? "auto" : "none" }}
						>
							<div className="flex flex-col gap-2 w-40 py-3 px-3 bg-slate-100 text-gray-800 rounded-xl shadow-lg border border-gray-200">
								<ul className="py-1 text-sm">
									<li>
										<NavLink
											to="/profile"
											className="block px-2 py-2 hover:text-gray-600 hover:bg-gray-200 rounded transition"
										>
											My Profile
										</NavLink>
									</li>
									<li>
										<NavLink
											to="/orders"
											className="block px-2 py-2 hover:text-gray-600 rounded hover:bg-gray-200  transition"
										>
											My Orders
										</NavLink>
									</li>
									<hr className="border-gray-700 my-2" />
									<button
										onClick={logout}
										className="flex items-center gap-2 w-full text-left px-2 py-2 text-red-400 rounded hover:bg-red-100 hover:text-red-600 transition"
									>
										Logout
										<svg
											className="w-4 h-4"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M17 16l4-4m0 0l-4-4m4 4H7"
											/>
										</svg>
									</button>
								</ul>
							</div>
						</div>
					)}
				</div>

				<Link to="/cart" className="relative">
					<img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
					<p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] ">
						{getCartCount()}
					</p>
				</Link>

				<img
					onClick={() => setVisible(true)}
					src={assets.menu_icon}
					className="w-5 cursor-pointer sm:hidden"
					alt=""
				/>
			</div>

			{/* sidebar menu for small screen */}
			<div
				className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
					visible ? "w-full" : "w-0"
				}`}
			>
				<div className="flex flex-col text-gray-600">
					<div
						onClick={() => setVisible(false)}
						className="flex items-center gap-4 p-3 cursor-pointer"
					>
						<img src={assets.dropdown_icon} className="h-4 rotate-180" alt="" />
						<p>Back</p>
					</div>
					<NavLink onClick={() => setVisible(false)} className="py-2 pl-6 border" to="/">
						HOME
					</NavLink>
					<NavLink
						onClick={() => setVisible(false)}
						className="py-2 pl-6 border"
						to="/collection"
					>
						COLLECTION
					</NavLink>
					<NavLink
						onClick={() => setVisible(false)}
						className="py-2 pl-6 border"
						to="/about"
					>
						ABOUT
					</NavLink>
					<NavLink
						onClick={() => setVisible(false)}
						className="py-2 pl-6 border"
						to="/contact"
					>
						CONTACT
					</NavLink>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
