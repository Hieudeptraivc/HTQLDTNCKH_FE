export function generateYearRanges(startYear, endYear) {
  const ranges = [];
  for (let year = startYear; year > endYear; year--) {
    ranges.push({
      value: `${year - 1}-${year}`,
      label: `${year - 1} - ${year}`,
    });
  }
  return ranges;
}
