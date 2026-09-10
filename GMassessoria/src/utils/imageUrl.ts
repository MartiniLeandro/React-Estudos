export function getImageUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  
  const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
  
  const hostBaseUrl = apiBaseUrl.replace(/\/api\/?$/, '');
  
  const encodedPath = encodeURI(path.startsWith('/') ? path : `/${path}`);
  
  return `${hostBaseUrl}${encodedPath}`;
}
