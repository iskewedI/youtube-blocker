import { useDispatch } from 'react-redux';
import { uuid } from '../../service/utils';
import DayPicker from './DayPicker';
import { setProfileData } from '../../store/profileReducer';

interface DayPickerControllerProps {
  profileId: string;
  enabled?: boolean;
  dayStates: boolean[];
}

const dayTitles = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

/***
 * Controller for the DayPicker. It handles the click events, and the calls/operations to the store.
 * @param {string} profileId - Current profile id.
 * @param {boolean[]} dayStates - Boolean array that contains the enable/disable state for each day.
 * @param {boolean} enabled - Boolean that defines if the entire component should be enabled or disabled to the end user. If disabled, the component is in grey scale and is
 * not usable
 */
const DayPickerController = ({
  profileId,
  dayStates,
  enabled = true,
}: DayPickerControllerProps) => {
  const days = dayStates.map((state, i) => ({
    active: state,
    title: dayTitles[i],
    id: uuid(),
  }));

  const dispatch = useDispatch();

  /***
   * Sets the new active day by its id.
   * @param {string} id - Id of the clicked day.
   */
  const handleDayClick = (id: string) => {
    if (!enabled) return;

    const index = days.findIndex(day => day.id === id);
    if (index < 0)
      return console.error('Index not found in handleDayClick => ', index, days);

    const newDays = [...days];

    newDays[index].active = !newDays[index].active;

    dispatch(
      setProfileData(profileId, { enabledInDays: newDays.map(day => day.active) })
    );
  };

  return <DayPicker days={days} onDayClick={handleDayClick} enabled={enabled} />;
};

export default DayPickerController;
