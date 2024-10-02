import { Box, Flex, Spinner, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import instance from '../../utils/axios'
import { color } from 'framer-motion'

const TotalSumCount = () => {
    const [totalSum,setTotalSum] = useState(null)

    console.log(totalSum);
    
    const getTotalSumCount  = async ()=>{
        try {
            const data = await instance.get('/transportation/costs/today-and-month')
            if (data.status === 200) {
                setTotalSum(data.data)
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(()=>{
        getTotalSumCount()
    },[])
    return (

   <>
   
   {totalSum ?      <Flex gap={'10px'}>
        <Box display={'flex'} gap={'2px'} alignItems={'center'} textAlign={'center'}>
            <Text>Місяць:</Text>
            <Text fontSize={'20px'} color={ totalSum?.total_cost_this_month > 1 ?'green.300' : 'red.300' }>{totalSum?.total_cost_this_month} </Text>
        </Box>
        <Box display={'flex'} gap={'2px'} alignItems={'center'} textAlign={'center'}>
            <Text>Сьогодні:</Text>
            <Text fontSize={'20px'} color={ totalSum?.total_cost_today > 1 ?'green.300' : 'red.300' }>{totalSum?.total_cost_today} </Text>
        </Box>

     </Flex>  : <Spinner color='green.500' />}
   </>
    )
}

export default TotalSumCount