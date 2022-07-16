import * as React from "react";
import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import {QUERY_USER} from '../../utils/queries';
import { useLazyQuery } from '@apollo/client';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';



const SearchBar = () => {
    
    // this was added to control the state in the case of having the form be onChange instead of onKeyPress
    // const [inputValue, setInputValue] = useState('');
    const [value, setValue] = useState("");
    const [alert, setAlert] = useState("");

    const [searchUser, { called, loading, data }] = useLazyQuery(
        QUERY_USER,
        {variables: { username: value }}
    );

    function changeHandler(e) {
        // this was added to control the state in the case of having the form be onChange instead of onKeyPress
        // setInputValue(e.target.value);
        setValue(e.target.value);
        searchUser();
    }

    if (called && data && data.user != null) {
        return window.location.assign(`/profile/${data.user.username}`);
    }
    // } else if (called && !loading) {
    //     setAlert('error');
    //     return (
    //         <Alert severity="error">
    //             <AlertTitle>Error</AlertTitle>
    //             No user found with this username!
    //         </Alert>
    //     )
    // }

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
      }));
      
      const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }));
    
      const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
          padding: theme.spacing(1, 1, 1, 0),
          // vertical padding + font size from searchIcon
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create('width'),
          width: '100%',
          [theme.breakpoints.up('md')]: {
            width: '20ch',
          },
        },
    }));

    return (
        <div>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Find a Friend"
                    inputProps={{ 'aria-label': 'search' }}
                    onKeyPress={e => {
                        if (e.key === 'Enter') {
                            changeHandler(e)}}}
                    // this was added to control the state in the case of having the form be onChange instead of onKeyPress
                    // value={inputValue}
                    autoFocus
                />
            </Search>
            <div>
                {alert &&
                    <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    No user found with this username!
                </Alert>
                }
            </div>
        </div>
    )
}

export default SearchBar;