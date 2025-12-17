import React from 'react';
import Banner from '../Banner/Banner';
import Login from '../../Pages/Register/Login';
import Register from '../../Pages/Register/Register';
import TopMenu from '../../Component/TopMenu';
import Information from '../../Component/Information';

const Home = () => {
    return (
        <div>
            
            <Banner></Banner>
            <TopMenu></TopMenu>
            <Information></Information>
            
        </div>
    );
};

export default Home;