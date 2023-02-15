import React, { useState, useEffect } from 'react';

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

            const response = await fetch('https://743sdc4h41.execute-api.ap-northeast-1.amazonaws.com/default/skincare-products', {
            method: 'POST',
            headers: {
                'x-api-key': 'FQLp2gp27V879sAolJ6fJBcfE6uWtyO4jy2noAc8',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ step })
            });

            const result = await response.json();
            setProductRecommendations(result.body);
            console.log(result.body);
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
