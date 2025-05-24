import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white py-8 mt-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Pizza wale Bhaiya</h3>
            <p className="text-gray-300">
              Delicious food delivered fresh to your door. Order online for pickup or delivery.
            </p>
            <p>Web site Owner</p>
            <a href="https://www.instagram.com/abhiyank_mishra/?hl=en">Instagram</a>
            
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Hours</h3>
            <ul className="text-gray-300">
              <li>Monday - Friday: 10:00 AM - 10:00 PM</li>
              <li>Saturday & Sunday: 11:00 AM - 11:00 PM</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <address className="text-gray-300 not-italic">
              <a href="https://www.instagram.com/pizzawalebhaiya_auraiya/">Instagram</a>
              <p>Tilak Nagar Auraiya Locality</p>
              <p>Near Roadways Bus Stand, Auraiya 206122</p>
              <p>Phone: +91 6395642454</p>
              <p>Lic. No. 22724873000103</p>
            </address>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {currentYear} Pizza wale Bhaiya. All rights reserved.</p>
          <p>This website is made by Abhiyank</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;