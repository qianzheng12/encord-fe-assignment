import React, {useState, useCallback, useEffect} from 'react';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from '@mui/material';
import './ImagesTab.scss'

const MOCK_PREDICTION_RESULT_APPLE = [
    {
        "bbox": {
            "x1": 10,
            "x2": 1500,
            "y1": 92,
            "y2": 1220
        },
        "label": "apple",
        "score": "0.97"
    }]

const MOCK_PREDICTION_RESULT_ORANGE = [
    {
        "bbox": {
            "x1": 589,
            "x2": 1443,
            "y1": 92,
            "y2": 927
        },
        "label": "orange",
        "score": "0.97"
    },
    {
        "bbox": {
            "x1": -1,
            "x2": 1617,
            "y1": 25,
            "y2": 1193
        },
        "label": "bowl",
        "score": "0.29"
    },
    {
        "bbox": {
            "x1": -3,
            "x2": 801,
            "y1": 1,
            "y2": 204
        },
        "label": "person",
        "score": "0.28"
    }
]

function ImagesTab() {
    const [open, setOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [images, setImages] = useState([]);

    useEffect(() => {
        // Ideally here should call API to fetch data, but since we don't have BE API ready, we just load local Json file in public
        const fetchData = async () => {
            try {
                const imagesResponse = await fetch('/images.json');
                const imagesData = await imagesResponse.json();
                setImages(imagesData);
            } catch (error) {
                console.error('Failed to fetch data', error);
            }
        };

        fetchData();
    }, []);


    const handleOpen = useCallback((image) => {
        setOpen(true);
        setCurrentImage(image)
    }, [setOpen, setCurrentImage]);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const handleTitleChange = useCallback((event) => {
        setTitle(event.target.value);
    }, [setTitle]);

    const handleDescriptionChange = useCallback((event) => {
        setDescription(event.target.value);
    }, [setDescription]);

    const handleUpload = useCallback((event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            setImages(prevImages => [...prevImages, {
                name: file.name,
                size: file.size,
                data: e.target.result,
                created_at: new Date().toISOString(),
                path_to_image: '/apple.png'
            }]);
        };
        reader.readAsDataURL(file);

        // NOTE: If we have API, we will call API with blob of the image file and upload the blob to either DB or S3
    }, [setImages]);

    const handleSubmit = useCallback(async (image) => {
        let predictions;
        if (currentImage.path_to_image === '/orange.jpg') {
            predictions = MOCK_PREDICTION_RESULT_ORANGE;
        } else {
            predictions = MOCK_PREDICTION_RESULT_APPLE;
        }

        const prediction = {
            title,
            description,
            created_at: new Date().toISOString(),
            image_path: currentImage.path_to_image,
            predictions: predictions
        };

        // Post the prediction to JSON Server
        try {
            const response = await fetch('http://localhost:3000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(prediction)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            await response.json();
        } catch (error) {
            console.error('Failed to post prediction:', error);
        }

        handleClose();
    }, [title, description, currentImage, handleClose]);

    return (
        <div className='image-tab'>
            <Button className='upload-button' variant="contained" component="label">
                Upload Image
                <input type="file" hidden onChange={handleUpload}/>
            </Button>
            <TableContainer >
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Filename</TableCell>
                            <TableCell>Size (bytes)</TableCell>
                            <TableCell>Time of Upload</TableCell>
                            <TableCell>Predict</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {images.map((image, index) => (
                            <TableRow key={index}>
                                <TableCell>{image.name}</TableCell>
                                <TableCell>{image.size}</TableCell>
                                <TableCell>{image.created_at}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleOpen(image)}>Predict</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Submit Prediction</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To submit a prediction, please enter the title and description here.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={title}
                        onChange={handleTitleChange}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => handleSubmit()}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ImagesTab;
