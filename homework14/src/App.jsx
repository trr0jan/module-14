import './App.css';
import NavMenu from './Components/NavMenu/NavMenu';
import SingleCard from './Components/SingleCard/SingleCard';

import IconFacebook from './icons/facebook.png'
import IconGoogle from './icons/google.png'
import IconTwitter from './icons/twitter.png'
import IconGit from './icons/github.png'
import IconGooglePlay from './icons/gp.png'
import IconAppStore from './icons/app_store.png'

const mockData = [
  { id: 1, name: 'Home Alone', image: 'https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/CA2CD3523D0C3EE7C6D7FAE38D97BD2C5F649358E28003E1CB10D008ECB9E6EB/scale?width=1200&amp;aspectRatio=1.78&amp;format=webp', time: '1hr: 50mins' },
  { id: 2, name: 'Black Adam', image: 'https://m.media-amazon.com/images/S/pv-target-images/8512ded1639be52f10cd3a86dfa1c15431f0e0fdcc8199a6fcd9085e0dbc993f._SX1080_FMjpg_.jpg', time: '2hr: 10mins' },
  { id: 3, name: 'Back to the Future', image: 'https://deadline.com/wp-content/uploads/2022/07/1A26A865-13F9-4E64-87D3-DC7845F3F4BD.jpeg?w=681&h=383&crop=1', time: '2hr: 50mins' },
  { id: 4, name: 'Avengers', image: 'https://cdn.britannica.com/60/182360-050-CD8878D6/Avengers-Age-of-Ultron-Joss-Whedon.jpg', time: '2hr: 30mins' },
];

function App() {
  const handleCardClick = (id) => {
    console.log(`Film ID: ${id}`);
  };
  
  return (
    <div className="App">
      <header>
        <NavMenu />
      </header>
      <div className='SingleCard'>
        {mockData.map((film) => (
            <SingleCard
              id={film.id}
              name={film.name}
              time={film.time}
              image={film.image}
              handleClick={handleCardClick}
            />
        ))}
      </div>
      <footer className='Footer'>
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
