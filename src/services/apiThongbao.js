const apiUrl = import.meta.env.VITE_API_URL;

export async function createNewThongBao({
  message,
  sinhViens,
  giangViens,
  canBoKhoas,
  admins,
}) {
  const res = await fetch(`${apiUrl}/thong-bao`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      sinhViens,
      giangViens,
      canBoKhoas,
      admins,
    }),
    credentials: 'include',
  });
  const data = await res.json();
  if (data?.error) throw new Error(data?.message);
  // console.log(data);
  return data;
}
export async function getAllThongBaoForUser() {
  const res = await fetch(`${apiUrl}/thong-bao`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const data = await res.json();
  // console.log(data);
  if (data?.error) throw new Error(data?.message);
  return data?.data;
}
export async function markAsReadById({ thongBaoId }) {
  const res = await fetch(`${apiUrl}/thong-bao/read`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ thongBao_Id: thongBaoId }),
    credentials: 'include',
  });
  const data = await res.json();
  // console.log(data);
  if (data?.error) throw new Error(data?.message);
  return data?.data;
}
