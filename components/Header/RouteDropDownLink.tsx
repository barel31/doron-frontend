import Link from 'next/link';
import { IconChevronDown } from '@/lib/icons';
import useRouteState from '@/hooks/useRouteState';

const RouteDropdownLink = ({
  route,
  onNavClick,
  params,
  isChild = false,
  isDropdownOpen,
}: RouteLinkComponentProps & {
  isDropdownOpen: boolean;
}) => {
  const { classes } = useRouteState(params, route, isChild);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (route.children) {
      e.preventDefault();
    } else {
      onNavClick();
    }
  };

  return (
    <div>
      <Link
        className={classes.join(' ')}
        href={route.children ? '#' : '/' + route.slug.current}
        onClick={handleClick}
        title={route.name}>
        {route.name}
        {route.children && (
          <IconChevronDown
            className={`transition size-4 flex align-middle relative top-[0.1rem] right-[0.2rem] transform ${
              isDropdownOpen ? 'rotate-0' : 'rotate-180'
            }`}
          />
        )}
      </Link>
    </div>
  );
};

export default RouteDropdownLink;
