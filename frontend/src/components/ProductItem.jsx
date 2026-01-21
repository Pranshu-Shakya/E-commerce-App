import React from "react";
import { ShopContext } from "../context/ShopContext.jsx";
import { Link } from "react-router-dom";

const ProductItem = ({ id, name, image, price }) => {
	const { currency } = React.useContext(ShopContext);

	// Generate random discount between 10-50%
	const discount = Math.floor(Math.random() * 41) + 10;
	const originalPrice = Math.round(price * (1 + discount / 100));

	// Generate random rating between 3.5 and 5
	const rating = (Math.random() * 1.5 + 3.5).toFixed(1);
	const reviews = Math.floor(Math.random() * 500) + 50;

	return (
		<Link to={`/product/${id}`} className="group block h-full">
			<div className="relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
				{/* Discount Badge */}
				<div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-md">
					{discount}% OFF
				</div>

				{/* Product Image */}
				<div className="overflow-hidden aspect-square bg-gray-100">
					<img
						className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
						src={image[0]}
						alt={name}
					/>
				</div>

				{/* Product Info */}
				<div className="p-4 flex-1 flex flex-col">
					{/* Product Name */}
					<h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 h-10 group-hover:text-black transition-colors">
						{name}
					</h3>

					{/* Rating and Reviews */}
					<div className="flex items-center gap-2 mb-3">
						<div className="flex items-center gap-1">
							{/* Stars */}
							{[...Array(5)].map((_, index) => (
								<svg
									key={index}
									className={`w-3.5 h-3.5 ${
										index < Math.floor(rating)
											? "text-yellow-400 fill-yellow-400"
											: "text-gray-300 fill-gray-300"
									}`}
									viewBox="0 0 20 20"
								>
									<path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
								</svg>
							))}
						</div>
						<span className="text-xs text-gray-500">({reviews})</span>
					</div>

					{/* Price Section */}
					<div className="flex items-center gap-2 mt-auto">
						<span className="text-lg font-bold text-black">
							{currency}
							{price}
						</span>
						<span className="text-sm text-gray-400 line-through">
							{currency}
							{originalPrice}
						</span>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default ProductItem;
