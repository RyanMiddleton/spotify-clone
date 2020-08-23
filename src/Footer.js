import React from 'react'
import "./Footer.css";
import { makeStyles } from '@material-ui/core/styles';
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleFilledOutlined";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import RepeatIcon from "@material-ui/icons/Repeat";
import { Grid, Slider } from "@material-ui/core";
import PlaylistPlayIcon from "@material-ui/icons/PlaylistPlay";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import { sizing } from '@material-ui/system';

const useStyles = makeStyles({
  root: {
    width: 20,
  },
  input: {
    width: 42,
  },
});

function Footer() {
const classes = useStyles();
const [value, setValue] = React.useState(30);

const handleSliderChange = (event, newValue) => {
  setValue(newValue);
};

const handleInputChange = (event) => {
  setValue(event.target.value == '' ? '' : Number(event.target.value));
};

const handleBlur = () => {
  if (value < 0) {
    setValue(0);
  } else if (value > 100) {
    setValue(100);
  }
};

  return (
    <div className="footer">
      <div className="footer_left">
        <img src="" alt="" />
        <div className="footer__songInfo">
          <h4>Yeah!</h4>
          <p>Usher</p>
        </div>
      </div>

      <div className="footer_center">
        <ShuffleIcon className="footer__green" />
        <SkipPreviousIcon className="footer__icon" />
        <PlayCircleOutlineIcon fontSize="large" className="footer__icon"/>
        <SkipNextIcon className="footer__icon" />
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
