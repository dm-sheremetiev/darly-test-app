import React, { useState } from 'react';
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { CircularProgress, Collapse, Alert, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Employee } from '../../types/Employee';
import { Close } from '@mui/icons-material';

import './EmployeeTable.scss';
import { client } from '../../api/fetchEmployees';

type Props = {
  employees: Employee[],
  setEmployees: React.Dispatch<React.SetStateAction<Employee[] | undefined>>,
};

export const EmployeeTable: React.FC<Props> = ({
  employees,
  setEmployees,
}) => {
  const [selectedEmployeesId, setSelectedEmployeesId] = useState<GridSelectionModel>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteError, setIsDeleteError] = useState(false);

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'surname', headerName: 'Surname', width: 150 },
    { field: 'age', headerName: 'Age', width: 150 },
    { field: 'salary', headerName: 'Salary', width: 150 },
    { field: 'position', headerName: 'Position', width: 150 },
    { field: 'email', headerName: 'Email', width: 300 },
  ];

  const handleDeleteButton = async () => {
    setIsLoading(prev => !prev);

    Promise.all(selectedEmployeesId.map(id => {
      client.delete('/employees/' + id);
    }))
      .then(() => {
        const leftEmployees = employees.filter(employee => !selectedEmployeesId.includes(employee.id));

        setEmployees(leftEmployees);
      })
      .catch(() => setIsDeleteError(true))
      .finally(() => setIsLoading(prev => !prev));
  };

  return (
    <div className="table">
      <DataGrid
        autoHeight
        rows={employees}
        columns={columns}
        onSelectionModelChange={(newEmployeesId) => {
          setSelectedEmployeesId(newEmployeesId);
        }}
        checkboxSelection={true}
      />

      {isLoading && (
        <CircularProgress />
      )}

      {selectedEmployeesId.length > 0 && (
        <div className="table__delete-row">
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteButton}
          >
            Delete selected rows
          </Button>
        </div>
      )}

      {isDeleteError && (
        <Collapse in={isDeleteError}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setIsDeleteError(false);
                }}
              >
                <Close fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            Server respond with error. Try later.
          </Alert>
        </Collapse>
      )}
    </div>
  );
};
