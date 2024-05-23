'use client'
import React, { useState } from 'react';
import ImageUpload from '../components/inputs/ImageUpload';
import { SafeUser } from '../types';
import Container from '../components/Container';
import Heading from '../components/Heading';
import Avatar from './Avatar';
import useImageUploadModal from '../hooks/useImageUploadModal';

interface ProfilePageProps {
  user: SafeUser | undefined;
}

const ProfileClient: React.FC<ProfilePageProps> = ({ user }) => {
  const [image, setImage] = useState<string | null>(user?.image || null);
  const [isImageUploadEnabled, setIsImageUploadEnabled] = useState<boolean>(false);

  const handleImageChange = async (newImageUrl: string) => {
    setImage(newImageUrl);
    setIsImageUploadEnabled(false);
  };
  const uploadModal=useImageUploadModal();

  const toggleImageUpload = () => {
    return uploadModal.onOpen();
  };

  return (
    <Container>
      <div className="flex flex-col items-center justify-center">
        <Heading title='Profile' />
        <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full">
          <div className="flex items-center justify-center">
            <Avatar src={user?.image} />
            <div className="ml-6">
              {!user?.image && (
                <button
                  onClick={toggleImageUpload}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                >
                  Upload Image
                </button>
              )}
            </div>
          </div>
          <div className="mt-6 text-center">
            <p className="text-lg font-bold">{user?.name}</p>
            <p className="text-gray-500">{user?.email}</p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProfileClient;
