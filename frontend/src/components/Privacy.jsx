import React, { useState } from "react";

const Privacy = () => {
  const [settings, setSettings] = useState({
    marketingEmails: true,
    dataSharing: false,
    personalizedAds: false,
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-lg mx-auto bg-white pt-12">
      <p className="mb-6 text-gray-700 text-sm">
        Manage your privacy preferences. You can control how your data is used and how we communicate with you. For more details, please review our <a href="#" className="text-blue-600 underline">Privacy Policy</a>.
      </p>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-medium">Receive marketing emails</span>
            <p className="text-gray-500 text-xs">Get updates on offers, new products, and more.</p>
          </div>
          <button
            onClick={() => handleToggle("marketingEmails")}
            className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${settings.marketingEmails ? "bg-blue-600" : "bg-gray-300"}`}
            aria-pressed={settings.marketingEmails}
          >
            <span
              className={`bg-white w-4 h-4 rounded-full shadow transform duration-300 ${settings.marketingEmails ? "translate-x-6" : ""}`}
            ></span>
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="font-medium">Allow data sharing</span>
            <p className="text-gray-500 text-xs">Permit sharing of your data with trusted partners for better service.</p>
          </div>
          <button
            onClick={() => handleToggle("dataSharing")}
            className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${settings.dataSharing ? "bg-blue-600" : "bg-gray-300"}`}
            aria-pressed={settings.dataSharing}
          >
            <span
              className={`bg-white w-4 h-4 rounded-full shadow transform duration-300 ${settings.dataSharing ? "translate-x-6" : ""}`}
            ></span>
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="font-medium">Personalized ads</span>
            <p className="text-gray-500 text-xs">Show ads based on your interests and activity.</p>
          </div>
          <button
            onClick={() => handleToggle("personalizedAds")}
            className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${settings.personalizedAds ? "bg-blue-600" : "bg-gray-300"}`}
            aria-pressed={settings.personalizedAds}
          >
            <span
              className={`bg-white w-4 h-4 rounded-full shadow transform duration-300 ${settings.personalizedAds ? "translate-x-6" : ""}`}
            ></span>
          </button>
        </div>
      </div>
      <div className="mt-8 text-xs text-gray-500 border-t pt-4">
        <p>
          Your privacy is important to us. You can update your preferences at any time. For more information, please read our Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default Privacy;
