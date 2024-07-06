import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 1,
  itemsPerPage: 6,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
    },
  },
});

export const { setPage, setItemsPerPage } = paginationSlice.actions;

export default paginationSlice.reducer;
