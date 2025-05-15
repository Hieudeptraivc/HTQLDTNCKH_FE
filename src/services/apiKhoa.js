const apiUrl = import.meta.env.VITE_API_URL;
const limit = import.meta.env.VITE_PAGE_SIZE;

export async function getAllKhoaByUser({ page }) {
  const params = new URLSearchParams();
  // PAGINATION
  if (page) {
    params.set('page', page);
    params.set('limit', limit);
  }

  const res = await fetch(`${apiUrl}/khoa?${params.toString()}`, {
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
//// Lấy thông tin khoa dựa vào ID
export async function getKhoaById(khoaId) {
  const res = await fetch(`${apiUrl}/khoa/${khoaId}`, {
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

// Chỉnh sửa thông tin khoa dựa vào ID
export async function editKhoaById({ khoaId, editData }) {
  const res = await fetch(`${apiUrl}/khoa/${khoaId}`, {
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
  return data.data.data;
}

// Tạo mới khoa
export async function createNewKhoa({ newData }) {
  const res = await fetch(`${apiUrl}/khoa`, {
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
// Xoa khoa
export async function deleteKhoaById({ khoaId }) {
  const res = await fetch(`${apiUrl}/khoa/${khoaId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const data = await res.json();
  // console.log(data);
  if (data?.error) throw new Error(data?.message);
  return data;
}
export async function getDsKhoaByUser() {
  const res = await fetch(`${apiUrl}/khoa/dsk`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  const data = await res.json();

  if (data?.error) throw new Error(data?.message);
  return data.data.data;
}
