const API = "http://localhost:5000/api";

function protect() {
  if (!localStorage.getItem("token")) location.href = "login.html";
}

function logout() {
  localStorage.clear();
  location.href = "login.html";
}

async function request(path, options = {}) {
  const response = await fetch(API + path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
      ...(options.headers || {})
    }
  });
  if (response.status === 401) {
    logout();
    return;
  }
  return response.json();
}

async function loadDashboard() {
  protect();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  document.getElementById("welcome").textContent = `Welcome, ${user.name || "Student"} 👋`;

  const [internships, projects, skills, certificates] = await Promise.all([
    request("/internships"), request("/projects"), request("/skills"), request("/certificates")
  ]);

  document.getElementById("internshipCount").textContent = internships.length;
  document.getElementById("projectCount").textContent = projects.length;
  document.getElementById("skillCount").textContent = skills.length;
  document.getElementById("certificateCount").textContent = certificates.length;
}

function card(title, body, id, endpoint) {
  return `<div class="item-card"><div class="d-flex justify-content-between">
    <div><h5>${escapeHtml(title)}</h5>${body}</div>
    <button class="btn btn-sm btn-outline-danger" onclick="removeItem('${endpoint}','${id}')">Delete</button>
  </div></div>`;
}

function escapeHtml(text = "") {
  return String(text).replace(/[&<>"']/g, c => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[c]));
}

async function removeItem(endpoint, id) {
  if (!confirm("Delete this item?")) return;
  await request(`${endpoint}/${id}`, { method: "DELETE" });
  location.reload();
}

async function loadInternships() {
  const data = await request("/internships");
  list.innerHTML = data.map(x => card(
    `${x.company} — ${x.position}`,
    `<p>${escapeHtml(x.description || "")}</p><span class="badge-soft">${escapeHtml(x.status)}</span>`,
    x._id, "/internships"
  )).join("") || "<p>No internships added yet.</p>";
}

async function addInternship(e) {
  e.preventDefault();
  await request("/internships", { method:"POST", body:JSON.stringify({
    company: company.value, position: position.value, startDate: startDate.value,
    endDate: endDate.value, status: status.value, description: description.value
  })});
  location.reload();
}

async function loadProjects() {
  const data = await request("/projects");
  list.innerHTML = data.map(x => card(
    x.title,
    `<p>${escapeHtml(x.description || "")}</p><small>${escapeHtml(x.technologies || "")}</small>`,
    x._id, "/projects"
  )).join("") || "<p>No projects added yet.</p>";
}

async function addProject(e) {
  e.preventDefault();
  await request("/projects", { method:"POST", body:JSON.stringify({
    title:title.value, description:description.value, technologies:technologies.value,
    githubLink:githubLink.value, liveLink:liveLink.value
  })});
  location.reload();
}

async function loadSkills() {
  const data = await request("/skills");
  list.innerHTML = data.map(x => card(
    x.name,
    `<span class="badge-soft">${escapeHtml(x.proficiency)}</span>`,
    x._id, "/skills"
  )).join("") || "<p>No skills added yet.</p>";
}

async function addSkill(e) {
  e.preventDefault();
  await request("/skills", { method:"POST", body:JSON.stringify({
    name:name.value, proficiency:proficiency.value
  })});
  location.reload();
}

async function loadCertificates() {
  const data = await request("/certificates");
  list.innerHTML = data.map(x => card(
    x.title,
    `<p>${escapeHtml(x.organization || "")} ${escapeHtml(x.date || "")}</p>`,
    x._id, "/certificates"
  )).join("") || "<p>No certificates added yet.</p>";
}

async function addCertificate(e) {
  e.preventDefault();
  await request("/certificates", { method:"POST", body:JSON.stringify({
    title:title.value, organization:organization.value, date:date.value, link:link.value
  })});
  location.reload();
}

async function loadProfile() {
  const data = await request("/profile");
  name.value = data.name || "";
  email.value = data.email || "";
  bio.value = data.bio || "";
  phone.value = data.phone || "";
  github.value = data.github || "";
  linkedin.value = data.linkedin || "";
}

async function saveProfile(e) {
  e.preventDefault();
  const data = await request("/profile", { method:"PUT", body:JSON.stringify({
    name:name.value, bio:bio.value, phone:phone.value,
    github:github.value, linkedin:linkedin.value
  })});
  localStorage.setItem("user", JSON.stringify({
    id:data._id, name:data.name, email:data.email
  }));
  message.innerHTML = `<div class="alert alert-success">Profile updated successfully.</div>`;
}
