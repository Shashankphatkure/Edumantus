import ServiceTemplate from '../../components/ServiceTemplate';

export default function Therapy() {
  const serviceData = {
    title: "Professional Therapy Services",
    description: "Evidence-based therapeutic approaches to help you overcome challenges, heal from past experiences, and build resilience.",
    image: "https://picsum.photos/seed/therapy/800/600",
    benefits: [
      {
        icon: "🧠",
        title: "Evidence-Based Methods",
        description: "Proven therapeutic techniques tailored to your specific needs."
      },
      {
        icon: "🌱",
        title: "Personal Growth",
        description: "Develop self-awareness and emotional intelligence."
      },
      {
        icon: "💪",
        title: "Coping Skills",
        description: "Learn practical strategies to manage life's challenges."
      },
      {
        icon: "🤗",
        title: "Emotional Support",
        description: "Safe space to process emotions and experiences."
      }
    ],
    process: [
      {
        title: "Initial Meeting",
        description: "Get to know your therapist and discuss your goals for therapy."
      },
      {
        title: "Treatment Planning",
        description: "Develop a personalized therapy plan based on your needs and goals."
      },
      {
        title: "Regular Sessions",
        description: "Weekly sessions to work through challenges and build skills."
      },
      {
        title: "Growth & Integration",
        description: "Apply insights and strategies to your daily life."
      }
    ],
    faqs: [
      {
        question: "What types of therapy do you offer?",
        answer: "We offer various therapeutic approaches including Cognitive Behavioral Therapy (CBT), Psychodynamic Therapy, EMDR, Mindfulness-Based Therapy, and more."
      },
      {
        question: "How long does therapy typically last?",
        answer: "The duration varies based on individual needs and goals. Some clients attend for a few months, while others benefit from longer-term support."
      },
      {
        question: "What can I expect in my first session?",
        answer: "Your first session focuses on understanding your concerns, history, and goals. Your therapist will explain their approach and answer any questions."
      },
      {
        question: "How do I know if therapy is working?",
        answer: "Progress in therapy often includes improved coping skills, better relationships, reduced symptoms, and greater self-awareness. Your therapist will regularly review progress with you."
      }
    ],
    pricing: [
      {
        name: "Individual Session",
        price: "2,000",
        description: "Single therapy session",
        features: [
          "50-minute session",
          "Personalized approach",
          "Session notes",
          "Resource materials"
        ]
      },
      {
        name: "Monthly Package",
        price: "7,000",
        description: "4 sessions per month",
        features: [
          "Weekly sessions",
          "Progress tracking",
          "Between-session support",
          "Homework materials",
          "12% savings"
        ]
      },
      {
        name: "Intensive Package",
        price: "18,000",
        description: "12 sessions over 3 months",
        features: [
          "Weekly sessions",
          "In-depth treatment",
          "Priority scheduling",
          "Extended sessions",
          "20% savings"
        ]
      }
    ]
  };

  return <ServiceTemplate {...serviceData} />;
} 