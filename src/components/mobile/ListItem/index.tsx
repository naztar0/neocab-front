import React from 'react';
import { Skeleton } from 'antd';
import './index.scss';

interface Props {
  title: string | React.ReactNode,
  value: string | React.ReactNode,
  icon?: React.ReactNode,
  column?: boolean,
  loading?: boolean,
}

export default function ListItem({
  icon, title, value, column, loading,
}: Props) {
  return (
    <div className={`item ${column ? 'col' : 'row'}`}>
      <Skeleton loading={loading} paragraph={{ rows: 1 }} active>
        <div>
          <div className="label">
            {icon}
            <span className="title">{title}</span>
          </div>
          <span className="value">{value}</span>
        </div>
      </Skeleton>
    </div>
  );
}

ListItem.defaultProps = {
  icon: null,
  column: false,
  loading: false,
};
