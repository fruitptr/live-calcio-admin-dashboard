import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';

const UserCrud = () => {
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ displayName: '', email: '', password: '' });
    const [editId, setEditId] = useState(null);
    const [dataChanged, setDataChanged] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
          fetch('http://localhost:5000/getUsers')
            .then(response => response.json())
            .then(data => setUsers(data.users));
        };
        fetchData();
    }, [dataChanged]);

    const handleEdit = (uid) => {
        const userToEdit = users.find(user => user.uid === uid);
        setFormData({ displayName: userToEdit.displayName, email: userToEdit.email, password: userToEdit.passwordSalt });
        setEditId(uid);
        setOpen(true);
    };

    const handleDelete = async (uid) => {
      fetch('http://localhost:5000/deleteUser', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ uid })
      })
      .then(response => response.json())
      .then(data => {
          console.log('User deleted successfully:', data);
          toast.success('User deleted');
          dataChanged ? setDataChanged(false) : setDataChanged(true);
      })
      .catch(error => {
          console.error('Error deleting user:', error);
      });
    };

    const handleSave = async () => {
        if (editId) {
          const updatedUser = {
            uid: editId,
            displayName: formData.displayName,
            email: formData.email,
            password: formData.password
          };
          fetch('http://localhost:5000/updateUser', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(updatedUser)
          })
          .then(response => response.json())
          .then(data => {
              console.log('User updated successfully:', data);
              toast.success('User updated');
              dataChanged ? setDataChanged(false) : setDataChanged(true);
          })
          .catch(error => {
              console.error('Error updating user:', error);
          });
        } else {
          const newUser = {
            displayName: formData.displayName,
            email: formData.email,
            password: formData.password
          };
          fetch('http://localhost:5000/createUser', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(newUser)
          })
          .then(response => response.json())
          .then(data => {
              console.log('New user created successfully:', data);
              toast.success('User created');
              dataChanged ? setDataChanged(false) : setDataChanged(true);
          })
          .catch(error => {
              console.error('Error creating user:', error);
          });
        }
        setOpen(false);
        setFormData({ displayName: '', email: '', password: '' });
        setEditId(null);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCancel = () => {
        setOpen(false);
        setFormData({ displayName: '', email: '', password: '' });
        setEditId(null);
    };

    return (
        <div>
            <Button style={{ backgroundColor: "#B40000", marginBottom: '10px', marginTop: '20px'}} variant="contained" color="primary" onClick={() => setOpen(true)}>Add User</Button>
            <TableContainer component={Paper}>
                <Table aria-label="subscription table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Password</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(user => (
                            <TableRow key={user.uid}>
                                <TableCell>{user.uid}</TableCell>
                                <TableCell>{user.displayName}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.passwordSalt}</TableCell>
                                <TableCell>
                                    <Button style={{ backgroundColor: "#B40000" }} variant="contained" disableElevation onClick={() => handleEdit(user.uid)}>Edit</Button>
                                    <Button style={{marginLeft: '4px' }}color="error" variant="outlined" disableElevation onClick={() => handleDelete(user.uid)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{editId ? 'Edit User' : 'Add User'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="displayName"
                        label="Display Name"
                        type="text"
                        fullWidth
                        value={formData.displayName}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="email"
                        label="Email"
                        type="text"
                        fullWidth
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="password"
                        label="Password"
                        type="text"
                        fullWidth
                        value={formData.password}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default UserCrud;