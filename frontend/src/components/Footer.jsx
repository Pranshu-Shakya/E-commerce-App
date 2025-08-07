import React from "react";
import { assets } from "../assets/assets.js";
import { NavLink } from "react-router-dom";

const Footer = () => {
	return (
		<div>
			<div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-8 mt-28 text-sm">
				<div>
					<img src={assets.logo} className="mb-5 w-32" alt="" />
					<p className="w-full md:w-2/3 text-gray-600">
						Your one-stop shop for the latest trends and styles. Explore our wide range
						of products and enjoy exclusive offers. Every Product is crafted with care
						to ensure the highest quality and satisfaction.
					</p>
				</div>

				<div>
					<p className="text-xl font-medium mb-5">COMPANY</p>
					<ul className="flex flex-col gap-1 text-gray-600">
						<li>
							<NavLink
								to="/"
								className={({ isActive }) => (isActive ? "font-bold" : "")}
							>
								Home
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/about"
								className={({ isActive }) => (isActive ? "font-bold" : "")}
							>
								About us
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/delivery"
								className={({ isActive }) => (isActive ? "font-bold" : "")}
							>
								Delivery
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/privacy"
								className={({ isActive }) => (isActive ? "font-bold" : "")}
							>
								Privacy Policy
							</NavLink>
						</li>
					</ul>
				</div>

				<div>
					<p className="text-xl font-medium mb-5">GET IN TOUCH</p>
					<ul className="flex flex-col gap-1 text-gray-600">
						<li>+1-999999999</li>
						<li>contact@foreveryou.com</li>
					</ul>
				</div>
			</div>
			<div>
				<hr />
				<p className="py-5 text-sm text-center">
					Copyright 2025@ forever.com - All Rights Reserved.
				</p>
			</div>
		</div>
	);
};

export default Footer;
