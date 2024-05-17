// import media files
import StartIcon from "../../../assets/remsana-logo.png";
import Logo from "../../../assets/unleashified-logo.png";
import FooterLogo2 from "../../../assets/LogoList/cote-logo.png";
import IndividualIcon from "../../../assets/remsana-logo.png";
import TeamIcon from "../../../assets/remsana-logo.png";

export const starter = [
  {
    image: Logo,
    plantitle: "Starter",
    description: `To start today you will get only
        <span class="text-dark fw-medium">free Job Post</span>
        access.`,
    monthly: 0,
    yearly: 0,
    buttonText: "Get Started For Free",
    buttonClass: "outline-primary",
    featureHeading: "All core features, including:",
    features: [
      { feature: "Only free Job Post" },
      { feature: `<span class="fw-bold text-dark">Free </span>Service search` },
      { feature: `<span class="fw-bold text-dark">5GB </span>storage` },
      { feature: "Analytics" },
      { feature: "Free mobile app" },
      { feature: "Access to support forums" },
    ],
  },
];

export const individual = [
  {
    image: Logo,
    plantitle: "Individual",
    description: `Access all
        <span class="text-dark fw-medium">premium job post, workshops, and mobile apps.</span>
        Renewed monthly.`,
    monthly: 39,
    yearly: 99,
    buttonText: "Get Started For Free",
    buttonClass: "primary",
    featureHeading: "Everything in Starter, plus:",
    features: [
      { feature: "Offline viewing" },
      { feature: `<span class="fw-bold text-dark">Offline </span>projects` },
      { feature: `<span class="fw-bold text-dark">Unlimited </span>storage` },
      { feature: "Custom domain support" },
      { feature: "Bulk editing" },
      { feature: "12 / 5 support" },
    ],
  },
];

export const team = [
	{
		image: Logo,
		plantitle: 'Team',
		description: `Upto 10 member access everything. Save
        <span class="text-primary fw-medium">₦78 </span>per
        year! Renewed yearly.`,
    monthly: 99,
    yearly: 199,
    buttonText: "Get Started For Free",
    buttonClass: "outline-primary",
    featureHeading: "Everything in Individual, plus:",
    features: [
      { feature: "Workshop" },
      { feature: `<span class="fw-bold text-dark">Dedicated  </span>hardware` },
      {
        feature: `<span class="fw-bold text-dark">99.9% uptime </span>guarantee`,
      },
      { feature: "Advanced analytics" },
      { feature: "3rd party integrations" },
      { feature: "24 / 7 support" },
    ],
  },
];

export const PricingPlansData = [starter, individual, team];

export default PricingPlansData;
