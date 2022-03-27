import axios from 'axios'

function searchRepositoriesAPI(params, abortController) {
  return axios
    .get('https://api.github.com/search/repositories', {
      params,
      signal: abortController.signal
    })
    .then(response => response.data)
}

export default searchRepositoriesAPI
