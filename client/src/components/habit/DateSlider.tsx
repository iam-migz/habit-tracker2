import { motion, useAnimationControls } from 'framer-motion';
import {
  ChevronLeftIcon,
  ChevronDoubleLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
  CheckIcon,
} from '@heroicons/react/24/solid';
import { useEffect, useRef, useState } from 'react';
import {
  getDatesInMonth,
  getDayName,
  getMonthName,
  getLastDayInPreviousMonth,
} from '../../utils/dateHelper';

function DateSlider() {
  const [dates, setDates] = useState<Date[]>([]);
  const [monthLabel, setMonthLabel] = useState('');
  const [yearLabel, setYearLabel] = useState(0);

  const controls = useAnimationControls();
  const sliderContainer = useRef<HTMLDivElement>(null);
  const slider = useRef<HTMLDivElement>(null);
  const sliderXPos = useRef(0);

  function moveRight() {
    controls.start({ x: sliderXPos.current - 66 });
  }
  function moveBigRight() {
    controls.start({ x: sliderXPos.current - 462 });
  }

  function moveLeft() {
    const newPos = sliderXPos.current + 66 < 0 ? sliderXPos.current + 66 : 0;
    controls.start({ x: newPos });
  }
  function moveBigLeft() {
    const newPos = sliderXPos.current + 462 < 0 ? sliderXPos.current + 462 : 0;
    controls.start({ x: newPos });
  }

  // handles the changing of month & year label
  function mouseDownHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (
      e.target instanceof HTMLElement &&
      e.target.hasAttribute('data-index')
    ) {
      const index = Number(e.target.dataset.index);
      const date = new Date(dates[index]);
      setMonthLabel(getMonthName(date));
      setYearLabel(date.getFullYear());
    }
  }

  function onUpdate(latest: { x: number }) {
    // update the slider x position for movement button
    sliderXPos.current = latest.x;

    // detects when to add new dates when it crosses the threshold
    const containerXEnd =
      sliderContainer.current?.getBoundingClientRect().right;
    const sliderXEnd =
      slider.current?.lastElementChild?.getBoundingClientRect().right;

    if (sliderXEnd && containerXEnd) {
      if (sliderXEnd < containerXEnd) {
        controls.stop();
        const prev = getLastDayInPreviousMonth(dates);
        const newDates = getDatesInMonth(
          prev.getMonth(),
          prev.getFullYear(),
          prev.getDate(),
        );
        setDates((oldDates) => [...oldDates, ...newDates]);
      }
    }
  }

  // set initial dates
  useEffect(() => {
    const today = new Date('2022-06-22');
    setDates(
      getDatesInMonth(today.getMonth(), today.getFullYear(), today.getDate()),
    );
  }, []);

  return (
    <div>
      {/* initial month & year */}
      <div className="flex justify-between">
        <span>
          {monthLabel == '' && dates.length !== 0
            ? getMonthName(dates[dates.length - 1])
            : monthLabel}
        </span>
        <span>
          {yearLabel == 0 && dates.length !== 0
            ? new Date(dates[dates.length - 1]).getFullYear()
            : yearLabel}
        </span>
      </div>

      {/* slider */}
      <div className="flex w-full space-x-1 justify-between items-center rounded p-2">
        <div className="flex cursor-pointer">
          <ChevronDoubleLeftIcon className="w-4 h-4" onClick={moveBigLeft} />
          <ChevronLeftIcon className="w-4 h-4" onClick={moveLeft} />
        </div>
        <div
          ref={sliderContainer}
          className="overflow-hidden w-[455px] border-black border-2 rounded"
        >
          <motion.div
            drag="x"
            dragConstraints={{ right: 0 }}
            onUpdate={onUpdate}
            dragMomentum={false}
            animate={controls}
            whileDrag={{ cursor: 'grabbing' }}
            onMouseDown={mouseDownHandler}
            ref={slider}
            className="flex text-center cursor-grab space-x-2 p-1"
          >
            {dates.map((date, index) => (
              <div
                key={index}
                className="w-[58px] shrink-0 text-center text-xs"
                data-index={index}
              >
                <p data-index={index}>{getDayName(date)}</p>
                <p data-index={index}>{date.getDate()}</p>
                {/* <CheckIcon
                  data-index={index}
                  className="h-6 w-6 mx-auto text-green-500"
                /> */}
              </div>
            ))}
          </motion.div>
        </div>
        <div className="flex cursor-pointer ">
          <ChevronRightIcon className="w-4 h-4" onClick={moveRight} />
          <ChevronDoubleRightIcon className="w-4 h-4" onClick={moveBigRight} />
        </div>
      </div>

      {/* streaks */}
      <div className="flex justify-between mt-4 text-sm">
        <span>Current streak: 15</span>
        <span>All time record: 15</span>
      </div>
    </div>
  );
}

export default DateSlider;
