export const DashboardMenu = [
	{
		id: 1,
		title: 'Mon tableau de bord',
		link: '/ServiceProviderdashboard',
		icon: 'home'
	},
	{
		id: 2,
		title: 'Mes gigs',
		link: '/ServiceProviderdashboard/All-Gig',
		icon: 'book'
	},
	{
		id: 3,
		title: 'Gigs employés',
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
		title: 'Offre de service',
		link: '/ServiceProviderdashboard/Service-offer',
		icon: 'shopping-bag'
	},
	
	{
		id: 6,
		title: 'Critiques',
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
		title: 'Paiements',
		link: "/ServiceProviderdashboard/ServiceProvided-payouts",
		icon: 'naira-sign'
	},
	
];

export const AccountSettingsMenu = [
	
	{
		id: 1,
		title: 'Profils sociaux',
		link: '/ServiceProviderdashboard/ServiceProvider-social-profiles',
		icon: 'refresh-cw'
	},
	{
		id: 1,
		title: 'Résolution de conflit',
		link: '/ServiceProviderdashboard/ServiceProvider-conflict-resolution',
		icon: 'book'
	},
	{
		id: 2,
		title: 'Supprimer le profil',
		link: '/ServiceProviderdashboard/ServiceProvider-delete-profile',
		icon: 'trash'
	},
	{
		id: 3,
		title: 'Mettre à jour le profil',
		link: '/ServiceProviderdashboard/ServiceProvider-update-provider-profile',
		icon: 'refresh-cw'
	},
	{
		id: 4,
		title: 'Se déconnecter',
		link: '/',
		icon: 'power'
	}
];

export const StudentDashboardMenu = [DashboardMenu, AccountSettingsMenu];

export default StudentDashboardMenu;
