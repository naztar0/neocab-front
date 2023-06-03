import { createSlice } from '@reduxjs/toolkit';
import {
  getFaqs,
  addFaq,
  editFaq,
  removeFaq,
} from '@/store/actions/faqs';

const initialState = {
  faqs: [],
  isLoading: false,
  dataSwitch: false,
};

export const faqSlice = createSlice({
  name: 'faq',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFaqs.fulfilled, (state, action) => {
      state.faqs = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getFaqs.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getFaqs.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(addFaq.fulfilled, (state) => {
      state.dataSwitch = !state.dataSwitch;
      state.isLoading = false;
    });
    builder.addCase(addFaq.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addFaq.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(editFaq.fulfilled, (state) => {
      state.dataSwitch = !state.dataSwitch;
      state.isLoading = false;
    });
    builder.addCase(editFaq.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editFaq.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(removeFaq.fulfilled, (state) => {
      state.dataSwitch = !state.dataSwitch;
      state.isLoading = false;
    });
    builder.addCase(removeFaq.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(removeFaq.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default faqSlice.reducer;
