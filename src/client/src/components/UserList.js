import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { useCallback, useEffect, useState } from "react";
import { userRepository } from "../infrastructure/repository/UserRepository";
import useToastContext from "../hooks/useToastContext";

const UserList = ({ onEdit, refresh }) => {
  const { showToast } = useToastContext();

  const [users, setUsers] = useState([]);

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
  }, [fetchUsers, refresh]); // Fetch data when `refresh` prop changes

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

  return (
    <div className="container mt-5">
      <h2>User List</h2>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>ID</CTableHeaderCell>
            <CTableHeaderCell>Name</CTableHeaderCell>
            <CTableHeaderCell>Email</CTableHeaderCell>
            <CTableHeaderCell>Age</CTableHeaderCell>
            <CTableHeaderCell>Bod</CTableHeaderCell>
            <CTableHeaderCell>Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {users.map((user) => (
            <CTableRow key={user.id}>
              <CTableDataCell>{user.id}</CTableDataCell>
              <CTableDataCell>{user.name}</CTableDataCell>
              <CTableDataCell>{user.email}</CTableDataCell>
              <CTableDataCell>{user.age}</CTableDataCell>
              <CTableDataCell>{user.bod}</CTableDataCell>
              <CTableDataCell>
                <CButton color="info" onClick={() => onEdit(user)}>
                  Edit
                </CButton>
                <CButton color="danger" onClick={() => handleDelete(user.id)}>
                  Delete
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>
  );
};

export default UserList;
