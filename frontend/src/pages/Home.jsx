import React from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import NewsletterBox from "../components/NewsletterBox";
import Button from "../components/Button";

const Home = () => {
	return (
		<div>
			<Hero />
			<LatestCollection />
			<BestSeller />
			<Button text="All Collections" link="/collection" />
			<OurPolicy />
			<NewsletterBox />
		</div>
	);
};

export default Home;
