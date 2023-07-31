/// Шаг 1 - берем ссылку на апи
const api = "https://api.github.com/users/";

/// Шаг 2 - получаем элементы дома

const form = document.querySelector("form");
const input = document.querySelector("#inp");
const output = document.querySelector("#output");

/// Шаг 3 - получаем response с сервера по запросу, куда передаем username в строку поиска

const searchUser = async () => {
  const login = input.value;
  let url = api + login;
  console.log(url); // из инпута берем поисковый запрос и после q= ставим в url
  const req = await fetch(url);
  const res = await req.json();
  renderProfile(res);
  console.log(res);
};

/// Шаг 4 - убираем поведение по умолчанию для формы, и вызов функции - при клике на кнопку

form.addEventListener("submit", (event) => {
  event.preventDefault();
  searchUser();
});

/// Шаг 5 - получаем пользоваетльску инфу и отправляем её в ДОМ

const renderProfile = (obj) => {
  if (!input.value) {
    return;
  }
  output.innerHTML = "";
  const card = document.createElement("div");
  card.classList.add("card");

  const info = document.createElement("div");
  info.classList.add("info");

  const avatar = document.createElement("img");
  avatar.src = `${obj.avatar_url}`;
  avatar.classList.add("avatar");

  const infoWrapper = document.createElement("div");
  infoWrapper.classList.add("info__wrapper");

  const loginLink = document.createElement("a");
  loginLink.href = `${obj.html_url}`;
  loginLink.classList.add("loginLink");
  loginLink.target = "_blank";

  const login = document.createElement("h2");
  login.textContent = `${obj.login}`;
  login.classList.add("login");

  const location = document.createElement("h3");
  location.textContent = `Location: ${obj.location}`;
  location.classList.add("location");

  const id = document.createElement("h3");
  id.textContent = `ID: ${obj.id}`;
  id.classList.add("id");

  const followers = document.createElement("h4");
  followers.textContent = `Followers: ${obj.followers}`;
  followers.classList.add("followers");

  const following = document.createElement("h4");
  following.textContent = `Following: ${obj.following}`;
  following.classList.add("following");

  // const repos = document.createElement("a");
  // repos.href = `${obj.repos_url}`;
  // repos.textContent = "My Repos:";
  // repos.classList.add("repos");
  // repos.classList.add("repos");

  // const list = JSON.stringify(repos.href);
  // console.log(list);

  // repos.map((repo) => {
  //   repo.createElement("li");
  //   repo.textContent = `${repo.name}`;
  //   repos.append(repo);
  // });

  infoWrapper.append(loginLink, location, id, followers, following);
  loginLink.append(login);
  info.append(avatar, infoWrapper);
  card.append(info);
  output.append(card);
};
