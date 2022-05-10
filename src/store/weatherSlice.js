import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";
import moment from "moment";

export const getTodayWeather = createAsyncThunk(
  "weather/today",
  async (routeParams, { getState }) => {
    const resLatLon = await api(
      `geo/1.0/direct?q=${routeParams.city || routeParams.country}&limit=1`,
      routeParams
    );

    if (resLatLon.data[0]) {
      const { lat, lon } = resLatLon.data[0];
      const resWeather = await api(
        `data/2.5/weather?lat=${lat}&lon=${lon}`,
        routeParams
      );

      return {
        ...resWeather.data,
        status: 200,
        location: {
          ...resLatLon.data[0],
          time: moment().format("hh:mm A"),
        },
      };
    } else {
      return { status: 0 };
    }
  }
);

export const reGetTodayWeather = createAsyncThunk(
  "weather/today_re",
  async (routeParams, { getState }) => {
    console.log("routeParams", routeParams);
    const { lat, lon } = routeParams;
    const resWeather = await api(
      `data/2.5/weather?lat=${lat}&lon=${lon}`,
      routeParams
    );

    return {
      ...resWeather.data,
      status: 200,
      location: {
        ...routeParams,
        time: moment().format("hh:mm A"),
      },
    };
  }
);

const initialState = { today: null, loading: false, historys: [] };

export const counterSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    deleteHistoryItem: (state, action) => {
      state.historys = state.historys.filter((_, _i) => action.payload !== _i);
    },
  },
  extraReducers: {
    //
    [getTodayWeather.pending]: (state, action) => {
      state.today = null;
      state.loading = true;
    },
    [getTodayWeather.fulfilled]: (state, action) => {
      state.today = action.payload;
      if (action.payload.status == 200) {
        state.historys = [action.payload.location, ...state.historys];
      }
      state.loading = false;
    },
    [getTodayWeather.rejected]: (state, action) => {
      state.loading = false;
    },
    //reGetTodayWeather
    [reGetTodayWeather.pending]: (state, action) => {
      state.today = null;
      state.loading = true;
    },
    [reGetTodayWeather.fulfilled]: (state, action) => {
      state.today = action.payload;
      if (action.payload.status == 200) {
        const newLoaction = action.payload.location;

        const oldLoaction = state.historys.filter(
          (_, _i) => newLoaction._i !== _i
        );
        state.historys = [newLoaction, ...oldLoaction];
      }
      state.loading = false;
    },
    [reGetTodayWeather.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { deleteHistoryItem } = counterSlice.actions;

export default counterSlice.reducer;
