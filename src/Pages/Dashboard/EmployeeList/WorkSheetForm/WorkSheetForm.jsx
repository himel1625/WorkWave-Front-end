import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import useAuth from '../../../../Hooks/useAuth';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';

const WorkSheetForm = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  // State to handle date picker value
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Update date value in react-hook-form when the date picker changes
  const handleDateChange = date => {
    setSelectedDate(date);
    setValue('date', date);
  };

  const onSubmit = async data => {
    try {
      const payload = {
        ...data,
        email: user?.email,
        userName: user?.displayName,
        date: selectedDate, // Ensure date is included properly
      };
      console.log(payload);
      await axiosPublic.post('/work-sheet', payload);
      reset({
        task: '',
        hoursWorked: '',
        date: new Date(),
      });
      setSelectedDate(new Date());
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-row items-center justify-center gap-4 p-4 bg-lightSecondary dark:bg-darkSecondary shadow-md rounded-lg'
    >
      {/* Task Selection */}
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

      {/* Hidden User Name Field */}
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
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat='yyyy-MM-dd'
        className='border border-gray-300 rounded-md px-3 py-2'
      />
      {errors.date && (
        <p className='text-red-500 text-xs'>{errors.date.message}</p>
      )}

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
