import { Box, Flex, Spinner, Text, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import instance from '../../utils/axios'
import { color } from 'framer-motion'
import { useSelector } from 'react-redux'
import EarningsPicker from '../date-picker/EarningsPicker'
import { BsCalendarDate } from "react-icons/bs";
import CalendarModal from '../modals/CalendarModal'
const TotalSumCount = () => {
    const [totalSum,setTotalSum] = useState(null)
    const token = localStorage.getItem('token')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { transportations, loading } = useSelector(state => state.transportations)    
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
    },[transportations])
    return (

   <>
   
   {totalSum && token ?      <Flex gap={'10px'} flexDir={['column','column','row']} width={'100%'}>
        <Box display={'flex'} gap={'2px'} alignItems={'center'} textAlign={'center'} >
            <Text>Місяць:</Text>
            <Text fontSize={'20px'} color={ totalSum?.total_cost_this_month > 1 ?'green.300' : 'red.300' }>{totalSum?.total_cost_this_month <= 0 ? 0 : totalSum?.total_cost_this_month} </Text>
        </Box>
        <Box display={'flex'} gap={'2px'} alignItems={'center'} textAlign={'center'}>
            <Text>Сьогодні:</Text>
            <Text fontSize={'20px'} color={ totalSum?.total_cost_today > 1 ?'green.300' : 'red.300' }>{totalSum?.total_cost_today  <= 0 ? 0 :totalSum?.total_cost_today} </Text>
        </Box>
        <Box display={'flex'} gap={'2px'} alignItems={'center'} textAlign={'center'}>
            <Text>За цей рік:</Text>
            <Text fontSize={'20px'} color={'green.300'}>{totalSum?.total_cost_this_year} </Text>
        </Box>
        <Box display={'flex'} gap={'2px'} alignItems={'center'} textAlign={'center'}>
            <Text>За весь час:</Text>
            <Text fontSize={'20px'}  color={'green.300'}>{totalSum?.total_cost_all_time} </Text>
        </Box>

<Box onClick={onOpen} cursor={'pointer!important'} display={'flex'} alignItems={'center'} textAlign={'center'}>

<BsCalendarDate size={24}/>
</Box>

<CalendarModal isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>

     </Flex>  : <Spinner color='green.500' />}
   </>
    )
}

export default TotalSumCount