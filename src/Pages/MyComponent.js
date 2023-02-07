import React, { useState, useEffect } from 'react';
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

function MyComponent() {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    async function getCompletion() {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "skincare for dry skin with acne",
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      setResponse(response);
    }
    getCompletion();
  }, []);

  return (
    <div>
      {response ? <p>{response}</p> : <p>Loading...</p>}
    </div>
  );
}

export default MyComponent;
