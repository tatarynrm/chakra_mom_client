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



import { useState, useEffect } from 'react';
import { Stack, IconButton, Text, Input } from '@chakra-ui/react';
import TransportationCardItem from './TransportationCardItem';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import instance from '../../utils/axios';
// Припустимо, що ви маєте файл axiosInstance.js для налаштування axios

const TransportationsList = ({searchQuery,setSearchQuery}) => {
  const [transportations, setTransportations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
//   const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const fetchTransportations = async (page) => {
    try {
      const response = await instance.get(`/transportation/list?page=${page}`);
      setTransportations(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransportations(page);
  }, [page]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const localResults = transportations.filter((item) =>
      Object.values(item).some(
        (value) => String(value).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    if (localResults.length > 0) {
      setSearchResults(localResults);
    } else {
      searchInDatabase(searchQuery);
    }
  }, [searchQuery, transportations]);

  const searchInDatabase = async (query) => {
    try {
      const response = await instance.get(`/transportation/search?query=${query}`);
      setSearchResults(response.data); // Оновіть, як отримуєте дані
    } catch (err) {
      console.error('Error fetching search results from DB:', err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  const resultsToDisplay = searchResults.length > 0 ? searchResults : transportations;
  return (
    <>
    <Stack position={'relative'} width={'100%'} height={'auto'} overflow={'hidden'} overflowY={'scroll'}  sx={{
        '&::-webkit-scrollbar': {
          display: 'none', // Сховати прокрутку в WebKit (Chrome, Safari)
        },
        msOverflowStyle: 'none', // Сховати прокрутку в Internet Explorer
        scrollbarWidth: 'none', // Сховати прокрутку в Firefox
      }}>
      {resultsToDisplay.map((item, idx) => (
        <TransportationCardItem key={idx} item={item} />
      ))}

    </Stack>

<Stack display={'flex'} flexDirection={'row'} alignItems={'center'} textAlign={'center'}>
<IconButton icon={<ArrowLeftIcon />} isDisabled={page === 1} onClick={() => setPage(page - 1)} />
<Text> Сторінка {page} з {totalPages} </Text>
<IconButton icon={<ArrowRightIcon />} isDisabled={page === totalPages} onClick={() => setPage(page + 1)} />
</Stack>



</>
  );
};

export default TransportationsList;