'use client';

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback,useState } from "react";
import{FieldValues,SubmitHandler,useForm} from 'react-hook-form'
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { register } from "module";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signIn } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Button from "../Button";
const LoginModal = () => {
    const router=useRouter();
    const registerModal=useRegisterModal();
    const loginModal=useLoginModal();
    const [isLoading,setIsLoading]=useState(false);
    const {
        register,
        handleSubmit,
        formState:{
            errors,
        },reset,
    } =useForm<FieldValues>({
        defaultValues:{
            email:'',
            hashedPassword:''
        },
    });
    const handleCreateAccountClick = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
    },[registerModal,loginModal]);
    const onSubmit: SubmitHandler<FieldValues>=(data)=>{
        const payload={
            Email: data.email,
            Password: data.hashedPassword
        }
        setIsLoading(true);
        signIn('credentials',{
            ...payload,
            redirect: false,
        })
        .then((callback)=>{
            setIsLoading(false);
            if(callback?.ok){
                console.log('Logged in');
                toast.success('Logged in');
                router.refresh();
                loginModal.onClose();
            }
            if(callback?.error){
                toast.error(callback.error);
            }
        })
    }
    const validateEmail = (email: string) => {
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return pattern.test(email) || 'Invalid email format';
    };

    const validatePassword = (password: string) => {
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return pattern.test(password) || 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character';
    };
    const bodyContent=(
        <div className="flex flex-col gap-4">
            <Heading
                title="Welcome Back"
                subtitle="Sign-In to your account!"
            />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                validate={validateEmail}
                required
            />
            <Input
                id="hashedPassword"
                type="password"
                label="Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                validate={validatePassword}
                required
            />
        </div>
    )
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
                        First time using Airbnb?
                    </div>
                    <div
                        onClick={handleCreateAccountClick}
                        className="
                            text-neutral-800
                            cursor-pointer
                            hover:underline
                        "
                    >
                        <div>
                            Create an account
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    const handleClose = useCallback(() => {
        reset(); // Clear the form data
        loginModal.onClose();
    }, [reset, loginModal]);
    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel="Login"
            onClose={handleClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
            />
    );
}
 
export default LoginModal;