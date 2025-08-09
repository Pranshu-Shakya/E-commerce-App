import React, { useState, useRef, useContext, use, useEffect } from "react";
import { assets } from "../assets/assets.js";
import axios from "axios";
import { ShopContext } from "../context/ShopContext.jsx";
import { toast } from "react-toastify";

const Account = () => {
	const { backendUrl } = useContext(ShopContext);
	const [user, setUser] = useState({});
	const [editMode, setEditMode] = useState(false);
	const [form, setForm] = useState({});
	const [avatarPreview, setAvatarPreview] = useState(user.profilePicture);
	const fileInputRef = useRef();

	const fetchUserData = async () => {
		try {
			const response = await axios.get(`${backendUrl}/api/user/current`, {
				withCredentials: true,
			});
			if (response.data.success) {
				setUser(response.data.user);
				setForm(response.data.user);
				setAvatarPreview(response.data.user.profilePicture || assets.profile);
			} else {
				toast.error(response.data.message || "Failed to fetch user data");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleAvatarChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setAvatarPreview(reader.result);
				setForm((prev) => ({ ...prev, profilePicture: reader.result }));
			};
			reader.readAsDataURL(file);
		}
	};

	const handleEdit = () => {
		setEditMode(true);
	};

	const handleCancel = () => {
		setEditMode(false);
		setForm(user);
		setAvatarPreview(user.profilePicture || assets.profile);
		if (fileInputRef.current) fileInputRef.current.value = "";
	};

	const handleSave = async (e) => {
		e.preventDefault();
		setUser(form);
        try {
            const response = await axios.post(`${backendUrl}/api/user/update-profile`, form, {
                withCredentials: true,
            });
            if (response.data.success) {
                toast.success("Profile updated successfully");
            } else {
                toast.error(response.data.message || "Failed to update profile");
            }
        } catch (error) {
            console.log(error)
        }
		setEditMode(false);
	};

	useEffect(() => {
		fetchUserData();
	}, []);

	return (
		<div className="max-w-lg mx-auto bg-white flex flex-col items-center">
			<div className="relative mb-4">
				<img
					src={avatarPreview}
					alt="Profile"
					className="w-28 h-28 rounded-full object-cover border-4 border-gray-200 shadow"
				/>
				{editMode && (
					<button
						type="button"
						onClick={() => fileInputRef.current && fileInputRef.current.click()}
						className="absolute right-2 bottom-2 bg-white rounded-full shadow hover:bg-gray-100 transition"
						title="Change profile picture"
					>
						<img className="w-12" src={assets.add} alt="Change profile" />
					</button>
				)}
				<input
					type="file"
					accept="image/*"
					ref={fileInputRef}
					className="hidden"
					onChange={handleAvatarChange}
				/>
			</div>
			{editMode ? (
				<form className="w-full space-y-4" onSubmit={handleSave}>
					<div>
						<label className="block font-semibold mb-1">Name</label>
						<input
							type="text"
							name="name"
							value={form.name}
							onChange={handleChange}
							className="w-full border border-gray-300 rounded-lg px-3 py-2"
							required
						/>
					</div>
					<div>
						<label className="block font-semibold mb-1">Email</label>
						<input
							type="email"
							name="email"
							value={form.email}
							onChange={handleChange}
							className="w-full border border-gray-300 rounded-lg px-3 py-2"
							required
						/>
					</div>
					<div>
						<label className="block font-semibold mb-1">Phone</label>
						<input
							type="text"
							name="phone"
							value={form.phone}
							onChange={handleChange}
							className="w-full border border-gray-300 rounded-lg px-3 py-2"
						/>
					</div>
					<div>
						<label className="block font-semibold mb-1">Address</label>
						<input
							type="text"
							name="address"
							value={form.address.colony}
							onChange={handleChange}
							className="w-full border border-gray-300 rounded-lg px-3 py-2"
						/>
					</div>
					<div>
						<label className="block font-semibold mb-1">Country</label>
						<input
							type="text"
							name="country"
							value={form.address.country}
							onChange={handleChange}
							className="w-full border border-gray-300 rounded-lg px-3 py-2"
						/>
					</div>
					<div>
						<label className="block font-semibold mb-1">State</label>
						<input
							type="text"
							name="state"
							value={form.address.state}
							onChange={handleChange}
							className="w-full border border-gray-300 rounded-lg px-3 py-2"
						/>
					</div>
					<div>
						<label className="block font-semibold mb-1">Address</label>
						<input
							type="text"
							name="address"
							value={form.address.colony}
							onChange={handleChange}
							className="w-full border border-gray-300 rounded-lg px-3 py-2"
						/>
					</div>
					{/* <div>
						<label className="block font-semibold mb-1">Member Since</label>
						<input
							type="text"
							name="joined"
							value={form.joined}
							onChange={handleChange}
							className="w-full border border-gray-300 rounded-lg px-3 py-2"
							disabled
						/>
					</div> */}
					<div className="flex gap-3 justify-end pt-2">
						<button
							type="button"
							onClick={handleCancel}
							className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
						>
							Save
						</button>
					</div>
				</form>
			) : (
				<div className="w-full px-12 flex flex-col items-center">
					<div className="text-center mb-6">
						<h2 className="text-2xl font-semibold mb-1">{user.name}</h2>
						<p className="text-gray-500 mb-6">{user.email}</p>
					</div>
					<div className="w-full space-y-4">
						<div className="flex items-center gap-2">
							<span className="font-semibold w-32">Phone:</span>
							<span className="text-gray-700">{user.phone}</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="font-semibold w-32">Country:</span>
							<span className="text-gray-700">{user.address?.country}</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="font-semibold w-32">Address:</span>
							<span className="text-gray-700">{user.address?.colony}</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="font-semibold w-32">Member Since:</span>
							{/* <span className="text-gray-700">{user.joined}</span> */}
						</div>
					</div>
					<button
						className="mt-6 px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
						onClick={handleEdit}
					>
						Edit Profile
					</button>
				</div>
			)}
		</div>
	);
};

export default Account;
