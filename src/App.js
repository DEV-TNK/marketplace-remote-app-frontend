// import node module libraries
import { BrowserRouter as Router } from 'react-router-dom';

// import layouts
import ScrollToTop from 'layouts/dashboard/ScrollToTop';
import AllRoutes from 'layouts/AllRoutes';
import DimpHome from 'components/marketing/landings/dimp-home/DimpHome';

// import required stylesheet
import 'simplebar/dist/simplebar.min.css';
import 'tippy.js/animations/scale.css';

function App() {
	return (
		<Router>
			<DimpHome />
			{/* <ScrollToTop />
			<AllRoutes /> */}
		</Router>
	);
}

export default App;
