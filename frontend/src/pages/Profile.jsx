import React, { useState, useEffect, useContext } from "react";
import { assets } from "../assets/assets.js";
import axios from "axios";
import { toast } from "react-toastify";
import {ShopContext} from "../context/ShopContext.jsx";
import BillingAddress from "../components/BillingAddress.jsx";
import ChangePassword from "../components/ChangePassword.jsx";
import MyOrders from "../components/MyOrders.jsx";
import DeleteAccount from "../components/DeleteAccount.jsx";
import Account from "../components/Account.jsx";
import Privacy from "../components/Privacy.jsx";

const navItems = [
	{ icon: "fa-user", label: "Account", component: <Account /> },
	{ icon: "fa-asterisk", label: "Change Password", component: <ChangePassword /> },
	{ icon: "fa-credit-card", label: "Billing Address", component: <BillingAddress /> },
	{ icon: "fa-truck", label: "Shipping Address", component: <BillingAddress /> },
	{ icon: "fa-shopping-cart", label: "My Orders", component: <MyOrders /> },
	{ icon: "fa-lock", label: "Privacy", component: <Privacy /> },
	{ icon: "fa-trash", label: "Delete Account", component: <DeleteAccount /> },
];

function Profile() {
    const { backendUrl } = useContext(ShopContext);
	const [activeTab, setActiveTab] = useState("account");
	const [user, setUser] = useState({});

    const fetchProfile = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/user/current`, {
                withCredentials: true,
            });
            if (response.data.success) {
                setUser(response.data.user);
            } else {
                toast.error(response.data.message || "Failed to fetch profile");
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch profile");
        }
    }

    useEffect(() => {
        fetchProfile();
    }, [activeTab]);

	const activeItem = navItems.find(
		(item) => item.label.toLowerCase().replace(" ", "-") === activeTab
	);

	return (
		<div className="flex flex-col md:flex-row max-w-6xl mx-auto mt-10 gap-8 px-2 md:px-0">
			{/* Sidebar */}
			<aside className="h-[100%] w-full md:w-1/3 lg:w-1/4 bg-white rounded-2xl shadow p-6 flex flex-col items-center mb-6 md:mb-0">
				<div
					className={`flex flex-col items-center mb-6 transition-all duration-400 ease-in-out transform ${
						activeTab === "account"
							? "opacity-0 scale-95 pointer-events-none h-0 overflow-hidden"
							: "opacity-100 scale-100"
					}`}
				>
					<img
						src={user.profilePicture || assets.defaultAvatar}
						alt="Profile"
						className="w-28 h-28 rounded-full object-cover border-4 border-gray-200 shadow mb-4"
					/>
					<h2 className="text-xl font-semibold mb-1">{user.name}</h2>
					<p className="text-gray-500 mb-6 text-sm">{user.email}</p>
				</div>
				<nav className="w-full">
					<ul className="space-y-2">
						{navItems.map((item, idx) => (
							<li key={item.label}>
								<button
									onClick={() =>
										setActiveTab(item.label.toLowerCase().replace(" ", "-"))
									}
									className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-base font-medium transition border border-transparent hover:bg-gray-100 focus:outline-none ${
										activeTab === item.label.toLowerCase().replace(" ", "-")
											? "bg-gray-100 border-blue-500 text-blue-700"
											: "text-gray-700"
									}`}
								>
									<span>
										<i
											className={`fas ${item.icon} text-lg ${
												activeTab ===
												item.label.toLowerCase().replace(" ", "-")
													? "text-blue-500"
													: "text-gray-400"
											}`}
										></i>
									</span>
									{item.label}
									<span className="ml-auto">
										<i className="fas fa-chevron-right text-xs text-gray-400"></i>
									</span>
								</button>
							</li>
						))}
					</ul>
				</nav>
			</aside>

			{/* Main Content */}
			<main className="flex-1 bg-white rounded-2xl shadow p-8">
				<h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
					{activeItem?.icon && (
						<i className={`fas ${activeItem.icon} text-blue-500`}></i>
					)}
					{activeItem?.label || "Profile"}
				</h3>
				{activeItem?.component || (
					<div className="text-center text-gray-500">
						<p>Select a section from the sidebar to view details.</p>
					</div>
				)}
			</main>
		</div>
	);
}

export default Profile;
