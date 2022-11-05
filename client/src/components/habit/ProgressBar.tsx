import { useState } from 'react';
import { useInterval } from '../../hooks/utils/useInterval';

interface ProgressBarProp {
  progress: number;
}

function ProgressBar({ progress }: ProgressBarProp) {
  const [value, setValue] = useState(0);
  const speed = 25;
  const progressEndValue = (progress / 21) * 100;
  useInterval(
    () => {
      const progressbar = document.querySelector(
        '.progress-circle',
      ) as HTMLDivElement;
      progressbar.style.background = `conic-gradient(
      #4d5bf9 ${value * 3.6}deg,
      #cadcff ${value * 3.6}deg)`;
      setValue(value + 1);
    },
    value < progressEndValue ? speed : null,
  );

  return (
    <div className="">
      <div className="progress-circle">
        <div className="progress-value">{value}%</div>
      </div>
    </div>
  );
}

export default ProgressBar;
