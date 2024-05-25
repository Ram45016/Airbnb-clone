'use client';
import React, { useState } from 'react';
import Container from '../components/Container';
import Heading from '../components/Heading';
import Avatar from './Avatar';
import useImageUploadModal from '../hooks/useImageUploadModal';
import { SafeUser } from '../types';
import useVerificationModal from '../hooks/useVerificationModal';
import { FaCheckCircle } from 'react-icons/fa'; // Importing the icon from react-icons

interface ProfilePageProps {
  user: SafeUser | undefined;
}

const ProfileClient: React.FC<ProfilePageProps> = ({ user }) => {
  const [image, setImage] = useState<string | null>(user?.image || null);
  const [isImageUploadEnabled, setIsImageUploadEnabled] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const uploadModal = useImageUploadModal();
  const verificationModal = useVerificationModal();

  const handleImageChange = async (newImageUrl: string) => {
    setImage(newImageUrl);
    setIsImageUploadEnabled(false);
  };

  const toggleImageUpload = () => {
    return uploadModal.onOpen();
  };

  const handleVerifyEmail = async () => {
    setIsVerifying(true);
    return verificationModal.onOpen();
  };

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <Heading title="Profile" />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <div className="flex flex-col items-center justify-center col-span-4">
              <Avatar src={image || user?.image} />
              <div className="ml-6 mt-4">
                {!user?.image && (
                  <button
                    onClick={toggleImageUpload}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                  >
                    Upload Image
                  </button>
                )}
              </div>
              <div className="mt-6 text-center">
                {user?.emailVerified ? (
                  <div className="mt-4 flex items-center justify-center">
                    <FaCheckCircle className="w-6 h-6 text-green-500 mr-2" />
                    <p className="text-green-500">Verified</p>
                  </div>
                ) : (
                  <div className="mt-4">
                    <p className="text-red-500">Verify your account</p>
                    <button
                      onClick={handleVerifyEmail}
                      disabled={isVerifying}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mt-2"
                    >
                      Send Verification Email
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="order-first md:order-last md:col-span-3">
              <div className="mb-4">
                <p className="text-lg font-semibold">Personal Information</p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex flex-col gap-2">
                  <p className="text-gray-500">Name</p>
                  <p>{user?.name}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-gray-500">Email</p>
                  <p>{user?.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProfileClient;
