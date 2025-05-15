const apiUrl = import.meta.env.VITE_API_URL;
const limit = import.meta.env.VITE_PAGE_SIZE;

export async function getAllDeTaiByUser({ filter, sort, page }) {
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

  const res = await fetch(`${apiUrl}/de-tai?${params.toString()}`, {
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

// Chỉnh sửa thông tin de tai dựa vào ID
export async function editDeTaiById({ deTaiId, editData }) {
  // console.log(editData);
  const res = await fetch(`${apiUrl}/de-tai/${deTaiId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...editData }),
    credentials: 'include',
  });
  const data = await res.json();
  // console.log(data.data.sinhVien);
  if (data?.error) throw new Error(data?.message);
  return data.data.deTai;
}

export async function disableDeTaiById({ deTaiId }) {
  const res = await fetch(`${apiUrl}/de-tai/${deTaiId}/disable`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const data = await res.json();

  if (data?.error) throw new Error(data?.message);
  return data?.data.rejectDeTai;
}

export async function acceptDeTaiById({ deTaiId }) {
  const res = await fetch(`${apiUrl}/de-tai/${deTaiId}/accept`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const data = await res.json();

  if (data?.error) throw new Error(data?.message);
  return data.data.updatedDeTai;
}
/////
export async function rejectDeTaiById({ deTaiId }) {
  const res = await fetch(`${apiUrl}/de-tai/${deTaiId}/reject`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const data = await res.json();

  if (data?.error) throw new Error(data?.message);
  return data.data.rejectDeTai;
}
/////
export async function updateCapTruongDeTaiById({ deTaiId }) {
  const res = await fetch(`${apiUrl}/de-tai/${deTaiId}/cap-truong`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const data = await res.json();

  if (data?.error) throw new Error(data?.message);
  return data.data.capTruongDeTai;
}
/////
export async function updateCapKhoaDeTaiById({ deTaiId }) {
  const res = await fetch(`${apiUrl}/de-tai/${deTaiId}/cap-khoa`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const data = await res.json();

  if (data?.error) throw new Error(data?.message);
  return data.data.capKhoaDeTai;
}
/////
export async function restartDeTaiById({ deTaiId }) {
  const res = await fetch(`${apiUrl}/de-tai/${deTaiId}/restart`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const data = await res.json();

  if (data?.error) throw new Error(data?.message);
  return data.data.restartDeTai;
}
// Tạo mới de tai
export async function createNewDeTai({ newData }) {
  const res = await fetch(`${apiUrl}/de-tai`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...newData }),
    credentials: 'include',
  });
  const data = await res.json();
  if (data?.error) throw new Error(data?.message);
  return data?.data.deTai;
}
// Xoa de tai
export async function deleteDeTaiById({ deTaiId }) {
  const res = await fetch(`${apiUrl}/de-tai/${deTaiId}`, {
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

export async function getDeTaiById(deTaiId) {
  const res = await fetch(`${apiUrl}/de-tai/${deTaiId}`, {
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
