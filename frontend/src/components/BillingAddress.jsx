import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const BillingAddress = ({ user }) => {
	const backendUrl = import.meta.env.VITE_BACKEND_URL;
	const [userData, setUserData] = useState(user);

	const handleSubmit = (e) => {
		e.preventDefault();
		try {
			const address = {
				address1: userData.address1 || user.address.address1,
				town: userData.town || user.address.town,
				state: userData.state || user.address.state,
				country: userData.country || user.address.country,
				postcode: userData.postcode || user.address.postcode,
			};
			const response = axios.post(
				`${backendUrl}/api/user/update-profile`,
				{
					name: userData.name || user.name,
					email: userData.email || user.email,
					phone: userData.phone || user.phone,
					address: address,
				},
				{
					withCredentials: true,
				},
			);
			if (response.data.success) {
				toast.success(response.data.message || "Profile updated successfully");
			} else {
				toast.error(response.data.message || "Failed to update profile");
			}
		} catch (error) {
			toast.error("An error occurred while updating the profile");
		}

		
	};

	const onChange = (e) => {
		setUserData({
			...userData,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<>
			<form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{/* <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
					<i className="fas fa-credit-card text-blue-500"></i> Billing Address
				</h3> */}
				<div className="col-span-2">
					<label className="block font-medium mb-1">
						Full Name <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						name="name"
						className="w-full border border-gray-300 rounded-lg px-3 py-2"
						defaultValue={user.name}
						onChange={onChange}
					/>
				</div>
				<div className="col-span-2">
					<label className="block font-medium mb-1">
						Address <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						name="address1"
						className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2"
						defaultValue={user.address.address1}
						onChange={onChange}
					/>
				</div>
				<div>
					<label className="block font-medium mb-1">
						Town / City <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						name="town"
						className="w-full border border-gray-300 rounded-lg px-3 py-2"
						defaultValue={user.address.town}
						onChange={onChange}
					/>
				</div>
				<div className="col-span-2 md:col-span-1">
					<label className="block font-medium mb-1">
						Country <span className="text-red-500">*</span>
					</label>
					<select
						className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
						name="country"
						onChange={onChange}
						defaultValue={user.address.country}
					>
						<option>India</option>
						<option>United Kingdom (UK)</option>
						<option>United States (US)</option>
						<option>Canada</option>
					</select>
				</div>
				<div>
					<label className="block font-medium mb-1">State</label>
					<input
						type="text"
						name="state"
						className="w-full border border-gray-300 rounded-lg px-3 py-2"
						defaultValue={user.address.state}
						onChange={onChange}
					/>
				</div>
				<div>
					<label className="block font-medium mb-1">
						Postcode / ZIP <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						name="postcode"
						className="w-full border border-gray-300 rounded-lg px-3 py-2"
						defaultValue={user.address.postcode}
						onChange={onChange}
					/>
				</div>
				<div>
					<label className="block font-medium mb-1">Phone</label>
					<input
						type="text"
						name="phone"
						className="w-full border border-gray-300 rounded-lg px-3 py-2"
						defaultValue={user.phone}
						onChange={onChange}
					/>
				</div>
				<div className="col-span-2 flex justify-end mt-4">
					<button
						type="submit"
						className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-2 rounded-lg shadow transition"
					>
						Save Address
					</button>
				</div>
			</form>
		</>
	);
};

export default BillingAddress;
