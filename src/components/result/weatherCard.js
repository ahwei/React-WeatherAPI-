import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography, Avatar } from "@mui/material";

const weatherCard = ({ today }) => {
  return (
    <Grid sx={{ paddingLeft: 3 }}>
      <Typography variant="body1">
        {today?.location?.name},{today?.location?.country}
      </Typography>
      <Grid container>
        <Avatar
          src={`http://openweathermap.org/img/wn/${today?.weather[0].icon}@2x.png`}
          sx={{ width: 56, height: 56 }}
        />
        <Typography variant="h3">{today?.weather[0].main}</Typography>
      </Grid>
      <Typography variant="body2">
        Description:{today?.weather[0].description}
      </Typography>
      <Typography variant="body2">
        Temperature:{today?.main?.temp_min}°C~{today?.main?.temp_max}°C
      </Typography>
      <Typography variant="body2">Humidity:{today?.main?.humidity}%</Typography>
      <Typography variant="body2">Time:{today?.location?.time}</Typography>
    </Grid>
  );
};

weatherCard.propTypes = {};

export default weatherCard;
