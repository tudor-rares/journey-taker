import React from "react";

interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isVisible,
  message = "Calculating the best route for you...",
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-2xl flex items-center justify-center z-50 animate-fadeIn">
      <div className="relative p-8 rounded-2xl max-w-md text-center">
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 via-fuchsia-500 to-purple-600 rounded-3xl blur-xl opacity-50 animate-pulse-glow"></div>
        <div className="relative glass-card">
          <div className="flex justify-center items-center mb-8">
            <div className="relative flex items-center justify-center w-24 h-24">
              {/* Outer spinning ring */}
              <div className="absolute w-24 h-24 border-[3px] border-pink-500/20 border-t-pink-500 rounded-full animate-spin"></div>
              
              {/* Middle spinning ring */}
              <div className="absolute w-20 h-20 border-[2px] border-fuchsia-500/20 border-b-fuchsia-500 rounded-full animate-spin" style={{ animationDuration: '2s' }}></div>
              
              {/* Inner spinning ring */}
              <div className="absolute w-16 h-16 border-[2px] border-purple-500/20 border-l-purple-500 rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
              
              {/* Pulsing glow */}
              <div className="absolute inset-5">
                <div className="w-14 h-14 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 rounded-full opacity-90 blur-xl animate-pulse" style={{ animationDuration: '2s' }}></div>
              </div>
              
              {/* Center dot */}
              <div className="absolute w-4 h-4 bg-white rounded-full shadow-lg shadow-purple-500/50"></div>
              
              {/* Particles */}
              {[...Array(6)].map((_, i) => (
                <div 
                  key={i} 
                  className="absolute w-1.5 h-1.5 bg-white rounded-full"
                  style={{
                    transform: `rotate(${i * 60}deg) translateY(-14px)`,
                    animation: `particle${i % 3 + 1} 3s infinite ease-in-out`,
                    animationDelay: `${i * 0.5}s`
                  }}
                />
              ))}
            </div>
          </div>
          
          <h3 className="text-white text-xl font-semibold mb-2">{message}</h3>
          <p className="text-white/60 text-sm mb-1">This might take a moment</p>
          
          <div className="mt-6 flex justify-center space-x-2">
            {[...Array(3)].map((_, i) => (
              <div 
                key={i} 
                className="w-2 h-2 rounded-full bg-white opacity-80"
                style={{
                  animation: 'bounce 1.4s infinite ease-in-out',
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
          
          <style jsx>{`
            @keyframes particle1 {
              0%, 100% { opacity: 0.4; transform: rotate(0deg) translateY(-14px) scale(1); }
              50% { opacity: 1; transform: rotate(0deg) translateY(-16px) scale(1.5); }
            }
            @keyframes particle2 {
              0%, 100% { opacity: 0.4; transform: rotate(120deg) translateY(-14px) scale(1); }
              50% { opacity: 1; transform: rotate(120deg) translateY(-16px) scale(1.5); }
            }
            @keyframes particle3 {
              0%, 100% { opacity: 0.4; transform: rotate(240deg) translateY(-14px) scale(1); }
              50% { opacity: 1; transform: rotate(240deg) translateY(-16px) scale(1.5); }
            }
            @keyframes bounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-5px); }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
