import { useDispatch } from 'react-redux';
import { changeScreen } from '../../../store/screenReducer';
import { Screens } from '../../../types/enums';
import Settings from './Settings';

const SettingsController = () => {
  const dispatch = useDispatch();

  const handleChangeScreen = () => {
    dispatch(changeScreen(Screens.Profiles));
  };

  return <Settings onCancel={handleChangeScreen} onDone={handleChangeScreen} />;
};

export default SettingsController;
