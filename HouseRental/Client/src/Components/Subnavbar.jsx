import React from "react";

const Subnavbar = ({ onFilterChange }) => {
  const filters = [
    "All",
    "Panvel",
    "Kharghar",
    "Nerul",
    "Vashi",
    "Below 10000",
    "Below 15000",
    "Below 18000",
  ];

  return (
    <div className="h-8 bg-gray-500 flex gap-x-2 overflow-x-auto scrollbar-hide cursor-pointer justify-evenly">
      {filters.map((filter) => (
        <h4
          key={filter}
          className="text-white flex-shrink-0 hover:bg-slate-900 hover:h-full"
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </h4>
      ))}
    </div>
  );
};

export default Subnavbar;
