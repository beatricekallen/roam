import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Navigate, useParams } from 'react-router-dom';
import { QUERY_TRIP } from '../utils/queries';
import CurrentTrip from '../components/CurrentTrip';

const ViewTrip = () => {
    const { trip } = useParams();
    console.log(trip, "trip string");
    const { loading, data } = useQuery(trip && QUERY_TRIP, {
        variables: {_id: trip}
    });

    useEffect(() => {
        if(data) {
            console.log(data);
        }
    });

 return (
    <>
    {data && (
        <>
        <CurrentTrip data={data} />
        </>
    )}
    </>
 )

}

export default ViewTrip;