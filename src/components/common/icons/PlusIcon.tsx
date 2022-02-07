import PlusSVG from '../../../misc/images/Plus.svg';

const PlusIcon = ({ width = 12, height = 12, classes = '' }) => {
  return (
    <img
      className={classes}
      src={PlusSVG}
      alt='Plus'
      width={`${width}px`}
      height={`${height}px`}
    />
  );
};

export default PlusIcon;
