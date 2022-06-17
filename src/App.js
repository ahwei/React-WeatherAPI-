import React from "react";
import {
  Grid,
  Container,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import axios from "axios";

const rounddown = (num) => {
  return Math.floor(num * 100) / 100;
};

function App() {
  //   {
  //   "code": 200,
  //   "msg": "ok",
  //   "data": {
  //     "id": "623a772ff06f711b6cae6f5e",
  //     "code": "AVN-TXCH",
  //     "price": "0.000000000",
  //     "usd": "0.00",
  //     "high": "0.000000000",
  //     "low": "0.000000000",
  //     "base_volume": "0.000",
  //     "usd_volume": "0.00",
  //     "changed": "0.00",
  //     "fully_diluted_market_cap": "0",
  //     "updated_at": "2022-06-17T07:35:03.235Z"
  //   }
  // }

  const [marketList, setMarketList] = React.useState([]);
  const [marketId, setMarketId] = React.useState(null);
  const [marketData, setMarketData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const onGetMarketList = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://testnet10.hash.green/api/v1/markets"
      );

      if (res.data.code == 200) {
        setMarketList(res.data.data);
      } else {
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const onGetMarketData = async (marketId) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://testnet10.hash.green/api/v1/trades/statistics?market_id=${marketId}&duration=24h&filter=true`
      );

      if (res.data.code == 200) {
        setMarketData(res.data.data);
      } else {
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    onGetMarketList();
  }, []);

  React.useEffect(() => {
    if (marketId !== null) {
      onGetMarketData(marketId);
    }
  }, [marketId]);

  return (
    <Container>
      <Grid>
        <TextField
          value={marketId}
          select
          label="Select"
          sx={{ width: 150 }}
          onChange={(e) => setMarketId(e.target.value)}
        >
          {marketList.map((item) => {
            return (
              <MenuItem key={item.id} value={item.id}>
                {item.code}
              </MenuItem>
            );
          })}
        </TextField>
      </Grid>

      {loading && <Typography>loading...</Typography>}

      {!loading && marketData && (
        <Grid container>
          <Grid md={2} sm={12}>
            <Grid container alignItems={"center"}>
              <Typography variant="h6">
                {rounddown(marketData.price)}
              </Typography>
              <Typography>{marketData.changed}</Typography>
            </Grid>
          </Grid>
          <Grid md={10} sm={12}>
            <Grid container>
              <Grid xs={3} md={12}>
                {rounddown(marketData.usd)}
              </Grid>
              <Grid xs={3} md={12}>
                {rounddown(marketData.low)}
              </Grid>
              <Grid xs={3} md={12}>
                {rounddown(marketData.base_volume)}
              </Grid>
              <Grid xs={3} md={12}>
                {rounddown(marketData.usd_volume)}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default App;
