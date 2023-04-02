export {};

interface User {
  id: number;
  name: string;
  email: string;
  company: { name: string };
  phone: string;
  website: string;
}

const url = "https://jsonplaceholder.typicode.com/users";

async function getUsers(): Promise<User[]> {
  const response = await fetch(url);
  const users = await response.json();
  return users;
}

function renderUsers(users: User[]): void {
  const userList = document.createElement("ul");

  users.forEach((user) => {
    const userItem = document.createElement("li");
    userItem.innerHTML = `
      <div class="user-card">
        <img src="https://robohash.org/${user.id}" alt="Avatar">
        <div class="user-details">
          <h3>${user.name}</h3>
          <p>${user.company.name} - ${user.email}</p>
          <p>${user.phone}</p>
          <p><a href="${user.website}">${user.website}</a></p>
        </div>
      </div>
    `;
    userList.appendChild(userItem);
  });

  document.body.appendChild(userList);
}

async function filterUsers(): Promise<void> {
  const searchInput = document.getElementById("search-input") as HTMLInputElement;
  const searchValue = searchInput.value.toLowerCase();
  const users = await getUsers();
  const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(searchValue));
  
  // Remove all users
  const userList = document.querySelector("ul");
  if (userList) {
    userList.remove();
  }

  // Render filtered users
  renderUsers(filteredUsers);
}

const searchInput = document.createElement("input");
searchInput.type = "text";
searchInput.id = "search-input";
searchInput.placeholder = "Zadej jméno";
searchInput.addEventListener("input", filterUsers);
document.body.insertBefore(searchInput, document.body.firstChild);

getUsers()
  .then((users) => renderUsers(users))
  .catch((error) => console.error(error));
