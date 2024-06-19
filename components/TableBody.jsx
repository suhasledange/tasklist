import React from 'react';
import { format, differenceInDays } from 'date-fns';

const TableBody = ({ setOpenFilter, rows, prepareRow }) => {
  let previousDate = null;

  const formatDate = (date) => format(date, 'dd MMM yyyy');
  const calculateDaysAgo = (date) => {
    const now = new Date();
    const diff = differenceInDays(now, date);
    if (diff === 0) return 'Today';
    if (diff === 1) return 'In 1 day';
    return `In ${diff} days`;
  };

  const countOpenTasks = (date) => {
    return rows.filter(row => {
      const rowDate = new Date(row.original.createdAt);
      return formatDate(rowDate) === formatDate(date) && row.original.status === 'Open';
    }).length;
  };

  return (
    <tbody onClick={() => setOpenFilter(null)} className="bg-white">
      {rows.map((row, rowIndex) => {
        prepareRow(row);
        const currentDate = new Date(row.original.createdAt);
        const formattedDate = formatDate(currentDate);
        let openTasksCount = null;

        const showDateSeparator = previousDate === null || formatDate(previousDate) !== formattedDate;

        if (showDateSeparator) {
          openTasksCount = countOpenTasks(currentDate);
        }

        previousDate = currentDate;

        return (
          <React.Fragment key={`row-${row.id}`}>
            {showDateSeparator && (
              <tr>
                <td colSpan={row.cells.length}>
                  <div className="flex justify-start gap-3 text-[0.83rem] items-center py-[0.25rem] px-6">
                    <span className="text-gray-800 font-bold">{formattedDate}</span>
                    <span className="text-gray-500">{calculateDaysAgo(currentDate)} </span>
                    <span className='text-gray-500 ml-1'>{openTasksCount > 0 && `${openTasksCount} Open`}</span>
                    <span className='flex-1 h-[1.3px] ml-3 pl-1/ bg-gray-300'></span>
                  </div>
                </td>
              </tr>
            )}
            <tr {...row.getRowProps()} key={`row-${row.id}`}>
              {row.cells.map((cell) => (
                <td className="px-6 py-[0.3rem] text-sm whitespace-nowrap" key={cell.column.id}>
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          </React.Fragment>
        );
      })}
    </tbody>
  );
};

export default TableBody;
