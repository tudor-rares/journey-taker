import React, { useState } from 'react';
import type { RouteData } from '../App';

interface SidebarProps {
  onSubmit: (formData: Omit<RouteData, 'isRouteCalculated' | 'distance' | 'duration' | 'fuelStops'>) => void;
  isLoading?: boolean;
  error?: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({ onSubmit, isLoading = false, error = null }) => {
  const [formData, setFormData] = useState<Omit<RouteData, 'isRouteCalculated' | 'distance' | 'duration' | 'fuelStops'>>({
    startPoint: '',
    destination: '',
    fuelType: 'Gasoline',
    vehicleRange: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="h-full p-6 overflow-auto rounded-lg bg-black/30 backdrop-blur-sm border border-white/[0.05]">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">Route Planner</h2>
        <p className="text-white/60 text-xs mt-1 ml-0.5">Plan your journey with accurate fuel predictions</p>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-pink-500/10 text-pink-200 border border-pink-500/20 rounded-md text-xs">
          <div className="flex items-start">
            <svg className="w-4 h-4 text-pink-400 mr-1.5 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-group">
          <label className="block text-xs font-medium text-white/70 mb-1.5 ml-0.5">Start Point</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-pink-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <input 
              type="text" 
              name="startPoint"
              value={formData.startPoint}
              onChange={handleInputChange}
              placeholder="Enter start location" 
              className="block w-full pl-12 pr-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-pink-500/50 rounded-lg text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all"
              disabled={isLoading}
            />
          </div>
        </div>
        
        <div className="form-group">
          <label className="block text-xs font-medium text-white/70 mb-1.5 ml-0.5">Destination</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-fuchsia-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <input 
              type="text" 
              name="destination"
              value={formData.destination}
              onChange={handleInputChange}
              placeholder="Enter destination" 
              className="block w-full pl-12 pr-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-fuchsia-500/50 rounded-lg text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20 transition-all"
              disabled={isLoading}
            />
          </div>
        </div>
        
        <div className="form-group">
          <label className="block text-xs font-medium text-white/70 mb-1.5 ml-0.5">Fuel Type</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-purple-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
            </div>
            <select 
              name="fuelType"
              value={formData.fuelType}
              onChange={handleInputChange}
              className="block w-full pl-12 pr-10 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-purple-500/50 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all appearance-none"
              style={{
                backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23d946ef' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
                backgroundPosition: "right 1rem center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "1.5em 1.5em",
                paddingRight: "2.5rem"
              }}
              disabled={isLoading}
            >
              <option>Gasoline</option>
              <option>Diesel</option>
              <option>LPG</option>
            </select>
          </div>
        </div>
        
        <div className="form-group">
          <label className="block text-xs font-medium text-white/70 mb-1.5 ml-0.5">Vehicle Range (miles)</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-pink-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <input 
              type="number" 
              name="vehicleRange"
              value={formData.vehicleRange}
              onChange={handleInputChange}
              placeholder="Enter range" 
              className="block w-full pl-12 pr-4 py-2.5 bg-white/[0.03] border border-white/[0.08] focus:border-pink-500/50 rounded-lg text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-pink-500/20 transition-all"
              disabled={isLoading}
            />
          </div>
        </div>
        
        <div className="pt-4">
          <button 
            type="submit" 
            className="w-auto mx-auto px-6 py-2 relative group inline-flex items-center justify-center"
            disabled={isLoading}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-md blur opacity-60 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative px-4 py-1.5 bg-black rounded-md leading-none flex items-center justify-center">
              {isLoading ? (
                <>
                  <svg className="animate-spin mr-2 h-3.5 w-3.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="text-white text-xs font-medium">Calculating...</span>
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5 mr-2 text-pink-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  <span className="text-white text-xs font-medium">Plan Route</span>
                </>
              )}
            </div>
          </button>
          
          <div className="flex justify-center mt-3">
            <button 
              type="button"
              className="text-white/40 hover:text-white/70 text-[10px] flex items-center transition-colors hover:scale-105 transform"
              disabled={isLoading}
            >
              <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              Save as favorite route
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Sidebar;
