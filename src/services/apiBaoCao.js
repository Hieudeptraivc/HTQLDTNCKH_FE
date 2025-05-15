const apiUrl = import.meta.env.VITE_API_URL;
const limit = import.meta.env.VITE_PAGE_SIZE;

export async function getAllBaoCaoByUser({ filter, sort, page }) {
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

  const res = await fetch(`${apiUrl}/bao-cao?${params.toString()}`, {
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

// Chỉnh sửa thông tin bao cao dựa vào ID
export async function editBaoCaoById({ baoCaoId, form }) {
  const res = await fetch(`${apiUrl}/bao-cao/${baoCaoId}`, {
    method: 'PATCH',
    body: form,
    credentials: 'include',
  });
  const data = await res.json();
  // console.log(data.data.sinhVien);
  if (data?.error) throw new Error(data?.message);
  return data?.data;
}

// Tạo mới bao cao
export async function createNewBaoCao({ form }) {
  const res = await fetch(`${apiUrl}/bao-cao`, {
    method: 'POST',
    body: form,
    credentials: 'include',
  });

  const data = await res.json();
  if (data?.error) throw new Error(data?.message);
  return data?.data;
}

// Xoa bao cao
export async function deleteBaoCaoById({ baoCaoId }) {
  const res = await fetch(`${apiUrl}/bao-cao/${baoCaoId}`, {
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

export async function getBaoCaoById(baoCaoId) {
  const res = await fetch(`${apiUrl}/bao-cao/${baoCaoId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const data = await res.json();
  // console.log(data.data);
  if (data?.error) throw new Error(data?.message);
  return data.data;
}

export async function viewBaoCaoById({ baoCaoId }) {
  const res = await fetch(`${apiUrl}/bao-cao/${baoCaoId}/file`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData?.message || 'Lỗi khi tải file');
  }

  const blob = await res.blob();
  const contentDisposition = res.headers.get('Content-Disposition');
  const filenameMatch = contentDisposition?.match(/filename="?(.+)"?/);
  const filename = filenameMatch ? filenameMatch[1] : 'file-bao-cao';

  return { blob, filename };
}
export async function downloadBaoCaoById({ baoCaoId }) {
  const res = await fetch(`${apiUrl}/bao-cao/${baoCaoId}/download-file`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData?.message || 'Lỗi khi tải file');
  }

  const blob = await res.blob();
  const contentDisposition = res.headers.get('Content-Disposition');

  let filename = 'file-bao-cao';

  // Ưu tiên filename* nếu có (có mã hóa UTF-8 và encodeURIComponent)
  const filenameStarMatch = contentDisposition?.match(/filename\*=UTF-8''(.+)/);
  if (filenameStarMatch) {
    filename = decodeURIComponent(filenameStarMatch[1]);
  } else {
    // Fallback cho filename thông thường
    const filenameMatch = contentDisposition?.match(/filename="?([^"]+)"?/);
    if (filenameMatch) {
      filename = filenameMatch[1];
    }
  }

  return { blob, filename };
}
