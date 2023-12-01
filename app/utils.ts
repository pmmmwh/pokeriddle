export const PAGINATION_LIMITS = [10, 20, 30, 40, 50];

export function getPaginationParams(searchParams: URLSearchParams) {
  const limit = parseInt(searchParams.get("limit") ?? "30");
  const page = parseInt(searchParams.get("page") ?? "1");

  return { limit, page };
}
