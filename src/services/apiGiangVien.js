const apiUrl = import.meta.env.VITE_API_URL;
const limit = import.meta.env.VITE_PAGE_SIZE;

export async function getAllGiangVienByUser({ filter, sort, page }) {
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

  const res = await fetch(`${apiUrl}/giang-vien?${params.toString()}`, {
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
//// Lấy thông tin giang viên dựa vào ID
export async function getGiangVienById(giangVienId) {
  const res = await fetch(`${apiUrl}/giang-vien/${giangVienId}`, {
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

// Chỉnh sửa thông tin giang viên dựa vào ID
export async function editGiangVienById({ giangVienId, editData }) {
  const res = await fetch(`${apiUrl}/auth/update-giang-vien`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ giangVien_Id: giangVienId, ...editData }),
    credentials: 'include',
  });
  const data = await res.json();
  // console.log(data.data.giangVien);
  if (data?.error) throw new Error(data?.message);
  return data.data.giangVien;
}
export async function editGiangVienByMe({ payload }) {
  const res = await fetch(`${apiUrl}/auth/update-giang-vien`, {
    method: 'PATCH',
    body: payload, // <- sửa ở đây
    credentials: 'include',
  });
  const data = await res.json();
  if (data?.error) throw new Error(data?.message);
  return data.data.giangVien;
}

// Tạo mới giang viên
export async function createNewGiangVien({ newData }) {
  const res = await fetch(`${apiUrl}/auth/create-user/giang-vien`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...newData }),
    credentials: 'include',
  });
  const data = await res.json();
  if (data?.error) throw new Error(data?.message);
  return data?.data.giangVien;
}

// Xoa giang vien
export async function deleteGiangVienById({ giangVienId }) {
  const res = await fetch(`${apiUrl}/auth/delete-user/giang-vien`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ giangVien_Id: giangVienId }),
    credentials: 'include',
  });
  const data = await res.json();
  // console.log(data);
  if (data?.error) throw new Error(data?.message);
  return data;
}

export async function getDsGiangVien({ filter, sort, page }) {
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

  const res = await fetch(`${apiUrl}/giang-vien/dsgv?${params.toString()}`, {
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
