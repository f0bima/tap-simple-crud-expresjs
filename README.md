# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Running the Project Locally

1. Client app

```bash
# masuk ke folder src/client
cd src/client

# install package client untuk pertama kali
npm install

# build client app
npm run build
```

2. App

```bash
# masuk ke folder root
# optional jika sebelumnya berada di /src/client, jika sudah di root skip step ini
cd ../..

# install package client untuk pertama kali
npm install

# build client app
npm run start
```

## Fix Bugs

1. Form Submit belum diterapkan di [UserForm](src\client\src\components\UserForm.js#L36) => handleSubmit

```js
const handleSubmit = (e) => {
  e.preventDefault();

  const isUpdateMethod = selectedUser;

  const method = isUpdateMethod
    ? userRepository.updateUser({ id: selectedUser.id, data: formData })
    : userRepository.createUser(formData);

  method
    .then((userResponse) => {
      const successMessage = isUpdateMethod
        ? `Success update ${selectedUser.id}`
        : `Success create user ${userResponse.name}`;
      showToast({ message: successMessage });
      onFormSubmit();
      resetForm();
    })
    .catch((error) => {
      showToast({ message: error.message, isSuccess: false });
    });
};
```

2. Form Reset belum diterapkan di [UserForm](src\client\src\components\UserForm.js#L125) => Button reset

```js
<CButton type="button" color="secondary" onClick={handleReset}>
  Reset
</CButton>
```

3. Reset bod belum diterapkan di [UserForm](src\client\src\components\UserForm.js#L59) => resetForm

```js
const resetForm = () => {
  setFormData({
    name: "",
    email: "",
    age: "",
    bod: "",
  });
};
```

4. Fetch user belum diterapkan di [UserList](src\client\src\components\UserList.js#L19)

```js
const fetchUsers = useCallback(() => {
  userRepository
    .getUsers()
    .then((data) => setUsers(data))
    .catch((error) => {
      showToast({ message: error.message, isSuccess: false });
    });
}, [showToast]);

useEffect(() => {
  fetchUsers();
}, [fetchUsers, refresh]);
```

5. User Service typo `ages` -> `age` [UserService](src\services\UserService.js#L15)

```js
createUser(name, email, age, bod) {
  const id = `Data ${userCounter++}`
  const user = new User(id, nama, email, age, bod);
  return UserRepositories.create(user);
}
```

6. User model typo `this.emails`-> `this.email` [UserModel](src\models\User.js#L5)

```js
class User {
  constructor(id, name, email, age, bod) {
    this.id = id;
    this.name = name;
    this.emails = email;
    this.age = age;
    this.bod = bod;
  }
}
```

## New File/Folder

1. [src\client\src\components\Toast.js](src\client\src\components\Toast.js) => Toast Component
2. [src\client\src\hooks\useToastContext.js](src\client\src\hooks\useToastContext.js) => hook untuk mengakses toast
3. [src\client\src\providers\ToastProvider.js](src\client\src\providers\ToastProvider.js) => provider toast
4. [src\client\src\infrastructure\datasource\UserApi.js](src\client\src\infrastructure\datasource\UserApi.js) => User api dengan menerapkan axios interceptor
5. [src\client\src\infrastructure\repository\UserRepository.js](src\client\src\infrastructure\repository\UserRepository.js) => repository user yang berisi method untuk mengakses user backend servis

## Refactor code

1. Refactor delete method dengan axios interceptor pada user repository [UserList](src\client\src\components\UserList.js#L32)

```js
const handleDelete = (id) => {
  userRepository
    .deleteUser({ id })
    .then((data) => {
      showToast({ message: `${data} : ${id}` });
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    })
    .catch((error) => {
      console.log(error.message);
      showToast({ message: error.message, isSuccess: false });
    });
};
```

2. Refactor [index.js](src\client\src\index.js#L13) untuk mengakses toast pada aplikasi dengan menambahkan ToastProvider

```jsx
<CContainer>
  <ToastProvider>
    <App />
  </ToastProvider>
</CContainer>
```
