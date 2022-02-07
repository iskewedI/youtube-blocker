import { useState, createRef } from 'react';
import Button from '../common/Button';
import SettingsIcon from '../common/icons/SettingsIcon';
import TimerIcon from '../common/icons/TimerIcon';
import Scrollable from '../Scrollable/Scrollable';
import styles from './navbar.module.css';
import { uuid } from '../../service/utils';

export interface INavbarProps {
  profiles: string[];
}

const Navbar = ({ profiles }: INavbarProps) => {
  const [active, setActive] = useState<number>(0);

  const handleChange = (index: number) => {
    setActive(index);
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
        <Button children={<TimerIcon width={24} />} />
        <Button children={<SettingsIcon width={24} />} />
      </div>
    </div>
  );
};

export default Navbar;
