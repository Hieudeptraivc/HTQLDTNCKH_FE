import { useSearchParams } from 'react-router-dom';

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') || '-ngayTao';

  function handleChange(e) {
    searchParams.set('sort', e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <select
      value={sortBy}
      onChange={handleChange}
      className="font-montserrat rounded-md bg-gray-200 px-2 py-1 text-sm font-medium text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none"
    >
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default SortBy;
