import { getAxiosInstance } from '@/requests/config';

export const fetchFaqs = async (lang: string) => getAxiosInstance().get(
  `/api/faq-items/${lang}`,
);

export const postFaq = async (data : any) => getAxiosInstance().post(
  '/api/faq-items',
  data,
);

export const patchFaq = async (faq: number, data: any) => getAxiosInstance().patch(
  `/api/faq-items/${faq}`,
  data,
);

export const deleteFaq = async (faq: number) => getAxiosInstance().delete(
  `/api/faq-items/${faq}`,
);
