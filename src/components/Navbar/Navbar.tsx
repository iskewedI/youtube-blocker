import { useState, createRef } from 'react';
import Button from '../common/Button';
import SettingsIcon from '../common/icons/SettingsIcon';
import TimerIcon from '../common/icons/TimerIcon';
import Scrollable from '../Scrollable/Scrollable';
import styles from './navbar.module.css';
import { uuid } from '../../service/utils';
import { Screens } from '../../App';

export interface INavbarProps {
  profiles: string[];
  onChangeScreen: (newScreen: Screens) => void;
  currentScreen: Screens;
}

const Navbar = ({ profiles, onChangeScreen, currentScreen }: INavbarProps) => {
  const [active, setActive] = useState<number>(0);

  const handleChange = (index: number) => {
    setActive(index);
    if (currentScreen !== Screens.Profiles) {
      onChangeScreen(Screens.Profiles);
    }
  };

  const containerRef = createRef<HTMLDivElement>();

  return (
    <div className={styles.container} ref={containerRef}>
      <Scrollable
        containerClasses={styles.profilesContainer}
        containerRef={containerRef}
        itemsWidth={74}
        itemsPerPage={4}
      >
        {profiles.map((title, index) => (
          <Button
            key={uuid()}
            classes={`${styles.profile} ${
              (index === active && styles.profileActive) || ''
            }`}
            onClick={() => handleChange(index)}
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
