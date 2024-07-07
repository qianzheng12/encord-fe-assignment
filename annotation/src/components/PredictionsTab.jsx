import React, {useEffect, useState} from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import PredictionDetails from './PredictionDetails';
import './PredictionsTab.scss'

function PredictionsTab() {
    const [predictions, setPredictions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const predictionsResponse = await fetch('http://localhost:3000/predict');
                const predictionsData = await predictionsResponse.json();
                console.log(predictionsData);
                setPredictions(predictionsData.map(pred => ({
                    title: pred.title,
                    description: pred.description,
                    created_at: pred.created_at,
                    image_path: pred.image_path,
                    predictions: pred.predictions,
                })));
            } catch (error) {
                console.error('Failed to fetch predictions', error);
            }
        };

        fetchData();
    }, [setPredictions]);
    return (
        <div className="predictions-tab">
            <TableContainer className="table-container" component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Timestamp</TableCell>
                            <TableCell>View</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {predictions.map((prediction, index) => (
                            <TableRow key={index}>
                                <TableCell>{prediction.title}</TableCell>
                                <TableCell>{prediction.description}</TableCell>
                                <TableCell>{prediction.created_at}</TableCell>
                                <TableCell>
                                    <PredictionDetails prediction={prediction}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default PredictionsTab;
