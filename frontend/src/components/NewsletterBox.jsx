import React from "react";

const NewsletterBox = () => {
	const onSubmitHandler = (e) => {
		e.preventDefault();
		// Handle the form submission logic here
		alert("Thank you for subscribing!");
	};

	return (
		<div className="text-center my-16">
			<p className="text-2xl font-medium text-gray-800">Subscribe Now and get 20% Off</p>
			<p className="mt-3 text-gray-400">
				Join our newsletter to stay updated with the latest offers and products.
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
				<button
					type="submit"
					className="bg-black text-white text-xs hover:bg-black/85 px-10 py-4"
				>
					SUBSCRIBE
				</button>
			</form>
		</div>
	);
};

export default NewsletterBox;
