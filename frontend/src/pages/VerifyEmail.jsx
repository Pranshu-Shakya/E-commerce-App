import React, { useState, useRef, useEffect } from "react";

const VerifyEmail = () => {
	const [otp, setOtp] = useState(new Array(6).fill(""));
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [timer, setTimer] = useState(30);
	const [canResend, setCanResend] = useState(false);

	const inputRefs = useRef([]);

	useEffect(() => {
		// Focus first input on component mount
		inputRefs.current[0]?.focus();

		// Timer for resend button
		let interval = null;
		if (timer > 0) {
			interval = setInterval(() => {
				setTimer((prev) => prev - 1);
			}, 1000);
		} else {
			setCanResend(true);
		}

		return () => clearInterval(interval);
	}, [timer]);

	const handleChange = (element, index) => {
		if (isNaN(element.value)) return;

		setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

		// Focus next input
		if (element.value && index < 5) {
			inputRefs.current[index + 1].focus();
		}
	};

	const handleKeyDown = (e, index) => {
		// Handle backspace
		if (e.key === "Backspace" && !otp[index] && index > 0) {
			inputRefs.current[index - 1].focus();
		}
	};

	const handlePaste = (e) => {
		e.preventDefault();
		const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");

		if (pastedData.some((x) => isNaN(x))) return;

		setOtp(pastedData.concat(new Array(6 - pastedData.length).fill("")));
		inputRefs.current[Math.min(5, pastedData.length)].focus();
	};

	const handleVerify = async () => {
		setIsLoading(true);
		setError("");

		try {
			// Add your verification logic here
			const enteredOTP = otp.join("");
			if (enteredOTP.length !== 6) {
				throw new Error("Please enter complete OTP");
			}

			// Make API call to verify OTP
			// await verifyOTP(enteredOTP);
		} catch (err) {
			setError(err.message || "Verification failed. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	const handleResend = () => {
		// Add your resend logic here
		setCanResend(false);
		setTimer(30);
		// Resend API call
	};

	return (
		<div className="flex items-center justify-center py-32 px-1 sm:px-2 lg:px-4">
			<div className="max-w-md w-full space-y-4">
				<div className="text-center">
					<h2 className="mt-2 text-3xl font-extrabold text-gray-900">
						Verify Your Email
					</h2>
					<p className="mt-2 text-sm text-gray-600">
						We've sent a verification code to your email address
					</p>
				</div>

				<div className="mt-8 space-y-6">
					<div className="space-y-4">
						{/* OTP Input Fields */}
						<div className="flex gap-2 justify-center">
							{otp.map((digit, index) => (
								<input
									key={index}
									ref={(ref) => (inputRefs.current[index] = ref)}
									type="text"
									maxLength={1}
									value={digit}
									onChange={(e) => handleChange(e.target, index)}
									onKeyDown={(e) => handleKeyDown(e, index)}
									onPaste={handlePaste}
									className={`w-12 h-12 text-center text-xl font-semibold border rounded-lg 
                    ${error ? "border-red-500" : "border-gray-300"} 
                    focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500`}
								/>
							))}
						</div>

						{/* Error Message */}
						{error && <p className="text-red-500 text-sm text-center">{error}</p>}

						{/* Verify Button */}
						<button
							onClick={handleVerify}
							disabled={isLoading || otp.some((digit) => !digit)}
							className={`w-full py-3 px-4 rounded-md text-white font-medium
                ${
					isLoading || otp.some((digit) => !digit)
						? "bg-indigo-400 cursor-not-allowed"
						: "bg-indigo-600 hover:bg-indigo-700"
				}`}
						>
							{isLoading ? "Verifying..." : "Verify Email"}
						</button>

						{/* Resend OTP Section */}
						<div className="text-center text-sm">
							<p className="text-gray-600">
								{canResend ? (
									<button
										onClick={handleResend}
										className="text-indigo-600 hover:text-indigo-500 font-medium"
									>
										Resend Code
									</button>
								) : (
									<span>Resend code in {timer} seconds</span>
								)}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default VerifyEmail;
