import axios from 'axios';
import useAxiosPublic from '../Hooks/useAxiosPublic';

export const imageUpload = async imageData => {
  const formData = new FormData();
  formData.append('image', imageData);
  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    formData,
  );
  return data.data.display_url;
};

export const saveUser = async userRole => {
  console.log(userRole)
  const axiosPublic = useAxiosPublic();
  try {
    await axiosPublic.post(`/user/${userRole?.email}`, {
      role: userRole?.role,
      isVerified: userRole?.role === 'Employee' ? false : undefined,
    });
    console.log('User data sent successfully');
  } catch (error) {
    console.error('Error saving user:', error);
  }
};
