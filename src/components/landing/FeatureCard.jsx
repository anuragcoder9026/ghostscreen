import React from "react";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="group bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 hover:shadow-lg">
      {/* Icon */}
      <div className="mb-4 text-blue-600 dark:text-blue-400">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;