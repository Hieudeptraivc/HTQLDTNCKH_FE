const apiUrl = import.meta.env.VITE_API_URL;
const limit = import.meta.env.VITE_PAGE_SIZE;

export async function getAllBaoCaoTienDoByUser({
  deTaiId,
  filter,
  sort,
  page,
}) {
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

  const res = await fetch(
    `${apiUrl}/de-tai/${deTaiId}/bao-cao-tien-do?${params.toString()}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    },
  );

  const data = await res.json();
  if (data?.error) throw new Error(data?.message);
  return data.data;
}

export async function deleteBaoCaoTienDoById({ baoCaoTienDoId }) {
  const res = await fetch(`${apiUrl}/bao-cao-tien-do/${baoCaoTienDoId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (res.status === 204) return { success: true };

  const data = await res.json();
  if (data?.error) throw new Error(data?.message);
  return data;
}

export async function getBaoCaoTienDoId(baoCaoTienDoId) {
  const res = await fetch(`${apiUrl}/bao-cao-tien-do/${baoCaoTienDoId}`, {
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

export async function editBaoCaoTienDoById({ baoCaoTienDoId, editData }) {
  const res = await fetch(`${apiUrl}/bao-cao-tien-do/${baoCaoTienDoId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...editData }),
    credentials: 'include',
  });
  const data = await res.json();

  if (data?.error) throw new Error(data?.message);
  return data.data.baoCaoTienDo;
}

export async function createNewBaoCaoTienDo({ newData }) {
  const res = await fetch(`${apiUrl}/bao-cao-tien-do`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...newData }),
    credentials: 'include',
  });
  const data = await res.json();
  if (data?.error) throw new Error(data?.message);
  return data?.data;
}
