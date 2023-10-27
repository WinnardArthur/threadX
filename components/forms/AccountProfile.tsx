"use client";

import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';

type AccountProfileProps = {
  btnTitle: string;
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
};

const AccountProfile = ({ btnTitle, user }: AccountProfileProps ) => {
    const form = useForm();
    
  return <div>Account Profile</div>;
};

export default AccountProfile;
