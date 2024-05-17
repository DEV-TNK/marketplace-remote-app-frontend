import { v4 as uuid } from 'uuid';

export const MostAskedFAQs = [
	{
		id: uuid(),
		title: 'What’s the benefits of the Premium Membership?',
		content: `Premium Membership offers a range of exclusive benefits to enhance your learning experience and provide additional value. Some of the key benefits include:

	<li> Access to exclusive features and content: Premium members enjoy access to additional features and exclusive content that is not available to regular users. This may include advanced courses, specialized tutorials, premium support, and member-only resources. </li>

	<li> Enhanced learning experience: Premium members receive personalized recommendations, progress tracking, and tailored learning paths to help them achieve their learning goals more effectively. They may also benefit from interactive learning tools, quizzes, and assessments designed to enhance comprehension and retention. </li>

	<li> Priority support and assistance: Premium members receive priority support from customer service representatives and technical support teams. This ensures faster response times and dedicated assistance to address any issues or inquiries they may have while using the platform. </li>

	<li> Networking and collaboration opportunities: Premium members gain access to exclusive networking events, forums, and communities where they can connect with other like-minded individuals, industry experts, and mentors. This facilitates collaboration, knowledge sharing, and professional networking opportunities that can enhance their career prospects and personal development. </li>

	<li> Discounts and special offers: Premium members may be eligible for discounts, promotions, and special offers on courses, services, and products available on the platform. These savings can help offset the cost of membership and provide additional value to members. </li>

	<li> Overall, the Premium Membership offers a comprehensive package of benefits designed to provide members with a superior learning experience, personalized support, networking opportunities, and cost savings. </li>`
	},
	{
		id: uuid(),
		title: 'How much time will I need to learn this app?',
		content: `The time required to learn this app can vary depending on several factors, including your prior experience, familiarity with similar applications, and the complexity of the app itself. However, we can provide some general guidelines to help you estimate the learning time:

	<li> Basic proficiency: If you're new to similar apps or concepts, it may take several hours to gain basic proficiency with this app. This includes familiarizing yourself with the user interface, understanding key features and functionalities, and completing introductory tutorials or guides. </li>

	<li> Intermediate level: For users with some experience in related apps or technologies, it may take a few days to a week to reach an intermediate level of proficiency. This involves exploring more advanced features, practicing tasks and workflows, and troubleshooting common issues or challenges. </li>
	<li> Advanced mastery: Achieving advanced mastery of the app may require several weeks or even months of dedicated learning and practice. This includes mastering advanced features and techniques, customizing the app to suit your specific needs, and becoming proficient in using the app for complex tasks or projects. </li>

	<li> Ongoing learning: It's important to note that learning is an ongoing process, and proficiency with the app may continue to improve over time with regular use, practice, and exploration. Additionally, updates, new features, and improvements to the app may require ongoing learning and adaptation. </li>

	<li>  Overall, the time required to learn this app can vary for each individual based on their unique learning style, background, and goals. We recommend starting with the basics and gradually building your skills through practice, experimentation, and continuous learning. </li>`
	},
	{
		id: uuid(),
		title: 'How do I sign up as a general user on the platform?',
		content: `Signing up as a general user on our platform is quick and easy. Simply click on the 'Sign Up' button located on the homepage and fill out the registration form with your details. Once registered, you can start exploring the platform's features and services.`,
	  },
	  {
		id: uuid(),
		title: 'Is there a month-to-month payment option?',
		content: `Yes, we offer a month-to-month payment option for our subscription plans. This allows you to pay for the service on a monthly basis rather than committing to a longer-term contract. With the month-to-month option, you have the flexibility to cancel or modify your subscription at any time without any long-term commitment. It's a convenient and hassle-free way to access our services and enjoy the benefits of membership without being tied down to a contract.`
	},
	{
		id: uuid(),
		title: 'How can I update my profile information?',
		content: `You can easily update your profile information by accessing the 'My Account' section on the platform. From there, you can edit your personal details, update your profile picture, and modify any other information as needed. Keeping your profile up-to-date ensures accurate communication and better matchmaking with service providers.`,
	  },
];

export const GeneralInquiriesFAQs = [
	{
	  id: uuid(),
	  title: 'How do I sign up as a general user on the platform?',
	  content: `Signing up as a general user on our platform is quick and easy. Simply click on the 'Sign Up' button located on the homepage and fill out the registration form with your details. Once registered, you can start exploring the platform's features and services.`,
	},
	{
	  id: uuid(),
	  title: 'Can I request custom services tailored to my specific needs?',
	  content: `Yes, you can request custom services tailored to your specific needs on our platform. Simply provide detailed information about your requirements when posting a job or contacting service providers. This allows providers to understand your needs better and offer customized solutions.`,
	},
  ];

  export const SupportFAQs = [
	{
	  id: uuid(),
	  title: 'How do I contact customer support for assistance?',
	  content: `If you need assistance or have any questions, our customer support team is here to help. You can reach out to us via email, phone, or live chat support, depending on your preference. Our support agents are knowledgeable and responsive, ensuring prompt resolution of your inquiries.`,
	},
	{
	  id: uuid(),
	  title: 'What should I do if I encounter technical issues while using the platform?',
	  content: `If you encounter technical issues while using the platform, don't worry - we've got you covered. First, try refreshing your browser or clearing your cache to see if that resolves the issue. If the problem persists, please contact our technical support team, providing detailed information about the issue, including any error messages or screenshots you may have. Our team will work diligently to troubleshoot and resolve the issue to ensure smooth user experience.`,
	},
  ];

export const HelpCenterFAQsData = [
	MostAskedFAQs,
	GeneralInquiriesFAQs,
	SupportFAQs
];

export default HelpCenterFAQsData;
