import { useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import { getWeekDays } from '../utils/weekUtils';
import DayTable from './DayTable';
import SharedColgroup from './SharedColgroup';
import './DayTablesSection.css';

const getStickyOffset = () =>
  parseInt(getComputedStyle(document.documentElement).getPropertyValue('--sticky-offset-thead'), 10) || 0;

const COLUMNS = ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5', 'Label 6', 'Label 7', 'Label 8', 'Label 9'];

const DayTablesSection = ({ selectedWeek, dayRefs, hidden }) => {
  const weekDays = getWeekDays(selectedWeek.start);
  const [activeIndex, setActiveIndex] = useState(null);
  const [wrapperRect, setWrapperRect] = useState(null);
  const activeIndexRef = useRef(null);
  const floatingScrollRef = useRef(null);
  const floatingHeaderRef = useRef(null);

  const syncLayout = (tableContainer) => {
    const wrapper = tableContainer.querySelector('.day-table-scroll-wrapper');
    if (!wrapper) return;
    setWrapperRect({ left: wrapper.getBoundingClientRect().left, width: wrapper.offsetWidth });
    if (floatingScrollRef.current) {
      floatingScrollRef.current.scrollLeft = wrapper.scrollLeft;
    }
  };

  // Sync widths whenever active table changes
  useEffect(() => {
    if (activeIndex !== null && dayRefs[activeIndex]?.current) {
      syncLayout(dayRefs[activeIndex].current);
    }
  }, [activeIndex, dayRefs]);

  // Detect active table on scroll (index only — no width work here)
  useEffect(() => {
    const onScroll = () => {
      let found = null;
      for (let i = dayRefs.length - 1; i >= 0; i--) {
        const el = dayRefs[i]?.current;
        const floatingHeight = floatingHeaderRef.current?.offsetHeight || 0;
        if (el && el.getBoundingClientRect().top <= getStickyOffset() + floatingHeight) {
          found = i;
          break;
        }
      }
      if (found !== activeIndexRef.current) {
        activeIndexRef.current = found;
        setActiveIndex(found);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [dayRefs]);

  // Re-sync widths on resize
  useEffect(() => {
    const onResize = () => {
      if (activeIndexRef.current !== null && dayRefs[activeIndexRef.current]?.current) {
        syncLayout(dayRefs[activeIndexRef.current].current);
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [dayRefs]);

  // Sync horizontal scroll from the active table's wrapper to the floating header
  useEffect(() => {
    if (activeIndex === null) return;
    const wrapper = dayRefs[activeIndex]?.current?.querySelector('.day-table-scroll-wrapper');
    if (!wrapper) return;
    const onTableScroll = () => {
      if (floatingScrollRef.current) {
        floatingScrollRef.current.scrollLeft = wrapper.scrollLeft;
      }
    };
    wrapper.addEventListener('scroll', onTableScroll, { passive: true });
    return () => wrapper.removeEventListener('scroll', onTableScroll);
  }, [activeIndex, dayRefs]);

  const activeDate = activeIndex !== null ? weekDays[activeIndex] : null;

  return (
    <div className={`day-tables-section${hidden ? ' day-tables-section--hidden' : ''}`}>
      {activeDate && wrapperRect && (
        <div
          className="day-table-floating-header"
          ref={floatingHeaderRef}
          style={{ top: getStickyOffset(), left: wrapperRect.left, width: wrapperRect.width }}
        >
          <div className="day-table-floating-columns" ref={floatingScrollRef}>
            <table className="day-table-table">
              <SharedColgroup />
              <thead>
                <tr>
                  <th className="day-table-th day-table-date-col">
                    {format(activeDate, 'EEEE, MMMM d')}
                  </th>
                  <th className="day-table-th"></th>
                  {COLUMNS.map((col) => (
                    <th key={col} className="day-table-th">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
            </table>
          </div>
        </div>
      )}
      {weekDays.map((date, index) => (
        <DayTable key={index} date={date} ref={dayRefs[index]} isFirst={index === 0} isActive={index === activeIndex} />
      ))}
    </div>
  );
};

export default DayTablesSection;
