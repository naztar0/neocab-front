import React, { useEffect, useCallback, useMemo } from 'react';
import './index.scss';

export default function ScrollContainer({ children, className }: { children: React.ReactNode, className?: string }) {
  useEffect(() => {
    setTimeout(() => {
      const elements = document.querySelectorAll('.mask-overflow-wrap.start');
      elements.forEach((element) => {
        const check = (el: HTMLElement) => {
          if (el.tagName !== 'DIV') return;
          const { scrollWidth, clientWidth } = el;
          if (scrollWidth - clientWidth === 0) {
            element.classList.remove('start');
          } else {
            element.classList.add('start');
          }
        };
        check(element as HTMLElement);
        element.childNodes.forEach((child) => check(child as HTMLElement));
      });
    }, 10);
  }, []);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    let target = e.currentTarget as HTMLDivElement;
    if (!target.classList.contains('mask-overflow-wrap')) {
      target = target.closest('.mask-overflow-wrap') as HTMLDivElement;
    }
    const { scrollWidth, clientWidth } = e.currentTarget;
    const isStart = e.currentTarget.scrollLeft === 0;
    const isEnd = scrollWidth - clientWidth === e.currentTarget.scrollLeft;
    if (isStart) {
      target.classList.add('start');
      target.classList.remove('end');
    } else if (isEnd) {
      target.classList.add('end');
      target.classList.remove('start');
    } else {
      target.classList.add('start');
      target.classList.add('end');
    }
  }, []);

  const childrenWithProps = useMemo(() => React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child as React.ReactElement, {
        className: `${child.props.className} mask-overflow`,
        onScroll: handleScroll,
        key: child.props.key,
      });
    }
    return child;
  }), [children, handleScroll]);

  return (
    <div className={`mask-overflow-wrap start ${className}`} onScroll={handleScroll}>
      {childrenWithProps}
    </div>
  );
}

ScrollContainer.defaultProps = {
  className: '',
};
