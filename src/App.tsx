import React, { useEffect, useState } from 'react';
import './App.scss';

import CircularProgress from '@mui/material/CircularProgress';
import { client } from './api/fetchEmployees';
import { Employee } from './types/Employee';
import { EmployeeTable } from './components/EmployeeTable';
import { NewEmployeeForm } from './components/NewEmployeeForm';

const App: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    client.get<Employee[]>('/employees')
      .then(setEmployees)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="App">
      {isError && (
        <div className="App__error">Something went wrong</div>
      )}

      {isLoading ? (
        <div className="App__loading">
          <CircularProgress />
        </div>
      ) : (
        <>
          <NewEmployeeForm
            setEmployees={setEmployees}
            employees={employees}
          />

          {employees && (
            <EmployeeTable
              employees={employees}
              setEmployees={setEmployees}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
