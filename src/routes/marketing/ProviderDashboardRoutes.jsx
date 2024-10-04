export const DashboardMenu = [
	{
		id: 1,
		title: 'Mon tableau de bord',
		link: '/Providerdashboard',
		icon: 'home'
	},
	{
		id: 2,
		title: 'Mes emplois',
		link: '/Providerdashboard/All-Job',
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
		title: "Candidats à l'emploi",
		link: '/Providerdashboard/Job-Applicants',
		icon: 'shopping-bag'
	},
	
	{
		id: 6,
		title: 'Critiques',
		link: '/Providerdashboard/provider-reviews',
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
		link: '/Providerdashboard/provider-payouts',
		icon: 'naira-sign'
	},
	
];

export const AccountSettingsMenu = [
	
	{
		id: 1,
		title: 'Profils sociaux',
		link: '/Providerdashboard/provider-social-profiles',
		icon: 'refresh-cw'
	},
	{
		id: 1,
		title: 'Résolution de conflit',
		link: '/Providerdashboard/conflict-resolution',
		icon: 'book'
	},
	{
		id: 2,
		title: 'Supprimer le profil',
		link: '/Providerdashboard/provider-delete-profile',
		icon: 'trash'
	},
	{
		id: 3,
		title: 'Mettre à jour le profil',
		link: '/Providerdashboard/update-provider-profile',
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
