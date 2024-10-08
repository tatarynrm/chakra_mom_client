import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
  } from "@chakra-ui/react";
  import { Field, useField } from "formik";
  import React from "react";
  
  const DateField = ({ label, ...props }) => {
    const [field, meta] = useField(props);


    return (
      <FormControl isInvalid={meta?.error && meta.touched}>
        <FormLabel>{label}</FormLabel>
        <Field as={Input} type={'date'} {...field} {...props} />
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      </FormControl>
    );

  };
  
  export default DateField;