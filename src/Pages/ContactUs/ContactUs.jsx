import React from 'react';

const ContactUs = () => {
  return (
    <div className='p-8 font-sans'>
      {/* Map Section */}
      <section>
        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
          Find Us Here
        </h2>
        <div className='rounded-lg overflow-hidden shadow-lg'>
          <iframe
            title='Company Location'
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345095647!2d-122.41941548468138!3d37.774929279759664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085818c0603c86f%3A0xb4e61df45e4b4a12!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1614318375976!5m2!1sen!2s'
            width='100%'
            height='400'
            className='border-0'
            allowFullScreen=''
            loading='lazy'
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
