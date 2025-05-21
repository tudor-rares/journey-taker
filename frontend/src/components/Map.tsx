import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { RouteData } from '../App';

// Fix for Leaflet's default icon paths
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
  routeData: RouteData;
}

const Map: React.FC<MapProps> = ({ routeData }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const routeLayerRef = useRef<L.Polyline | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      // Initialize map
      mapInstanceRef.current = L.map(mapRef.current, {
        zoomControl: false,  // We'll add zoom control in a better position
      }).setView([51.505, -0.09], 13);
      
      // Add zoom control to bottom right
      L.control.zoom({
        position: 'bottomright'
      }).addTo(mapInstanceRef.current);
      
      // Use a modern, dark map style
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(mapInstanceRef.current);
    }

    // Cleanup on component unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update route when routeData changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear previous route and markers
    if (routeLayerRef.current) {
      routeLayerRef.current.remove();
      routeLayerRef.current = null;
    }
    
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    if (routeData.isRouteCalculated) {
      // Use mock route points for demonstration
      // In a real application, these would come from the routing API
      const routePoints: [number, number][] = [
        [51.505, -0.09],
        [51.51, -0.1],
        [51.52, -0.12]
      ];
      
      // Add the route line
      routeLayerRef.current = L.polyline(routePoints, {
        color: '#d946ef', // Pink color
        weight: 5,
        opacity: 0.9,
        lineJoin: 'round',
        lineCap: 'round',
      }).addTo(mapInstanceRef.current);
      
      // Add a glow effect with a second, wider line underneath
      L.polyline(routePoints, {
        color: '#d946ef30', // Pink with transparency
        weight: 14,
        opacity: 0.6,
        lineJoin: 'round',
        lineCap: 'round'
      }).addTo(mapInstanceRef.current);
      
      // Add markers for start and end points
      const startIcon = L.divIcon({
        className: 'custom-map-marker',
        html: '<div class="marker-pin start-pin" style="background-color: #c026d3; width: 24px; height: 24px; border-radius: 50%; border: 3px solid #ffffff; box-shadow: 0 0 15px rgba(192, 38, 211, 0.8);"></div>',
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });
      
      const endIcon = L.divIcon({
        className: 'custom-map-marker',
        html: '<div class="marker-pin end-pin" style="background-color: #9333ea; width: 24px; height: 24px; border-radius: 50%; border: 3px solid #ffffff; box-shadow: 0 0 15px rgba(147, 51, 234, 0.8);"></div>',
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });
      
      // Add start marker
      const startMarker = L.marker(routePoints[0], { icon: startIcon })
        .addTo(mapInstanceRef.current)
        .bindPopup(`<b>Start:</b> ${routeData.startPoint}`);
      markersRef.current.push(startMarker);
      
      // Add end marker
      const endMarker = L.marker(routePoints[routePoints.length - 1], { icon: endIcon })
        .addTo(mapInstanceRef.current)
        .bindPopup(`<b>Destination:</b> ${routeData.destination}`);
      markersRef.current.push(endMarker);
      
      // Add fuel stop markers if needed
      if (routeData.fuelStops && routeData.fuelStops > 0) {
        const fuelStopIcon = L.divIcon({
          className: 'custom-map-marker',
          html: '<div class="marker-pin fuel-pin" style="background-color: #ec4899; width: 22px; height: 22px; border-radius: 50%; border: 3px solid #ffffff; box-shadow: 0 0 15px rgba(236, 72, 153, 0.8);"></div>',
          iconSize: [26, 26],
          iconAnchor: [13, 13]
        });
        
        // Place fuel stops along the route (simplified for demonstration)
        const midPoint = Math.floor(routePoints.length / 2);
        const fuelStopMarker = L.marker(routePoints[midPoint], { icon: fuelStopIcon })
          .addTo(mapInstanceRef.current)
          .bindPopup('<b>Recommended Fuel Stop</b>');
        markersRef.current.push(fuelStopMarker);
      }
      
      // Fit the map to the route bounds
      mapInstanceRef.current.fitBounds(routePoints);
    }
  }, [routeData]);

  return (
    <div ref={mapRef} className="h-full w-full relative">
      {routeData.isRouteCalculated && (
        <div className="absolute top-6 right-6 z-10 glass-card animate-fadeIn">
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl blur opacity-10"></div>
            <div className="relative z-10">
              <div className="font-bold mb-4 text-gradient text-lg flex items-center">
                <svg className="w-5 h-5 mr-2 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Route Summary
              </div>
              
              <div className="space-y-4 text-white/90">
                <div className="flex items-center">
                  <span className="w-8 h-8 bg-pink-500/20 rounded-full flex items-center justify-center mr-3 backdrop-blur-sm border border-pink-500/30 shadow-[0_0_10px_rgba(236,72,153,0.3)]">
                    <svg className="w-4 h-4 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-white/50">DISTANCE</span>
                    <span className="text-white font-semibold">{routeData.distance} miles</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <span className="w-8 h-8 bg-fuchsia-500/20 rounded-full flex items-center justify-center mr-3 backdrop-blur-sm border border-fuchsia-500/30 shadow-[0_0_10px_rgba(192,38,211,0.3)]">
                    <svg className="w-4 h-4 text-fuchsia-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-white/50">DURATION</span>
                    <span className="text-white font-semibold">{routeData.duration} mins</span>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <span className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center mr-3 backdrop-blur-sm border border-purple-500/30 shadow-[0_0_10px_rgba(147,51,234,0.3)]">
                    <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-white/50">FUEL STOPS</span>
                    <span className="text-white font-semibold">{routeData.fuelStops ?? 'None'}</span>
                  </div>
                </div>
                
                {routeData.fuelEfficiency && (
                  <div className="flex items-center">
                    <span className="w-8 h-8 bg-pink-500/20 rounded-full flex items-center justify-center mr-3 backdrop-blur-sm border border-pink-500/30 shadow-[0_0_10px_rgba(236,72,153,0.3)]">
                      <svg className="w-4 h-4 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-white/50">FUEL EFFICIENCY</span>
                      <span className="text-white font-semibold">{routeData.fuelEfficiency} mpg</span>
                    </div>
                  </div>
                )}
                
                {routeData.estimatedFuelCost && (
                  <div className="flex items-center">
                    <span className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center mr-3 backdrop-blur-sm border border-purple-500/30 shadow-[0_0_10px_rgba(147,51,234,0.3)]">
                      <svg className="w-4 h-4 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-white/50">EST. FUEL COST</span>
                      <span className="text-white font-semibold">${routeData.estimatedFuelCost.toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-6">
                <button className="relative group w-full overflow-hidden rounded-xl">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl opacity-70 group-hover:opacity-100 transition duration-300 blur-[1px] group-hover:blur-[0px]"></div>
                  <div className="relative bg-black/50 text-white py-3 px-4 rounded-xl font-medium text-sm flex items-center justify-center group-hover:bg-black/40 transition-all duration-300">
                    <svg className="w-4 h-4 mr-2 text-pink-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                    Save Route
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Map Controls */}
      <div className="absolute bottom-6 right-6 z-10 flex flex-col items-center space-y-3 animate-fadeIn">
        <button className="map-control-button" title="Center Map">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </button>
        <button className="map-control-button" title="Toggle Satellite View">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
        <button className="map-control-button" title="Share Location">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Map;

