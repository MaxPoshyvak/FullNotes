import * as yup from 'yup';

export const registerSchema = yup.object({
    email: yup.string().email('Невірний email').required('Email обовʼязковий'),
    password: yup.string().min(6, 'Мінімум 6 символів').required('Пароль обовʼязковий'),
    username: yup.string().min(3, 'Мінімум 3 символи').required('Імʼя користувача обовʼязкове'),
});

export const loginSchema = yup.object({
    email: yup.string().email().required(),

    password: yup.string().required(),
});
