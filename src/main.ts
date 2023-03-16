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

function renderUsers(users: User[]): void {
  const userList = document.createElement("ul");

  users.forEach((user) => {
    const userItem = document.createElement("li");
    userItem.textContent = `${user.name} (${user.email})`;
    userList.appendChild(userItem);
  });

  document.body.appendChild(userList);
}

getUsers()
  .then((users) => renderUsers(users))
  .catch((error) => console.error(error));
