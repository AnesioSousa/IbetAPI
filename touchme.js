import fetch from "node-fetch";

function doReq() {
  const url = "http://localhost:3307";
  let response = fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
  let body = response.json();
  console.log(body.message);
}

export default doReq;
