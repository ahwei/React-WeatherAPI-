import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Divider,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const Search = (props) => {
  const classes = useStyles();

  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  return (
    <Grid>
      <Typography variant="h4">Today's Weather</Typography>
      <Divider />
      <Stack spacing={2} direction="row" className={classes.container}>
        <TextField
          value={city}
          label="City"
          onChange={(e) => setCity(e.target.value)}
        />

        <TextField
          value={country}
          label="Country"
          onChange={(e) => setCountry(e.target.value)}
        />

        <Button variant="contained" className={classes.btn}>
          Search
        </Button>
        <Button variant="contained" className={classes.btn}>
          Clear
        </Button>
      </Stack>
    </Grid>
  );
};

Search.propTypes = {};

const useStyles = makeStyles((theme) => ({
  container: { paddingTop: 10, paddingBottom: 10 },
  btn: {
    width: 100,
  },
}));

export default Search;
