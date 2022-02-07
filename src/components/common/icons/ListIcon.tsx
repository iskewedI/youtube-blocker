import ListSVG from '../../../misc/images/List.svg';

const ListIcon = ({ width = 12, height = 12, classes = '' }) => {
  return (
    <img
      className={classes}
      src={ListSVG}
      alt='List'
      width={`${width}px`}
      height={`${height}px`}
    />
  );
};

export default ListIcon;
