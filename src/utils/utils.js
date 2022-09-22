export const getPath = (filters) => {
  const params = new URLSearchParams(filters);
  window.location.hash = `?${params.toString()}`;
};
