const apiUrl = import.meta.env.VITE_API_URL;
const limit = import.meta.env.VITE_PAGE_SIZE;

export async function getAllLinhVucByUser({ page }) {
  const params = new URLSearchParams();
  // PAGINATION
  if (page) {
    params.set('page', page);
    params.set('limit', limit);
  }

  const res = await fetch(`${apiUrl}/linh-vuc?${params.toString()}`, {
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
//// Lấy thông tin linh-vuc dựa vào ID
export async function getLinhVucById(linhVucId) {
  const res = await fetch(`${apiUrl}/linh-vuc/${linhVucId}`, {
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

// Chỉnh sửa thông tin linh-vuc dựa vào ID
export async function editLinhVucById({ linhVucId, editData }) {
  const res = await fetch(`${apiUrl}/linh-vuc/${linhVucId}`, {
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
  return data?.data.data;
}

// Tạo mới linh-vuc
export async function createNewLinhVuc({ newData }) {
  const res = await fetch(`${apiUrl}/linh-vuc`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...newData }),
    credentials: 'include',
  });
  const data = await res.json();
  // console.log(data);
  if (data?.error) throw new Error(data?.message);
  return data?.data.data;
}
// Xoa linh-vuc
export async function deleteLinhVucById({ linhVucId }) {
  const res = await fetch(`${apiUrl}/linh-vuc/${linhVucId}`, {
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
export async function getDsLinhVucByUser() {
  const res = await fetch(`${apiUrl}/linh-vuc/dslv`, {
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
