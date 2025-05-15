import { useSearchParams } from 'react-router-dom';

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options[0]?.value;

  const handleChange = (e) => {
    const value = e.target.value;
    searchParams.set(filterField, value);
    if (searchParams.get('page')) searchParams.set('page', 1); // reset về trang 1 khi đổi filter
    setSearchParams(searchParams);
  };

  return (
    <select
      value={currentFilter}
      onChange={handleChange}
      className="font-montserrat rounded-md bg-gray-200 px-2 py-1 text-sm font-medium text-gray-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none"
    >
      {options.map((option) => (
        <option
          className="font-montserrat bg-gray-50"
          key={option.value}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Filter;
