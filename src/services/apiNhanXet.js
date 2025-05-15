const apiUrl = import.meta.env.VITE_API_URL;

export async function getAllNhanXetByBaoCaoId({ baoCaoId }) {
  const res = await fetch(`${apiUrl}/bao-cao/${baoCaoId}/nhan-xet`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const data = await res.json();
  // console.log(data.data);
  if (data?.error) throw new Error(data?.message);
  return data?.data.nhanXet;
}

export async function createNewNhanXetByBaoCaoId({ baoCaoId, newData }) {
  const res = await fetch(`${apiUrl}/bao-cao/${baoCaoId}/nhan-xet`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...newData }),
    credentials: 'include',
  });
  const data = await res.json();
  // console.log(data.data);
  if (data?.error) throw new Error(data?.message);
  return data?.data.nhanXet;
}

export async function editNhanXetById({ nhanXetId, editData }) {
  const res = await fetch(`${apiUrl}/nhan-xet/${nhanXetId}`, {
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
  return data?.data.nhanXet;
}

export async function deleteNhanXetById({ nhanXetId }) {
  const res = await fetch(`${apiUrl}/nhan-xet/${nhanXetId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const data = await res.json();
  // console.log(data.data);
  if (data?.error) throw new Error(data?.message);
  return data?.data;
}
