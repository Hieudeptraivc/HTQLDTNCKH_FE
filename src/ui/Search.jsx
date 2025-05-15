import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Search({ placeholder, filterField, searchQuery = '' }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialValue = searchParams.get(filterField) || searchQuery;
  const [inputValue, setInputValue] = useState(initialValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      const currentParam = searchParams.get(filterField);

      // Nếu input rỗng => xoá param
      if (!inputValue.trim()) {
        if (currentParam !== null) {
          searchParams.delete(filterField);
          searchParams.set('page', 1);
          setSearchParams(searchParams);
        }
        return;
      }

      // Nếu giá trị thực sự khác thì mới cập nhật
      if (currentParam !== inputValue) {
        searchParams.set(filterField, inputValue);
        searchParams.set('page', 1);
        setSearchParams(searchParams);
      }
    }, 600);

    return () => clearTimeout(handler);
  }, [inputValue, filterField, searchParams, setSearchParams]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <input
      id="search"
      type="text"
      value={inputValue}
      onChange={handleChange}
      placeholder={placeholder}
      className="font-poppins w-64 rounded-xl bg-gray-200 px-4 py-1 text-[14px] text-gray-800 shadow-xs ring-1 ring-blue-100 outline-none focus:ring-2 focus:ring-blue-300"
    />
  );
}

export default Search;
