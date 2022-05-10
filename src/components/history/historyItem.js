import React from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Divider,
  Typography,
  TextField,
  IconButton,
  Stack,
} from "@mui/material";
import { makeStyles, useTheme } from "@mui/styles";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineSearch } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import { deleteHistoryItem, reGetTodayWeather } from "../../store/weatherSlice";

const HistoryItem = ({ _, _i }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Grid item xs={12} className={classes.container}>
      <Grid container justifyContent={"space-between"}>
        <Grid>
          <Stack
            spacing={2}
            direction="row"
            className={classes.container}
            alignItems={"center"}
          >
            <Typography>
              {_i + 1}.{_?.name},{_?.country}
            </Typography>
          </Stack>
        </Grid>
        <Stack
          spacing={2}
          direction="row"
          className={classes.container}
          justifyContent="flex-end"
          alignItems={"center"}
        >
          <Typography> {_?.time}</Typography>

          <IconButton
            sx={{ background: "#dedede" }}
            onClick={() => {
              dispatch(reGetTodayWeather({ ..._, _i }));
            }}
          >
            <AiOutlineSearch />
          </IconButton>
          <IconButton
            sx={{ background: "#dedede" }}
            onClick={() => {
              dispatch(deleteHistoryItem(_i));
            }}
          >
            <FaRegTrashAlt />
          </IconButton>
        </Stack>
      </Grid>
      <Divider />
    </Grid>
  );
};

HistoryItem.propTypes = {};

const useStyles = makeStyles((theme) => ({
  container: { paddingTop: 10, paddingBottom: 10 },
  iconbutton: { backgroundColor: "#000", color: "red" },
}));

export default HistoryItem;
