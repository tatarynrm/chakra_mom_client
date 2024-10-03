import React, { useState } from 'react';
import { Box, Button, Input, Text } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { tranporationCreateValidation } from '../../validations/tranporationCreateValidation';
import * as Yup from 'yup'
import TextField from './TextField';
import DateField from './DateField';
import { useDispatch, useSelector } from 'react-redux';
import instance from '../../utils/axios';
import { soundSuccessCreateTransportation } from '../../helpers/Sounds/soundEffects';
import useCustomToast from '../../hooks/useCustomToast';
import { addTransportation } from '../../redux/slices/transportations.slice';

const CreateTransportationForm = ({onClose}) => {
  const userData = useSelector(state => state.auth.data);
  const toast = useCustomToast();
  const [errorCode, setErrorCode] = useState(null);
  const dispatch = useDispatch()
  const handleTransportationCreate = async (values, { resetForm }) => {
    console.log('Form Values:', values); // Log values when submitting

    const obj = {
      ...values,
      user_id:userData?.id
    }
    try {
    
      const  data  = await instance.post("/transportation/create", obj);
      console.log(data.data);
      
    if (data.status === 201) {
    dispatch(addTransportation(data.data))
      // resetForm();
      soundSuccessCreateTransportation()
      toast('Перевезення створено','success')
      // setTimeout(()=>{
      //   onClose()
      // },1000)
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
    location_from:"",
    location_to:"",
    transportation_comment:"",
    truck:"",
    truck_owner:"",
    cargo_owner:'',
    status:1

  }}

  validationSchema={tranporationCreateValidation}
  onSubmit={handleTransportationCreate}
>
  {({ errors, touched }) => (
    <Form>
      {/* <Input  width={'40%'} placeholder='Оберіть дату завантаження' size='md' type='date' name='cargo_date' /> */}
 <TextField name='cargo_date' type={'date'} label={'Дата завантаження'} required={true}/>
     <Box display={'flex'} gap={'10px'}>
     <TextField name="location_from" type="text" label={"Завантаження"}required={true} />
     <TextField name="location_to" type="text" label={"Вивантаження"}required={true} />
     </Box>
     <Box display={'flex'} gap={'10px'}>
     <TextField name="price" type="number" label={"Ціна перевезення"}required={true} />
     <TextField name="cost" type="number" label={"Моя маржа"}required={true} />
     </Box>
      <TextField name="driver" type="text" label={"Водій"}required={true} />
      <TextField name="truck" type="text" label={"Дані по авто"}required={true} />
      <TextField name="truck_owner" type="text" label={"Власник авто / диспетчер"} required={true}/>
      <TextField name="cargo_owner" type="text" label={"Власник вантажу"} required={true}/>
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