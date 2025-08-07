import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets.js";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
	return (
		<div>
			<div className="text-2xl text-center pt-8 border-t">
				<Title text1={"ABOUT"} text2={"US"} />
			</div>

			<div className="my-10 flex flex-col md:flex-row gap-16">
				<img className="w-full md:max-w-[450px] " src={assets.about_img} alt="" />
				<div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
					<p>
						We are a leading e-commerce platform dedicated to providing the best online
						shopping experience. Customer satisfaction is our top priority.
					</p>
					<p>
						Our platform offers a wide range of products, competitive pricing, and a
						user-friendly interface to ensure customer satisfaction. The quality of our
						products is unmatched, and we take pride in offering only the best to our
						customers.
					</p>
					<b className="text-gray-800">Our Mission</b>
					<p>
						To empower consumers by providing a seamless online shopping experience
						while offering the best products at unbeatable prices.
					</p>
				</div>
			</div>

			<div className="text-4xl py-4">
				<Title text1={"WHY"} text2={"CHOOSE US"} />
			</div>

			<div className="flex flex-col md:flex-row text-sm mb-20 gap-6">
				<div className="flex-1 bg-white rounded-2xl shadow-lg px-8 md:px-10 py-10 sm:py-16 flex flex-col items-center gap-4 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
					<div className="w-12">
						<img src={assets.qualityPremium_icon} alt="" />
					</div>
					<b className="text-lg text-gray-800">Quality Assurance</b>
					<p className="text-gray-600 text-center">
						We ensure the highest quality standards for all our products.
					</p>
				</div>
				<div className="flex-1 bg-white rounded-2xl shadow-lg px-8 md:px-10 py-10 sm:py-16 flex flex-col items-center gap-4 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
					<div className="w-12">
						<img src={assets.convenience} alt="" />
					</div>
					<b className="text-lg text-gray-800">Convenience</b>
					<p className="text-gray-600 text-center">
						We provide a seamless shopping experience with easy navigation and quick
						checkout.
					</p>
				</div>
				<div className="flex-1 bg-white rounded-2xl shadow-lg px-8 md:px-10 py-10 sm:py-16 flex flex-col items-center gap-4 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
					<div className="w-12">
						<img src={assets.support_img} alt="" />
					</div>
					<b className="text-lg text-gray-800 text-center">
						Exceptional Customer Service
					</b>
					<p className="text-gray-600 text-center">
						Our customer service team is always ready to assist you with any inquiries
						or issues you may have.
					</p>
				</div>
			</div>

			<NewsletterBox />
		</div>
	);
};

export default About;
