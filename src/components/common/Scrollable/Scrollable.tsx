import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { uuid } from '../../../service/utils';
import Button from '../Button';
import ArrowIcon, { Direction } from '../icons/ArrowIcon';
import styles from './scrollable.module.css';

const CHILDREN_CONTAINER_ID = uuid();

interface ScrollableProps {
  containerRef: React.RefObject<HTMLDivElement>;
  containerClasses?: string;
  slideTimeMs?: number;
  children: React.ReactNode;
  itemsWidth: number;
  itemsPerPage: number;
}

/***
 * Generic component that expects a list of childs as children and handles all the horizontal scroll and pagination logic.
 * @param {React.RefObject<HTMLDivElement>} containerRef - Object ref of the container of this component.
 * @param {string} containerClasses - Optional classes to be passed to the rendered container of this component.
 * @param {number} slideTimeMs - Slide animation time in milliseconds. If lower, the animation will be faster.
 * @param {React.ReactNode} children - List of react node childs.
 * @param {number} itemsWidth - Expected width of each child.
 * @param {number} itemsPerPage - Amount of items per page that should be rendered.
 */
const Scrollable = ({
  containerRef,
  containerClasses = '',
  slideTimeMs = 250,
  children,
  itemsWidth,
  itemsPerPage,
}: ScrollableProps) => {
  const [scrollState, setScrollState] = useState<ScrollState>({
    isScrolling: false,
    itemsOffset: {
      x: 0,
      y: 0,
    },
    currentPage: 0,
    pagesCount: 0,
  });
  const [mappedChildren, setMappedChildren] = useState<React.ReactNode[]>([]);
  const [isHover, setIsHover] = useState(false);

  const { currentPage, pagesCount } = scrollState;

  const canScrollLeft = currentPage > 0;
  const canScrollRight = currentPage < pagesCount;

  const childrenRefs = useRef<React.RefObject<Element>[]>(
    Array.from(React.Children.toArray(children), () => React.createRef<Element>())
  );

  /***
   * Used on the click of the Left|Right arrows button to handle the scroll operation.
   * It multiplies the itemsPerPage by the itemsWidth to get the distance to move.
   * @param {Direction} direction - The direction to where do the scroll
   */
  const handleBtnScroll = (direction: Direction) => {
    const { isScrolling, itemsOffset, currentPage } = scrollState;

    if (isScrolling) return;

    let newOffset: ScrollState['itemsOffset'] = { ...itemsOffset };
    let newPage = currentPage;

    if (direction === Direction.Left) {
      if (!canScrollLeft) return;

      const distance = itemsPerPage * itemsWidth;

      newOffset.x = Math.round(newOffset.x + distance);
      newPage -= 1;
    }

    if (direction === Direction.Right) {
      if (!canScrollRight) return;

      const distance = -itemsPerPage * itemsWidth;

      newOffset.x = newOffset.x + distance;
      newPage += 1;
    }

    setScrollState(state => ({ ...state, isScrolling: true, itemsOffset: newOffset }));

    setTimeout(
      () =>
        setScrollState(state => ({ ...state, isScrolling: false, currentPage: newPage })),
      slideTimeMs - 100
    );
  };

  /***
   * Returns the data that is only accesible by using the native DOM.
   * @param {React.RefObject<Element>[]} childrenRefs - Array of childs refs object. Used to get the total pages.
   * @param {HTMLDivElement} container - The reference to the div element container. Used to get the current scrollable container width.
   */
  const getDOMData = useCallback(
    (childrenRefs: React.RefObject<Element>[], container: HTMLDivElement): DOMData => {
      const data: DOMData = {
        containerWidth: 0,
        pagesCount: 0,
      };

      const childrenContainer = Array.from(container.children).find(
        child => child.id === CHILDREN_CONTAINER_ID
      );

      if (childrenContainer) {
        const containerInfo = childrenContainer.getBoundingClientRect();

        data.containerWidth = containerInfo.width;
      }

      let currentPageWidth = 0;

      const totalPages = childrenRefs.reduce((currentPageNumber, currentRef): number => {
        if (!currentRef.current) return currentPageNumber;

        const { width } = currentRef.current.getBoundingClientRect();

        currentPageWidth += width;

        if (currentPageWidth >= data.containerWidth) {
          currentPageWidth = 0;

          return currentPageNumber + 1;
        }

        return currentPageNumber;
      }, 0);

      data.pagesCount = totalPages;

      return data;
    },
    []
  );

  /***
   * Calls getDOMData if there're all the refs provided and then sets the data to the state.
   * @param {React.RefObject<Element>[]} childrenRefs - Array of childs refs object.

   */
  const setDOMInfo = useCallback(
    (childrenRefs: React.RefObject<Element>[]): void => {
      let checkInterval: NodeJS.Timeout;

      checkInterval = setInterval(() => {
        if (childrenRefs[0] && childrenRefs[0].current && containerRef.current) {
          const { pagesCount } = getDOMData(childrenRefs, containerRef.current);

          setScrollState(state => ({ ...state, pagesCount }));

          clearInterval(checkInterval);
        }
      }, 50);
    },
    [setScrollState, getDOMData, containerRef]
  );

  /***
   * Hook used to map the children element and set its dynamic values (like the style with a new transform value when moving).
   */
  useLayoutEffect(() => {
    const refsObject: React.RefObject<Element>[] = [];

    const mapped = React.Children.map(children, (child, index) => {
      if (!React.isValidElement<ScrollableChildren>(child)) {
        return child;
      }

      const style: React.CSSProperties = {
        transition: `transform ${slideTimeMs}ms ease-in-out`,
      };

      if (scrollState.itemsOffset.x) {
        style.transform = `translateX(${scrollState.itemsOffset.x}px)`;
      }

      refsObject.push(childrenRefs.current[index]);

      return React.cloneElement(child, {
        style,
        ref: childrenRefs.current[index],
        ...child.props,
      });
    });

    setDOMInfo(refsObject);

    mapped && setMappedChildren(mapped);
  }, [
    children,
    scrollState.isScrolling,
    scrollState.itemsOffset,
    slideTimeMs,
    setDOMInfo,
  ]);

  return (
    <React.Fragment>
      <div
        id={CHILDREN_CONTAINER_ID}
        className={`${containerClasses} ${styles.container}`}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {canScrollLeft && isHover && (
          <div className={styles.arrow}>
            <Button
              onClick={() => handleBtnScroll(Direction.Left)}
              classes={styles.arrowBtn}
            >
              <ArrowIcon width={10} height={10} />
            </Button>
          </div>
        )}
        {mappedChildren}
        {canScrollRight && isHover && (
          <div className={`${styles.arrow} ${styles.rightArrow}`}>
            <Button
              onClick={() => handleBtnScroll(Direction.Right)}
              classes={styles.arrowBtn}
            >
              <ArrowIcon direction={Direction.Right} width={10} height={10} />
            </Button>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Scrollable;
