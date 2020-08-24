import React, { useEffect, useState} from 'react'
import "./Footer.css";
import { useDataLayerValue } from "./DataLayer"
import { makeStyles } from '@material-ui/core/styles';
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleFilledOutlined";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import { Grid, Slider } from "@material-ui/core";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import SpotifyWebApi from 'spotify-web-api-js';


function Footer({ spotify }) {
const [{ token, item, playing }, dispatch] = useDataLayerValue();
const [ value, setValue ] = React.useState(30);

useEffect(() => {
  spotify.getMyCurrentPlaybackState().then((r) => {
    console.log(r);

    dispatch({
      type: "SET_PLAYING",
      playing: r.is_playing,
    });

    dispatch({
      type: "SET_ITEM",
      itme: r.item,
    });
  });
}, [spotify]);

const handlePlayPause = () => {
  if (playing) {
    spotify.pause();
    dispatch({
      type: "SET_PLAYING",
      playing: false,
    });
  } else {
    spotify.play();
    dispatch({
      type: "SET_PLAYING",
      playing: true,
    });
  }
};

const skipNext = () => {
  spotify.skipToNext();
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
};

const skipPrevious = () => {
  spotify.skipToPrevious();
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
};

const handleSliderChange = (event, newValue) => {
  setValue(newValue);
};

  return (
    <div className="footer">
      <div className="footer_left">
        <img src="" alt="" />
        {item ? (
        <div className="footer__songInfo">
          <h4>{item.name}</h4>
          <p>{item.artists.map((artist) => artist.name).join(", ")}</p>
        </div>
        ) : (
          <div className="footer__songInfo">
            <h4>No song is playing</h4>
          </div>
        )}
      </div>

      <div className="footer_center">
        <ShuffleIcon className="footer__green" />
        <SkipPreviousIcon onClick={skipPrevious} className="footer__icon" />
        {playing ? (
        <PauseCircleOutlineIcon onClick={handlePlayPause} fontSize="large" className="footer__icon"/>
        ) : (
        <PlayCircleOutlineIcon onClick={handlePlayPause} fontSize="large" className="footer__icon"/>
        )}
        <SkipNextIcon onClick={skipNext} className="footer__icon" />
        <RepeatIcon className="footer__green" />
      </div>

      <div className="footer_right">
        <Grid container spacing={2}>
          <Grid item>
            <PlaylistPlayIcon />
          </Grid>
          <Grid item>
            <VolumeDownIcon />
          </Grid>
          <Grid item xs={4}>
            <Slider
              value={typeof value === 'number' ? value : 0}
              onChange={handleSliderChange} 
              aria-labelledby="continuous-slider" />
          </Grid>
        </Grid>

      </div>
    </div>
  )
}

export default Footer
