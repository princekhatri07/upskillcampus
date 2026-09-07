const API = "http://localhost:5000/api";

async function post(url, data) {
  const response = await fetch(API + url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return response.json();
}

const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.onsubmit = async (e) => {
    e.preventDefault();
    const data = await post("/auth/login", {
      email: email.value,
      password: password.value
    });
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      location.href = "dashboard.html";
    } else {
      message.innerHTML = `<div class="alert alert-danger">${data.message}</div>`;
    }
  };
}

const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.onsubmit = async (e) => {
    e.preventDefault();
    const data = await post("/auth/register", {
      name: name.value,
      email: email.value,
      password: password.value
    });
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      location.href = "dashboard.html";
    } else {
      message.innerHTML = `<div class="alert alert-danger">${data.message}</div>`;
    }
  };
}
