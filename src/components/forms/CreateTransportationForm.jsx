import React, { useState } from 'react';
import { Box, Button, Input, Text } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { tranporationCreateValidation } from '../../validations/tranporationCreateValidation';
import * as Yup from 'yup'
import TextField from './TextField';
import DateField from './DateField';
import { useSelector } from 'react-redux';
import instance from '../../utils/axios';
import { soundSuccessCreateTransportation } from '../../helpers/Sounds/soundEffects';
import useCustomToast from '../../hooks/useCustomToast';

const CreateTransportationForm = ({onClose}) => {
  const userData = useSelector(state => state.auth.data);
  const toast = useCustomToast();
  const [errorCode, setErrorCode] = useState(null);
  const handleTransportationCreate = async (values, { resetForm }) => {
    console.log('Form Values:', values); // Log values when submitting

    const obj = {
      ...values,
      user_id:userData?.id
    }
    try {
    
      const  data  = await instance.post("/transportation/create", obj);
    if (data.status === 201) {
      resetForm();
      soundSuccessCreateTransportation()
      toast('Перевезення створено','success')
      setTimeout(()=>{
        onClose()
      },1000)
    }
      
    } catch (error) {
      console.log('Submission Error:', error); // Log submission errors
    }
  };
  return (
<Formik
  initialValues={{
    cargo_date:"",
    cost:'',
    price:'',
    driver:"",
    from:"",
    to:"",
    transportation_comment:"",
    truck:"",
    truck_owner:"",

  }}

  validationSchema={tranporationCreateValidation}
  onSubmit={handleTransportationCreate}
>
  {({ errors, touched }) => (
    <Form>
      {/* <Input  width={'40%'} placeholder='Оберіть дату завантаження' size='md' type='date' name='cargo_date' /> */}
 <TextField name='cargo_date' type={'date'} label={'Дата завантаження'} required={true}/>
     <Box display={'flex'} gap={'10px'}>
     <TextField name="from" type="text" label={"Завантаження"}required={true} />
     <TextField name="to" type="text" label={"Вивантаження"}required={true} />
     </Box>
     <Box display={'flex'} gap={'10px'}>
     <TextField name="price" type="number" label={"Ціна перевезення"}required={true} />
     <TextField name="cost" type="number" label={"Моя маржа"}required={true} />
     </Box>
      <TextField name="driver" type="text" label={"Водій"}required={true} />
      <TextField name="truck" type="text" label={"Дані по авто"}required={true} />
      <TextField name="truck_owner" type="text" label={"Власник авто / диспетчер"} required={true}/>
      <TextField name="transportation_comment" type="textarea" label={"Коментар"} />


      <Button colorScheme='green' marginTop={'20px'} type="submit">Створити перевезення</Button>
      {errorCode && (
            <Text color={errorCode.includes("створено") ? "green" : "red"}>
              {errorCode}
            </Text>
          )}
    </Form>
  )}
</Formik>
  );
};

export default CreateTransportationForm;