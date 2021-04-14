import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FormControl,
  TextField,
  makeStyles,
  Box,
  Button,
} from '@material-ui/core';
import { useFormik } from 'formik';
import { Redirect, useParams } from 'react-router-dom';
import { updateCardSagaAC, delCardSagaAC } from '../store/cards/actions';
import { useStylesCard } from '../helpers/styles';

export default function CardInfo() {
  const { id } = useParams();
  const token = useSelector((states) => states.userReducers.user.token);
  const cards = useSelector((states) => states.cardsReducers.cards);
  const [redirect, setRedirect] = React.useState(false);

  const cardInfo = cards.filter((e) => +e.id === +id)[0];
  const dispatch = useDispatch();
  const classes = useStylesCard();
  const formik = useFormik({
    initialValues: {
      title: cardInfo.title,
      description: cardInfo.content,
    },
    onSubmit: ({ title, description }) => {
      dispatch(
        updateCardSagaAC({
          title,
          description,
          id,
          token,
        })
      );
      setRedirect(true);
    },
  });

  return (
    <Box className={classes.root} component="span" m={1}>
      {redirect && <Redirect to="/" />}
      <div className={classes.container}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl variant="outlined">
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Title"
              type="text"
              value={formik.values.title}
              placeholder="Enter title"
              onChange={formik.handleChange}
              className={classes.title}
              variant="outlined"
            />
            <TextField
              fullWidth
              id="description"
              name="description"
              label="Description"
              type="text"
              value={formik.values.description}
              placeholder="Enter description"
              onChange={formik.handleChange}
              className={classes.description}
              multiline
              rows={6}
              variant="outlined"
            />
            <div className={classes.buttonGroup}>
              <Button
                className={classes.button}
                variant="contained"
                type="submit"
                color="primary"
              >
                Save
              </Button>

              <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                onClick={() => {
                  dispatch(delCardSagaAC({ id, token }));
                  setRedirect(true);
                }}
              >
                Delete
              </Button>
            </div>
          </FormControl>
        </form>
      </div>
    </Box>
  );
}
