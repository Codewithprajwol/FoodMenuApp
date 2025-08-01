import { useState } from 'react';
import toast from 'react-hot-toast';

const usePreviewImage = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handlePreviewImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Invalid file type");
      setImageUrl(null);
    }
  };

  return { imageUrl, handlePreviewImage, setImageUrl };
};

export default usePreviewImage;
