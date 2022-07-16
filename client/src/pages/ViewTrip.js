import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { Navigate, useParams } from 'react-router-dom';
import { QUERY_TRIP } from '../utils/queries';
import CurrentTrip from '../components/CurrentTrip';

const ViewTrip = () => {
    const { trip } = useParams();
    const { loading, data } = useQuery(trip && QUERY_TRIP, {
        variables: {_id: trip}
    });
    console.log(data);

 return (
    <>
    {data && (
        <>
        <h1>yes</h1>
        <p>{data.trip.name}</p>
        <CurrentTrip data={data} />
        </>

    )}
    </>
 )

}

export default ViewTrip;