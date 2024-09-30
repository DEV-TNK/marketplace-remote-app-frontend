export const DashboardMenu = [
	{
		id: 1,
		title: 'Mon tableau de bord',
		link: '/JobSeekerdashboard',
		icon: 'home'
	},
	{
		id: 2,
		title: 'Mes emplois',
		link: '/JobSeekerdashboard/My-Job',
		icon: 'book'
	},
	{
		id: 3,
		title: 'Contrat',
		link: '/JobSeekerdashboard/My-Contract',
		icon: 'naira-sign'
	},
	{
		id: 4,
		title: 'Mon offre',
		link: '/JobSeekerdashboard/My-Offer',
		icon: 'shopping-bag'
	},
	
	{
		id: 5,
		title: 'Critiques',
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
		title: 'Paiements',
		link: '/JobSeekerdashboard/seeker-payouts',
		icon: 'naira-sign'
	},
	// {
	// 	id: 7,
	// 	title: 'My Service',
	// 	link: '/JobSeekerdashboard/my-service',
	// 	icon: 'shopping-bag'
	// },
	
];

export const AccountSettingsMenu = [
	
	{
		id: 1,
		title: 'Profils sociaux',
		link: '/JobSeekerdashboard/seeker-social-profiles',
		icon: 'refresh-cw'
	},

	{
		id: 1,
		title: 'Résolution de conflit',
		link: '/JobSeekerdashboard/conflict-resolution',
		icon: 'book'
	},
	{
		id: 2,
		title: 'Supprimer le profil',
		link: '/JobSeekerdashboard/seeker-delete-profile',
		icon: 'trash'
	},
	{
		id: 3,
		title: 'Se déconnecter',
		link: '/',
		icon: 'power'
	}
];

export const StudentDashboardMenu = [DashboardMenu, AccountSettingsMenu];

export default StudentDashboardMenu;
