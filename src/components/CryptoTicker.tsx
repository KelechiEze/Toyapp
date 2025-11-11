import { useEffect, useState } from "react";
import { 
  Gamepad2, 
  Car, 
  Puzzle, 
  Dumbbell, 
  Palette, 
  Music, 
  BookOpen, 
  Camera, 
  Rocket, 
  Heart 
} from "lucide-react";
import "./CryptoTicker.css";

interface ToyData {
  id: string;
  name: string;
  icon: JSX.Element;
  color: string;
}

const ToyTicker = () => {
  const [toyData, setToyData] = useState<ToyData[]>([]);
  const [loading, setLoading] = useState(true);

  const popularToys: ToyData[] = [
    {
      id: "video-games",
      name: "Video Games",
      icon: <Gamepad2 size={20} />,
      color: "#FF6B6B" // Red
    },
    {
      id: "rc-cars",
      name: "RC Cars",
      icon: <Car size={20} />,
      color: "#4ECDC4" // Teal
    },
    {
      id: "puzzles",
      name: "Puzzles",
      icon: <Puzzle size={20} />,
      color: "#45B7D1" // Blue
    },
    {
      id: "action-figures",
      name: "Action Figures",
      icon: <Dumbbell size={20} />,
      color: "#96CEB4" // Green
    },
    {
      id: "art-supplies",
      name: "Art Supplies",
      icon: <Palette size={20} />,
      color: "#FDCB6E" // Yellow
    },
    {
      id: "musical-toys",
      name: "Musical Toys",
      icon: <Music size={20} />,
      color: "#A29BFE" // Purple
    },
    {
      id: "educational",
      name: "Educational",
      icon: <BookOpen size={20} />,
      color: "#00CEC9" // Turquoise
    },
    {
      id: "drones",
      name: "Drones",
      icon: <Camera size={20} />,
      color: "#F97F51" // Orange
    },
    {
      id: "space-toys",
      name: "Space Toys",
      icon: <Rocket size={20} />,
      color: "#6C5CE7" // Violet
    },
    {
      id: "plush-toys",
      name: "Plush Toys",
      icon: <Heart size={20} />,
      color: "#E84393" // Pink
    }
  ];

  useEffect(() => {
    const fetchToyData = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setToyData(popularToys);
      } catch (error) {
        console.error('Error loading toy data:', error);
        setToyData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchToyData();

    // Refresh data every 30 seconds
    const interval = setInterval(fetchToyData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Display loading or data
  const displayData = loading ? [] : toyData;

  if (loading && toyData.length === 0) {
    return (
      <div className="toy-ticker-wrapper">
        <div className="ticker-row">
          <div className="ticker-content">
            {[...Array(5)].map((_, idx) => (
              <div key={idx} className="ticker-item loading">
                <div className="toy-icon loading"></div>
                <span className="toy-name loading">Loading Toys...</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="toy-ticker-wrapper">
      <div className="ticker-row ticker-left">
        <div className="ticker-content">
          {[...displayData, ...displayData, ...displayData].map((toy, idx) => (
            <div key={`left-${toy.id}-${idx}`} className="ticker-item">
              <div 
                className="toy-icon"
                style={{ 
                  backgroundColor: toy.color,
                  color: 'white'
                }}
              >
                {toy.icon}
              </div>
              <span className="toy-name">{toy.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="ticker-row ticker-right">
        <div className="ticker-content">
          {[...displayData, ...displayData, ...displayData].map((toy, idx) => (
            <div key={`right-${toy.id}-${idx}`} className="ticker-item">
              <div 
                className="toy-icon"
                style={{ 
                  backgroundColor: toy.color,
                  color: 'white'
                }}
              >
                {toy.icon}
              </div>
              <span className="toy-name">{toy.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToyTicker;