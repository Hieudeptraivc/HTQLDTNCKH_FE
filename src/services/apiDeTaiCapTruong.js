const apiUrl = import.meta.env.VITE_API_URL;
const limit = import.meta.env.VITE_PAGE_SIZE;
export async function getAllDeTaiCapTruongByUser({ filter, sort, page }) {
  const params = new URLSearchParams();

  // PAGINATION
  if (page) {
    params.set('page', page);
    params.set('limit', limit);
  }

  // FILTER
  if (filter) {
    filter.forEach((f) => {
      if (f.operator) {
        params.set(`${f.field}[${f.operator}]`, f.value);
      } else {
        params.set(f.field, f.value);
      }
    });
  }

  // SORT
  if (sort) {
    params.set('sort', sort);
  }

  // console.log(params.toString());

  const res = await fetch(`${apiUrl}/de-tai-cap-truong?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  const data = await res.json();
  if (data?.error) throw new Error(data?.message);
  return data.data;
}
