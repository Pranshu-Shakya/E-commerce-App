import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Verify = () => {
	const { navigate, setCartItems, backendUrl } = useContext(ShopContext);
	const [searchParams, setSearchParams] = useSearchParams();

	const success = searchParams.get("success");
	const orderId = searchParams.get("orderId");

	const verifyPayment = async () => {
		try {
			const response = await axios.post(
				backendUrl + "/api/order/verifyStripe",
				{ success, orderId },
				{ withCredentials: true }
			);

			if (response.data.success) {
				setCartItems({});
				navigate("/orders");
			} else {
				navigate("/cart");
			}
		} catch (error) {
			console.log(error);
			toast.error(error.message || "Something went wrong");
			// navigate("/cart");
		}
	};

	useEffect(() => {
		verifyPayment();
	}, []);

	return <div>Verify</div>;
};

export default Verify;
