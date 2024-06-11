// import node module libraries
import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

// import layouts
import FooterWithLinks from '../../../../Pages/home-academy/FooterWithLinks';
import NavbarJobsPages from "../../../../Layout/navbars/NavbarJobPages";

const HelpCenterTransparentLayout = (props) => {
	return (
		<Fragment>
			<NavbarJobsPages bg="transparent" className="navbar-transparent" />
			<main className="bg-white">
				{props.children}
				<Outlet />
			</main>
			<FooterWithLinks />
		</Fragment>
	);
};

export default HelpCenterTransparentLayout;
