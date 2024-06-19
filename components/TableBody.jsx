import React from 'react'

const TableBody = ({setOpenFilter,rows,prepareRow,}) => {
  return (
    <tbody onClick={() => setOpenFilter(null)} className="bg-white">
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr  {...row.getRowProps()} key={`row-${row.id}`}>
                {row.cells.map((cell) => (
                  <td className="px-6 py-4 whitespace-nowrap" key={cell.column.id}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
  )
}

export default TableBody
