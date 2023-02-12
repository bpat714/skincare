import React, { useState, useEffect } from 'react';
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const SkincareStepProducts = () => {
    const [productRecommendations, setProductRecommendations] = useState(null);
    const [step, setStep] = useState('');

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const stepParam = searchParams.get("step");
        setStep(stepParam);
    }, []);

    useEffect(() => {
        const getProductRecommendations = async () => {
            const prompt = `recommend products for ` + step;
            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: prompt,
                temperature: 0.7,
                max_tokens: 256,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            });
            setProductRecommendations(response.data.choices[0].text);
        };
        if (step) {
            getProductRecommendations();
        }
    }, [step]);

    return (
        <div>
            {productRecommendations ? productRecommendations.split("\n").map((item, index) => (
                <p key={index}>{item}</p>
            )) : <p>Loading product recommendations...</p>}
        </div>
    );
};

export default SkincareStepProducts;
