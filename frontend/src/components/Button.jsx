import React from "react";
import { Link } from "react-router-dom";

const Button = ({ text, link }) => {
  return (
	<div className="flex justify-center my-16">
	  <Link
		to={link}
		className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-black to-gray-600 text-white text-lg font-bold rounded-full shadow-lg transition-transform transform hover:scale-105 hover:from-gray-900 hover:to-gray-700 focus:outline-none"
	  >
		<span className="mr-3">{text}</span>
		<svg
		  className="w-6 h-6 transition-transform group-hover:translate-x-1"
		  fill="none"
		  stroke="currentColor"
		  strokeWidth="2"
		  viewBox="0 0 24 24"
		>
		  <path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M17 8l4 4m0 0l-4 4m4-4H3"
		  />
		</svg>
	  </Link>
	</div>
  );
};

export default Button;
