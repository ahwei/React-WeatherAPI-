import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Divider,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineSearch } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import HistoryItem from "./historyItem";

const HistoryList = (props) => {
  const classes = useStyles();

  const historys = useSelector((state) => state.weather.historys);

  return (
    <Grid className={classes.container}>
      <Typography variant="h4">Search Histroy</Typography>
      <Divider sx={{ background: "#000" }} />
      <Grid container>
        {historys.map((_, _i) => (
          <HistoryItem key={_i} _={_} _i={_i} />
        ))}
      </Grid>

      {historys.length == 0 && (
        <Grid container justifyContent={"center"} className={classes.norecord}>
          No Record
        </Grid>
      )}
    </Grid>
  );
};

HistoryList.propTypes = {};

const useStyles = makeStyles((theme) => ({
  container: { paddingTop: 10, paddingBottom: 10 },
  norecord: { paddingTop: 20, paddingBottom: 20 },
}));

export default HistoryList;
