const url = "http://localhost:3307/apostador/384";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjk4OTY5NDQ1LCJleHAiOjE2OTg5NzAwNDV9.HZXxjTszuuDsSDnT87U-twlnHsvYKp7o-pOmQjw3TCc";

fetch(url, {
  method: "GET", // or 'POST', 'PUT', etc., depending on your request type
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json", // Set the content type if needed
  },
})
  .then((response) => response.json())
  .then((client) => {
    console.log(client["email"].toUpperCase());
  })
  .catch((error) => {
    console.error(error);
  });
