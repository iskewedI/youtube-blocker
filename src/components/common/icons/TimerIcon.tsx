import TimerSVG from '../../../misc/images/Timer.svg';

const TimerIcon = ({ width = 12 }) => {
  return <img src={TimerSVG} alt='Timer' width={`${width}px`} />;
};

export default TimerIcon;
