import React from "react";

const FeatureCard = ({ icon, title, description, highlight = [] }) => {
  // Function to render description with highlighted words
  const renderDescription = () => {
    if (highlight.length === 0) {
      return description;
    }

    // Split the description into parts and highlight matching words
    let parts = [description];

    highlight.forEach(word => {
      const newParts = [];
      parts.forEach(part => {
        if (typeof part === 'string') {
          const regex = new RegExp(`(${word})`, 'gi');
          const splitParts = part.split(regex);
          splitParts.forEach((splitPart, index) => {
            if (splitPart.toLowerCase() === word.toLowerCase()) {
              newParts.push(
                <span
                  key={`${word}-${index}`}
                  className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-extrabold animate-pulse"
                >
                  {splitPart}
                </span>
              );
            } else if (splitPart) {
              newParts.push(splitPart);
            }
          });
        } else {
          newParts.push(part);
        }
      });
      parts = newParts;
    });

    return parts;
  };

  return (
    <div className="relative group h-full">
      {/* Animated gradient border effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-100 blur transition-all duration-500 group-hover:duration-300 animate-tilt"></div>

      {/* Card container with glassmorphism */}
      <div className="relative h-full bg-gradient-to-br from-white/80 to-gray-100/80 dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-8 hover:shadow-2xl hover:shadow-blue-500/20 dark:hover:shadow-purple-500/20 transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02]">

        {/* Icon container with gradient background */}
        <div className="relative mb-6 inline-flex">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-lg opacity-40 group-hover:opacity-70 transition-opacity duration-300"></div>
          <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl text-white shadow-lg transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-300">
            {icon}
          </div>
        </div>

        {/* Title with gradient on hover */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed font-medium">
          {renderDescription()}
        </p>

        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-b-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      </div>
    </div>
  );
};

export default FeatureCard;