import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useRecords } from '../hooks/record/useRecords';
import { useEffect, useState } from 'react';
import { Record } from '../types/record.types';
import { getMonthName } from '../utils/dateHelper';

type IdParams = {
  id: string;
};

function ImageViewer() {
  const { id } = useParams<keyof IdParams>() as IdParams;
  const { data, isFetched } = useRecords(id);
  const records = data
    .filter((r) => r.image !== undefined && r.image !== '')
    .map((r) => {
      return {
        ...r,
        date: new Date(r.date),
      };
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const [leftRecord, setLeftRecord] = useState<Record>();
  const [rightRecord, setRightRecord] = useState<Record>();
  const [leftLabel, setLeftLabel] = useState('');
  const [rightLabel, setRightLabel] = useState('');

  useEffect(() => {
    if (records.length != 0) {
      setLeftRecord(records[0]);
      setRightRecord(records[records.length - 1]);
    }
  }, [isFetched]);

  useEffect(() => {
    if (leftRecord)
      setLeftLabel(
        `${getMonthName(
          leftRecord.date,
        )} ${leftRecord.date.getDate()}, ${leftRecord.date.getFullYear()}`,
      );
  }, [leftRecord]);

  useEffect(() => {
    if (rightRecord)
      setRightLabel(
        `${getMonthName(
          rightRecord.date,
        )} ${rightRecord.date.getDate()}, ${rightRecord.date.getFullYear()}`,
      );
  }, [rightRecord]);

  return (
    <div>
      <Navbar />

      <div className="md:rounded max-w-[1280px] min-w-[570px] border-2 bg-slate-50 mt-12 p-3 mx-auto">
        <h1 className="text-center mt-4">Image Viewer</h1>
        <Link to={`/habit/${id}`}>
          <ArrowLeftIcon className="h-6 w-6 cursor-pointer ml-2" />
        </Link>
        <div className="flex justify-center gap-8 mt-4">
          <div className="w-2/5 ">
            <h2 className="text-center">{leftLabel}</h2>
            <img
              src={`${import.meta.env.VITE_API_BASE}${leftRecord?.image}`}
              alt=""
              className="block max-w-[400px] max-h-[500px] object-cover mx-auto"
            />
            <div className="flex justify-center my-4">
              <select
                value={leftRecord?._id}
                onChange={(e) => {
                  const selectedId = e.target.value;
                  const value = records.filter((r) => r._id == selectedId)[0];
                  setLeftRecord(value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {records.map((r, index) => (
                  <option value={r._id} key={r.date.toString()}>
                    Day {index + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-2/5 ">
            <h2 className="text-center">{rightLabel}</h2>
            <img
              src={`${import.meta.env.VITE_API_BASE}${rightRecord?.image}`}
              alt=""
              className="block max-w-[400px] max-h-[500px] object-cover mx-auto"
            />
            <div className="flex justify-center my-4">
              <select
                value={rightRecord?._id}
                onChange={(e) => {
                  const selectedId = e.target.value;
                  const value = records.filter((r) => r._id == selectedId)[0];
                  setRightRecord(value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                {records.map((r, index) => (
                  <option value={r._id} key={r.date.toString()}>
                    Day {index + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageViewer;
