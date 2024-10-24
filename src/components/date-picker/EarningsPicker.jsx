import React, { useState, useRef } from 'react';
import { Box, Button, Flex, Input, Text, VStack } from '@chakra-ui/react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { uk } from 'date-fns/locale';
import instance from '../../utils/axios';

registerLocale('uk', uk);

const EarningsPicker = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [earnings, setEarnings] = useState(null);
  const [loading, setLoading] = useState(false);

  const startDateInputRef = useRef(null);
  const endDateInputRef = useRef(null);
  const submitButtonRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!startDate || !endDate) {
      alert('Будь ласка, виберіть обидві дати');
      return;
    }

    setLoading(true);
    try {
      const response = await instance.get('/transportation/costs/period', {
        params: {
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0]
        }
      });
      setEarnings(response.data.total_cost_for_period);
    } catch (error) {
      console.error('Помилка отримання даних:', error);
    } finally {
      setLoading(false);

      // Примусове зняття фокусу з полів дати та кнопки
      if (startDateInputRef.current) {
        startDateInputRef.current.blur();
      }
      if (endDateInputRef.current) {
        endDateInputRef.current.blur();
      }
      if (submitButtonRef.current) {
        submitButtonRef.current.blur();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4} align="center" mt={8}>
        <Text fontSize="2xl" fontWeight="bold">Виберіть діапазон дат для заробітку</Text>

        <Flex gap={4}>
          <Box>
            <Text>Дата початку:</Text>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              dateFormat="yyyy-MM-dd"
              locale="uk"
              customInput={<Input ref={startDateInputRef} placeholder="Оберіть дату початку" autoComplete="off" />}
            />
          </Box>

          <Box>
            <Text>Дата завершення:</Text>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              dateFormat="yyyy-MM-dd"
              locale="uk"
              customInput={<Input ref={endDateInputRef} placeholder="Оберіть дату завершення" autoComplete="off" />}
            />
          </Box>
        </Flex>

        <Button
          ref={submitButtonRef}
          type="submit"
          colorScheme="blue"
          isLoading={loading}
          isDisabled={!startDate || !endDate}
        >
          Отримати заробіток
        </Button>

        {earnings !== null && (
          <Box mt={4}>
            <Text fontSize="xl">Вибраний період: {earnings} UAH</Text>
          </Box>
        )}
      </VStack>
    </form>
  );
};

export default EarningsPicker;
