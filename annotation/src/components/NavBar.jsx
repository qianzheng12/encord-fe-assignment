import React from 'react';
import { Tabs, Tab } from '@mui/material';
import './NavBar.scss'

const Navbar = ({ activeTab, setActiveTab }) => {
    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <Tabs
            className="nav-tab"
            value={activeTab}
            onChange={handleChange}
        >
            <Tab label="Images" value="images" />
            <Tab label="Predictions" value="predictions" />
        </Tabs>
    );
};

export default Navbar;
