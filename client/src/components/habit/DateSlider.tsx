import { motion, useAnimationControls } from 'framer-motion';
import {
  ChevronLeftIcon,
  ChevronDoubleLeftIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
} from '@heroicons/react/24/solid';
import { getDayName, getMonthName } from '../utils/dateHelper';
import { useRef } from 'react';
import { useSliderData } from '../stores/sliderData';

interface DateSliderProps {
  dates: Date[];
}

function DateSlider({ dates }: DateSliderProps) {
  const controls = useAnimationControls();
  const xPos = useRef(0);
  const { setOffsetX } = useSliderData();

  function moveRight() {
    controls.start({ x: xPos.current - 66 });
  }
  function moveBigRight() {
    controls.start({ x: xPos.current - 462 });
  }

  function moveLeft() {
    const newPos = xPos.current + 66 < 0 ? xPos.current + 66 : 0;
    controls.start({ x: newPos });
  }
  function moveBigLeft() {
    const newPos = xPos.current + 462 < 0 ? xPos.current + 462 : 0;
    controls.start({ x: newPos });
  }

  function onUpdate(latest: { x: number }) {
    xPos.current = latest.x;
    setOffsetX(xPos.current);
  }

  return (
    <div className="flex w-full bg-red-300 space-x-1 justify-between items-center rounded p-2">
      <span>{dates.length !== 0 && getMonthName(dates[dates.length - 1])}</span>
      <div className="flex cursor-pointer">
        <ChevronDoubleLeftIcon className="w-4 h-4" onClick={moveBigLeft} />
        <ChevronLeftIcon className="w-4 h-4" onClick={moveLeft} />
      </div>
      <div className="overflow-hidden w-[455px] border-black border">
        <motion.div
          drag="x"
          dragConstraints={{ right: 0 }}
          onUpdate={onUpdate}
          animate={controls}
          className="flex text-center cursor-grab space-x-2"
          whileDrag={{ cursor: 'grabbing' }}
        >
          {dates.map((date, index) => (
            <div
              key={index}
              className="w-[58px] shrink-0 text-center bg-green-200"
            >
              <p>{getDayName(date)}</p>
              <p>{date.getDate()}</p>
            </div>
          ))}
        </motion.div>
      </div>
      <div className="flex cursor-pointer ">
        <ChevronRightIcon className="w-4 h-4" onClick={moveRight} />
        <ChevronDoubleRightIcon className="w-4 h-4" onClick={moveBigRight} />
      </div>
    </div>
  );
}

export default DateSlider;
