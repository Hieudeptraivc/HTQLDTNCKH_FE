import Pagination from './Pagination.jsx';
import TableRow from './TableRow.jsx';

function DataTable({
  headers = [],
  layout,
  data = [],
  renderRow,
  footer = null,
}) {
  return (
    <div className="font-montserrat w-full overflow-x-hidden rounded-lg border border-gray-300 shadow-xl">
      {/* Header */}
      <div
        className={`${layout} grid items-center bg-gray-200 px-4 py-3 text-[15px] font-semibold text-gray-700`}
      >
        {headers.map((header, idx) => (
          <div key={idx}>{header}</div>
        ))}
        <div></div>
      </div>

      {/* Body */}
      {data.length > 0 ? (
        <ul>
          {data.map((item, idx) => (
            <TableRow key={idx} layout={layout} item={item}>
              {renderRow(item)}
            </TableRow>
          ))}
        </ul>
      ) : (
        <p className="font-montserrat text-md p-20 text-center font-semibold text-gray-600">
          Không có hoặc không tìm thấy dữ liệu
        </p>
      )}

      {/* Footer */}
      {footer > 0 && <Pagination count={footer} />}
    </div>
  );
}

export default DataTable;
