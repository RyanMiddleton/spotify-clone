import React from 'react'
import "./Body.css";
import Header from './Header';
import { useDataLayerValue } from './DataLayer';
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import SongRow from "./SongRow";

function Body({ spotify }) {
  const [{ discover_weekly }, dispatch] =useDataLayerValue();

  const playPlaylist = (id) => {
    spotify.play({
      context_uri: `spotify:playlist:37i9dQZEVXcGmxaUX9dPJm`,
    })
    .then((res) => {
      spotify.getMyCurrentPlayingTrack().then((r) => {
        dispatch({
          type: "SET_ITEM",
          item: r.item,
        });
        dispatch({
          type: "SET_PLAYING",
          playing: true,
        });
      });
    });
  };

  const play = ({
  spotify_uri,
  playerInstance: {
    _options: {
      getOAuthToken,
      id
    }
  }
}) => {
  getOAuthToken(access_token => {
    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
      method: 'PUT',
      body: JSON.stringify({ uris: [spotify_uri] }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`
      },
    });
  });
};

  const playSong = (id) => {
    play({
      spotify_uri: [`spotify:track:${id}`],
      
    })
    .then((res) => {
      spotify.getMyCurrentPlayingtrack().then((r) => {
        dispatch({
          type:"SET_ITEM",
          item: r.item,
        });
        dispatch({
          type: "SET_PLAYING",
          playing: true,
        });
      });
    });
  };
  
  return (
    <div className="body">
      <Header spotify={spotify}/>

      <div className="body__info">
        <img src={discover_weekly?.images[0].url} alt=""/>
        <div className="body__infoText">
          <strong>PLAYLIST</strong>
          <h2>Discover Weekly</h2>
          <p>{discover_weekly?.description}</p>
        </div>
      </div>
      <div className="body__songs">
        <div className="body__icons">
          <PlayCircleFilledIcon className="body__shuffle"
            onClick={playPlaylist}/>
          <FavoriteIcon fontSize="large"/>
          <MoreHorizIcon />
        </div>

        {discover_weekly?.tracks.items.map(item => (
          <SongRow onClick={playSong} track={item.track} />
        ))}
      </div>
    </div>
  );
}

export default Body
