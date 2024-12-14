import ServiceTemplate from '../../components/ServiceTemplate';

export default function OnlineConsultation() {
  const serviceData = {
    title: "Online Mental Health Consultation",
    description: "Professional mental health care from the comfort of your home. Secure, convenient, and effective online consultations with expert therapists.",
    image: "https://picsum.photos/seed/online/800/600",
    benefits: [
      {
        icon: "🏠",
        title: "Convenience",
        description: "Access professional care from anywhere, anytime."
      },
      {
        icon: "💻",
        title: "Secure Platform",
        description: "End-to-end encrypted video sessions for complete privacy."
      },
      {
        icon: "⚡",
        title: "Quick Access",
        description: "Same-day appointments available for urgent needs."
      },
      {
        icon: "💰",
        title: "Cost-Effective",
        description: "Save time and money on travel and commute."
      }
    ],
    process: [
      {
        title: "Book Appointment",
        description: "Choose your preferred therapist and convenient time slot."
      },
      {
        title: "Verify Setup",
        description: "Test your device and internet connection before the session."
      },
      {
        title: "Join Session",
        description: "Click the secure link to join your video consultation."
      },
      {
        title: "Follow-up Care",
        description: "Receive session notes and follow-up instructions electronically."
      }
    ],
    faqs: [
      {
        question: "What technical requirements do I need?",
        answer: "You need a device with a camera and microphone (smartphone, tablet, or computer) and a stable internet connection. We recommend a private, quiet space for your session."
      },
      {
        question: "Is online therapy as effective as in-person?",
        answer: "Research shows that online therapy can be just as effective as in-person therapy for many conditions. We ensure the same quality of care in our online sessions."
      },
      {
        question: "What if I have technical issues?",
        answer: "Our technical support team is available before and during your session to help resolve any issues. We can also switch to phone consultation if needed."
      },
      {
        question: "How secure are the sessions?",
        answer: "We use medical-grade encryption and comply with all privacy regulations. Your sessions are completely private and never recorded."
      }
    ],
    pricing: [
      {
        name: "Basic Session",
        price: "1,200",
        description: "Single online consultation",
        features: [
          "45-minute session",
          "Video/audio options",
          "Session summary",
          "Chat support"
        ]
      },
      {
        name: "Care Package",
        price: "4,000",
        description: "4 sessions package",
        features: [
          "45-minute sessions",
          "Flexible scheduling",
          "Priority support",
          "Resource library access",
          "15% savings"
        ]
      },
      {
        name: "Premium Package",
        price: "10,000",
        description: "12 sessions package",
        features: [
          "45-minute sessions",
          "24/7 chat support",
          "Dedicated therapist",
          "Progress tracking",
          "25% savings"
        ]
      }
    ]
  };

  return <ServiceTemplate {...serviceData} />;
} 