import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { assets } from "../assets/assets";
import Button from "../components/Button";

const Orders = () => {
	const { backendUrl, currency } = useContext(ShopContext);
	const [orderData, setOrderData] = React.useState([]);

	const loadOrderData = async () => {
		try {
			const response = await axios.post(
				backendUrl + "/api/order/userorders",
				{},
				{ withCredentials: true },
			);
			console.log(response.data);
			if (response.data.success) {
				let allOrderItems = [];
				response.data.orders.map((order) => {
					order.items.map((item) => {
						item["status"] = order.status;
						item["payment"] = order.payment;
						item["paymentMethod"] = order.paymentMethod;
						item["date"] = order.date;
						allOrderItems.push(item);
					});
				});
				setOrderData(allOrderItems.reverse());
			}
		} catch (error) {
			console.error("Error loading order data:", error);
			setOrderData([]);
		}
	};

	useEffect(() => {
		loadOrderData();
	}, []);

	return (
		<div className="pt-8 pb-8">
			<div className="mb-8 text-2xl">
				<Title text1={"MY"} text2={"ORDERS"} />
			</div>
			<div>
				{orderData.length === 0 ? (
					<div className="text-center py-20 flex flex-col items-center">
						<img className="w-24 mb-6 opacity-80" src={assets.shopping_cart} alt="" />
						<p className="text-2xl font-light text-gray-800 mb-2">No orders yet</p>
						<p className="text-gray-500 mb-8 max-w-sm">
							Looks like you haven't placed any orders yet. Start exploring our
							collection.
						</p>
						<Button text="Continue Shopping" link="/collection" />
					</div>
				) : (
					<div className="space-y-4">
						{orderData.map((item, index) => (
							<div
								key={index}
								className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100"
							>
								<div className="p-6 flex flex-col md:flex-row md:items-center gap-6">
									{/* Product Image */}
									<div className="md:w-24 w-full">
										<img
											className="w-full aspect-square object-cover rounded-md"
											src={item.image[0]}
											alt={item.name}
										/>
									</div>

									{/* Product Details */}
									<div className="flex-1 min-w-0">
										<p className="text-lg font-medium text-gray-800 mb-3">
											{item.name}
										</p>
										<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
											<div>
												<p className="text-gray-500 text-xs uppercase tracking-wide mb-1">
													Price
												</p>
												<p className="font-semibold text-gray-800">
													{currency}
													{item.price}
												</p>
											</div>
											<div>
												<p className="text-gray-500 text-xs uppercase tracking-wide mb-1">
													Quantity
												</p>
												<p className="font-semibold text-gray-800">
													{item.quantity}
												</p>
											</div>
											<div>
												<p className="text-gray-500 text-xs uppercase tracking-wide mb-1">
													Size
												</p>
												<p className="font-semibold text-gray-800">
													{item.size}
												</p>
											</div>
											<div>
												<p className="text-gray-500 text-xs uppercase tracking-wide mb-1">
													Date
												</p>
												<p className="font-semibold text-gray-800">
													{new Date(item.date).toLocaleDateString(
														"en-US",
														{
															month: "short",
															day: "numeric",
															year: "numeric",
														},
													)}
												</p>
											</div>
										</div>

										{/* Payment Method */}
										<div className="mt-3 pt-3 border-t border-gray-100">
											<p className="text-xs text-gray-500 uppercase tracking-wide">
												Payment:{" "}
												<span className="text-gray-700 font-medium">
													{item.paymentMethod}
												</span>
											</p>
										</div>
									</div>

									{/* Status and Action */}
									<div className="flex flex-col items-start md:items-end gap-4 md:w-48">
										{/* Status Badge */}
										<div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full border border-green-200">
											<p className="w-2 h-2 rounded-full bg-green-500"></p>
											<p className="text-sm font-medium text-green-700">
												{item.status}
											</p>
										</div>

										{/* Track Order Button */}
										<button
											onClick={loadOrderData}
											className="w-full md:w-auto px-4 py-2 text-sm font-medium text-black border border-black rounded-md hover:bg-black hover:text-white transition-colors duration-300"
										>
											Track Order
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default Orders;
