import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DynamicFaviconAndTitle = () => {
  const location = useLocation();
  useEffect(() => {
    const isLoginPage = location.pathname === '/login';
    const faviconPath = '/images/newradha.png'; // must be in /public

    // 1. Update Title based on route
    let title = '';
    if (isLoginPage) {
      title = 'Login';
    } else if (location.pathname === '/') {
      title = 'Radha567-Chat';
    } else {
      title = 'Radha567-Chat';
    }
    document.title = title;

    // 2. Update Favicon
    const updateFavicon = (href) => {
      let link = document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        link.type = 'image/x-icon';
        document.head.appendChild(link);
      }
      link.href = href;
    };

    if (isLoginPage) {
      const existingFavicon = document.querySelector("link[rel*='icon']");
      if (existingFavicon) {
        existingFavicon.remove();
        window.location.reload();
      } // hide favicon on /login
    } else {
      updateFavicon(faviconPath); // show favicon on all other pages
    }
  }, [location.pathname, location]);

  return null;
};

export default DynamicFaviconAndTitle;
