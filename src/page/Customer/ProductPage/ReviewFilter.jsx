/* eslint-disable react/prop-types */
import { useState } from "react";
import { Filter, Star } from "lucide-react";

const ReviewFilter = ({ onFilterChange, totalReviews }) => {
  const [activeFilter, setActiveFilter] = useState("all");
  
  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };
  
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium flex items-center">
          <Filter size={16} className="mr-2" />
          Lọc đánh giá
        </h3>
        <span className="text-sm text-gray-500">{totalReviews} đánh giá</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <button 
          onClick={() => handleFilterClick("all")}
          className={`px-3 py-1 text-sm rounded-full border ${
            activeFilter === "all" 
              ? "bg-black text-white border-black" 
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
        >
          Tất cả
        </button>
        
        {[5, 4, 3, 2, 1].map(star => (
          <button
            key={star}
            onClick={() => handleFilterClick(star)}
            className={`px-3 py-1 text-sm rounded-full border flex items-center ${
              activeFilter === star 
                ? "bg-black text-white border-black" 
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            {star} <Star size={12} className="ml-1 fill-current" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ReviewFilter;