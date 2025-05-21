import './App.css'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Map from './components/Map'
import Footer from './components/Footer'
import LoadingOverlay from './components/LoadingOverlay'

// Define route data interface
export interface RouteData {
  startPoint: string;
  destination: string;
  fuelType: string;
  vehicleRange: string;
  isRouteCalculated: boolean;
  distance?: number;
  duration?: number;
  fuelStops?: number;
  fuelEfficiency?: number;
  estimatedFuelCost?: number;
  waypoints?: { lat: number; lng: number; type: 'start' | 'end' | 'fueling' }[];
}

function App() {
  const [routeData, setRouteData] = useState<RouteData>({
    startPoint: '',
    destination: '',
    fuelType: 'Gasoline',
    vehicleRange: '',
    isRouteCalculated: false
  });
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to calculate route with enhanced data
  const calculateRoute = async (formData: Omit<RouteData, 'isRouteCalculated' | 'distance' | 'duration' | 'fuelStops'>) => {
    // Reset any previous errors
    setError(null);
    
    // Validate inputs
    if (!formData.startPoint || !formData.destination) {
      setError('Please provide both start point and destination');
      return;
    }
    
    if (!formData.vehicleRange || isNaN(parseFloat(formData.vehicleRange)) || parseFloat(formData.vehicleRange) <= 0) {
      setError('Please provide a valid vehicle range');
      return;
    }
    
    // Set loading state
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Calculate fuel stops based on vehicle range and route distance
      const distance = 35.8; // This would come from a routing API
      const vehicleRangeNum = parseFloat(formData.vehicleRange);
      const fuelStops = Math.max(0, Math.ceil(distance / vehicleRangeNum) - 1);
      
      // Calculate fuel efficiency based on fuel type (simplified)
      let fuelEfficiency = 30; // mpg
      if (formData.fuelType === 'Diesel') {
        fuelEfficiency = 35;
      } else if (formData.fuelType === 'LPG') {
        fuelEfficiency = 28;
      }
      
      // Calculate estimated fuel cost
      const fuelPrices: Record<string, number> = {
        'Gasoline': 3.50,
        'Diesel': 3.80,
        'LPG': 2.90
      };
      const fuelPrice = fuelPrices[formData.fuelType] || 3.50;
      const gallonsNeeded = distance / fuelEfficiency;
      const estimatedFuelCost = gallonsNeeded * fuelPrice;
      
      // Mock waypoints for map display
      const waypoints = [
        { lat: 51.505, lng: -0.09, type: 'start' as const },
        { lat: 51.52, lng: -0.12, type: 'end' as const }
      ];
      
      // Add fueling waypoints if needed
      if (fuelStops > 0) {
        waypoints.push({ lat: 51.51, lng: -0.10, type: 'fueling' as const });
      }
      
      // Update route data with calculated values
      setRouteData({
        ...formData,
        isRouteCalculated: true,
        distance,
        duration: 45,
        fuelStops,
        fuelEfficiency,
        estimatedFuelCost: parseFloat(estimatedFuelCost.toFixed(2)),
        waypoints
      });
    } catch (err) {
      setError('Failed to calculate route. Please try again.');
      console.error('Route calculation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#0c1020] noise-bg">
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(121,74,162,0.15),transparent_50%),radial-gradient(ellipse_at_top_left,rgba(236,72,153,0.15),transparent_50%)] z-0 pointer-events-none"></div>
      
      <div className="h-20">
        <Navbar />
      </div>
      
      <div className="flex flex-1 overflow-hidden relative z-10 p-3">
        {/* Sidebar with modern styling - increased width and added margin */}
        <div className="w-[450px] bg-black/40 backdrop-blur-2xl border-r border-white/[0.05] rounded-lg overflow-hidden shadow-md">
          <Sidebar 
            onSubmit={calculateRoute} 
            isLoading={isLoading} 
            error={error} 
          />
        </div>
        
        {/* Map container */}
        <div className="flex-1 bg-black/20 backdrop-blur-sm ml-3 rounded-lg overflow-hidden shadow-md">
          <div className="h-full w-full overflow-hidden relative">
            <Map routeData={routeData} />
          </div>
        </div>
      </div>
      
      <div className="h-[60px]">
        <Footer />
      </div>
      
      <LoadingOverlay isVisible={isLoading} />
    </div>
  )
}

export default App
