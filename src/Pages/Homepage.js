import React, { useState, useEffect } from 'react';

const Homepage = () => {
  const [skinType, setSkinType] = useState('');
  const [skinConcern, setSkinConcern] = useState('');
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("skinType")) {
      setSkinType(sessionStorage.getItem("skinType"));
    }
    if (sessionStorage.getItem("skinConcern")) {
      setSkinConcern(sessionStorage.getItem("skinConcern"));
    }
    if (sessionStorage.getItem("recommendations")) {
      setRecommendations(sessionStorage.getItem("recommendations"));
    }
  }, []);

  const handleSkinTypeChange = event => {
    setSkinType(event.target.value);
    sessionStorage.setItem("skinType", event.target.value);
  };

  const handleSkinConcernChange = event => {
    setSkinConcern(event.target.value);
    sessionStorage.setItem("skinConcern", event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    if (!skinType || !skinConcern) {
      return;
    }

    setLoading(true);

    const response = await fetch('https://dlm7wyprb5.execute-api.ap-northeast-1.amazonaws.com/default/skincare-steps', {
      method: 'POST',
      headers: {
        'x-api-key': 'bapvBmDT3t477Zf4iOGrE8fc2jkWZ67G4kbY2ps0',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ skinType, skinConcern })
    });

    const result = await response.json();

    setRecommendations(result.body);
    setLoading(false);
    sessionStorage.setItem("recommendations", result.body);
  };

  return (
    <div>
      <h1>Skincare Recommendation</h1>
      <p>Tell us about your skin:</p>
      <form onSubmit={handleSubmit}>
        <label>
          Skin Type:
          <select value={skinType} onChange={handleSkinTypeChange}>
            <option value="">Select one...</option>
            <option value="oily">Oily</option>
            <option value="dry">Dry</option>
            <option value="combination">Combination</option>
            <option value="normal">Normal</option>
            <option value="sensitive">Sensitive</option>
          </select>
        </label>
        <br />
        <br />
        <label>
          Skin Concern:
          <select value={skinConcern} onChange={handleSkinConcernChange}>
            <option value="">Select one...</option>
            <option value="acne">Acne</option>
            <option value="wrinkles">Wrinkles</option>
            <option value="darkSpots">Dark spots</option>
            <option value="dryness">Dryness</option>
            <option value="redness">Redness</option>
          </select>
        </label>
        <br />
        <br />
        <button type="submit">Get Recommendations</button>
      </form>
      {loading ? 
        <p>Loading...</p> : 
        recommendations && (
          <div>
            <h2>Your Recommendations:</h2>
            <div>
              {recommendations.split("\n").map((item, index) => (
                <a key={index} href={"/skincare-step-products?step="+item} style={{ display: 'block' }}>
                  <p>{item}</p>
                </a>
              ))}
            </div>
          </div>
        )
      }
    </div>
  );
};

export default Homepage;
