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
        }
    } =useForm<FieldValues>({
        defaultValues:{
            email:'',
            hashedPassword:''
        },
    });
    const onSubmit: SubmitHandler<FieldValues>=(data)=>{
        console.log(data);
        const payload={
            Email: data.email,
            Password: data.hashedPassword
        }
        console.log(payload);
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
                required
            />
            <Input
                id="hashedPassword"
                type="password"
                label="Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )
    return (
        <Modal
            disabled={isLoading}
            isOpen={loginModal.isOpen}
            title="Login"
            actionLabel="Login"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            />
    );
}
 
export default LoginModal;