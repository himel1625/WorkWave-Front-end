import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import './CheckoutForm.css';

const CheckoutForm = ({
  selectedEmployee,
  selectedDate,
  handlePaymentSubmit,
}) => {
  const [clientSecret, setClientSecret] = useState(null);
  const [processing, setProcessing] = useState(false);
  const axiosSecure = useAxiosSecure();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (selectedEmployee && selectedDate) {
      getPaymentIntent();
    }
  }, [selectedEmployee, selectedDate]);

  const getPaymentIntent = async () => {
    try {
      const { data } = await axiosSecure.post('/create-payment-intent', {
        email: selectedEmployee?.email,
        employeeName: selectedEmployee?.username,
        salary: selectedEmployee?.number,
        paymentDate: selectedDate,
        designation: selectedEmployee?.designation,
      });
      setClientSecret(data.clientSecret);
    } catch (err) {
      console.error('Error fetching payment intent:', err);
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    handlePaymentSubmit();
    setProcessing(true);

    if (!stripe || !elements) {
      setProcessing(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setProcessing(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setProcessing(false);
      console.error('Payment method error:', error);
      return;
    }

    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

    if (confirmError) {
      setProcessing(false);
      console.error('Payment confirmation error:', confirmError);
      return;
    }
    console.log('Payment successful:', paymentIntent);
    setProcessing(false);
  };

  return (
    <div className='checkout-form'>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': { color: '#aab7c4' },
            },
            invalid: { color: '#9e2146' },
          },
        }}
      />
      <div className='flex justify-around  gap-2'>
        <button
          className='bg-green-500 text-white px-4 py-2 rounded cursor-pointer'
          onClick={handleSubmit}
          disabled={processing || !clientSecret}
        >
          {processing ? 'Processing...' : 'Pay Now'}
        </button>
      </div>
    </div>
  );
};

export default CheckoutForm;
