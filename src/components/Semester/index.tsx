import React from 'react';
import { Select } from 'antd';
import { Trans, useTranslation } from 'react-i18next';
import './index.scss';

export default function Semester(
  { semester, setSemester }: { semester: number, setSemester: (value: number) => void },
) {
  useTranslation();

  return (
    <div className="semester">
      <Select value={semester} onChange={(value) => setSemester(value)} className="select">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
          <Select.Option key={item} value={item} className="semester-option">
            <Trans i18nKey="common.components.semester" values={{ semester: item }} />
          </Select.Option>
        ))}
      </Select>
    </div>
  );
}
