import { QUERY_TRIP_EXPENSES } from "../../utils/queries";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { ADD_EXPENSE, DELETE_EXPENSE } from "../../utils/mutations";

import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import Auth from '../../utils/auth.js'

import "./index.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  boxShadow: 24,
  p: 4,
};

const Expenses = ({ trip }) => {
  const {loading, data} = useQuery(trip && QUERY_TRIP_EXPENSES, {
    variables: { id: trip._id },
  });

  const me = Auth.getProfile().data.username;

  const expenseData = data?.trip_expenses;

  const [expenses, setExpenses] = useState(expenseData);

  const [addExpense] = useMutation(ADD_EXPENSE);
  const [deleteExpense] = useMutation(DELETE_EXPENSE);

  const [formState, setFormState] = useState({});
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { item, price } = formState;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    if (!e.target.value.length) {
      setErrorMessage(`This information is required.`);
    } else {
      setErrorMessage("");
      setFormState({ ...formState, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let expenseData;

    if (!errorMessage) {
      try {
        expenseData = await addExpense({
          variables: {
            tripId: trip._id,
            item: item,
            price: price,
          },
        });
      } catch (e) {
        console.error(e);
      }

      setFormState({});

      handleClose();

      const newExpenses = [...expenses, expenseData.data.addExpense];
      setExpenses(newExpenses);

      return 
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const i = e.target.dataset.id;
    const removedExpense = { ...expenses[i] };
    const id = removedExpense._id;
    console.log(id);

    try {
        await deleteExpense({
            variables: {
                id: id
            }
        });
    } catch (e) {
        console.log(e);
    }

    const newExpenses = expenses.filter((expense) => expense._id !== id);

    setExpenses(newExpenses);

    return 
  };

  return (
    <div className="expenses-container">
      <Button onClick={handleOpen} className="addButton">
        Add an Expense
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="expense-modal" sx={style}>
          <form onSubmit={handleSubmit}>
            <div id="expense-description">
              <h3>Enter a description of the expense:</h3>
              <TextField
                fullWidth
                multiline
                maxRows={4}
                label="Description"
                name="item"
                onBlur={handleChange}
                defaultValue={item}
              />
            </div>
            <TextField
              fullWidth
              label="Amount"
              name="price"
              onBlur={handleChange}
              defaultValue={price}
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
            <div className="headings">
              <Button variant="contained" type="submit" className="button">
                Submit
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
      <div className="expenses-list">
        {expenses.length ? (
          expenses.map((expense, i) => (
            <Card key={expense._id} className="expense-card">
                <CardContent className='expense-content'>
                    <h2>{expense.item}</h2>
                    <div className='payTo'>
                        <h3>Pay to: {expense.payer.username}<img alt='venmo link' src="../images/venmo.png" className='venmo' /></h3>
                    </div>
                </CardContent>
                <CardContent>
                    <h3>Total Cost: ${expense.totalPrice}</h3>
                    <h3>Cost per member: ${expense.pricePerPerson}</h3>
                    <div className='borrowerContainer'>
                        {expense.borrowers.map((member) => {
                            return (
                                <h4 key={expense._id.concat(member.username)} className='borrower'>
                                    {member.username}
                                </h4>
                            )
                        })}
                    </div>
                    {expense.payer.username === me && (
                        <div className="buttonContainer">
                            <button data-id={i} className='button expenseButton deleteBtn' onClick={handleDelete}>Delete</button>
                        </div>
                        )
                    }
                    {expense.payer.username !== me && (
                        <div className="buttonContainer">
                            <Button className='button expenseButton'>Mark as Paid</Button>
                        </div>
                    )}
                </CardContent>
            </Card>
          ))
        ) : (
          <h2>No current trip expenses!</h2>
        )}
      </div>
    </div>
  );
};

export default Expenses;
