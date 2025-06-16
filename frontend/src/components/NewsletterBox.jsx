import React from "react";

const NewsletterBox = () => {
	const onSubmitHandler = (e) => {
		e.preventDefault();
		// Handle the form submission logic here
		alert("Thank you for subscribing!");
	};

	return (
		<div className="text-center">
			<p className="text-2xl font-medium text-gray-800">Subscribe Now and get 20% Off</p>
			<p className="mt-3 text-gray-400">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, nihil?
			</p>
			<form
				onSubmit={onSubmitHandler}
				className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3"
			>
				<input
					className="w-full sm:flex-1 outline-none"
					type="email"
					placeholder="Enter your email"
					required
				/>
				<button type="submit" className="bg-black text-white text-xs px-10 py-4">
					SUBSCRIBE
				</button>
			</form>
		</div>
	);
};

export default NewsletterBox;
