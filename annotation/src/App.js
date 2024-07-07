import React, {useEffect} from 'react';
import {useState} from 'react';
import Navbar from "./components/NavBar";
import ImagesTab from "./components/ImagesTab";
import PredictionsTab from "./components/PredictionsTab";

function App() {
    const [activeTab, setActiveTab] = useState('images');
    const [images, setImages] = useState([]);
    const [predictions, setPredictions] = useState([]);

    useEffect(() => {
        // Ideally here should call API to fetch data, but since we don't have BE API ready, we just load local Json file in public
        const fetchData = async () => {
            try {
                const imagesResponse = await fetch('/images.json');
                const imagesData = await imagesResponse.json();
                setImages(imagesData);
                const predictionsResponse = await fetch('/db.json');
                const predictionsData = await predictionsResponse.json();
                setPredictions(predictionsData.map(pred => ({
                    title: pred.predict.title,
                    description: pred.predict.description,
                    created_at: pred.predict.created_at,
                    image_path: pred.predict.image_path,
                    predictions: pred.predict.predictions,
                })));
            } catch (error) {
                console.error('Failed to fetch data', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <Navbar activeTab={activeTab} setActiveTab={setActiveTab}/>
            {activeTab === 'images' ? (
                <ImagesTab images={images} setImages={setImages} setPredictions={setPredictions}/>
            ) : (
                <PredictionsTab predictions={predictions}/>
            )}
        </div>
    );
}

export default App;
