import React from 'react';

function Stat({ icon, title, value, color }) {
  // Map of color values to tailwind classes
  const colorMap = {
    blue: {
      bg: 'bg-blue-100',
      text: 'text-blue-700',
    },
    green: {
      bg: 'bg-green-100',
      text: 'text-green-700',
    },
    yellow: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-700',
    },
    red: {
      bg: 'bg-red-100',
      text: 'text-red-700',
    },
    indigo: {
      bg: 'bg-indigo-100',
      text: 'text-indigo-700',
    },
    purple: {
      bg: 'bg-purple-100',
      text: 'text-purple-700',
    },
    pink: {
      bg: 'bg-pink-100',
      text: 'text-pink-700',
    },
    gray: {
      bg: 'bg-gray-100',
      text: 'text-gray-700',
    },
  };

  // Default to blue if color is not in the map
  const bgColor = colorMap[color]?.bg || 'bg-blue-100';
  const textColor = colorMap[color]?.text || 'text-blue-700';

  return (
    <div className="grid grid-cols-[3.4rem_1fr] grid-rows-[auto_auto] gap-x-4 gap-y-1 rounded-lg bg-gray-50 p-3 shadow-md">
      <div
        className={`row-span-2 flex aspect-square items-center justify-center rounded-full ${bgColor}`}
      >
        <div className={`h-8 w-8 text-center ${textColor}`}>{icon}</div>
      </div>
      <h5 className="self-end text-xs font-bold tracking-wider text-gray-500 uppercase">
        {title}
      </h5>
      <p className="text-xl leading-none font-medium">{value}</p>
    </div>
  );
}

export default Stat;
