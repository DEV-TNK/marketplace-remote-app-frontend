// import node module libraries
import { Fragment } from 'react';

// import sub components
import ContactSupportSection from '../help-center/ContactSupportSection';
import HeroGradientHeader from './help-center/HeroGradientHeader';
import HelpCenterFAQs from '../help-center/HelpCenterFAQs';

const HelpCenter = () => {
	return (
		<Fragment>
			{/* hero gradient header with features */}
			<HeroGradientHeader />

			{/* FAQs section  */}
			<HelpCenterFAQs />

			{/* contact / support section */}
			<ContactSupportSection />
		</Fragment>
	);
};
export default HelpCenter;
