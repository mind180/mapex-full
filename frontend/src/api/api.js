const apiVersion = '/api/v1';

/**
 * Make fetch request with specific method to url with passed entities in body
 * 
 * @param {String} method   POST, PUT, PATCH, DELETE
 * @param {String} url      pass to entities starting with slash "/..."
 * @param {Array}  entities optional
 */
export async function processEntity(method, url, entities) {
  const pathToResources = apiVersion + url;

  return fetch(pathToResources, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entities)
  })
    .then(response => handleResponse(response));
}

async function handleResponse(response) {
  if (response.ok) {
    return response;
  }
  const error = await response.json();
  return await Promise.reject(error);
}
