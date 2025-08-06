import React, { useState } from "react";

const ChangePassword = () => {
	const [form, setForm] = useState({
		current: "",
		new: "",
		confirm: "",
	});
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
		setError("");
		setSuccess("");
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!form.current || !form.new || !form.confirm) {
			setError("All fields are required.");
			return;
		}
		if (form.new !== form.confirm) {
			setError("New passwords do not match.");
			return;
		}
		// Simulate success
		setSuccess("Password changed successfully!");
		setForm({ current: "", new: "", confirm: "" });
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
							name="current"
							value={form.current}
							onChange={handleChange}
							className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
							required
						/>
					</div>
					<div>
						<label className="block font-medium mb-1">New Password</label>
						<input
							type="password"
							name="new"
							value={form.new}
							onChange={handleChange}
							className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
							required
						/>
					</div>
					<div>
						<label className="block font-medium mb-1">Confirm New Password</label>
						<input
							type="password"
							name="confirm"
							value={form.confirm}
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
