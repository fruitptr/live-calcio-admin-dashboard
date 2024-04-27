import * as React from 'react';
import {
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons
} from '@mui/x-data-grid';
import { randomId, randomArrayItem } from '@mui/x-data-grid-generator';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';
import { FIRESTORE_DB, FIREBASE_APP } from '../../firebase';

const initialRows = [
  {
    id: randomId(),
    player_name: 'John Doe',
    stats_description: 'Scored a goal'
  },
  {
    id: randomId(),
    player_name: 'Jane Smith',
    stats_description: 'Assisted a goal'
  },
  {
    id: randomId(),
    player_name: 'Michael Johnson',
    stats_description: 'Received a yellow card'
  }
];

function HandleStats() {
  const [rows, setRows] = React.useState(initialRows);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleApproveClick = (id, description) => () => {
    toast.success(`Record: ${description} approved`);
    setRows(rows.filter(row => row.id !== id));
  };

  const handleDisapproveClick = (id, description) => () => {
    toast.error(`Record: ${description} disapproved`);
    setRows(rows.filter(row => row.id !== id));
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 180 },
    { field: 'player_name', headerName: 'Player Name', width: 180 },
    { field: 'stats_description', headerName: 'Stats Description', width: 220 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: ({ row }) => (
        <>
          <IconButton
            onClick={handleApproveClick(row.id, row.stats_description)}
          >
            <CheckIcon />
          </IconButton>
          <IconButton
            onClick={handleDisapproveClick(row.id, row.stats_description)}
          >
            <CloseIcon />
          </IconButton>
        </>
      )
    }
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: '100%'
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        onRowEditStop={handleRowEditStop}
      />
      <ToastContainer />
    </Box>
  );
}

export default HandleStats;
