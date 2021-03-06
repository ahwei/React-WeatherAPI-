import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography, Avatar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import WeatherCard from "./weatherCard";

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
        <Grid className={classes.notfound} container justifyContent={"center"}>
          <Typography>not found</Typography>
        </Grid>
      )}

      {today && today?.status === 200 && <WeatherCard today={today} />}
    </Grid>
  );
};

const useStyles = makeStyles((theme) => ({
  notfound: {
    background: "#ff00006e",
    border: "1px solid red",
  },
}));

Result.propTypes = {};

export default Result;
