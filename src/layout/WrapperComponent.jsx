import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const WrapperComponent = () => (WrappedComponent) => {
  return (props) => {
    return (
      <>
        <div className='border border-1'>
           <WrappedComponent {...props} />
          {/* <Footer /> */}
        </div>
      </>
    );
  };
};

export { WrapperComponent };
