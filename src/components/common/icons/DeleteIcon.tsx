import React from 'react';
import CrossSVG from '../../../misc/images/Cross.svg';

const DeleteIcon = ({ width = 12 }) => {
  return <img src={CrossSVG} alt='Delete' width={`${width}px`} />;
};

export default DeleteIcon;
