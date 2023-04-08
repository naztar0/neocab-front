import { createSlice } from '@reduxjs/toolkit';
import {
  loginViaAzure,
  loginViaCabinet,
  getAzureLoginUrl,
  logoutAction,
  refreshAction,
} from '@/store/actions/login';

const initialState = {
  isLoading: false,
  isError: false,
  errorCode: 0,
  authorization: {
    token: null,
    expires: null,
  },
  msLoginUrl: null,
  user: null,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    clearError: (state) => {
      state.isError = false;
      state.errorCode = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginViaCabinet.fulfilled, (state, action) => {
      state.authorization = action.payload.authorization;
      state.user = action.payload.user;
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(loginViaCabinet.rejected, (state, action) => {
      const code = action.error?.message?.slice(-3);
      if (!Number.isNaN(Number(code))) {
        state.errorCode = Number(code);
      }
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(loginViaCabinet.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(loginViaAzure.fulfilled, (state, action) => {
      state.authorization = action.payload.authorization;
      state.user = action.payload.user;
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(loginViaAzure.rejected, (state, action) => {
      const code = action.error?.message?.slice(-3);
      if (!Number.isNaN(Number(code))) {
        state.errorCode = Number(code);
      }
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(loginViaAzure.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getAzureLoginUrl.fulfilled, (state, action) => {
      state.msLoginUrl = action.payload.url;
      state.isLoading = false;
    });
    builder.addCase(getAzureLoginUrl.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getAzureLoginUrl.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(logoutAction.fulfilled, (state) => {
      state.authorization = initialState.authorization;
      state.isLoading = false;
    });
    builder.addCase(logoutAction.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(logoutAction.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(refreshAction.fulfilled, (state, action) => {
      state.authorization = action.payload.authorization;
      state.user = action.payload.user;
      state.isLoading = false;
    });
    builder.addCase(refreshAction.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(refreshAction.pending, (state) => {
      state.isLoading = true;
    });
  },
});

export const { clearError } = loginSlice.actions;

export default loginSlice.reducer;
