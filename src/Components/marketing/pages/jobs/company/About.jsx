import { useEffect, useState } from 'react';
import axios from 'axios';

// import node module libraries
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

// import sub component
import CommonHeaderTabs from './CommonHeaderTabs';

// import MDI icons
import Icon from '@mdi/react';
import { mdiFacebook, mdiTwitter, mdiLinkedin } from '@mdi/js';

// import data files
import ComapniesListData from '../../../../../data/marketing/jobs/CompaniesListData';

const About = () => {
	const data = ComapniesListData[0];
	const searchParams = new URLSearchParams(window.location.search);
	const _id= searchParams.get('id')
	const [companyInfo, setCompanyInfo] = useState(null);

    useEffect(() => {
        const fetchCompanyInfo = async () => {
            try {
                const response = await axios.get(`https://unleashified-backend.azurewebsites.net/api/v1/companySingle-about-us/${_id}`);
                if (response.data && response.data.company) {
                    setCompanyInfo(response.data.company);
                }
            } catch (error) {
                console.error('Error fetching company information:', error);
            }
        };

        fetchCompanyInfo();
    }, []);

	return (
		<CommonHeaderTabs data={data}>
			<div>
				{companyInfo && (
					<>
					<div className="mb-6">
				{/* About the company text */}
				<h2 className="mb-3"> <img src={companyInfo.companyLogo} alt="Company Logo" style={{ maxWidth: '200px' }}/></h2>
			</div>
			<div className="mb-6">
				<h2 className="mb-3">{companyInfo.companyName}</h2>
				
			</div>
			<div className="mb-6">
				<h2 className="mb-3">Company Information</h2>
				<h4>Provider Name: {companyInfo.firstName + " " + companyInfo.lastName}</h4>
				<h4>Email: {companyInfo.companyEmail}</h4>
				<h4>Contact: {companyInfo.companyContact}</h4>
				<h4>Description: {companyInfo.companyDescription}</h4>
			</div>
			<div>
				<Table borderless className="w-lg-40 w-md-50">
					<tbody>
						<tr>
							<td className="ps-0 pb-0">
								<span className="text-dark fw-semi-bold">Location:</span>
							</td>
							<td className="ps-0 pb-0">
								<span>{companyInfo.companyLocation}</span>
							</td>
						</tr>
						<tr>
							{/* <td className="ps-0 pb-0">
								<span className="text-dark fw-semi-bold">Company size:</span>
							</td>
							<td className="ps-0 pb-0">
								<span>350 - 500</span>
							</td> */}
						</tr>
						<tr>
							<td className="ps-0 pb-0">
								<span className="text-dark fw-semi-bold">Website:</span>
							</td>
							<td className="ps-0 pb-0">
								{/* <Link to="https://codescandy.com/"> */}
									{companyInfo.companyWebsite}
								{/* </Link> */}
							</td>
						</tr>
						<tr>
							<td className="ps-0 pb-0">
								<span className="text-dark fw-semi-bold">Industry:</span>
							</td>
							<td className="ps-0 pb-0">{companyInfo.companyDesignation}</td>
						</tr>
						<tr>
							<td className="ps-0 pb-0">
								<span className="text-dark fw-semi-bold">Type:</span>
							</td>
							<td className="ps-0 pb-0">{companyInfo.companyType}</td>
						</tr>
						<tr>
							<td className="ps-0 pb-0">
								<span className="text-dark fw-semi-bold">Social Presence:</span>
							</td>
							<td className="ps-0 pb-0">
								<Icon
									path={mdiFacebook}
									className="fs-4 text-muted me-2"
									size={0.6}
								/>
								<Icon
									path={mdiTwitter}
									className="fs-4 text-muted me-2"
									size={0.6}
								/>
								<Icon
									path={mdiLinkedin}
									className="fs-4 text-muted"
									size={0.6}
								/>
							</td>
						</tr>
					</tbody>
				</Table>
			</div>
					</>
				)}
			</div>
			
		</CommonHeaderTabs>
	);
};

export default About;
