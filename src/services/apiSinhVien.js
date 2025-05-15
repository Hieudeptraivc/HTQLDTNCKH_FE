const apiUrl = import.meta.env.VITE_API_URL;
const limit = import.meta.env.VITE_PAGE_SIZE;

export async function getAllSinhVienByUser({ filter, sort, page }) {
  const params = new URLSearchParams();
  // PAGINATION
  if (page) {
    params.set('page', page);
    params.set('limit', limit);
  }

  // FILTER
  if (filter) {
    filter.forEach((f) => params.set(f.field, f.value));
  }
  // console.log(filter);
  // SORT
  if (sort) {
    params.set('sort', sort);
  }
  // console.log(params.toString());

  const res = await fetch(`${apiUrl}/sinh-vien?${params.toString()}`, {
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

//// Lấy thông tin sinh viên dựa vào IDID
export async function getSinhVienById(sinhVienId) {
  const res = await fetch(`${apiUrl}/sinh-vien/${sinhVienId}`, {
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
export async function editSinhVienByMe({ payload }) {
  const res = await fetch(`${apiUrl}/auth/update-sinh-vien`, {
    method: 'PATCH',
    body: payload,
    credentials: 'include',
  });
  const data = await res.json();
  if (data?.error) throw new Error(data?.message);
  return data.data.sinhVien;
}
// Chỉnh sửa thông tin sinh viên dựa vào ID
export async function editSinhVienById({ sinhVienId, editData }) {
  const res = await fetch(`${apiUrl}/auth/update-sinh-vien`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sinhVien_Id: sinhVienId, ...editData }),
    credentials: 'include',
  });
  const data = await res.json();
  // console.log(data.data.sinhVien);
  if (data?.error) throw new Error(data?.message);
  return data.data.sinhVien;
}

// Tạo mới sinh viên
export async function createNewSinhVien({ newData }) {
  const res = await fetch(`${apiUrl}/auth/create-user/sinh-vien`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...newData }),
    credentials: 'include',
  });
  const data = await res.json();
  if (data?.error) throw new Error(data?.message);
  return data?.data.sinhVien;
}

// Xoa sinh vien
export async function deleteSinhVienById({ sinhVienId }) {
  const res = await fetch(`${apiUrl}/auth/delete-user/sinh-vien`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sinhVien_Id: sinhVienId }),
    credentials: 'include',
  });
  const data = await res.json();
  // console.log(data);
  if (data?.error) throw new Error(data?.message);
  return data;
}

export async function getDsSinhVien({ filter, sort, page }) {
  const params = new URLSearchParams();
  // PAGINATION
  if (page) {
    params.set('page', page);
    params.set('limit', limit);
  }

  // FILTER
  if (filter) {
    filter.forEach((f) => params.set(f.field, f.value));
  }
  // console.log(filter);
  // SORT
  if (sort) {
    params.set('sort', sort);
  }
  // console.log(filter);
  const res = await fetch(`${apiUrl}/sinh-vien/dssv?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  const data = await res.json();
  // console.log(data);
  if (data?.error) throw new Error(data?.message);
  return data.data;
}
