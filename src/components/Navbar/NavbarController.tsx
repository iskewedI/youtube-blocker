import { useState } from 'react';
import Navbar from './Navbar';
import { uuid } from '../../service/utils';
import { Screens } from '../../types/enums';

const profiles: Profile[] = [
  { title: 'Study', id: uuid() },
  { title: 'Work', id: uuid() },
  { title: 'Kids', id: uuid() },
  { title: 'Games', id: uuid() },
];

interface NavbarControllerProps {
  onChangeScreen: (newScreen: Screens) => void;
  currentScreen: Screens;
}

/***
 * Controller for the Navbar view. Handles the state functions and click events, and all the store calls/operations.
 */
const NavbarController = ({ onChangeScreen, currentScreen }: NavbarControllerProps) => {
  const [active, setActive] = useState<string>(profiles[0]?.id || '');

  /***
   * Sets the new active profile by its id.
   * @param {string} id - Id of the clicked profile-
   */
  const handleProfileClick = (id: string) => {
    setActive(id);
    if (currentScreen !== Screens.Profiles) {
      onChangeScreen(Screens.Profiles);
    }
  };

  return (
    <Navbar
      profiles={profiles}
      onProfileClick={handleProfileClick}
      onChangeScreen={onChangeScreen}
      activeProfile={active}
    />
  );
};

export default NavbarController;
