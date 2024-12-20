import { ElPhoneAlt } from '@/lib/icons';
import { cn } from '@/lib/utils';

type Contact = {
  facebook: string;
  linkedin: string;
  phone: string;
};

type NavbarContactProps = {
  contact: Contact;
  isMobile: boolean;
  show: boolean;
};

const NavbarContact = ({ contact, isMobile, show }: NavbarContactProps) => {
  return (
    <div
      className={cn(
        'navbar-contacts flex flex-col md:flex-row gap-4 justify-around',
        {
          invisible: !((isMobile && show) || !isMobile),
        }
      )}>
      <a
        href={`tel:${contact.phone}`}
        target="_blank"
        rel="noindex nofollow"
        className={cn(
          'flex flex-row items-center justify-around whitespace-nowrap hover:text-white dark:hover:text-zinc-900',
          { visible: (isMobile && show) || !isMobile }
        )}
        title="טלפון">
        <ElPhoneAlt className="w-[45px]" />
        <span className="font-bold m-1 max-2xl:hidden max-sm:visible">
          {contact.phone}
        </span>
      </a>
    </div>
  );
};

export default NavbarContact;
