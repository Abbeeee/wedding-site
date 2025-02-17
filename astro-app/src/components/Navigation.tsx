import React, { FC, useEffect } from 'react';
import { useState } from 'react';
import Button from './Button';

type Props = {
	navLinks?: {
		text?: string;
		link?: string;
	}[];
	ctaBtn?: {
		text?: string;
		link?: string;
	};
};

const Navigation: FC<Props> = ({ navLinks, ctaBtn }) => {
	const [isMenuActive, setIsMenuActive] = useState(false);

	const toggleMenu = () => {
		setIsMenuActive(!isMenuActive);
	};

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && isMenuActive) {
				setIsMenuActive(false);
			}
		};

		document.addEventListener('keydown', handleEscape);
		return () => document.removeEventListener('keydown', handleEscape);
	}, [isMenuActive]);

	const [isVisible, setIsVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);

	useEffect(() => {
		const mediaQuery = window.matchMedia('(min-width: 1px)');

		const handleScroll = () => {
			if (mediaQuery.matches && !isMenuActive) {
				const currentScrollY = window.scrollY;

				if (currentScrollY > 100) {
					setIsVisible(currentScrollY < lastScrollY);
				} else {
					setIsVisible(true);
				}

				setLastScrollY(currentScrollY);
			} else {
				setIsVisible(true);
			}
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, [lastScrollY, isMenuActive]);

	const barClasses =
		'bg-primary w-full h-[2px] absolute right-0 left-0 transition-all duration-200 ease-[cubic-bezier(0.1,0.82,0.76,0.965)]';

	const linkDefaultClasses = '!text-primary';
	const mobileLinkClasses = 'text-3xl !no-underline';

	return (
		<>
			<header
				className={`fixed z-20 w-full transform bg-background py-2 shadow-sm transition-transform duration-300 md:py-4 ${!isVisible ? '-translate-y-full' : 'translate-y-0'}`}
			>
				<div className="mx-auto flex max-w-container items-center justify-between gap-4">
					<a className="relative h-[38px]" href="/">
						<img src="/monogram.png" alt="monogram" height={38} className="h-full w-full" />
					</a>
					{navLinks && (
						<nav className="hidden h-full items-center gap-4 md:flex">
							{navLinks.map((link: any, index: number) => (
								<a key={index} href={link.link} className={`${linkDefaultClasses}`}>
									{link.text}
								</a>
							))}
						</nav>
					)}

					{ctaBtn && (
						<Button className="ml-auto min-w-[80px] md:ml-0" href={ctaBtn.link} size="sm" variant="outline" as="a">
							{ctaBtn.text}
						</Button>
					)}

					<button
						className={`menu-icon relative block size-10 cursor-pointer md:hidden ${isMenuActive ? 'active' : ''}`}
						onClick={toggleMenu}
						aria-label="Toggle menu"
					>
						<div className="absolute inset-0 m-auto h-[12px] w-[22px]">
							<span className={`${barClasses} top-0`}></span>
							<span className={`${barClasses} bottom-0`}></span>
						</div>
					</button>
				</div>
			</header>
			<div className={`fixed inset-0 z-10 bg-background ${isMenuActive ? '' : 'hidden'}`}>
				{navLinks && (
					<nav className="flex h-full flex-col items-center justify-center gap-8">
						{navLinks.map((link: any, index: number) => (
							<a
								key={index}
								href={link.link}
								className={`${linkDefaultClasses} ${mobileLinkClasses}`}
								onClick={toggleMenu}
							>
								{link.text}
							</a>
						))}
					</nav>
				)}
			</div>
		</>
	);
};

export default Navigation;
