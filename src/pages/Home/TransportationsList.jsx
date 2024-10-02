// // TransportationsList.js
// import React, { useEffect, useState } from 'react';
// import instance from '../../utils/axios';
// import { Box, Button, Card, Heading, IconButton, Input, Stack, Text } from '@chakra-ui/react';
// import TransportationCardItem from './TransportationCardItem';
// import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';

// const TransportationsList = () => {
//     const [transportations, setTransportations] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [page, setPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);




//     const fetchTransportations = async (page) => {
//         try {
//             const response = await instance.get(`/transportation/list?page=${page}`);
//             console.log('RESPONSE',response);

//             setTransportations(response.data.data);
//             setTotalPages(response.data.totalPages);
//         } catch (err) {
//             setError(err);
//         } finally {
//             setLoading(false);
//         }
//     };
//     useEffect(() => {
//         fetchTransportations(page);
//     }, [page]);

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error loading data: {error.message}</p>;

//     return (

//         <Stack position={'relative'} width={'100%'} height={'60vh'} minHeight={'60vh'} maxHeight={'60vh'}>   
//               {/* <Input
//         type="text"
//         placeholder="Search transportations..."
//         value={searchQuery}
//         onChange={(e) => handleSearch(e.target.value)}
//       />  */}
//                 {transportations.map((item,idx) => (
//                     <TransportationCardItem key={idx} item={item}/>
//                 ))}
//             <Stack  display={'flex'} flexDirection={'row'} alignItems={'center'} textAlign={'center'} >
//                 <IconButton  icon={<ArrowLeftIcon/>}  isDisabled={page === 1} onClick={() => setPage(page - 1)}/>
//                 <Text> Сторінка  {page} з {totalPages} </Text>
//                 <IconButton icon={<ArrowRightIcon/>} isDisabled={page === totalPages} onClick={() => setPage(page + 1)} />
//             </Stack>
//         </Stack>
//     );
// };

// export default TransportationsList;



import { useState, useEffect, useMemo } from 'react';
import { Stack, IconButton, Text, Input, Skeleton } from '@chakra-ui/react';
import TransportationCardItem from './TransportationCardItem';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import instance from '../../utils/axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuth } from './../../redux/slices/auth.slice';
import { fetchTransportations } from '../../redux/slices/transportations.slice';
// Припустимо, що ви маєте файл axiosInstance.js для налаштування axios

const TransportationsList = ({ searchQuery }) => {
    const dispatch = useDispatch();
    const { transportations, loading } = useSelector(state => state.transportations);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        dispatch(fetchTransportations({ page }));
    }, [page, dispatch]);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setSearchResults([]);
            return;
        }

        const localResults = transportations?.data.filter((item) =>
            Object.values(item).some(
                (value) => String(value).toLowerCase().includes(searchQuery.toLowerCase())
            )
        );

        if (localResults.length > 0) {
            setSearchResults(localResults);
        } else {
            searchInDatabase(searchQuery);
        }
    }, [searchQuery, transportations.data, dispatch]);

    const searchInDatabase = async (query) => {
        try {
            const response = await instance.get(`/transportation/search?query=${query}`);
            setSearchResults(response.data); // Оновіть, як отримуєте дані
        } catch (err) {
            console.error('Error fetching search results from DB:', err);
            setError(err);
        }
    };

    // Виклик useMemo завжди
    const resultsToDisplay = useMemo(() => {
        if (Array.isArray(searchResults) && searchResults.length > 0) {
            return searchResults;
        }
        if (Array.isArray(transportations?.data)) {
            return transportations.data;
        }
        return [];
    }, [searchResults, transportations]);

    // Раннє повернення для loading і error
    // if (loading) return <span>Loadin....</span>
    if (error) return <p>Error loading data: {error.message}</p>;

    return (
        <>
            <Stack
                position={'relative'}
                width={'100%'}
                height={'auto'}
                overflowY={'scroll'}
                sx={{
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                    msOverflowStyle: 'none',
                    scrollbarWidth: 'none',
                }}
            >
                {resultsToDisplay
                    ?.filter(item => item)
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                    .map((item) => (
                        <TransportationCardItem key={item.id} item={item} />
                    ))}
            </Stack>

            <Stack display={'flex'} flexDirection={'row'} alignItems={'center'} textAlign={'center'}>
                <IconButton icon={<ArrowLeftIcon />} isDisabled={page === 1} onClick={() => setPage(page - 1)} />
                <Text> Сторінка {page} з {transportations?.totalPages} </Text>
                <IconButton icon={<ArrowRightIcon />} isDisabled={page === transportations?.totalPages} onClick={() => setPage(page + 1)} />
            </Stack>
        </>
    );
};

export default TransportationsList;


