import { ChangeEvent, FC, FormEvent, useRef, useState } from 'react';
import Avatar from '../../../components/avatar/Avatar.tsx';
import { User } from 'global-types';
import useUserProfile from '../hooks/useUserProfile.ts';

type ProfileImageProps = {
  user: User;
};

const UserProfile: FC<ProfileImageProps> = ({ user }) => {
  const { id, profileImage } = user;
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const { uploadProfileImageMutation } = useUserProfile();

  const handleAvatarClick = () => {
    inputFileRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!(e.target.files && e.target.files[0])) {
      return;
    }

    setFile(e.target.files[0]);
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('img', file);
    formData.append('id', id.toString());

    uploadProfileImageMutation
      .mutateAsync(formData)
      .then(() => console.log('Successfully Uploaded'))
      .catch(() => console.error('Upload Failed'));
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input type="file" className="hidden" onChange={handleFileChange} ref={inputFileRef} />
      <Avatar
        id="avatar"
        role="button"
        imageSrc={
          profileImage
            ? `url(http://localhost:8000/api/auth-service/member/v1/profile/image/${profileImage})`
            : './src/assets/images/user.png'
        }
        className="w-32 h-32"
        onClick={handleAvatarClick}
      />
      <button type="submit">Upload</button>
    </form>
  );
};

export default UserProfile;
