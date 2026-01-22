import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext.jsx";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts.jsx";

const Product = () => {
	const { productId } = useParams();
	const { products, currency, addToCart } = React.useContext(ShopContext);
	const [productData, setProductData] = React.useState(false);
	const [image, setImage] = React.useState("");
	const [size, setSize] = React.useState("");

	// Generate random offer (discount percentage)
	const [offer, setOffer] = React.useState(0);
	const [originalPrice, setOriginalPrice] = React.useState(0);

	const fetchProductData = () => {
		products.map((item) => {
			if (item._id === productId) {
				setProductData(item);
				setImage(item.image[0]);

				// Calculate original price based on offer
				const calculatedOriginalPrice = Math.round(item.price * (1 + item.offer / 100));
				setOriginalPrice(calculatedOriginalPrice);

				return null;
			}
		});
	};

	useEffect(() => {
		fetchProductData();
	}, [productId, products]);

	return productData ? (
		<div className="pt-8 transition-opacity ease-in duration-500 opacity-100">
			{/* -----------------Product Data----------------- */}
			<div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
				{/*------------------Product Images------------------ */}
				<div className="flex-1 flex gap-3 ">
					<div className="flex flex-col overflow-x-auto overflow-y-scroll justify-normal w-[18.7%]">
						{productData.image.map((item, index) => (
							<img
								onClick={() => setImage(item)}
								src={item}
								key={index}
								className="w-24% sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
								alt=""
							/>
						))}
					</div>
					<div className="w-full sm:w-[80%]">
						<img className="w-full h-auto" src={image} alt="" />
					</div>
				</div>
				{/* ------------------Product Info--------------------- */}
				<div className="flex-1">
					<h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
					<div className="flex items-center mt-2 gap-1">
                        <div className="flex items-center gap-1">
							{/* Stars */}
							{[...Array(5)].map((_, index) => (
								<svg
									key={index}
									className={`w-3.5 h-3.5 ${
										index < Math.round(productData.rating)
											? "text-yellow-400 fill-yellow-400"
											: "text-gray-300 fill-gray-300"
									}`}
									viewBox="0 0 20 20"
								>
									<path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
								</svg>
							))}
						</div>
						<p className="pl-2">({productData.reviews})</p>
					</div>

					{/* Price Section with Offer and Cut Price */}
					<div className="mt-5 flex items-center gap-4">
						<div className="flex items-baseline gap-3">
							<p className="text-3xl font-bold text-black">
								{currency}
								{productData.price}
							</p>
							<p className="text-lg text-gray-400 line-through">
								{currency}
								{originalPrice}
							</p>
						</div>
						<div className="bg-red-500 text-white px-3 py-1 rounded-md text-sm font-semibold">
							{productData.offer}% OFF
						</div>
					</div>

					<p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
					<div className="flex flex-col gap-4 my-8">
						<p>Select Size</p>
						<div className="flex gap-2">
							{productData.sizes.map((item, index) => (
								<button
									onClick={() => setSize(item)}
									className={`border py-2 px-4 bg-gray-100 ${
										item === size ? "border-orange-500" : ""
									}`}
									key={index}
								>
									{item}
								</button>
							))}
						</div>
					</div>
					<button
						onClick={() => addToCart(productData._id, size)}
						className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 cursor-pointer"
					>
						ADD TO CART
					</button>
					<hr className="mt-8 sm:w-4/5" />
					<div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
						<p>100% Original Product</p>
						<p>Cash on delivery is available on this product.</p>
						<p>Easy exchange and return policy within 7 days.</p>
					</div>
				</div>
			</div>
			{/* --------------------------Description and Review Section -------------------- */}
			<div className="mt-20">
				<div className="flex">
					<b className="border px-5 py-3 text-sm">Description</b>
					<p className="border px-5 py-3 text-sm">Reviews (122)</p>
				</div>
				<div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro impedit
						culpa nihil officia, quam atque quasi distinctio inventore! Maiores quo ea
						necessitatibus ipsam, et totam doloremque facere iusto explicabo! Totam
						quis repellat hic alias ipsum numquam omnis reprehenderit nemo ex! Lorem
						ipsum dolor sit amet consectetur adipisicing elit. Nostrum reiciendis,
						minima dignissimos aliquam vitae error!
					</p>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi, hic!
						Eius inventore corporis doloremque earum assumenda quo, eveniet odit
						praesentium. Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Dolore molestiae modi necessitatibus obcaecati eaque quo?
					</p>
				</div>
			</div>

			{/* -------------------------------Related Products--------------------------- */}
			<RelatedProducts
				category={productData.category}
				subCategory={productData.subCategory}
			/>
		</div>
	) : (
		<div className="opacity-0"></div>
	);
};

export default Product;
