'use client';

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { error } from "console";

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            hashedpassword: ''
        },
    });
    const validateEmail=(email:string)=>{
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!email)
            return 'Please enter your email';
        return pattern.test(email ) || 'Invalid email format';
    }
    const validatePassword = (password:string) => {
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!password) return 'Please enter your password';
        return pattern.test(password) || 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character';
    }

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        if(data.hashedpassword===data.confirmPassword){
            alert('Password doesn;t match');
        }
        console.log(data);
        try {
            await axios.post('/api/register', data);
            console.log("Registration successful");
            registerModal.onClose();
        } catch (error) {
            alert(error);
            setIsLoading(false);
            console.error("Registration error: ", error);
        } finally {
            setIsLoading(false);
        }
    };

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Welcome to Airbnb"
                subtitle="Create an account!"
            />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                validate={validateEmail}
            />
            <Input
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                required
                errors={errors}
            />
            <Input
                id="hashedpassword"
                type="password"
                label="Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                validate={validatePassword}
            />
            <Input
                id="confirmPassword"
                type="password"
                label="Confirm Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                validate={validatePassword}
            />
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title="Register"
            actionLabel="Continue"
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
        />
    );
}

export default RegisterModal;
