import React from 'react';
import { FaCrown } from 'react-icons/fa';

const Badge = ({ type }) => {
  const baseClasses = "inline-flex items-center px-4 py-2 rounded-full text-sm font-bold shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105";
  
  const badgeTypes = {
    silver: "bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 text-gray-700",
    gold: "bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 text-yellow-900",
    platinum: "bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 text-white"
  };

  const iconColors = {
    silver: "text-gray-500",
    gold: "text-yellow-600",
    platinum: "text-indigo-200",
    admin: "text-blue-300"
  };

  const badgeClass = badgeTypes[type.toLowerCase()] || badgeTypes.silver;
  const iconColor = iconColors[type.toLowerCase()] || iconColors.silver;

  return (
    <span className={`${baseClasses} ${badgeClass} group relative overflow-hidden`}>
      <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
      <FaCrown className={`w-5 h-5 mr-2 ${iconColor} group-hover:animate-bounce`} />
      <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
      <span className="absolute top-0 right-0 -mt-1 -mr-1 w-3 h-3 rounded-full bg-white opacity-75 animate-ping"></span>
    </span>
  );
};

export default Badge;