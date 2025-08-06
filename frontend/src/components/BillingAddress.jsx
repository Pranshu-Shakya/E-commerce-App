import React from "react";

const BillingAddress = () => {
	return (
		<>
			<form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
					<i className="fas fa-credit-card text-blue-500"></i> Billing Address
				</h3> */}
				<div>
					<label className="block font-medium mb-1">
						First Name <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						className="w-full border border-gray-300 rounded-lg px-3 py-2"
						defaultValue="Pranshu"
					/>
				</div>
				<div>
					<label className="block font-medium mb-1">
						Last Name <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						className="w-full border border-gray-300 rounded-lg px-3 py-2"
						defaultValue="Shakya"
					/>
				</div>
				<div className="col-span-2">
					<label className="block font-medium mb-1">
						Address <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2"
						defaultValue="12 abc street"
					/>
					<input
						type="text"
						className="w-full border border-gray-300 rounded-lg px-3 py-2"
						placeholder="Apartment, suite, unit etc. (optional)"
					/>
				</div>
				<div>
					<label className="block font-medium mb-1">
						Town / City <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						className="w-full border border-gray-300 rounded-lg px-3 py-2"
						defaultValue="london"
					/>
				</div>
				<div className="col-span-2 md:col-span-1">
					<label className="block font-medium mb-1">
						Country <span className="text-red-500">*</span>
					</label>
					<select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200">
						<option>United Kingdom (UK)</option>
						<option>United States (US)</option>
						<option>India</option>
						<option>Canada</option>
					</select>
				</div>
				<div>
					<label className="block font-medium mb-1">State</label>
					<input
						type="text"
						className="w-full border border-gray-300 rounded-lg px-3 py-2"
					/>
				</div>
				<div>
					<label className="block font-medium mb-1">
						Postcode / ZIP <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						className="w-full border border-gray-300 rounded-lg px-3 py-2"
					/>
				</div>
				<div>
					<label className="block font-medium mb-1">Phone</label>
					<input
						type="text"
						className="w-full border border-gray-300 rounded-lg px-3 py-2"
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
