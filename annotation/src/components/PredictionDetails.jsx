import React, { useState, useRef, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

function PredictionDetails({ prediction }) {
    const [open, setOpen] = useState(false);
    const imgRef = useRef(null);
    const [scale, setScale] = useState(1);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const originalWidth = 1600;
        const displayedWidth = 1000;

        setScale(displayedWidth / originalWidth);
        return () => {
        };
    }, []);

    return (
        <div className="prediction-details">
            <Button className="view-button" variant="outlined" color="primary" onClick={handleClickOpen}>
                View
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="lg">
                <DialogTitle id="form-dialog-title">Prediction Details</DialogTitle>
                <DialogContent>
                    <div style={{ position: 'relative' }}>
                        <img
                            ref={imgRef}
                            height={750}
                            width={1000}
                            src={prediction.image_path}
                        />
                        {prediction.predictions.map((pred, index) => (
                            <div className="prediction-result" key={index} style={{
                                position: 'absolute',
                                border: '2px solid blue',
                                backgroundColor: 'rgba(0, 0, 255, 0.2)',
                                left: `${pred.bbox.x1 * scale}px`,
                                top: `${pred.bbox.y1 * scale}px`,
                                width: `${(pred.bbox.x2 - pred.bbox.x1) * scale}px`,
                                height: `${(pred.bbox.y2 - pred.bbox.y1) * scale}px`
                            }} >
                                <p style={{"position": "absolute", "bottom":"0", "right":0}}>{pred.label}({pred.score})</p>
                            </div>
                        ))}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default PredictionDetails;
