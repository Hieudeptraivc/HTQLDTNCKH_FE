export function buildSingleFilter(filterParams) {
  if (!filterParams) return null;
  const filterArray = Object.entries(filterParams);

  const filter = filterArray.flatMap(([key, value]) => {
    if (value === 'all') {
      return [];
    }
    if (key === 'keyword' && value === undefined) return [];
    if (key === 'ngayTao' && typeof value === 'string' && value.includes('-')) {
      const [gte, lte] = value.split('-').map(Number);
      return [
        { field: 'ngayTao', operator: 'gte', value: gte },
        { field: 'ngayTao', operator: 'lte', value: lte },
      ];
    }

    // Default (các field khác)
    return { field: key, value };
  });

  return filter;
}
