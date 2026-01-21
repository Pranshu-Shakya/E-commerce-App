import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
	const navigate = useNavigate();

	return (
		<div className="flex flex-col items-center justify-center px-4 py-12">
			<div className="max-w-3xl w-full text-center">
				{/* Subtitle */}
				<p className="text-sm md:text-base font-light text-gray-600 tracking-widest uppercase mb-6">
					Discover Something New
				</p>

				{/* Main heading */}
				<h1 className="prata-regular text-5xl sm:text-6xl lg:text-7xl font-light text-black mb-6 leading-tight">
					Curated Collections
				</h1>

				{/* Subheading */}
				<p className="text-lg md:text-xl text-gray-500 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
					Explore our handpicked selection of premium fashion and lifestyle products designed for the modern individual.
				</p>

				{/* CTA Buttons */}
				<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
					<button
						onClick={() => navigate("/collection")}
						className="px-8 py-3 bg-black text-white font-medium text-sm tracking-wide hover:bg-gray-800 transition-colors duration-300"
					>
						SHOP NOW
					</button>
					<button
						onClick={() => navigate("/collection")}
						className="px-8 py-3 border border-black text-black font-medium text-sm tracking-wide hover:bg-black hover:text-white transition-all duration-300"
					>
						EXPLORE COLLECTION
					</button>
				</div>
			</div>
		</div>
	);
};

export default Hero;
