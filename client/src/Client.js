
function search(text) {
  const url = "https://bcbi.brown.edu/solrplant_api/"
  const params = {
    headers:{
      "content-type":"text/plain"
    },
    body:text,
    method:"POST"
  }

  return fetch(url, params).then(checkStatus)
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
