// TransportationsList.js
import React, { useEffect, useState } from 'react';
import instance from '../../utils/axios';
import { Box, Button, Card, Heading, Stack, Text } from '@chakra-ui/react';
import TransportationCardItem from './TransportationCardItem';

const TransportationsList = () => {
    const [transportations, setTransportations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const fetchTransportations = async (page) => {
        try {
            const response = await instance.get(`http://localhost:8800/transportation/list?page=${page}`);
            console.log('RESPONSE',response);
            
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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading data: {error.message}</p>;

    return (
        
        <Stack position={'relative'} width={'100%'} height={'60vh'} minHeight={'60vh'} maxHeight={'60vh'}>    
                {transportations.map((item,idx) => (
                    <TransportationCardItem key={idx} item={item}/>
                ))}
            <Stack  display={'flex'} flexDirection={'row'} alignItems={'center'} textAlign={'center'} >
                <Button  isDisabled={page === 1} onClick={() => setPage(page - 1)}>
                    Попередня
                </Button>
                <Text> Сторінка  {page} з {totalPages} </Text>
                <Button isDisabled={page === totalPages} onClick={() => setPage(page + 1)}>
                    Наступна
                </Button>
            </Stack>
        </Stack>
    );
};

export default TransportationsList;