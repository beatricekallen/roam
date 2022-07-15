import * as React from "react";
import { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import {QUERY_USER} from '../../utils/queries';
import { useQuery } from '@apollo/client';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';



const SearchBar = () => {
    
    const [value, setValue] = useState("");

    const searchUser = useQuery(QUERY_USER);

    const useEffect = () => {
        const [loading, data] = searchUser({
            variables: { username: value }
        });
        const user = data?.user || {};
    
        if (user.username) {
            return window.location.assign(`/profile/${user.username}`);
        } else {
            return (
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    No user found with this username!
                </Alert>
            )
        }
    }

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
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Find a Friend"
                value={value}
                // inputProps={{ 'aria-label': 'search' }}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
            />
        </Search>
    )
}

export default SearchBar;