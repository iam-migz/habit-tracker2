import { useState } from 'react';
import { Habit } from '../../types/habit.types';
import { areDatesConsecutive, areDatesEqual } from '../../utils/dateHelper';
import ProgressBar from './ProgressBar';

interface VisualizeTabProp {
  habit: Habit;
}

function VisualizeTab({ habit }: VisualizeTabProp) {
  const [progress, setProgress] = useState(0);
  const currentDayStreak = getCurrentDayStreak();
  function getCurrentDayStreak() {
    // desc
    const sortedDates = habit.dates.sort(
      (a, b) => new Date(b).getTime() - new Date(a).getTime(),
    );
    let streak = 0;
    const prevDate = new Date();
    sortedDates.every((elem) => {
      if (areDatesEqual(prevDate, elem)) {
        streak++;
        prevDate.setDate(prevDate.getDate() - 1);
        return true;
      } else {
        return false;
      }
    });
    return streak;
  }

  function getLongestDayStreak() {
    const sortedDates = habit.dates.sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime(),
    );
    const initialValue = {
      count: 1,
      max: 1,
    };
    const result = sortedDates.reduce<typeof initialValue>(
      ({ count, max }, curr, index, dates) => {
        if (index == dates.length - 1) return { count, max };

        if (areDatesConsecutive(curr, dates[index + 1])) {
          count += 1;
          return { count: count, max: Math.max(count, max) };
        }
        return { count: 1, max };
      },
      initialValue,
    );

    return result.max;
  }

  // TODO: getAllDaysCount
  return (
    <div className="flex justify-between">
      <h2>Streak Counter</h2>

      <div className="mt-4">
        <ProgressBar progress={currentDayStreak} />
        <div className="text-center mt-2">{currentDayStreak} day streak</div>
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
  );
}

export default VisualizeTab;
