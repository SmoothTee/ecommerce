import { queryCache } from "react-query";

const apiURL = process.env.REACT_APP_API_URL;

// Wrapper around the fetch API.
export const apiClient = (
  endpoint: string,
  {
    data,
    headers: customHeaders,
    ...customConfig
  }: { data?: { [key: string]: any }; headers?: { [key: string]: any } } = {}
) => {
  // Set default config values for fetch API.
  const fetchConfig: RequestInit = {
    // If the request has a body, automatically set the HTTP method to POST.
    method: data ? "POST" : "GET",
    // Convert object to JSON. Cannot send javascript object as body.
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      // Content type corresponds to the type of the request body.
      "Content-Type": data ? "application/json" : undefined,
      ...customHeaders,
    } as RequestInit.headers,
    ...customConfig,
  };

  return fetch(`${apiURL}/${endpoint}`, fetchConfig).then(async (response) => {
    // Access denied to the resource on the given endpoint.
    if (response.status === 401) {
      // Clear cache and start fresh.
      queryCache.clear();
      await auth.logout();
      // Refresh the page.
      window.location.reload();

      return Promise.reject({ message: "Please re-authenticate." });
    }

    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
};
