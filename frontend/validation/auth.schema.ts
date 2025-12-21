import * as yup from 'yup';

export const registerSchema = yup.object({
    username: yup.string().required('Ім’я обовʼязкове'),
    email: yup.string().email('Невірний email').required('Email обовʼязковий'),

    password: yup.string().min(6, 'Мінімум 6 символів').required('Пароль обовʼязковий'),
});

export const loginSchema = yup.object({
    email: yup.string().email().required(),

    password: yup.string().required(),
});
