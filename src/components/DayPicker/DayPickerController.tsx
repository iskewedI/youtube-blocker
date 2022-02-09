import { useState } from 'react';
import { uuid } from '../../service/utils';
import DayPicker, { IDay } from './DayPicker';

interface IDayPickerControllerProps {
  classes?: string;
}

const DayPickerController = ({ classes }: IDayPickerControllerProps) => {
  const [days, setDays] = useState<IDay[]>([
    { id: uuid(), title: 'Mo', active: false },
    { id: uuid(), title: 'Tu', active: true },
    { id: uuid(), title: 'We', active: false },
    { id: uuid(), title: 'Th', active: true },
    { id: uuid(), title: 'Fr', active: true },
    { id: uuid(), title: 'Sa', active: true },
    { id: uuid(), title: 'Su', active: true },
  ]);

  const handleDayClick = (id: string) => {
    const index = days.findIndex(day => day.id === id);
    if (index < 0)
      return console.error('Index not found in handleDayClick => ', index, days);

    const newDays = [...days];

    newDays[index].active = !newDays[index].active;

    setDays(newDays);
  };

  return <DayPicker days={days} onDayClick={handleDayClick} containerClasses={classes} />;
};

export default DayPickerController;
