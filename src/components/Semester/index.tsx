import React from 'react';
import { Select } from 'antd';
import './index.scss';

export default function Semester(
  { semester, setSemester }: { semester: number, setSemester: (value: number) => void },
) {
  return (
    <div className="semester">
      <Select value={semester} onChange={(value) => setSemester(value)} className="select">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
          <Select.Option key={item} value={item} className="semester-option">{`${'Semester'} ${item}`}</Select.Option>
        ))}
      </Select>
    </div>
  );
}
