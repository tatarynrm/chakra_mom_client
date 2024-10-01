import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Textarea,
    Input,
    Text,
  } from "@chakra-ui/react";
  import { Field, useField } from "formik";
  import React from "react";
  
  const TextField = ({ label,type,required, ...props }) => {
    const [field, meta] = useField(props);


    return (
      <FormControl isInvalid={meta?.error && meta.touched}>
      <FormLabel display={'flex'} fontSize={'14px'} color={'orange'}>
        {label}
        {required ? <Text color={'red'}>*</Text> : null}
      </FormLabel>
      {type === "textarea" ? (
        <Field as={Textarea} {...field} {...props} />
      ) : (
        <Field as={Input} type={type} {...field} {...props} />
      )}
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
    );

  };
  
  export default TextField;