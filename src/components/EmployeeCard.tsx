import React from 'react';


const EmployeeCard = ({ name, title, image }) => {
  return (
    <div className="max-w-xs mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 my-5 hover-scale">
      <img className="object-cover w-full h-56" src={image} alt={name} />
      <div className="py-5 text-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{name}</h2>
        <p className="text-gray-600 dark:text-gray-400">{title}</p>
        <div className="mt-4">
          <button className="px-4 py-2 text-xs font-semibold text-green-500 border border-green-500 rounded hover:bg-green-500 hover:text-white transition duration-300">
            Email
          </button>
          <button className="px-4 py-2 ml-2 text-xs font-semibold text-purple-500 border border-purple-500 rounded hover:bg-purple-500 hover:text-white transition duration-300">
            Portafolio
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;