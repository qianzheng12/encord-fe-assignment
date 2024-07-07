import React from 'react';
import {useState} from 'react';
import Navbar from "./components/NavBar";
import ImagesTab from "./components/ImagesTab";
import PredictionsTab from "./components/PredictionsTab";

function App() {
    const [activeTab, setActiveTab] = useState('images');
    return (
        <div>
            <Navbar activeTab={activeTab} setActiveTab={setActiveTab}/>
            {activeTab === 'images' ? (
                <ImagesTab/>
            ) : (
                <PredictionsTab/>
            )}
        </div>
    );
}

export default App;
