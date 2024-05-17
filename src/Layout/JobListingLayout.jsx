// import node module libraries
import React, { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

// import layouts
import NavbarJobPages from '../Layout/navbars/NavbarJobPages';
import FooterWithLinks from '../Pages/home-academy/FooterWithLinks';


const JobListingLayout = (props) => {
	return (
		<Fragment>
			<NavbarJobPages />
			<main>
				{props.children}
				<Outlet />
			</main>
			<FooterWithLinks />
		</Fragment>
	);
};

export default JobListingLayout;
