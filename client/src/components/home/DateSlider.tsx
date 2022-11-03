import { motion, useAnimationControls } from 'framer-motion';
import { useRef, useState } from 'react';
import { useSliderStore } from '../../stores/sliderStore';
import {
  getDatesInMonth,
  getDayName,
  getMonthName,
  getLastDayInPreviousMonth,
} from '../../utils/dateHelper';

function DateSlider() {
  const { dates, setDates } = useSliderStore();
  const [monthLabel, setMonthLabel] = useState('');
  const [yearLabel, setYearLabel] = useState(0);

  const animationController = useAnimationControls();
  const slider = useRef<HTMLDivElement>(null);
  const sliderContainer = useRef<HTMLDivElement>(null);
  const sliderXPos = useRef(0);

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
    // update the slider x position for movement tracking
    sliderXPos.current = latest.x;

    // detects when to add new dates when it crosses the threshold
    const containerXEnd =
      sliderContainer.current?.getBoundingClientRect().right;
    const sliderXEnd =
      slider.current?.lastElementChild?.getBoundingClientRect().right;

    if (sliderXEnd && containerXEnd) {
      if (sliderXEnd < containerXEnd) {
        animationController.stop();
        const prev = getLastDayInPreviousMonth(dates);
        const newDates = getDatesInMonth(
          prev.getMonth(),
          prev.getFullYear(),
          prev.getDate(),
        );
        setDates(newDates);
      }
    }

    // trigger a custom event to syncronize scroll
    const event = new CustomEvent('sliderX', { detail: sliderXPos.current });
    document.dispatchEvent(event);
  }

  return (
    <div className="mt-6 flex items-center w-[320px] justify-between mx-auto">
      {/* initial month & year */}

      <div className="w-[82px] p-2">
        {monthLabel == '' && dates.length !== 0
          ? getMonthName(dates[dates.length - 1])
          : monthLabel}
      </div>
      {/* <span className="text-xs">
          {yearLabel == 0 && dates.length !== 0
            ? new Date(dates[dates.length - 1]).getFullYear()
            : yearLabel}
        </span> */}

      {/* slider */}
      <div className="flex w-[238px] space-x-1 justify-between items-center rounded">
        <div
          ref={sliderContainer}
          className="overflow-hidden  border-black border-2 rounded"
        >
          <motion.div
            drag="x"
            dragConstraints={{ right: 0 }}
            onUpdate={onUpdate}
            dragMomentum={false}
            dragElastic={0}
            animate={animationController}
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
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default DateSlider;
