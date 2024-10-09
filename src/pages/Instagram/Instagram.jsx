import { Button, Stack, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import instance from '../../utils/axios';

const Instagram = () => {
    const [media, setMedia] = useState([]);
    const [error, setError] = useState(null);
    const handleLogin = () => {
        // window.location.href = 'http://localhost:8800/auth/instagram';
        window.location.href = 'https://api.logistic-mira.space/auth/instagram';
    };

    // Fetch media data
    const fetchMedia = async () => {
        try {
            const response = await instance.get('/manage');
            setMedia(response.data.data);
        } catch (err) {
            setError('Failed to fetch media');
            console.error(err);
        }
    };

    useEffect(() => {
        fetchMedia();
    }, []);
  
  return (
    <Stack>

        <Text>INSTAGARM PAGE</Text>
        <Button onClick={handleLogin}>INSTAGRAM LOGIN</Button>
        {error && <p>{error}</p>}
            <ul>
                {media.map((item) => (
                    <li key={item.id}>
                        <img src={item.media_url} alt={item.caption} />
                        <p>{item.caption}</p>
                    </li>
                ))}
            </ul>
    </Stack>
  )
}

export default Instagram