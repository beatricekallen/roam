import { useQuery } from "@apollo/client";
import { QUERY_TRIP_EXPENSES } from "../../utils/queries";
import { useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import { ADD_EXPENSE } from '../../utils/mutations';

import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';

import "./index.css";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    boxShadow: 24,
    p: 4,
};

const Expenses = ({trip}) => {
    const {loading, data} = useQuery(trip && QUERY_TRIP_EXPENSES, {
        variables: {id: trip._id}
    });

    const expenses = data?.trip_expenses || {};

    const [addExpense] = useMutation(ADD_EXPENSE);

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
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!errorMessage) {
            try {
                await addExpense({
                    variables: {
                        tripId: trip._id,
                        item: item,
                        price: price
                    },
                });
            } catch (e) {
                console.error(e);
            }

            setFormState({});

            return handleClose()
        }
    }
    

    return (
        <div className='expenses-container'>
            <button onClick={handleOpen} className='addButton'>Add an Expense</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='expense-modal' sx={style}>
                    <form onSubmit={handleSubmit}>
                        <div id='expense-description'>
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
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        }}
                        />
                        <div className="headings">
                            <button variant="contained" type="submit">
                                Submit
                            </button>
                        </div>
                    </form>
                </Box>
            </Modal>
            <div className='expenses-list'>
                {expenses.length ? (
                    expenses.map((expense) => (
                        <Card key={expense._id} className='expense-card'>
                            <CardContent>
                                <h2>{expense.item}</h2>
                                <h3>{expense.totalPrice}</h3>
                                <h3>{expense.pricePerPerson}</h3>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <h2>No current trip expenses!</h2>
                )}
            </div>
        </div>
    )


}

export default Expenses
