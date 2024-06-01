import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [gameModesData, setGameModesData] = useState([]);
  const [hoveredItemId, setHoveredItemId] = useState(null);

  useEffect(() => {
    const fetchGameModesData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/gameModes');
        setGameModesData(response.data);
      } catch (error) {
        console.error('Error fetching sidebar data:', error);
      }
    };

    fetchGameModesData();
  }, []);

  const handleSectionHover = (itemId) => {
    setHoveredItemId(itemId);
  };

  const handleSectionLeave = () => {
    setHoveredItemId(null);
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>QUICKMATCH</h1>
      </div>
        <div className="sidebar">
      {gameModesData.map((section) => (
        <div key={section.id} 
             className={`sidebar-section ${hoveredItemId === section.id ? 'hovered' : ''}`}
             onMouseEnter={() => handleSectionHover(section.id)}
             onMouseLeave={handleSectionLeave}>
          <h2>{section.title}</h2>
        </div>
      ))}
      </div>
      <div className="content">
      <img src="http://localhost:5000/Images/background-2.jpg" alt="Battlefield" className="background-image" />
      {hoveredItemId && (
        <div className="item-details">
          {gameModesData
            .flatMap((section) => section.items)
            .filter((item) => item.id === hoveredItemId)
            .map((item) => (
              <div className="p" key={item.id}>
                {item.imageUrl && <img src={item.imageUrl}  alt={item.title}/>}
                {item.description}
              </div>
            ))}
        </div>
      )}
      </div>
      
    </div>
    
    
  );
};

export default App;