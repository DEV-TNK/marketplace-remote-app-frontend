export const DashboardMenu = [
	{
		id: 1,
		title: 'My Dashboard',
		link: '/ServiceProviderdashboard',
		icon: 'home'
	},
	{
		id: 2,
		title: 'My Gigs',
		link: '/ServiceProviderdashboard/All-Gig',
		icon: 'book'
	},
	{
		id: 3,
		title: 'Gigs Employed',
		link: '/ServiceProviderDashoard/Outsourced-Gigs',
		icon: 'book'
	},
	// {
	// 	id: 3,
	// 	title: 'Outsource Jobs',
	// 	link: '/Providerdashboard/Outsource-Jobs',
	// 	icon: 'dollar-sign'
	// },
	// {
	// 	id: 4,
	// 	title: 'Employee of records',
	// 	link: '/Providerdashboard/Employee-of-record',
	// 	icon: 'employee-sign'
	// },
	{
		id: 5,
		title: 'Service Offer',
		link: '/ServiceProviderdashboard/Service-offer',
		icon: 'shopping-bag'
	},
	
	{
		id: 6,
		title: 'Reviews',
		link: '/ServiceProviderdashboard/ServiceProvider-reviews',
		icon: 'star'
	},
	// {
	// 	id: 6,
	// 	title: 'Earnings',
	// 	link: '/Providerdashboard/provider-earning',
	// 	icon: 'pie-chart'
	// },
	{
		id: 7,
		title: 'Payouts',
		link: "/ServiceProviderdashboard/ServiceProvided-payouts",
		icon: 'naira-sign'
	},
	
];

export const AccountSettingsMenu = [
	
	{
		id: 1,
		title: 'Social Profiles',
		link: '/ServiceProviderdashboard/ServiceProvider-social-profiles',
		icon: 'refresh-cw'
	},
	{
		id: 1,
		title: 'Conflict Resolution',
		link: '/ServiceProviderdashboard/ServiceProvider-conflict-resolution',
		icon: 'book'
	},
	{
		id: 2,
		title: 'Delete Profile',
		link: '/ServiceProviderdashboard/ServiceProvider-delete-profile',
		icon: 'trash'
	},
	{
		id: 3,
		title: 'Update Profile',
		link: '/ServiceProviderdashboard/ServiceProvider-update-provider-profile',
		icon: 'refresh-cw'
	},
	{
		id: 4,
		title: 'Sign Out',
		link: '/',
		icon: 'power'
	}
];

export const StudentDashboardMenu = [DashboardMenu, AccountSettingsMenu];

export default StudentDashboardMenu;
