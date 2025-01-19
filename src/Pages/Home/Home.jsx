import React from 'react';

const Home = () => {
  return (
    <div>
      {/* Banner Section */}
      <section className='bg-lightSecondary dark:bg-darkSecondary text-darkSecondary dark:text-lightSecondary text-center py-12'>
        <h1 className='text-4xl font-bold'>Welcome to Our Company!</h1>
        <p className='mt-4 text-xl'>
          We bring innovative solutions for a better tomorrow.
        </p>
      </section>

      {/* Services Section */}
      <section className='py-16 px-4 bg-lightSecondary dark:bg-darkSecondary'>
        <h2 className='text-3xl font-semibold text-center text-darkSecondary dark:text-lightSecondary'>
          Our Services
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8'>
          <div className='dark:bg-darkPrimary p-6 rounded-lg shadow-md'>
            <h3 className='text-2xl font-semibold text-darkSecondary dark:text-lightSecondary'>
              Web Development
            </h3>
            <p className='mt-4 text-darkSecondary dark:text-lightSecondary'>
              We create modern, responsive websites tailored to your needs.
            </p>
          </div>
          <div className='dark:bg-darkPrimary p-6 rounded-lg shadow-md'>
            <h3 className='text-2xl font-semibold text-darkSecondary dark:text-lightSecondary'>
              App Development
            </h3>
            <p className='mt-4 text-darkSecondary dark:text-lightSecondary'>
              Building powerful mobile apps that enhance user experience.
            </p>
          </div>
          <div className='dark:bg-darkPrimary p-6 rounded-lg shadow-md'>
            <h3 className='text-2xl font-semibold text-darkSecondary dark:text-lightSecondary'>
              Digital Marketing
            </h3>
            <p className='mt-4 text-darkSecondary dark:text-lightSecondary'>
              Boosting your brand's presence with innovative marketing
              strategies.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className='py-16 bg-lightSecondary dark:bg-darkSecondary'>
        <h2 className='text-3xl font-semibold text-center text-darkSecondary dark:text-lightSecondary'>
          What Our Clients Say
        </h2>
        <div className='mt-8 flex justify-center'>
          <div className='w-2/3 dark:bg-darkPrimary p-6 rounded-lg shadow-lg'>
            <p className='italic text-darkSecondary dark:text-lightSecondary'>
              "This company helped us achieve our business goals faster than we
              expected. Their web development service is top-notch!"
            </p>
            <p className='mt-4 font-semibold text-right text-darkSecondary dark:text-lightSecondary'>
              John Doe, CEO of Company X
            </p>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className='py-16 px-4 bg-lightSecondary dark:bg-darkSecondary'>
        <h2 className='text-3xl font-semibold text-center text-darkSecondary dark:text-lightSecondary'>
          About Us
        </h2>
        <p className='mt-4 text-center text-lg text-darkSecondary dark:text-lightSecondary'>
          We are a team of passionate individuals dedicated to creating
          impactful digital solutions that help businesses grow.
        </p>
      </section>

      {/* Contact Us Section */}
      <section className='py-16 px-4 bg-lightSecondary dark:bg-darkSecondary text-darkSecondary dark:text-lightSecondary'>
        <h2 className='text-3xl font-semibold text-center'>Get in Touch</h2>
        <div className='mt-8 flex justify-center'>
          <div className='w-full sm:w-2/3 md:w-1/2'>
            <form className='space-y-4'>
              <input
                type='text'
                placeholder='Your Name'
                className='w-full p-3 rounded-md border border-gray-300'
              />
              <input
                type='email'
                placeholder='Your Email'
                className='w-full p-3 rounded-md border border-gray-300'
              />
              <textarea
                placeholder='Your Message'
                className='w-full p-3 rounded-md border border-gray-300'
                rows='4'
              ></textarea>
              <button
                type='submit'
                className='w-full bg-yellow-500 text-white py-3 rounded-md hover:bg-yellow-400'
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
