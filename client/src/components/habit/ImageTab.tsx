import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Habit } from '../../types/habit.types';
import { getDayName, getMonthName } from '../../utils/dateHelper';
import { PhotoIcon } from '@heroicons/react/24/solid';
import AddImageModal from './AddImageModal';

interface ImageTabProp {
  habit: Habit;
}

function ImageTab({ habit }: ImageTabProp) {
  const [monthLabel, setMonthLabel] = useState('');
  const [yearLabel, setYearLabel] = useState(0);

  const [width, setWidth] = useState(0);
  const slider = useRef<HTMLDivElement>(null);

  const [isAddImageModalOpen, setIsAddImageModalOpen] = useState(false);

  const dates = habit.dates
    .map((d) => new Date(d))
    .sort((a, b) => b.getTime() - a.getTime());

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

  useEffect(() => {
    // set slider right constraints
    if (slider.current) {
      const value = slider.current.scrollWidth - slider.current.offsetWidth;
      setWidth(value);
    }
  }, []);

  return (
    <div className="max-w-[320px] mx-auto text-center">
      {/* initial month & year */}

      <div className="flex justify-between">
        <div className="">
          {monthLabel == '' && dates.length !== 0
            ? getMonthName(dates[0])
            : monthLabel}
        </div>
        <div className="">
          {yearLabel == 0 && dates.length !== 0
            ? new Date(dates[0]).getFullYear()
            : yearLabel}
        </div>
      </div>

      {/* slider */}
      <div className="flex space-x-1 justify-between items-center">
        <div
          className="overflow-hidden  border-black border-2 rounded"
          ref={slider}
        >
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            whileDrag={{ cursor: 'grabbing' }}
            onMouseDown={mouseDownHandler}
            className="flex text-center cursor-grab space-x-2 p-1"
          >
            {dates.map((date, index) => (
              <div
                key={date.toString()}
                className="w-[58px] shrink-0 text-center text-xs"
                data-index={index}
                onClick={() => {
                  // set store data, to this current date and index
                  setIsAddImageModalOpen(true);
                }}
              >
                <p data-index={index}>{getDayName(date)}</p>
                <p data-index={index}>{date.getDate()}</p>
                <PhotoIcon className="h-7 w-7 mx-auto" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* image viewer button */}
      <div className="btn bg-orange-300 text-center  mt-8 inline-block">
        Image Viewer
      </div>

      <AddImageModal
        isOpen={isAddImageModalOpen}
        setIsOpen={setIsAddImageModalOpen}
      />
    </div>
  );
}

export default ImageTab;
