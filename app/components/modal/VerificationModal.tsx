'use client'
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import useVerificationModal from '@/app/hooks/useVerificationModal';
import axios from 'axios';
import toast from 'react-hot-toast';

const VerificationModal = () => {
    const verificationModal = useVerificationModal();
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        try {
            if(data.otp === "0040") {
                const timestamp = new Date().toISOString();
                const response = await axios.post('/api/verification', { timestamp });
                
                if (response.status === 200) {
                    toast.success('Verification successful');
                    verificationModal.onClose();
                } else {
                    toast.error('Verification failed');
                }
                reset();
            } else {
                toast.error('Invalid verification code');
            }
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading title="Enter Verification Code" />
            <Input
                id="otp"
                label="Verification Code"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    );

    return (
        <Modal
            isOpen={verificationModal.isOpen}
            onClose={verificationModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            title="Verification"
            actionLabel="Verify"
            body={bodyContent}
            disabled={isLoading}
        />
    );
};

export default VerificationModal;
