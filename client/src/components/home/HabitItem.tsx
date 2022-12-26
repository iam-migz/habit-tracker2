import { useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckIcon } from '@heroicons/react/24/solid';
import { useHabit } from '../../hooks/habit/useHabit';
import { useHabitStore } from '../../stores/habitStore';
import { useRecords } from '../../hooks/record/useRecords';
import { useAddRecord } from '../../hooks/record/useAddRecord';
import { useDeleteRecord } from '../../hooks/record/useDeleteRecord';

function HabitItem({ id }: { id: string }) {
  const { data: habit } = useHabit(id);
  const { data: records } = useRecords(id);

  const dates = useHabitStore((state) => state.dates);
  const animationController = useAnimationControls();

  const { mutate: addDate } = useAddRecord(id);
  const { mutate: deleteData } = useDeleteRecord();

  function clickHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();
    const box = e.currentTarget;
    if (box instanceof HTMLElement && box.hasAttribute('data-index')) {
      const index = Number(box.dataset.index);
      const date = new Date(dates[index]);
      if (box.firstChild) {
        const checkBox = box.firstChild as HTMLElement;
        const recordId = checkBox.dataset.record;
        if (!recordId) return;
        deleteData({ recordId });
      } else {
        addDate({ date });
      }
    }
  }

  useEffect(() => {
    function isCustomEvent(event: Event): event is CustomEvent<number> {
      return 'detail' in event;
    }
    function eventHandler(e: Event) {
      if (!isCustomEvent(e)) throw new Error('not a custom event');

      animationController.start({ x: e.detail });
    }
    document.addEventListener('sliderX', eventHandler);
    return () => {
      document.removeEventListener('slideX', eventHandler);
    };
  }, []);

  function dateCheck(date: Date) {
    const result = records?.find(
      (r) => new Date(r.date).getTime() === new Date(date).getTime(),
    );
    return result ? (
      <CheckIcon className="h-6 w-6 text-green-500" data-record={result._id} />
    ) : (
      ''
    );
  }

  return (
    <Link to={`/habit/${habit?._id}`} className="block min-w-[320px] mx-auto">
      <div className="flex justify-between items-center mt-2 rounded relative">
        {/* name */}
        <div className="min-w-[80px] text-center font-light">
          <h1 className="capitalize">{habit?.name}</h1>
        </div>

        {/* check slider */}
        <div className="min-w-[240px] space-x-1 justify-between items-center rounded">
          <div className="overflow-hidden  border-black border-2 rounded bg-slate-500">
            <motion.div
              drag="x"
              dragListener={false}
              dragMomentum={false}
              dragElastic={0}
              className="flex text-center cursor-crosshair space-x-2 p-1"
              animate={animationController}
            >
              {dates.map((date, index) => (
                <div
                  key={date.toString()}
                  className="w-[58px] shrink-0 text-center text-xs"
                >
                  <div
                    className="h-8 w-8 bg-slate-600 mx-auto grid place-items-center rounded"
                    onClick={clickHandler}
                    data-index={index}
                  >
                    {dateCheck(date)}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default HabitItem;
