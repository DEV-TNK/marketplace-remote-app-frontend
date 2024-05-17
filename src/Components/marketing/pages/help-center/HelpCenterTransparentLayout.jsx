// import node module libraries
import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

// import layouts
import FooterWithLinks from '../../../../Pages/home-academy/FooterWithLinks';
import NavbarDefault from '../../../../Pages/home-academy/navbars/NavbarDefault';

const HelpCenterTransparentLayout = (props) => {
	return (
		<Fragment>
			<NavbarDefault bg="transparent" className="navbar-transparent" />
			<main className="bg-white">
				{props.children}
				<Outlet />
			</main>
			<FooterWithLinks />
		</Fragment>
	);
};

export default HelpCenterTransparentLayout;
