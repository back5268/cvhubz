import { Switch } from '@material-tailwind/react';
import React from 'react';

const Switchz = (props) => {
  const { label, ...prop } = props;

  return <Switch color="orange" label={label} {...prop} />;
};

export default Switchz;
