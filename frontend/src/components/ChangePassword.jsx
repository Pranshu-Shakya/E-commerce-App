import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const ChangePassword = () => {
	const { backendUrl } = useContext(ShopContext);
	const [form, setForm] = useState({
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	});
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
		setError("");
		setSuccess("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
			setError("All fields are required.");
			return;
		}
		if (form.newPassword.length < 5) {
			setError("New password must be at least 5 characters long.");
			return;
		}
		if (form.newPassword !== form.confirmPassword) {
			setError("New passwords do not match.");
			return;
		}
		try {
			const response = await axios.post(`${backendUrl}/api/user/change-password`, form, {
				withCredentials: true,
			});
			if (response.data.success) {
				toast.success("Password changed successfully!");
				setSuccess("Password changed successfully!");
				setError("");
				setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
			} else {
				toast.error(response.data.message || "Failed to change password.");
			}
		} catch (error) {
			console.log(error);
            setError(error.response?.data?.message || "Something went wrong");
		}
	};

	return (
		<>
			{/* <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
				<i className="fas fa-lock text-blue-500"></i> Change Password
			</h3> */}
			<div className="max-w-md mx-auto bg-white mt-8">
				{/* <h2 className="text-2xl font-semibold mb-6 text-center">Change Password</h2> */}
				<form onSubmit={handleSubmit} className="space-y-5">
					<div>
						<label className="block font-medium mb-1">Current Password</label>
						<input
							type="password"
							name="currentPassword"
							value={form.currentPassword}
							onChange={handleChange}
							className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
							required
						/>
					</div>
					<div>
						<label className="block font-medium mb-1">New Password</label>
						<input
							type="password"
							name="newPassword"
							value={form.newPassword}
							onChange={handleChange}
							className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
							required
						/>
					</div>
					<div>
						<label className="block font-medium mb-1">Confirm New Password</label>
						<input
							type="password"
							name="confirmPassword"
							value={form.confirmPassword}
							onChange={handleChange}
							className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
							required
						/>
					</div>
					{error && <div className="text-red-500 text-sm">{error}</div>}
					{success && <div className="text-green-600 text-sm">{success}</div>}
					<button
						type="submit"
						className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-2 rounded-lg shadow transition"
					>
						Change Password
					</button>
				</form>
			</div>
		</>
	);
};

export default ChangePassword;
