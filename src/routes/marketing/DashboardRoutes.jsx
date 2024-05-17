export const DashboardMenu = [
	{
		id: 1,
		title: 'My Dashboard',
		link: '/JobSeekerdashboard',
		icon: 'home'
	},
	{
		id: 2,
		title: 'My Jobs',
		link: '/JobSeekerdashboard/My-Job',
		icon: 'book'
	},
	{
		id: 3,
		title: 'Contract',
		link: '/JobSeekerdashboard/My-Contract',
		icon: 'naira-sign'
	},
	{
		id: 4,
		title: 'My Offer',
		link: '/JobSeekerdashboard/My-Offer',
		icon: 'shopping-bag'
	},
	
	{
		id: 5,
		title: 'Reviews',
		link: '/JobSeekerdashboard/seeker-reviews',
		icon: 'star'
	},
	// {
	// 	id: 6,
	// 	title: 'Earnings',
	// 	link: '/JobSeekerdashboard/seeker-earning',
	// 	icon: 'pie-chart'
	// },
	{
		id: 7,
		title: 'Payouts',
		link: '/JobSeekerdashboard/seeker-payouts',
		icon: 'naira-sign'
	},
	{
		id: 7,
		title: 'My Service',
		link: '/JobSeekerdashboard/my-service',
		icon: 'shopping-bag'
	},
	
];

export const AccountSettingsMenu = [
	
	{
		id: 1,
		title: 'Social Profiles',
		link: '/JobSeekerdashboard/seeker-social-profiles',
		icon: 'refresh-cw'
	},

	{
		id: 1,
		title: 'Conflict Resolution',
		link: '/JobSeekerdashboard/conflict-resolution',
		icon: 'book'
	},
	{
		id: 2,
		title: 'Delete Profile',
		link: '/JobSeekerdashboard/seeker-delete-profile',
		icon: 'trash'
	},
	{
		id: 3,
		title: 'Sign Out',
		link: '/',
		icon: 'power'
	}
];

export const StudentDashboardMenu = [DashboardMenu, AccountSettingsMenu];

export default StudentDashboardMenu;
