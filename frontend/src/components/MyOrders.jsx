import axios from "axios";
import React, {useState, useContext, useEffect} from "react";
import { ShopContext } from "../context/ShopContext";

const statusColors = {
	Delivered: "text-green-600 bg-green-100",
	Shipped: "text-blue-600 bg-blue-100",
	Processing: "text-yellow-700 bg-yellow-100",
	Cancelled: "text-red-600 bg-red-100",
    "Order Placed": "text-gray-600 bg-gray-100",
};

const MyOrders = () => {
    const { backendUrl, currency } = useContext(ShopContext);
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await axios.post(backendUrl + "/api/order/userorders", {}, { withCredentials: true });
            if (response.data.success) {
                setOrders(response.data.orders);
            } else {
                console.log("Failed to fetch orders");
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchOrders();
    }, []);

	return (
		<div>
			<div className="overflow-x-auto">
				<table className="min-w-full bg-white rounded-lg shadow text-sm">
					<thead>
						<tr className="bg-gray-100 text-gray-700">
							<th className="py-3 px-4 text-left">Order ID</th>
							<th className="py-3 px-4 text-left">Date</th>
							<th className="py-3 px-4 text-left">Status</th>
							<th className="py-3 px-4 text-left">Items</th>
							<th className="py-3 px-4 text-left">Total</th>
							<th className="py-3 px-4 text-left">Action</th>
						</tr>
					</thead>
					<tbody>
						{orders.length === 0 ? (
							<tr>
								<td colSpan="6" className="py-8 text-center text-gray-400">
									You have no orders yet.
								</td>
							</tr>
						) : (
							orders.map((order) => (
								<tr key={order._id} className="border-b last:border-b-0">
									<td className="py-3 px-4 font-medium">{order._id}</td>
									<td className="py-3 px-4">{new Date(order.date).toLocaleDateString()}</td>
									<td className="py-3 px-4">
										<span
											className={`px-3 py-1 rounded-full text-xs font-semibold ${
												statusColors[order.status] ||
												"bg-gray-200 text-gray-600"
											}`}
										>
											{order.status}
										</span>
									</td>
									<td className="py-3 px-4">{order.items.length}</td>
									<td className="py-3 px-4">{currency}{order.amount}</td>
									<td className="py-3 px-4">
										<button className="text-blue-600 hover:underline font-medium">
											View Details
										</button>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default MyOrders;
