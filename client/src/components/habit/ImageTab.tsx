import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { getDayName, getMonthName } from '../../utils/dateHelper';
import { PhotoIcon, ArrowUpTrayIcon } from '@heroicons/react/24/solid';
import AddImageModal from './AddImageModal';
import { useRecords } from '../../hooks/record/useRecords';
import { useRecordStore } from '../../stores/recordStore';
import { Record } from '../../types/record.types';
import ViewImageModal from './ViewImageModal';
import { Link } from 'react-router-dom';

function ImageTab({ habitId }: { habitId: string }) {
  const { setRecord, setFormattedDate } = useRecordStore();
  let { data: records } = useRecords(habitId);

  const [monthLabel, setMonthLabel] = useState('');
  const [yearLabel, setYearLabel] = useState(0);

  const [width, setWidth] = useState(0);
  const slider = useRef<HTMLDivElement>(null);

  const [isAddImageModalOpen, setIsAddImageModalOpen] = useState(false);
  const [isViewImageModalOpen, setIsViewImageModalOpen] = useState(false);

  records = records
    .map((r) => {
      return {
        ...r,
        date: new Date(r.date),
      };
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime());
  function mouseDownHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (
      e.target instanceof HTMLElement &&
      e.target.hasAttribute('data-index')
    ) {
      const index = Number(e.target.dataset.index);
      const date = records[index].date;
      setMonthLabel(getMonthName(date));
      setYearLabel(date.getFullYear());
    }
  }

  function clickHandler(record: Record) {
    setFormattedDate(
      `${getMonthName(
        record.date,
      )} ${record.date.getDate()}, ${record.date.getFullYear()}`,
    );
    setRecord(record);
    if (record.image === undefined || record.image === '') {
      setIsAddImageModalOpen(true);
      return;
    } else {
      setIsViewImageModalOpen(true);
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
    <>
      {records.length != 0 ? (
        <div className="max-w-[320px] mx-auto text-center">
          <div className="flex justify-between">
            <div className="">
              {monthLabel == '' && records.length !== 0
                ? getMonthName(records[0].date)
                : monthLabel}
            </div>
            <div className="">
              {yearLabel == 0 && records.length !== 0
                ? records[0].date.getFullYear()
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
                {records.map((record, index) => (
                  <div
                    key={record.date.toString()}
                    className="w-[58px] shrink-0 text-center text-xs"
                    data-index={index}
                    onClick={() => clickHandler(record)}
                  >
                    <p data-index={index}>{getDayName(record.date)}</p>
                    <p data-index={index}>{record.date.getDate()}</p>
                    {record.image === undefined || record.image === '' ? (
                      <ArrowUpTrayIcon className="h-7 w-7 mx-auto" />
                    ) : (
                      <PhotoIcon className="h-7 w-7 mx-auto" />
                    )}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          <div className="mt-6">
            <Link
              to={`/viewer/${habitId}`}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Image Viewer
            </Link>
          </div>

          {isAddImageModalOpen && (
            <AddImageModal
              isOpen={isAddImageModalOpen}
              setIsOpen={setIsAddImageModalOpen}
              habitId={habitId}
            />
          )}

          {isViewImageModalOpen && (
            <ViewImageModal
              isOpen={isViewImageModalOpen}
              setIsOpen={setIsViewImageModalOpen}
              habitId={habitId}
            />
          )}
        </div>
      ) : (
        <h1>no records</h1>
      )}
    </>
  );
}

export default ImageTab;
