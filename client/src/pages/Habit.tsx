import { Fragment } from 'react';
import { useHabit } from '../hooks/habit/useHabit';
import Navbar from '../components/layout/Navbar';
import { useParams } from 'react-router-dom';
import { Tab } from '@headlessui/react';

function Habit() {
  const { id } = useParams();
  if (!id) return;
  const { data: habit } = useHabit(id);

  return (
    <div>
      <Navbar />

      <div className="container border-2 bg-slate-50 mt-12 p-4 max-w-[640px] mx-auto md:rounded">
        <div className="text-center">
          <h1 className="text-2xl capitalize">{habit?.name}</h1>
          <span className="text-slate-500">{habit?.description}</span>
        </div>

        <div className="w-full mt-10">
          <Tab.Group>
            <Tab.List className="flex justify-center space-x-12 font-bold">
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={`${
                      selected ? 'bg-blue-500 text-white' : ''
                    } w-full p-2 px-8 rounded`}
                  >
                    Tracker
                  </button>
                )}
              </Tab>
              <Tab as={Fragment}>
                {({ selected }) => (
                  <button
                    className={`${
                      selected ? 'bg-blue-500 text-white' : ''
                    } w-full p-2 px-8 rounded`}
                  >
                    Progress
                  </button>
                )}
              </Tab>
            </Tab.List>
            <Tab.Panels>
              <div className="mt-4 p-4">
                <Tab.Panel>
                  <div>Content 1</div>
                </Tab.Panel>
                <Tab.Panel>
                  <div>Content 2</div>
                </Tab.Panel>
              </div>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
}

export default Habit;
