// noinspection JSUnusedGlobalSymbols

declare module '*.svg' {
  import React = require('react');

  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

interface Timestamps {
  created_at: string;
  updated_at: string;
}

interface Pagination<T> {
  current_page: number;
  last_page: number;
  per_page: number;
  data: Array<T>;
  from: number;
  to: number;
  first_page_url: string;
  prev_page_url: string;
  next_page_url: string;
  last_page_url: string;
  total: number;
  path: string;
  links: Array<{
    url: ?string;
    label: string;
    active: boolean;
  }>;
}

interface BaseQueryParams {
  page?: number;
  perPage?: number;
}

type OrderType = 'asc' | 'desc';
