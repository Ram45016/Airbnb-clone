'use client';
import Modal from "./Modal";
import { useState } from "react";
import useImageUploadModal from "@/app/hooks/useImageUploadModal";
import ImageUpload from "../inputs/ImageUpload";
import Heading from "../Heading";
import axios from "axios";

const UploadModal = () => {
    const uploadModal = useImageUploadModal();
    const [isLoading, setIsLoading] = useState(false);
    const [imageSrc, setImageSrc] = useState("");

    const handleUpload = async () => {
        setIsLoading(true);
        const data={image:imageSrc};
        await axios.post("/api/ImageUpload",data).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setIsLoading(false);
            uploadModal.onClose();
        })
        setIsLoading(false);
        console.log(imageSrc);
    };

    const bodyContent = (
        <div>
            <Heading
                title="Add Your Profile Image"
            />
            <ImageUpload
                onChange={(value) => setImageSrc(value)}
                value={imageSrc}
            />
        </div>
    );

    return (
        <Modal
            title="Upload your profile image"
            actionLabel="Upload"
            disabled={isLoading}
            isOpen={uploadModal.isOpen}
            onClose={uploadModal.onClose}
            onSubmit={handleUpload}
            body={bodyContent}
        />
    );
};

export default UploadModal;
