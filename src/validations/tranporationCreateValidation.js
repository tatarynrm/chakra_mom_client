import * as Yup from 'yup';
export const tranporationCreateValidation = Yup.object().shape({
    cargo_date: Yup.date()
      .required('Дата вантажу є обов\'язковою')
      .typeError('Будь ласка, введіть дійсну дату'), // Перевірка на коректність дати
    from: Yup.string()
      .required('Поле "Завантаження" є обов\'язковим')
      .min(2, 'Поле "Завантаження" має містити принаймні 2 символи'), // Мінімальна довжина
    to: Yup.string()
      .required('Поле "Розвантаження" є обов\'язковим')
      .min(2, 'Поле "Розвантаження" має містити принаймні 2 символи'), // Мінімальна довжина
      price: Yup.string()
      .required('Ціна є обов\'язковою')
       .matches(/^\d+$/, 'Ціна повинна бути числом'), // Валідація формату для будь-яких цифр
    
    cost: Yup.string()
      .required('Поле "Моя маржа" є обов\'язковим')
      .matches(/^\d+$/, 'Ціна повинна бути числом'), // Валідація формату для будь-яких цифр
  
    driver: Yup.string()
      .required('Поле "Водій" є обов\'язковим')
      .min(2, 'Поле "Водій" має містити принаймні 2 символи'),    
  
    truck: Yup.string()
      .required('Поле "Дані по авто" є обов\'язковим')
      .min(2, 'Поле "Дані по авто" має містити принаймні 2 символи'),    
  
    truck_owner: Yup.string()
      .required('Поле "Власник авто / диспетчер" є обов\'язковим')
      .min(2, 'Поле "Власник авто / диспетчер" має містити принаймні 2 символи'),    
    transportation_comment: Yup.string()

      .min(0, 'Поле "Власник авто / диспетчер" має містити принай')
   
    });

