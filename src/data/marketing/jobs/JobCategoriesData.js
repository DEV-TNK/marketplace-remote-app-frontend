import { v4 as uuid } from 'uuid';

export const JobCategoriesData = [
	{
		id: uuid(),
		icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-activity" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2Z"></path></svg>',
		category: 'Analytique',
		stat: '2k emplois'
	},
	{
		id: uuid(),
		icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-palette" viewBox="0 0 16 16"><path d="M8 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm4 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM5.5 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path><path d="M16 8c0 3.15-1.866 2.585-3.567 2.07C11.42 9.763 10.465 9.473 10 10c-.603.683-.475 1.819-.351 2.92C9.826 14.495 9.996 16 8 16a8 8 0 1 1 8-8zm-8 7c.611 0 .654-.171.655-.176.078-.146.124-.464.07-1.119-.014-.168-.037-.37-.061-.591-.052-.464-.112-1.005-.118-1.462-.01-.707.083-1.61.704-2.314.369-.417.845-.578 1.272-.618.404-.038.812.026 1.16.104.343.077.702.186 1.025.284l.028.008c.346.105.658.199.953.266.653.148.904.083.991.024C14.717 9.38 15 9.161 15 8a7 7 0 1 0-7 7z"></path></svg>',
		category: 'Conception UI/UX',
		stat: '1k emplois'
	},
	{
		id: uuid(),
		icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-code-slash" viewBox="0 0 16 16"><path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z"></path></svg>',
		category: 'Développement',
		stat: '800 emplois'
	},
	{
		id: uuid(),
		icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-people" viewBox="0 0 16 16"><path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"></path></svg>',
		category: 'Gestion de produit',
		stat: '1.2K emplois'
	},
	{
		id: uuid(),
		icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path></svg>',
		category: 'SEO',
		stat: '1200 emplois'
	},
	{
		id: uuid(),
		icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-bar-chart" viewBox="0 0 16 16"><path d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2 3h2v5h-2V5zM6 10v4H4v-4h2zm-1 3h2v-3H5v3zm5-5h2v3h-2V8z"></path></svg>',
		category: 'Analyste de données',
		stat: '200 emplois'
	},
	{
		id: uuid(),
		icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-briefcase" viewBox="0 0 16 16"><path d="M6.5 0a.5.5 0 0 1 .5.5v1h2V.5a.5.5 0 0 1 1 0V1h4A1.5 1.5 0 0 1 15 2.5v11A1.5 1.5 0 0 1 13.5 15h-11A1.5 1.5 0 0 1 1 13.5v-11A1.5 1.5 0 0 1 2.5 1h4V.5a.5.5 0 0 1 .5-.5zM15 4v9.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V4h14zm-1 0h-12v9h12V4z"></path></svg>',
		category: 'Développeur mobile',
		stat: '120 emplois'
	},
	{
		id: uuid(),
		icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-megaphone" viewBox="0 0 16 16"><path d="M13.5 1.5a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V2.5a1 1 0 0 1 1-1h10.5zM2 3.08c0-.485.4-.88.88-.88h10.24c.485 0 .88.4.88.88v9.84a.88.88 0 0 1-.88.88H2.88a.88.88 0 0 1-.88-.88V3.08zM14 2.5h-12v9h12v-9zM3 5h2v3H3V5z"></path></svg>',
		category: 'Finance',
		stat: '5k emplois'
	}
];

export default JobCategoriesData;
