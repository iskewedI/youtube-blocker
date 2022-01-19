import React, { CSSProperties, useCallback, useLayoutEffect, useState } from 'react';
import { uuid } from '../../service/utils';
import Button from '../common/Button';
import ArrowIcon, { Direction } from '../common/icons/ArrowIcon';
import styles from './scrollable.module.css';

interface DOMData {
  containerWidth: number;
  itemsWidth: number;
  pagesCount: number;
}

interface IRefObject {
  ref?: React.RefObject<Element>;
}

export enum IScrollableType {
  Vertical = 1,
  Horizontal,
}

interface IScrollableChildren {
  style?: CSSProperties;
}

interface IScrollState {
  isScrolling: boolean;
  itemsOffset: {
    x: number;
    y: number;
  };
  currentPage: number;
  pagesCount: number;
  itemsWidth: number;
}

const CHILDREN_CONTAINER_ID = uuid();

export interface IScrollableProps {
  containerRef: React.RefObject<HTMLDivElement>;
  containerClasses?: string;
  slideTimeMs?: number;
  children: React.ReactNode;
}

const Scrollable = ({
  containerRef,
  containerClasses = '',
  slideTimeMs = 250,
  children,
}: IScrollableProps) => {
  const [scrollState, setScrollState] = useState<IScrollState>({
    isScrolling: false,
    itemsOffset: {
      x: 0,
      y: 0,
    },
    currentPage: 0,
    pagesCount: 0,
    itemsWidth: 0,
  });
  const [mappedChildren, setMappedChildren] = useState<React.ReactNode[]>([]);
  const [isHover, setIsHover] = useState(false);

  const { currentPage, pagesCount } = scrollState;

  const canScrollLeft = currentPage > 0;
  const canScrollRight = currentPage < pagesCount;

  const handleBtnScroll = (direction: Direction) => {
    const { isScrolling, itemsOffset, currentPage, itemsWidth } = scrollState;

    if (isScrolling) return;

    let newOffset: IScrollState['itemsOffset'] = { ...itemsOffset };
    let newPage = currentPage;

    if (direction === Direction.Left) {
      if (!canScrollLeft) return;
      const distance = 3 * itemsWidth;

      newOffset.x += distance;
      newPage -= 1;
    }

    if (direction === Direction.Right) {
      if (!canScrollRight) return;
      const distance = -3 * itemsWidth;

      newOffset.x += distance;
      newPage += 1;
    }

    setScrollState(state => ({ ...state, isScrolling: true, itemsOffset: newOffset }));

    setTimeout(
      () =>
        setScrollState(state => ({ ...state, isScrolling: false, currentPage: newPage })),
      slideTimeMs - 100
    );
  };

  const getDOMData = useCallback(
    (childrenRefs: React.RefObject<Element>[], container: HTMLDivElement): DOMData => {
      const data: DOMData = {
        containerWidth: 0,
        pagesCount: 0,
        itemsWidth: 0,
      };

      const childrenContainer = Array.from(container.children).find(
        child => child.id === CHILDREN_CONTAINER_ID
      );

      if (childrenContainer) {
        const containerInfo = childrenContainer.getBoundingClientRect();

        data.containerWidth = containerInfo.width;
      }

      const itemsWidth: number[] = [];

      let currentPageWidth = 0;

      const totalPages = childrenRefs.reduce((previous, currentRef): number => {
        if (!currentRef.current) return previous;

        const info = currentRef.current.getBoundingClientRect();

        itemsWidth.push(info.width);

        currentPageWidth += info.width;

        if (currentPageWidth >= data.containerWidth - 25) {
          currentPageWidth = 0;
          return previous + 1;
        }

        return previous;
      }, 0);

      data.pagesCount = totalPages;
      data.itemsWidth = itemsWidth.reduce((a, b) => a + b, 0) / itemsWidth.length || 0;

      return data;
    },
    []
  );

  const setDOMInfo = useCallback(
    (childrenRefs: React.RefObject<Element>[]): void => {
      let checkInterval: NodeJS.Timeout;

      checkInterval = setInterval(() => {
        if (childrenRefs[0] && childrenRefs[0].current && containerRef.current) {
          const { pagesCount, itemsWidth } = getDOMData(
            childrenRefs,
            containerRef.current
          );

          setScrollState(state => ({ ...state, pagesCount, itemsWidth }));

          clearInterval(checkInterval);
        }
      }, 50);
    },
    [setScrollState, getDOMData, containerRef]
  );

  useLayoutEffect(() => {
    const childrenRefs: React.RefObject<Element>[] = [];

    const mapped = React.Children.map(children, child => {
      if (!React.isValidElement<IScrollableChildren>(child)) {
        return child;
      }

      const elementChild: React.ReactElement & IRefObject = child;

      const style: React.CSSProperties = {
        transition: `transform ${slideTimeMs}ms ease-in-out`,
      };
      if (scrollState.itemsOffset.x) {
        style.transform = `translateX(${scrollState.itemsOffset.x}px)`;
      }

      if (elementChild.ref) {
        childrenRefs.push(elementChild.ref);
      }

      return React.cloneElement(child, {
        style,
        ...child.props,
      });
    });

    setDOMInfo(childrenRefs);

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
