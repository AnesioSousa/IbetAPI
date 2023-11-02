let authHeaders = new Headers();
const url = "http://localhost:3307/apostador";

authHeaders.set("Authorization", `Basic ${btoa(`${username}:${password}`)}`);
fetch(url, { headers: authHeaders })
  .then((response) => response.json())
  .then((usersList) => displayAllUsers(usersList));
