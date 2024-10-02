import React, { useEffect, useState } from 'react';
import { Box, Button, Input, Text } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { tranporationCreateValidation } from '../../validations/tranporationCreateValidation';
import * as Yup from 'yup'
import TextField from './TextField';
import DateField from './DateField';
import { useDispatch, useSelector } from 'react-redux';
import instance from '../../utils/axios';
import { soundErrorCreateTransportation, soundSuccessCreateTransportation } from '../../helpers/Sounds/soundEffects';
import useCustomToast from '../../hooks/useCustomToast';
import moment from "moment/moment";
import "moment/locale/uk";
import { updateTransportation } from '../../redux/slices/transportations.slice';
import SelectField from './SelectField';
const EditTransportationForm = ({ item, onClose }) => {
    const userData = useSelector(state => state.auth.data);
    const dispatch = useDispatch()
    const toast = useCustomToast();
    const [errorCode, setErrorCode] = useState(null);

    const [trasportationStateOptions, setTransportationStateOptions] = useState([]);

    const [selectedValue, setSelectedValue] = useState(item.status || '');


    const handleTransportationUpdate = async (values, { resetForm }) => {
        const obj = {
            ...values,
            user_id: userData?.id,
            id: item?.id,
            status: Number(selectedValue)
        }

        try {

            const data = await instance.post(`/transportation/update/${item.id}`, obj);
            if (data.status === 201) {
                dispatch(updateTransportation(obj))
                resetForm();
                {trasportationStateOptions[selectedValue - 1].id === 3 ?  soundErrorCreateTransportation()    :  soundSuccessCreateTransportation()    }
              
               {
                trasportationStateOptions[selectedValue - 1].id === 3 ? 
                toast(`Перевезення оновлено ${selectedValue ? `${trasportationStateOptions[selectedValue - 1].status}` :'' }`, 'error') : 
                toast(`Перевезення оновлено ${selectedValue ? `${trasportationStateOptions[selectedValue - 1].status}` :'' }`, 'success')
               }
                onClose()
            }

        } catch (error) {
            console.log('Submission Error:', error); // Log submission errors
        }
    };
    const handleChange = (event, setFieldValue) => {
        const value = event.target.value;
        setSelectedValue(value); // Оновлюємо вибране значення
        if (setFieldValue) {
            setFieldValue('status', value); // Оновлюємо значення у формі, якщо це необхідно
        }

        console.log(selectedValue);

    };
    useEffect(() => {
        const getStatusOfTransportation = async () => {
            try {
                const data = await instance.get('/transportation/status-list');
              
                setTransportationStateOptions(data.data)

            } catch (error) {
                console.log(error);

            }
        }

        getStatusOfTransportation()
    }, []);
    return (
        <Formik
            initialValues={{
                cargo_date: moment(item?.cargo_date).format('YYYY-MM-DD'),
                cost: item.cost,
                price: item.price,
                driver: item.driver,
                location_from: item.location_from,
                location_to: item.location_to,
                transportation_comment: item.transportation_comment,
                truck: item.truck,
                truck_owner: item.truck_owner,
                status: item.status,


            }}

            validationSchema={tranporationCreateValidation}
            onSubmit={handleTransportationUpdate}
        >



            {({ errors, touched, setFieldValue }) => (
                <Form>
                    {/* <Input  width={'40%'} placeholder='Оберіть дату завантаження' size='md' type='date' name='cargo_date' /> */}
                    <TextField
                        name='cargo_date' type={'date'} label={'Дата завантаження'} required={true} />
                    <Box display={'flex'} gap={'10px'}>
                        <TextField name="location_from" type="text" label={"Завантаження"} required={true} />
                        <TextField name="location_to" type="text" label={"Вивантаження"} required={true} />
                    </Box>
                    <Box display={'flex'} gap={'10px'}>
                        <TextField name="price" type="number" label={"Ціна перевезення"} required={true} />
                        <TextField name="cost" type="number" label={"Моя маржа"} required={true} />
                    </Box>
                    <TextField name="driver" type="text" label={"Водій"} required={true} />
                    <TextField name="truck" type="text" label={"Дані по авто"} required={true} />
                    <TextField name="truck_owner" type="text" label={"Власник авто / диспетчер"} required={true} />
                    <TextField name="transportation_comment" type="textarea" label={"Коментар"} />
                    <SelectField
                        width={["100%", "100%", "100%", "100%"]}
                        name="status"
                        label={"Оберіть тип компанії"}
                        value={selectedValue} // Прив'язуємо стейт до value
                        onChange={(event) => handleChange(event, setFieldValue)}
                    >
                        {trasportationStateOptions && trasportationStateOptions.slice(0, 5).map((item, idx) => (
                            <option key={idx} value={item.id}>
                                {item.status}
                            </option>
                        ))}
                    </SelectField>
                    <Button colorScheme='green' marginTop={'20px'} type="submit">Оновити</Button>
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

export default EditTransportationForm;