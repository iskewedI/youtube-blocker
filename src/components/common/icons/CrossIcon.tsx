import CrossSVG from '../../../misc/images/Cross.svg';

const CrossIcon = ({ width = 12, height = 12, classes = '' }) => {
  return (
    <img
      className={classes}
      src={CrossSVG}
      alt='Cross'
      width={`${width}px`}
      height={`${height}px`}
    />
  );
};

export default CrossIcon;
