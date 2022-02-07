import TickSVG from '../../../misc/images/Tick.svg';

const TickIcon = ({ width = 12, height = 12, classes = '' }) => {
  return (
    <img
      className={classes}
      src={TickSVG}
      alt='Tick'
      width={`${width}px`}
      height={`${height}px`}
    />
  );
};

export default TickIcon;
