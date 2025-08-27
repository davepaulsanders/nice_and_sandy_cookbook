export const fetchData = async <T>(
  url: string,
  options?: { method?: string; body?: any; headers?: any } | undefined
): Promise<T> => {
  if (options && "body" in options) {
    options.body = JSON.stringify(options.body);
  }
  const resp = await fetch(url, options ? options : {});
  if (resp.status !== 200)
    throw new Error(`Request failed with ${resp.status}`);
  const data = await resp.json();
  return data;
};
