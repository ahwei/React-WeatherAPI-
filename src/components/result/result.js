import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography, Avatar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { classes } from "istanbul-lib-coverage";

const Result = (props) => {
  const classes = useStyles();
  const loading = useSelector((state) => state.weather.loading);
  const today = useSelector((state) => state.weather.today);

  return (
    <Grid>
      <Grid container justifyContent={"center"}>
        {loading && <Typography>loading...</Typography>}
      </Grid>

      {today && today?.status === 0 && (
        <Grid>
          <Typography>not found</Typography>
        </Grid>
      )}

      {today && today?.status === 200 && (
        <Grid>
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
          <Typography variant="body2">
            Humidity:{today?.main?.humidity}%
          </Typography>
          <Typography variant="body2">
            {/* Time:{today?.weather[0].description} */}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({}));

Result.propTypes = {};

export default Result;
