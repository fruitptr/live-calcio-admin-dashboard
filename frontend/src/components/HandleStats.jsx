import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import {FIREBASE_APP, FIRESTORE_DB} from '../../firebase';
import { collection, doc, getDocs, updateDoc, query, where, deleteDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const HandleStats = () => {
    const [stats, setStats] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          const db = FIRESTORE_DB;
          const snapshot = await getDocs(collection(db, 'recordsTemporary'));
          const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setStats(data);
        };
        fetchData();
    }, []);

    const handleApprove = async (stat, id, newrecord) => {
        const db = FIRESTORE_DB;
        const q = query(collection(db, 'records'), where("stat", "==", stat));
        const requiredRecord = await getDocs(q);
        console.log("Required Record: ", requiredRecord.docs[0].data().stat);

        const recordRef = doc(db, 'records', requiredRecord.docs[0].id);
        await updateDoc(recordRef, { value: newrecord });

        await deleteDoc(doc(db, 'recordsTemporary', id));
        setStats(stats.filter(stat => stat.id !== id));
        toast.success('Record approved');
    }

    const handleReject = async (id) => {
        const db = FIRESTORE_DB;
        await deleteDoc(doc(db, 'recordsTemporary', id));
        setStats(stats.filter(stat => stat.id !== id));
        toast.error('Record rejected');
    }

    return (
        <div>
            <TableContainer component={Paper} style={{ marginTop: '20px'}}>
                <Table aria-label="stats table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Player Name</TableCell>
                            <TableCell>Statistic</TableCell>
                            <TableCell>Current Record</TableCell>
                            <TableCell>New Record</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {stats.map(stat => (
                            <TableRow key={stat.id}>
                                <TableCell>{stat.id}</TableCell>
                                <TableCell>{stat.player}</TableCell>
                                <TableCell>{stat.stat}</TableCell>
                                <TableCell>{stat.currentrecord}</TableCell>
                                <TableCell>{stat.newrecord}</TableCell>
                                <TableCell>
                                    <Button style={{ backgroundColor: "#B40000" }} variant="contained" disableElevation onClick={() => handleApprove(stat.stat, stat.id, stat.newrecord)}>Approve</Button>
                                    <Button style={{marginLeft: '4px' }}color="error" variant="outlined" disableElevation onClick={() => handleReject(stat.id)}>Reject</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default HandleStats;