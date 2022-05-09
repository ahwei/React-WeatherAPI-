import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

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

      return { ...resWeather.data, status: 200, location: resLatLon.data[0] };
    } else {
      return { status: 0 };
    }
  }
);

const initialState = { today: null, loading: false, historys: [] };

export const counterSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    deleteHistoryItem: (state) => {},
  },
  extraReducers: {
    [getTodayWeather.pending]: (state, action) => {
      state.today = null;
      state.loading = true;
    },
    [getTodayWeather.fulfilled]: (state, action) => {
      state.today = action.payload;
      if (action.payload.status == 200) {
        state.historys = [...state.historys, action.payload];
      }
      state.loading = false;
    },
    [getTodayWeather.rejected]: (state, action) => {
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { deleteHistoryItem } = counterSlice.actions;

export default counterSlice.reducer;
