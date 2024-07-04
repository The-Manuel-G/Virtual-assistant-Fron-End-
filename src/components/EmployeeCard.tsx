"use client";

import React from 'react';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const EmployeeCard = ({ name, title, image, email, portfolio, github, linkedin }) => {
  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(email);
    toast.success('Email copied to clipboard!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <div className="max-w-xs mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 my-5 hover-scale">
      <div className="relative h-56 w-full">
        <img className="object-cover w-full h-full" src={image} alt={name} />
      </div>
      <div className="py-5 text-center">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{name}</h2>
        <p className="text-gray-600 dark:text-gray-400">{title}</p>
        <div className="mt-4">
          <button
            onClick={copyEmailToClipboard}
            className="px-4 py-2 text-xs font-semibold text-green-500 border border-green-500 rounded hover:bg-green-500 hover:text-white transition duration-300">
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
            Copy Email
          </button>
          <a
            href={portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 ml-2 text-xs font-semibold text-purple-500 border border-purple-500 rounded hover:bg-purple-500 hover:text-white transition duration-300">
            Portafolio
          </a>
        </div>
        <div className="mt-4 flex justify-center space-x-4">
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-800 dark:hover:text-white transition duration-300">
            <FontAwesomeIcon icon={faGithub} size="2x" />
          </a>
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-800 dark:hover:text-white transition duration-300">
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
