import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ShopDropdown = ({ isOpen, onClose }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div 
      ref={dropdownRef}
      className="absolute top-full left-0 w-screen bg-white shadow-lg border-t border-gray-200 py-8 z-50"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-4 gap-8">
          {/* Category Column */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Category</h3>
            <ul className="space-y-3">
              <li><Link to="/shop" className="text-gray-600 hover:text-black">Shop All</Link></li>
              <li><Link to="/shop/cleanse" className="text-gray-600 hover:text-black">Cleanse</Link></li>
              <li><Link to="/shop/exfoliate" className="text-gray-600 hover:text-black">Exfoliate</Link></li>
              <li><Link to="/shop/treat-masque" className="text-gray-600 hover:text-black">Treat & Masque</Link></li>
              <li><Link to="/shop/tone" className="text-gray-600 hover:text-black">Tone</Link></li>
              <li><Link to="/shop/hydrate" className="text-gray-600 hover:text-black">Hydrate</Link></li>
              <li><Link to="/shop/eyes-lips" className="text-gray-600 hover:text-black">Eyes & Lips</Link></li>
              <li><Link to="/shop/sun-care" className="text-gray-600 hover:text-black">Sun Care</Link></li>
              <li><Link to="/shop/shave" className="text-gray-600 hover:text-black">Shave</Link></li>
            </ul>
          </div>

          {/* Skin Type Column */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Skin Type</h3>
            <ul className="space-y-3">
              <li><Link to="/shop/normal" className="text-gray-600 hover:text-black">Normal</Link></li>
              <li><Link to="/shop/dry" className="text-gray-600 hover:text-black">Dry</Link></li>
              <li><Link to="/shop/oily" className="text-gray-600 hover:text-black">Oily</Link></li>
              <li><Link to="/shop/combination" className="text-gray-600 hover:text-black">Combination</Link></li>
              <li><Link to="/shop/sensitive" className="text-gray-600 hover:text-black">Sensitive</Link></li>
              <li><Link to="/shop/mature" className="text-gray-600 hover:text-black">Mature</Link></li>
            </ul>
          </div>

          {/* Body Column */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Body</h3>
            <ul className="space-y-3">
              <li><Link to="/shop/body" className="text-gray-600 hover:text-black">Shop All</Link></li>
              <li><Link to="/shop/body-cream" className="text-gray-600 hover:text-black">Body Cream, oils, scrubs</Link></li>
              <li><Link to="/shop/shower" className="text-gray-600 hover:text-black">Shower-gel, shampoo, soap</Link></li>
              <li><Link to="/shop/balms" className="text-gray-600 hover:text-black">Balms</Link></li>
              <li><Link to="/shop/hands-feet" className="text-gray-600 hover:text-black">Hands & Feet</Link></li>
              <li><Link to="/shop/sun-protection" className="text-gray-600 hover:text-black">Sun Protection</Link></li>
            </ul>
          </div>

          {/* Fragrances Column */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Fragrances</h3>
            <ul className="space-y-3">
              <li><Link to="/shop/fragrances" className="text-gray-600 hover:text-black">Shop All</Link></li>
              <li><Link to="/shop/sauna" className="text-gray-600 hover:text-black">Sauna</Link></li>
              <li><Link to="/shop/essential-oils" className="text-gray-600 hover:text-black">Essential Oils</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDropdown;