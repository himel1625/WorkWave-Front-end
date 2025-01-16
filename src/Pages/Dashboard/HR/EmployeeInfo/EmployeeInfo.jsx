import React from 'react';
import { useParams } from 'react-router-dom';

const EmployeeInfo = () => {
  const { id } = useParams();
  console.log(id);

  return <div>This is EmployeeInfo. ID: {id}</div>;
};

export default EmployeeInfo;
