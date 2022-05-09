import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid, Divider, Typography, TextField, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";

const HistoryList = (props) => {
  const classes = useStyles();

  return (
    <Grid>
      <Typography variant="h4">Search Histroy</Typography>
      <Divider />
      <Grid
        container
        flexDirection={"column"}
        className={classes.container}
      ></Grid>
    </Grid>
  );
};

HistoryList.propTypes = {};

const useStyles = makeStyles((theme) => ({
  container: { paddingTop: 10, paddingBottom: 10 },
}));

export default HistoryList;
