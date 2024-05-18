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
const LoginModal = () => {
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
            name:'',
            email:'',
            password:''
        },
    });
    const onSubmit: SubmitHandler<FieldValues>=(data)=>{
        setIsLoading(true);
        axios.post('/api/register',data)
            .then(()=>{
                loginModal.onClose();
            })
            .catch((error)=>{
                console.log(error);
            })
            .finally(()=>{
                setIsLoading(false);
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
                id="password"
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
            actionLabel="Continue"
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            />
    );
}
 
export default LoginModal;