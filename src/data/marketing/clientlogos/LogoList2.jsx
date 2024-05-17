import { v4 as uuid } from 'uuid';

// import media files
import FgnAlatLogo from '../../../assets/LogoList/FgnAlatLogo.jpg';
import MicrosoftLogo from '../../../assets/LogoList/MicrosoftLogo.png'
import SkillPaddyLogo from '../../../assets/LogoList/SkillPaddyLogo.jpg';
import TransnumerikLogo from '../../../assets/LogoList/TransnumerikLogo.jpg';
import wemaLogo from '../../../assets/LogoList/wema Bank Logo.jpg';

const LogoList2 = [
	{
		id: uuid(),
		logoimage: FgnAlatLogo,
	},
	{
		id: uuid(),
		logoimage: MicrosoftLogo,
	},
	{
		id: uuid(),
		logoimage: SkillPaddyLogo,
	},
	{
		id: uuid(),
		logoimage: TransnumerikLogo,
	},
	{
		id: uuid(),
		logoimage: wemaLogo,
	},
];

export default LogoList2;
