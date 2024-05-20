'use client'
import axios from "axios";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signIn } from "next-auth/react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Button from "../Button";

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            hashedpassword: '',
            confirmPassword:''
        },
    });

    const validateEmail = (email: string) => {
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return pattern.test(email) || 'Invalid email format';
    };

    const validatePassword = (password: string) => {
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return pattern.test(password) || 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character';
    };
    
    const validateConfirmPassword = (confirmPassword: string) => {
        const password = watch('hashedpassword'); // Using watch function correctly
        return password === confirmPassword || 'Passwords do not match';
    };
    const handleSigninOnclick = useCallback(() => {
        loginModal.onOpen(); 
        registerModal.onClose();
    },[registerModal,loginModal]);

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        const payload = {
            name: data.name,
            email: data.email,
            hashedpassword: data.hashedpassword
        };
        try {
            await axios.post('/api/register', payload);
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
                validate={validateConfirmPassword}
            />
        </div>
    );
    const footerContent=(
        <div className="
            flex
            flex-col
            gap-4
            mt-3
        ">
            <hr/>
            <Button
                outline
                label="Continue with Google"
                icon={FcGoogle}
                onClick={() => signIn('google')}
            />
            <Button
                outline
                label="Continue with Github"
                icon={AiFillGithub}
                onClick={() => signIn('github')}
            />
            <div
                className="
                    text-neutral-500
                    text-center
                    mt-4
                    font-light
                "
            >
                <div className="justify-center flex flex-row items-center gap-2">
                    <div>
                        Already have an account?
                    </div>
                    <div
                        onClick={handleSigninOnclick}
                        className="
                            text-neutral-800
                            cursor-pointer
                            hover:underline
                        "
                    >
                        <div>
                            Sign in
                        </div>
                    </div>
                </div>
            </div>
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
            footer={footerContent}
        />
    );
}

export default RegisterModal;
