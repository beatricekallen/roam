import { QUERY_TRIP_EXPENSES } from "../../utils/queries";
import { useQuery, useMutation } from '@apollo/client';
import "./index.css";

const Expenses = ({trip}) => {
    const {loading, data: expenses} = useQuery(trip && QUERY_TRIP_EXPENSES, {
        variables: {id: trip._id}
    });




}

export default Expenses
