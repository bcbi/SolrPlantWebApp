
function search(query) {
  return fetch(`http://bcbi.brown.edu/chemgrab_api/text=${query}`, {
    accept: 'html/text',
  }).then(checkStatus)
    .then(parseText);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error); // eslint-disable-line no-console
    throw error;
  }
}

function parseText(response) {
  return response.text();
}

const Client = { search };
export default Client;
