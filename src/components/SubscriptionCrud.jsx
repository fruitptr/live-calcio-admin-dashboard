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
import {FIREBASE_APP, FIRESTORE_DB} from '../../firebase';
import { collection, doc, getDocs, updateDoc, addDoc, deleteDoc } from 'firebase/firestore';

const SubscriptionCrud = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', description: '', price: '' });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          const db = FIRESTORE_DB;
          const snapshot = await getDocs(collection(db, 'subscriptiontiers'));
          const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setSubscriptions(data);
        };
        fetchData();
    }, []);

    const handleEdit = (id) => {
        const subscriptionToEdit = subscriptions.find(subscription => subscription.id === id);
        setFormData({ name: subscriptionToEdit.name, description: subscriptionToEdit.description, price: subscriptionToEdit.price });
        setEditId(id);
        setOpen(true);
    };

    const handleDelete = async (id) => {
        const db = FIRESTORE_DB;
        await deleteDoc(doc(db, 'subscriptiontiers', id));
        setSubscriptions(subscriptions.filter(subscription => subscription.id !== id));
    };

    const handleSave = async () => {
        const db = FIRESTORE_DB;
        console.log("EDIT ID: ", editId)
        if (editId) {
            const docRef = doc(db, 'subscriptiontiers', editId);
            await updateDoc(docRef, formData);
            setSubscriptions(subscriptions.map(subscription => (subscription.id === editId ? { id: editId, ...formData } : subscription)));
        } else {
            const docRef = await addDoc(collection(db, 'subscriptiontiers'), formData);
            setSubscriptions([...subscriptions, { id: docRef.id, ...formData }]);
        }
        setOpen(false);
        setFormData({ name: '', description: '', price: '' });
        setEditId(null);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCancel = () => {
        setOpen(false);
        setFormData({ name: '', description: '', price: '' });
        setEditId(null);
    };

    return (
        <div>
            <Button style={{ backgroundColor: "#B40000", marginBottom: '10px', marginTop: '20px'}} variant="contained" color="primary" onClick={() => setOpen(true)}>Add Subscription</Button>
            <TableContainer component={Paper}>
                <Table aria-label="subscription table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {subscriptions.map(subscription => (
                            <TableRow key={subscription.id}>
                                <TableCell>{subscription.id}</TableCell>
                                <TableCell>{subscription.name}</TableCell>
                                <TableCell>{subscription.description}</TableCell>
                                <TableCell>{subscription.price}</TableCell>
                                <TableCell>
                                    <Button style={{ backgroundColor: "#B40000" }} variant="contained" disableElevation onClick={() => handleEdit(subscription.id)}>Edit</Button>
                                    <Button style={{marginLeft: '4px' }}color="error" variant="outlined" disableElevation onClick={() => handleDelete(subscription.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{editId ? 'Edit Subscription' : 'Add Subscription'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="description"
                        label="Description"
                        type="text"
                        fullWidth
                        value={formData.description}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="price"
                        label="Price"
                        type="number"
                        fullWidth
                        value={formData.price}
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

export default SubscriptionCrud;