import { createRef } from 'react';
import Button from '../common/Button';
import SettingsIcon from '../common/icons/SettingsIcon';
import TimerIcon from '../common/icons/TimerIcon';
import Scrollable from '../Scrollable/Scrollable';
import styles from './navbar.module.css';
import { uuid } from '../../service/utils';
import { Screens } from '../../types/enums';

interface NavbarProps {
  profiles: Profile[];
  activeProfile: string;
  onChangeScreen: (newScreen: Screens) => void;
  onProfileClick: (id: string) => void;
}
/***
 * Renders a Scrollable row with buttons as profiles, and a container for screen-links buttons
 * @param {Profile[]} profiles - Array of profiles to be rendered
 * @param {string} activeProfile - ID of the current active profile
 * @param {(id: string) => void} onProfileClick - Callback to be called in the profile button onClick event
 * @param {(newScreen: Screens) => void} onChangeScreen - Callback to be called to fires the change screen event.
 */
const Navbar = ({
  profiles,
  activeProfile,
  onProfileClick,
  onChangeScreen,
}: NavbarProps) => {
  const containerRef = createRef<HTMLDivElement>();

  return (
    <div className={styles.container} ref={containerRef}>
      <Scrollable
        containerClasses={styles.profilesContainer}
        containerRef={containerRef}
        itemsWidth={74}
        itemsPerPage={4}
      >
        {profiles.map(({ id, title }) => (
          <Button
            key={uuid()}
            classes={`${styles.profile} ${
              (id === activeProfile && styles.profileActive) || ''
            }`}
            onClick={() => onProfileClick(id)}
            children={<div className={styles.profileTitle}>{title}</div>}
          />
        ))}
      </Scrollable>

      <div className={styles.buttonsContainer}>
        <Button
          classes={styles.navbarBtn}
          children={<TimerIcon width={20} />}
          onClick={() => onChangeScreen(Screens.Timer)}
        />
        <Button
          classes={styles.navbarBtn}
          children={<SettingsIcon width={20} />}
          onClick={() => onChangeScreen(Screens.Settings)}
        />
      </div>
    </div>
  );
};

export default Navbar;
