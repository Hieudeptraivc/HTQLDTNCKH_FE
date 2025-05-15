const apiUrl = import.meta.env.VITE_API_URL;
const limit = import.meta.env.VITE_PAGE_SIZE;

export async function getAllCanBoKhoaUser({ filter, sort, page }) {
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

  const res = await fetch(`${apiUrl}/can-bo-khoa?${params.toString()}`, {
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
export async function getCanBoKhoaById(canBoKhoaId) {
  const res = await fetch(`${apiUrl}/can-bo-khoa/${canBoKhoaId}`, {
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

export async function createNewCanBoKhoa({ newData }) {
  // console.log(newData);
  const res = await fetch(`${apiUrl}/auth/create-user/can-bo-khoa`, {
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
  return data?.data.canBoKhoa;
}

export async function editCanBoKhoaById({ canBoKhoaId, editData }) {
  const res = await fetch(`${apiUrl}/auth/update-can-bo-khoa`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ canBoKhoa_Id: canBoKhoaId, ...editData }),
    credentials: 'include',
  });
  const data = await res.json();
  // console.log(data.data.canBoKhoa);
  if (data?.error) throw new Error(data?.message);
  return data.data.canBoKhoa;
}

export async function editCanBoKhoaByMe({ payload }) {
  const res = await fetch(`${apiUrl}/auth/update-can-bo-khoa`, {
    method: 'PATCH',
    body: payload,
    credentials: 'include',
  });
  const data = await res.json();
  if (data?.error) throw new Error(data?.message);
  return data.data.canBoKhoa;
}

export async function deleteCanBoKhoaById({ canBoKhoaId }) {
  // console.log(canBoKhoaId);
  const res = await fetch(`${apiUrl}/auth/delete-user/can-bo-khoa`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ canBoKhoa_Id: canBoKhoaId }),
    credentials: 'include',
  });
  const data = await res.json();
  // console.log(data);
  if (data?.error) throw new Error(data?.message);
  return data;
}

export async function getDsCanBoKhoa() {
  const res = await fetch(`${apiUrl}/can-bo-khoa/dscbk`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  const data = await res.json();

  if (data?.error) throw new Error(data?.message);
  return data.data.allCanBoKhoa;
}
