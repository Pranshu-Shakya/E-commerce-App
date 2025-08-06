import React, { useState } from "react";

const DeleteAccount = () => {
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [confirming, setConfirming] = useState(false);

	const handleDelete = (e) => {
		e.preventDefault();
		setError("");
		setSuccess("");
		if (!password) {
			setError("Please enter your password to confirm.");
			return;
		}
		// Simulate deletion
		setSuccess("Your account has been deleted. We're sorry to see you go.");
		setPassword("");
	};

	return (
		<div className="max-w-lg mx-auto bg-white rounded-2xl shadow p-8 mt-8">
			<p className="mb-6 text-gray-700">
				Deleting your account is{" "}
				<span className="font-semibold text-red-600">permanent</span> and cannot be undone.
				All your data, orders, and saved information will be lost. Please confirm your
				password to proceed.
			</p>
			<form onSubmit={handleDelete} className="space-y-5">
				<div>
					<label className="block font-medium mb-1">Password</label>
					<input
						type="password"
						className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-200"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="Enter your password"
						required
					/>
				</div>
				{error && <div className="text-red-500 text-sm">{error}</div>}
				{success && <div className="text-green-600 text-sm">{success}</div>}
				<button
					type="submit"
					className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-2 rounded-lg shadow transition"
				>
					Delete My Account
				</button>
			</form>
		</div>
	);
};

export default DeleteAccount;
