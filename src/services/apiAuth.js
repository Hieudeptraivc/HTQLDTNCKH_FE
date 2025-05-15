const apiUrl = import.meta.env.VITE_API_URL;
export async function loginApi({ username, password }) {
  const res = await fetch(`${apiUrl}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ tenDangNhap: username, matKhau: password }),
  });
  const data = await res.json();
  // console.log(data);
  if (data?.error) throw new Error(data?.message);
  return data.data;
}
export async function forgotPasswordAPI({ email }) {
  const res = await fetch(`${apiUrl}/auth/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
  const data = await res.json();
  if (data?.error) throw new Error(data?.message);
  return data;
}
export async function resetPasswordAPI({ matKhau, matKhauXacNhan, token }) {
  const res = await fetch(`${apiUrl}/auth/reset-password/${token}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ matKhau, matKhauXacNhan }),
  });
  const data = await res.json();
  if (data?.error) throw new Error(data?.message);
  return data;
}

export async function getCurrentUser() {
  const res = await fetch(`${apiUrl}/auth/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (res.status === 401) {
    throw new Error('UNAUTHORIZED');
  }
  const data = await res.json();
  // console.log(data);
  if (data?.error) throw new Error(data?.message);
  return data.data;
}

export async function logoutApi() {
  const res = await fetch(`${apiUrl}/auth/logout`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  // console.log(data);
  if (data?.error) throw new Error(data?.message);
  return data.data;
}

export async function editAdminMe({ payload }) {
  const res = await fetch(`${apiUrl}/auth/update-admin`, {
    method: 'PATCH',
    body: payload,
    credentials: 'include',
  });
  const data = await res.json();
  if (data?.error) throw new Error(data?.message);
  return data.data.admin;
}
