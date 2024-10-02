import * as Yup from 'yup';
export const loginValidation = Yup.object().shape({
    email: Yup.string()
      .email('Невірний формат E-mail')
      .required(`Обов'язкове поле`),
    password: Yup.string()
      .required(`Пароль обов'язковий`)
      .min(6, 'Мінімум 6 символів'), // Мінімальна довжина
    });

