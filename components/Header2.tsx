	'use client';

	import Image from 'next/image';
	import Link from 'next/link';
	import Logo from '@/public/logo.webp';
	import IconPhone from '@/public/icon-phone.webp';
	import { BsFacebook } from 'react-icons/bs';
	import { ImLinkedin } from 'react-icons/im';
	import useIsScrollTop from '@/hooks/useIsScrollTop';
	import ScrollLine from './ScrollLine';
	import { Navbar } from 'flowbite-react';
	import { usePathname } from 'next/navigation';

	function Header({
		routes,
		contact,
	}: {
		routes: Route[];
		contact: ContactInfo;
	}) {
		const isTop = useIsScrollTop();

		if (routes[0].slug.current === '/') {
			routes.reverse();
		}

		const pathname = usePathname();
		const activePath = routes.findIndex(
			(route) => route.slug.current === pathname
		);
		// console.log(activePath);


		return (
			<header
				className={`fixed z-50 top-0 w-full transition-all delay-150 ${
					!isTop ? 'bg-slate-200/60' : 'bg-transparent'
				}`}
			>
				<ScrollLine />

				<Navbar
					fluid
					rounded
					dir="ltr"
					className="navbar min-h-full top-0 border-none max-w-full md:!bg-transparent"
				>
					<div className="flex">
						<Navbar.Toggle />
						<div className="max-md:hidden header-contacts flex flex-1 justify-evenly !min-w-[30vw]">
							<Link
								href={`tel:${contact.phone}`}
								target="_blank"
								className="flex items-center text-stone-900"
							>
								<Image src={IconPhone} alt="icon-phone" />
								<span className="font-bold mx-3">
									{contact.phone}
								</span>
							</Link>
							<Link
								href="https://www.facebook.com/"
								className="rounded-full"
								target="_blank"
							>
								<BsFacebook size={50} />
							</Link>
							<Link
								href="https://www.linkedin.com/"
								className="rounded-full overflow-hidden"
								target="_blank"
							>
								<ImLinkedin size={50} />
							</Link>
						</div>
					</div>
					<Navbar.Collapse className="transition-all">
						{routes.map((route: Route, i) => (
							<Navbar.Link
								key={route.slug.current}
							>
							<Link
								className={`navbar-link-${
									route.slug.current
								} text-stone-900 text-xl font-bold md:hover:overline decoration-lime-500 decoration-[4px] navbar-link md:text-2xl
								${activePath === i && 'font-bold'}`}
								href={`/${route.slug.current}`}
							>
								{route.name}
							</Link></Navbar.Link>
						))}
					</Navbar.Collapse>
					<Link href="/" legacyBehavior>
						<Navbar.Brand>
							<Image
								alt="Logo"
								className="cursor-pointer"
								// className="mr-3 h-6 sm:h-9"
								src={Logo}
								width={200}
								height={100}
							/>
						</Navbar.Brand>
					</Link>
				</Navbar>
			</header>
		);
	}

	export default Header;

	// const NavbarLink = forwardRef<HTMLAnchorElement, { children: React.ReactNode }>(
	// 	({ children }, ref) => {
	// 		return (
	// 			<Navbar.Link ref={ref} className="md:text-2xl cursor-pointer">
	// 				{children}
	// 			</Navbar.Link>
	// 		);
	// 	}
	// );
	// NavbarLink.displayName = 'NavbarLink';
