import { useEffect, useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import ProgressBar from './ProgressBar';
import { areDatesEqual } from '../../utils/dateHelper';
import { Habit } from '../../types/habit.types';

interface VisualizeTabProp {
  habit: Habit;
}

function VisualizeTab({ habit }: VisualizeTabProp) {
  const [currentStreak, setCurrentStreak] = useState(0);
  const dates = habit.dates
    .map((d) => new Date(d))
    .sort((a, b) => b.getTime() - a.getTime());

  const getCurrentStreak = () => {
    let streak = 0;
    const prevDate = new Date();
    dates.every((elem) => {
      if (areDatesEqual(prevDate, elem)) {
        streak++;
        prevDate.setDate(prevDate.getDate() - 1);
        return true;
      } else {
        return false;
      }
    });
    return streak;
  };

  useEffect(() => {
    setCurrentStreak(getCurrentStreak());
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <h2>Streak Counter</h2>

        <div className="mt-4">
          <ProgressBar progress={currentStreak} />
          <div className="text-center mt-2">{currentStreak} day streak</div>
        </div>
        <div className="self-center text-center">
          <div>21 days target</div>
          <a
            href="https://capespace.com/how-the-21-90-rule-helps-you-build-good-habits-and-a-better-life"
            className="text-blue-600 text-sm underline"
            target={'_blank'}
            rel={'noopener noreferrer'}
          >
            read more
          </a>
        </div>
      </div>
      <div className="mt-8">
        <div className="flex justify-between">
          <span>Calendar</span>
          <span>{dates.length} total</span>
        </div>
        <CalendarHeatmap
          startDate={new Date(`${new Date().getFullYear()}`)}
          endDate={new Date(`${new Date().getFullYear()}-12-31`)}
          values={dates.map((d) => {
            return {
              date: d,
              count: 1,
            };
          })}
        />
      </div>
    </div>
  );
}
export default VisualizeTab;
