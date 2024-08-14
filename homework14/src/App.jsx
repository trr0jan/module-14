import './App.css';
import NavMenu from './Components/NavMenu/NavMenu';
import SingleCard from './Components/SingleCard/SingleCard';
import { useState, useEffect } from 'react';

import IconFacebook from './icons/facebook.png'
import IconGoogle from './icons/google.png'
import IconTwitter from './icons/twitter.png'
import IconGit from './icons/github.png'
import IconGooglePlay from './icons/gp.png'
import IconAppStore from './icons/app_store.png'
import { Grid, TextField } from '@mui/material';
import useRequest from './hooks/useRequest';

function App() {
  const [search, setSearch] = useState('');
  const data = useRequest(`https://api.tvmaze.com/search/shows?q=${search}`, search);
  const handleCardClick = (id) => {
    console.log(`Film ID: ${id}`);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  
  return (
    <div className="App">
      <header>
        <NavMenu />
      </header>
      <Grid item xs={12} style={{margin: '30px 0'}}>
          <TextField
            id="outlined-controlled"
            label="Search"
            value={search}
            onChange={handleSearch}
          />
      </Grid>
      <div className='SingleCard'>
        {data.map((responseShow, index) => {
            const {score, show} = responseShow;
            return (
            <SingleCard
              name={show.name}
              description={show.summary}
              image={show.image?.original ?? ""}
              status={show.status}
              handleClick={handleCardClick}
            />
            )
        })}
      </div>
      <footer>
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
      </footer>
    </div>
  );
}

export default App;
