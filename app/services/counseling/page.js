import ServiceTemplate from '../../components/ServiceTemplate';

export default function Counseling() {
  const serviceData = {
    title: "Professional Counseling Services",
    description: "Expert counseling to help you navigate life's challenges, improve relationships, and enhance your mental well-being.",
    image: "https://picsum.photos/seed/counseling/800/600",
    benefits: [
      {
        icon: "🤝",
        title: "Expert Guidance",
        description: "Work with experienced counselors who provide personalized support and strategies."
      },
      {
        icon: "🎯",
        title: "Goal-Oriented Approach",
        description: "Develop clear objectives and actionable plans to achieve your personal goals."
      },
      {
        icon: "🔒",
        title: "Complete Privacy",
        description: "Confidential sessions in a safe, judgment-free environment."
      },
      {
        icon: "⚡",
        title: "Flexible Sessions",
        description: "Choose between online and in-person sessions at your convenience."
      }
    ],
    process: [
      {
        title: "Initial Consultation",
        description: "A free 15-minute consultation to understand your needs and match you with the right counselor."
      },
      {
        title: "Assessment Session",
        description: "Deep dive into your concerns, history, and goals to create a personalized treatment plan."
      },
      {
        title: "Regular Sessions",
        description: "Weekly or bi-weekly sessions to work through challenges and develop coping strategies."
      },
      {
        title: "Progress Review",
        description: "Regular evaluation of progress and adjustment of treatment plans as needed."
      }
    ],
    faqs: [
      {
        question: "How long does each counseling session last?",
        answer: "Standard counseling sessions are 50 minutes long. However, initial sessions may be longer to allow for comprehensive assessment."
      },
      {
        question: "How many sessions will I need?",
        answer: "The number of sessions varies based on individual needs. Some clients benefit from short-term counseling (6-8 sessions), while others prefer longer-term support."
      },
      {
        question: "Is counseling covered by insurance?",
        answer: "Many insurance providers cover counseling services. We can provide documentation for insurance reimbursement."
      },
      {
        question: "What if I need to cancel a session?",
        answer: "We require 24 hours notice for cancellations. Late cancellations may incur a fee."
      }
    ],
    pricing: [
      {
        name: "Single Session",
        price: "1,500",
        description: "One-time counseling session",
        features: [
          "50-minute session",
          "Session summary",
          "Action plan",
          "Resource materials"
        ]
      },
      {
        name: "Monthly Package",
        price: "5,000",
        description: "4 sessions per month",
        features: [
          "Weekly sessions",
          "Progress tracking",
          "Email support",
          "Personalized resources",
          "10% discount"
        ]
      },
      {
        name: "Quarterly Package",
        price: "13,500",
        description: "12 sessions over 3 months",
        features: [
          "Weekly sessions",
          "Comprehensive assessment",
          "Priority scheduling",
          "Unlimited email support",
          "15% discount"
        ]
      }
    ]
  };

  return <ServiceTemplate {...serviceData} />;
} 