import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import useAuth from '../../../../Hooks/useAuth';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';

const WorkSheetForm = () => {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = async data => {
    const axiosPublic = useAxiosPublic();
    try {
      const payload = {
        ...data,
        email: user?.email,
        userName: user?.displayName,
      };
      await axiosPublic.post('/work-sheet', payload);
    } catch (error) {
      console.error('Error posting data:', error);
    }
    setValue('task', '');
    setValue('hoursWorked', '');
    setValue('date', new Date());
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-row items-center justify-center gap-4 p-4 bg-lightSecondary dark:bg-darkSecondary shadow-md rounded-lg'
    >
      <select
        {...register('task', { required: 'Task is required' })}
        className='border border-gray-300 rounded-md px-3 py-2 w-40'
      >
        <option value='' disabled>
          Select Task
        </option>
        <option value='Sales'>Sales</option>
        <option value='Support'>Support</option>
        <option value='Content'>Content</option>
        <option value='Paper-work'>Paper-work</option>
      </select>
      {errors.task && (
        <p className='text-red-500 text-xs'>{errors.task.message}</p>
      )}

      <input
        type='text'
        {...register('userName')}
        defaultValue={user?.displayName}
        hidden
      />

      {/* Hours Worked */}
      <input
        type='number'
        {...register('hoursWorked', {
          required: 'Hours Worked is required',
          min: { value: 1, message: 'Minimum 1 hour' },
        })}
        placeholder='Hours Worked'
        className='border border-gray-300 rounded-md px-3 py-2 w-24'
      />
      {errors.hoursWorked && (
        <p className='text-red-500 text-xs'>{errors.hoursWorked.message}</p>
      )}

      {/* Date Picker */}
      <DatePicker
        {...register('date')}
        selected={new Date()}
        onChange={date => setValue('date', date)}
        dateFormat='yyyy-MM-dd'
        className='border border-gray-300 rounded-md px-3 py-2'
      />

      {/* Submit Button */}
      <button
        type='submit'
        className='bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors'
      >
        Add / Submit
      </button>
    </form>
  );
};

export default WorkSheetForm;
