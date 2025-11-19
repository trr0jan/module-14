import React from "react";
import './Footer.css'
import IconFacebook from './icons/facebook.png'
import IconGoogle from './icons/google.png'
import IconTwitter from './icons/twitter.png'
import IconGit from './icons/github.png'
import IconGooglePlay from './icons/gp.png'
import IconAppStore from './icons/app_store.png'
import { Box } from "@mui/material";

const Footer = () => {
    return (
        <Box className='Footer' item xs={12}>
            <div className='TextContainer'>
                <div className='SpecialText'>
                    <a href="#"><span>Terms Of Use</span></a>
                    <a href="#"><span>Privacy-Policy</span></a>
                    <a href="#"><span>FAQ</span></a>
                    <a href="#"><span>Watch List</span></a>
                </div>
                <p>@ 2023 WATCHIT. All rights reserved. All videos and shows on this platform are trademarks of, and all related images and content are the property of, Streamit, Inc. Duplication and copy of this is strictly prohibited. All rights reserved.</p>
                </div>
                <div className='IconsContainer'>
                <p>Folow us:</p>
                <ul className='FooterIcons'>
                    <li>
                    <a href="#"><img src={IconFacebook} alt="#" /></a>
                    </li>
                    <li>
                    <a href="#"><img src={IconGoogle} alt="#" /></a>
                    </li>
                    <li>
                    <a href="#"><img src={IconTwitter} alt="#" /></a>
                    </li>
                    <li>
                    <a href="#"><img src={IconGit} alt="#" /></a>
                    </li>
                </ul>
                </div>
                <div className='WatchitApp'>
                <p>Watchit App</p>
                    <div className='DownloadIcons'>
                    <a href='#'><img src={IconGooglePlay} alt="GooglePlay" /></a>
                    <a href='#'><img src={IconAppStore} alt="AppStore" /></a>
                </div>
            </div>
        </Box>
    );
};

export default Footer;