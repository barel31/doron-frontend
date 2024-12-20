import { useMemo } from 'react';
import ContactInfoSection from './ContactInfoSection';
import SiteNavigationSection from './SiteNavigationSection';
import MapSection from './MapSection';
import ThemeButton from '../Navbar/ThemeButton';

type FooterProps = {
  routes: Route[];
  contact: ContactInfo;
};

const Footer: React.FC<FooterProps> = ({ routes, contact }) => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="bg-stone-300 dark:bg-stone-900 w-full pt-12 pb-4 text-gray-800 dark:text-gray-300">
      <div className="container mx-auto flex flex-col md:flex-row justify-around gap-12">
        <SiteNavigationSection routes={routes} />
        <ContactInfoSection contact={contact} />
        <MapSection address={contact.address} />
      </div>

      <div className="container mt-14 mx-4 md:mx-12 w-fit">
        <p className="text-sm font-medium m-0 p-0">ערכת נושא:</p>
        <ThemeButton className='relative right-2 bottom-5'/>
      </div>

      <div className="mt-8 text-center text-sm border-t border-gray-400 pt-4">
        <p className="mb-1">כל הזכויות שמורות &copy; {currentYear}</p>
        <p>
          נבנה על ידי{' '}
          <a
            href="https://www.linkedin.com/in/barel-shraga/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-700 font-medium hover:underline transition duration-300"
            title="barel31 Linkedin">
            barel31
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
