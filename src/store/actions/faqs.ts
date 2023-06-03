import { createAsyncThunk } from '@reduxjs/toolkit';
import responseHandler from '@/store/actions/config';
import {
  fetchFaqs,
  postFaq,
  patchFaq,
  deleteFaq,
} from '@/requests/faqs';

export const getFaqs = createAsyncThunk(
  'get_faqs',
  async ({ lang }: { lang: string }) => (
    await responseHandler(fetchFaqs(lang))
  ).data,
);

export const addFaq = createAsyncThunk(
  'add_faq',
  async ({ data }: { data: any }) => (
    await responseHandler(postFaq(data))
  ).data,
);

export const editFaq = createAsyncThunk(
  'edit_faq',
  async ({ faq, data }: { faq: number, data: any }) => (
    await responseHandler(patchFaq(faq, data))
  ).data,
);

export const removeFaq = createAsyncThunk(
  'remove_faq',
  async ({ faq }: { faq: number }) => (
    await responseHandler(deleteFaq(faq))
  ).data,
);
