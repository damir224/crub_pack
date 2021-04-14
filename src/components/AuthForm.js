import React from 'react';
import { useFormik } from 'formik';
import { Button, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signupSagaAC, loginSagaAC } from '../store/user/actions';
import validationSchemaAuthForm from '../helpers/validation';

const AuthForm = ({ type }) => {
  const isAuth = useSelector(({ userReducers }) => userReducers.user.isAuth);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: 'admin@noveogroup.com',
      password: 'password',
      name: '',
      lastName: '',
      birthdate: '',
    },
    validationSchemaAuthForm,
    onSubmit: ({
      email,
      password,
      name,
      lastName,
      birthdate,
    }) => {
      if (type === 'login') {
        dispatch(loginSagaAC({
          email,
          password,
        }));
      } else {
        dispatch(
          signupSagaAC({
            email,
            password,
            name,
            lastName,
            birthdate,
          }),
        );
      }
    },
  });
  return (
    <div>
      {isAuth && <Redirect to='/' />}
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id='email'
          name='email'
          label='Email'
          type='email'
          value={formik.values.email}
          placeholder={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id='password'
          name='password'
          label='Password'
          type='password'
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        {type === 'signup' && (
          <TextField
            fullWidth
            id='name'
            name='name'
            label='Name'
            type='name'
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        )}
        {type === 'signup' && (
          <TextField
            fullWidth
            id='lastName'
            name='lastName'
            label='Last name'
            type='text'
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
        )}
        {type === 'signup' && (
          <TextField
            fullWidth
            id='birthdate'
            name='birthdate'
            type='date'
            onChange={formik.handleChange}
            error={formik.touched.birthdate && Boolean(formik.errors.birthdate)}
            helperText={formik.touched.birthdate && formik.errors.birthdate}
          />
        )}
        <Button color='primary' variant='contained' fullWidth type='submit'>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AuthForm;
