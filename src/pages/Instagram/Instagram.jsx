import { Button, Stack, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Instagram = () => {
    const [media, setMedia] = useState([]);

    const handleLogin = () => {
        // window.location.href = 'http://localhost:8800/auth/instagram';
        window.location.href = 'https://api.logistic-mira.space/auth/instagram';
    };
  
    const fetchMedia = async () => {
        try {
            // const response = await axios.get('http://localhost:8800/manage', { withCredentials: true });
            const response = await axios.get('https://api.logistic-mira.space/manage', { withCredentials: true });
           
           console.log(response.data.data);
           
            setMedia(response.data.data);
        } catch (error) {
            console.error('Error fetching media:', error);
        }
    };
  
    useEffect(() => {
        fetchMedia();
    }, []);
  
  return (
    <Stack>

        <Text>INSTAGARM PAGE</Text>
        <Button onClick={handleLogin}>INSTAGRAM LOGIN</Button>
    </Stack>
  )
}

export default Instagram