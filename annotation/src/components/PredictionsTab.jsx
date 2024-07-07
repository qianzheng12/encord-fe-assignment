import React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import PredictionDetails from './PredictionDetails';
import './PredictionsTab.scss'

function PredictionsTab({predictions}) {
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
