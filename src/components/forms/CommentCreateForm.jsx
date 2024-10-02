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

const CommentCreateForm = ({item,onClose}) => {
  const userData = useSelector(state => state.auth.data);
  const toast = useCustomToast();
  const [errorCode, setErrorCode] = useState(null);
  const handleTransportationCommentCreate = async (values, { resetForm }) => {
    console.log('Form Values:', values); // Log values when submitting

    const obj = {
      ...values,
      user_id: userData?.id,
      id:item.id

    }
    try {

      const data = await instance.post("/transportation/create/comment", obj);
      if (data.status === 201) {
        resetForm();
        soundSuccessCreateTransportation()
        toast('Коментар створено', 'success')

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
        transportation_comment: item.transportation_comment,
      }}

     
      onSubmit={handleTransportationCommentCreate}
    >
      {({ errors, touched }) => (
        <Form>
          <TextField name="transportation_comment" type="textarea" label={"Коментар"} />
          <Button colorScheme='green' marginTop={'20px'} type="submit">Створити коментар</Button>
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

export default CommentCreateForm;