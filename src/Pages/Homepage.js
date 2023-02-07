import React, { useState, useEffect } from 'react';
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: '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',
  });

  const openai = new OpenAIApi(configuration);

const useGetRecommendations = (skinType, skinConcern) => {
  const [recommendations, setRecommendations] = useState(null);

  useEffect(() => {
    const getRecommendations = async () => {
      const prompt = `Skincare recommendation for a person with ${skinType} skin and ${skinConcern} concern`;
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      
      setRecommendations(response.data.choices[0].text)
      //setRecommendations(response.choices[0].text);
    };

    if (skinType && skinConcern) {
      getRecommendations();
    }
  }, [skinType, skinConcern]);
  console.log(recommendations)
  return recommendations;
};

const HomePage = () => {
  const [skinType, setSkinType] = useState('');
  const [skinConcern, setSkinConcern] = useState('');
  const recommendations = useGetRecommendations(skinType, skinConcern);

  const handleSkinTypeChange = event => {
    setSkinType(event.target.value);
  };

  const handleSkinConcernChange = event => {
    setSkinConcern(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
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
      {recommendations && (
        <div>
          <h2>Your Recommendations:</h2>
          <p>{recommendations}</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
