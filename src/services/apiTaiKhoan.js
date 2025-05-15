const apiUrl = import.meta.env.VITE_API_URL;
const limit = import.meta.env.VITE_PAGE_SIZE;

export async function getAllTaiKhoanByUser({ filter, sort, page }) {
  const params = new URLSearchParams();
  // PAGINATION
  if (page) {
    params.set('page', page);
    params.set('limit', limit);
  }

  // FILTER
  if (filter) {
    filter
      .filter((f) => !(f.field === 'trangThai' && f.value === 'all'))
      .forEach((f) => params.set(f.field, f.value));
  }

  // SORT
  if (sort) {
    params.set('sort', sort);
  }
  const res = await fetch(`${apiUrl}/tai-khoan?${params.toString()}`, {
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
//// Lấy thông tin can bo khoa dựa vào ID
export async function getTaiKhoanById({ taiKhoanId }) {
  const res = await fetch(`${apiUrl}/tai-khoan/${taiKhoanId}`, {
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

export async function editTaiKhoanById({ taiKhoanId, editData }) {
  const res = await fetch(`${apiUrl}/tai-khoan/${taiKhoanId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...editData }),
    credentials: 'include',
  });
  const data = await res.json();
  // console.log(data.data);
  if (data?.error) throw new Error(data?.message);
  return data.data;
}

export async function updatePasswordByMe({ editData }) {
  const res = await fetch(`${apiUrl}/auth/update-my-password`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...editData }),
    credentials: 'include',
  });
  const data = await res.json();
  // console.log(data.data);
  if (data?.error) throw new Error(data?.message);
  return data.data.taiKhoan;
}

export async function activeTaiKhoanById({ taiKhoanId }) {
  const res = await fetch(`${apiUrl}/auth/active-tai-khoan`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ taiKhoan_Id: taiKhoanId }),
    credentials: 'include',
  });
  const data = await res.json();

  if (data?.error) throw new Error(data?.message);
  return data.data;
}
export async function disableTaiKhoanById({ taiKhoanId }) {
  const res = await fetch(`${apiUrl}/auth/disable-tai-khoan`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ taiKhoan_Id: taiKhoanId }),
    credentials: 'include',
  });
  const data = await res.json();

  if (data?.error) throw new Error(data?.message);
  return data.data;
}
export async function disableTaiKhoanByMe() {
  const res = await fetch(`${apiUrl}/auth/delete-me`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const data = await res.json();

  if (data?.error) throw new Error(data?.message);
  return data;
}

export async function deleteTaiKhoanById({ taiKhoanId }) {
  // console.log(taiKhoanId);
  const res = await fetch(`${apiUrl}/tai-khoan`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ taiKhoan_Id: taiKhoanId }),
    credentials: 'include',
  });
  const data = await res.json();

  if (data?.error) throw new Error(data?.message);
  return data;
}
