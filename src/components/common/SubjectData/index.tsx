import React from 'react';
import { Tooltip } from 'antd';
import { shortDepartmentName } from '@/helpers/utils';
import './index.scss';

interface Props {
  title: string,
  professor: string | null,
  department: string | null,
  color?: string,
}

export default function SubjectData({
  title, professor, department, color,
}: Props) {
  return (
    <div className="row-data">
      <div className="subject-name">
        {color && (<div className="bookmark" style={{ borderLeftColor: color, borderRightColor: color }} />)}
        <span>{title}</span>
      </div>
      <div className="color-black-50">
        {professor && (<span className="professor">{professor}</span>)}
        {department && (
          <Tooltip title={department} placement="right">
            <span className="department bg-black-10">{shortDepartmentName(department)}</span>
          </Tooltip>
        )}
      </div>
    </div>
  );
}

SubjectData.defaultProps = {
  color: null,
};
