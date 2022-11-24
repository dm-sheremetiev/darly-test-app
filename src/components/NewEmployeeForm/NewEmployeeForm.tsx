import React, { useState } from 'react';
import { Employee } from '../../types/Employee';
import isEmail from 'validator/lib/isEmail';

import {
  InputAdornment,
  OutlinedInput,
  FormControl,
  InputLabel,
  Button,
  Collapse,
  Alert,
  IconButton,
  CircularProgress,
} from '@mui/material';
import {
  AccountCircle,
  DriveFileRenameOutlineOutlined,
  AccessAlarmOutlined,
  MonetizationOnOutlined,
  BadgeOutlined,
  PersonAddAlt1Outlined,
  EmailOutlined,
  Close,
} from '@mui/icons-material';
import './NewEmployeeForm.scss';
import { client } from '../../helpers/fetchEmployees';

type Props = {
  setEmployees: React.Dispatch<React.SetStateAction<Employee[] | undefined>>,
  employees: Employee[] | undefined,
}

export const NewEmployeeForm: React.FC<Props> = ({
  setEmployees,
  employees,
}) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [age, setAge] = useState<number | string>('');
  const [salary, setSalary] = useState<number | string>('');
  const [position, setPosition] = useState('');
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isNameNoEmpty, setIsNameNoEmpty] = useState(true);
  const [isSurnameNoEmpty, setIsSurnameNoEmpty] = useState(true);
  const [isAgeNotZero, setIsAgeNotZero] = useState(true);
  const [isSalaryNotZero, setIsSalaryNotZero] = useState(true);
  const [isPositionNoEmpty, setIsPositionNoEmpty] = useState(true);

  const [isPostError, setIsPostError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrorMessage, setFieldErrorMessage] = useState('');

  const handleSubmittingForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isAnyFieldError = isEmailValid && isNameNoEmpty && isSurnameNoEmpty
      && isAgeNotZero && isSalaryNotZero && isPositionNoEmpty;
    const isAnyFieldEmpty = name && surname && age
    && salary && position && email;

    if (!isAnyFieldError) {
      setFieldErrorMessage('Please fix all the fields on the form and try again (zeros must also be replaced with values; empty fields are prohibited).');
      setOpen(true);

      return;
    }
  
    if (!isAnyFieldEmpty) {
      setFieldErrorMessage('Fill in all the fields');
      setOpen(true);

      return;
    }

    const newId = employees ? employees[employees.length - 1].id : 0;
    const newEmployee = {
      id: newId + 1,
      name,
      surname,
      age: +age,
      salary: +salary,
      position,
      email,
    };

    if (employees) {
      setOpen(false);

      client.post('/employees', newEmployee)
        .then(() => {
          setIsLoading(true);
          setEmployees([...employees, newEmployee]);
        })
        .catch(() => setIsPostError(true))
        .finally(() => {
          setIsLoading(false);
          setName('');
          setSurname('');
          setAge('');
          setSalary('');
          setPosition('');
          setEmail('');
        });

    }
  };

  const checkInput = (fieldType: string) => {
    switch (fieldType) {
    case 'email':
      if (isEmail(email)) {
        setIsEmailValid(true);

        break;
      }

      setIsEmailValid(false);
      break;
    case 'name':
      if (name) {
        setIsNameNoEmpty(true);

        break;
      }

      setIsNameNoEmpty(false);
      break;
    case 'surname':
      if (surname) {
        setIsSurnameNoEmpty(true);

        break;
      }

      setIsSurnameNoEmpty(false);
      break;
    case 'age':
      if (age > 0) {
        setIsAgeNotZero(true);

        break;
      }

      setIsAgeNotZero(false);
      break;
    case 'salary':
      if (salary > 0) {
        setIsSalaryNotZero(true);

        break;
      }

      setIsSalaryNotZero(false);
      break;
    case 'position':
      if (position) {
        setIsPositionNoEmpty(true);

        break;
      }

      setIsPositionNoEmpty(false);
      break;
    }
  };

  return (
    <div className="form__wrapper">
      <h1>Add new employee form</h1>

      <form
        className='form'
        action=""
        noValidate
        onSubmit={handleSubmittingForm}
      >
        <div className="form__form-controll">
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Name</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={<InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>}
              label="Name"
              required
              onChange={(event) => setName(event.target.value)}
              onBlur={() => checkInput('name')}
              value={name}
              error={!isNameNoEmpty}
            />
          </FormControl>

          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Surname</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={<InputAdornment position="start">
                <DriveFileRenameOutlineOutlined />
              </InputAdornment>}
              label="Surname"
              onChange={(event) => setSurname(event.target.value)}
              onBlur={() => checkInput('surname')}
              value={surname}
              error={!isSurnameNoEmpty}
              required
            />
          </FormControl>

          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Age</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={<InputAdornment position="start">
                <AccessAlarmOutlined />
              </InputAdornment>}
              label="Age"
              type='number'
              onChange={(event) => setAge(+event.target.value)}
              onBlur={() => checkInput('age')}
              error={!isAgeNotZero}
              value={age}
              required
            />
          </FormControl>

          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Salary</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={<InputAdornment position="start">
                <MonetizationOnOutlined />
              </InputAdornment>}
              label="Salary"
              type='number'
              onChange={(event) => setSalary(+event.target.value)}
              onBlur={() => checkInput('salary')}
              error={!isSalaryNotZero}
              value={salary}
              required
            />
          </FormControl>

          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Position</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={<InputAdornment position="start">
                <BadgeOutlined />
              </InputAdornment>}
              label="Position"
              onChange={(event) => setPosition(event.target.value)}
              onBlur={() => checkInput('position')}
              error={!isPositionNoEmpty}
              value={position}
              required
            />
          </FormControl>

          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Email</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={<InputAdornment position="start">
                <EmailOutlined />
              </InputAdornment>}
              label="Email"
              type="email"
              onChange={(event) => setEmail(event.target.value)}
              onBlur={() => checkInput('email')}
              value={email}
              error={!isEmailValid}
              required
            />
          </FormControl>
        </div>

        <div className="form__button">
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              <Collapse in={open}>
                <Alert
                  severity="error"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <Close fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  {fieldErrorMessage}
                </Alert>
              </Collapse>

              <Button
                variant="outlined"
                startIcon={<PersonAddAlt1Outlined />}
                size='large'
                type='submit'
              >
                Add new employee
              </Button>

              {isPostError && (
                <Collapse in={isPostError}>
                  <Alert
                    severity="error"
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setIsPostError(false);
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
            </>
          )}
        </div>
      </form>
    </div>
  );
};
