import React from 'react';
import { Tooltip } from 'antd';
import { shortDepartmentName } from '@/helpers/utils';
import './index.scss';

interface Props {
  title: string,
  professor: string | null,
  department: string | null,
}

export default function SubjectData({ title, professor, department }: Props) {
  return (
    <div className="row-data">
      <span className="subject-name">{title}</span>
      <div>
        {professor && (<span className="professor">{professor}</span>)}
        {department && (
          <Tooltip title={department} placement="right">
            <span className="department">{shortDepartmentName(department)}</span>
          </Tooltip>
        )}
      </div>
    </div>
  );
}
