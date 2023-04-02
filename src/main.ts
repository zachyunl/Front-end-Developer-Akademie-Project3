export {};

interface User {
  id: number;
  name: string;
  email: string;
}

const url = "https://jsonplaceholder.typicode.com/users";

async function getUsers(): Promise<User[]> {
  const response = await fetch(url);
  const users = await response.json();
  return users;
}

function renderUsers(users: User[], searchValue: string): void {
  const userList = document.createElement("ul");

  users
    .filter((user) =>
      searchValue ? user.name.toLowerCase().includes(searchValue.toLowerCase()) : true
    )
    .forEach((user) => {
      const userItem = document.createElement("li");
      userItem.textContent = `${user.name} (${user.email})`;
      userList.appendChild(userItem);
    });

  document.body.appendChild(userList);
}

const searchInput = document.createElement("input");
searchInput.type = "text";
searchInput.placeholder = "Vyhledat uživatele";
document.body.appendChild(searchInput);

let userList: HTMLUListElement;

getUsers().then((users) => {
  renderUsers(users, "");

  userList = document.querySelector("ul");

  searchInput.addEventListener("input", () => {
    const searchValue = searchInput.value.trim();
    userList.remove();
    getUsers().then((users) => renderUsers(users, searchValue));
  });
});
