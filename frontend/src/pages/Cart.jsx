import React, { useEffect, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import Button from "../components/Button";

const Cart = () => {
	const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);

	const [cartData, setCartData] = React.useState([]);

	useEffect(() => {
		if (products.length > 0) {
			const tempData = [];

			for (const items in cartItems) {
				for (const item in cartItems[items]) {
					if (cartItems[items][item] > 0) {
						tempData.push({
							_id: items,
							size: item,
							quantity: cartItems[items][item],
						});
					}
				}
			}
			setCartData(tempData);
		}
	}, [cartItems, products]);

	return (
		<div className="pt-8 pb-16">
			<div className="mb-12 text-2xl">
				<Title text1={"YOUR"} text2={"CART"} />
			</div>

			{cartData.length === 0 ? (
				<div className="text-center py-20 flex flex-col items-center">
					<img className="w-24 mb-6 opacity-80" src={assets.shopping_cart} alt="" />
					<p className="text-2xl font-light text-gray-800 mb-2">Cart is empty</p>
					<p className="text-gray-500 mb-8 max-w-sm">
						Looks like you haven't added anything to your cart yet. Start exploring.
					</p>
					<Button text="Continue Shopping" link="/collection" />
				</div>
			) : (
				<>
					<div className="space-y-4 mb-12">
						{cartData.map((item, index) => {
							const productData = products.find(
								(product) => product._id === item._id
							);

							return (
								<div
									key={index}
									className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100"
								>
									<div className="p-6 flex flex-col md:flex-row md:items-center gap-6">
										{/* Product Image */}
										<div className="md:w-24 w-full">
											<img
												className="w-full aspect-square object-cover rounded-md"
												src={productData.image[0]}
												alt={productData.name}
											/>
										</div>

										{/* Product Details */}
										<div className="flex-1 min-w-0">
											<p className="text-lg font-medium text-gray-800 mb-3">
												{productData.name}
											</p>
											<div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
												<div>
													<p className="text-gray-500 text-xs uppercase tracking-wide mb-1">Price</p>
													<p className="font-semibold text-gray-800">
														{currency}
														{productData.price}
													</p>
												</div>
												<div>
													<p className="text-gray-500 text-xs uppercase tracking-wide mb-1">Size</p>
													<p className="font-semibold text-gray-800 bg-gray-100 px-2 py-1 rounded w-fit">
														{item.size}
													</p>
												</div>
												<div>
													<p className="text-gray-500 text-xs uppercase tracking-wide mb-1">Quantity</p>
													<div className="flex items-center border border-gray-300 rounded-md w-fit">
														<button
															onClick={() => updateQuantity(item._id, item.size, Math.max(1, item.quantity - 1))}
															className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
														>
															−
														</button>
														<span className="px-4 py-1 font-medium text-gray-800 border-l border-r border-gray-300 min-w-12 text-center">
															{item.quantity}
														</span>
														<button
															onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
															className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
														>
															+
														</button>
													</div>
												</div>
											</div>
										</div>

										{/* Total Price and Delete */}
										<div className="flex flex-col items-start md:items-end gap-4 md:w-40">
											<div className="text-right">
												<p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Subtotal</p>
												<p className="text-xl font-bold text-black">
													{currency}
													{(productData.price * item.quantity).toFixed(2)}
												</p>
											</div>
											<button
												onClick={() => updateQuantity(item._id, item.size, 0)}
												className="w-full md:w-auto px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-md hover:bg-red-50 transition-colors duration-300 flex items-center justify-center gap-2"
											>
												<img
													className="w-4"
													src={assets.bin_icon}
													alt=""
												/>
												Remove
											</button>
										</div>
									</div>
								</div>
							);
						})}
					</div>

					{/* Cart Summary */}
					<div className="flex justify-end">
						<div className="w-full md:w-[450px]">
							<div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
								<CartTotal />
								<button
									onClick={() => navigate("/place-order")}
									className="w-full mt-6 px-8 py-3 bg-black text-white font-medium text-sm rounded-md hover:bg-gray-800 transition-colors duration-300"
								>
									PROCEED TO CHECKOUT
								</button>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Cart;
