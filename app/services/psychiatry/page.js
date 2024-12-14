import ServiceTemplate from '../../components/ServiceTemplate';

export default function Psychiatry() {
  const serviceData = {
    title: "Professional Psychiatric Care",
    description: "Expert psychiatric evaluation, diagnosis, and treatment from experienced psychiatrists to help you achieve optimal mental health.",
    image: "https://picsum.photos/seed/psychiatry/800/600",
    benefits: [
      {
        icon: "👨‍⚕️",
        title: "Expert Medical Care",
        description: "Treatment from licensed psychiatrists with extensive clinical experience."
      },
      {
        icon: "💊",
        title: "Medication Management",
        description: "Professional guidance on psychiatric medications and their effects."
      },
      {
        icon: "🔬",
        title: "Comprehensive Assessment",
        description: "Thorough evaluation using latest diagnostic tools and methods."
      },
      {
        icon: "📋",
        title: "Integrated Treatment",
        description: "Combination of medication and therapy for optimal results."
      }
    ],
    process: [
      {
        title: "Initial Assessment",
        description: "Comprehensive psychiatric evaluation to understand your symptoms and medical history."
      },
      {
        title: "Diagnosis & Planning",
        description: "Professional diagnosis and development of a personalized treatment plan."
      },
      {
        title: "Treatment",
        description: "Implementation of treatment plan, including medication if necessary."
      },
      {
        title: "Follow-up Care",
        description: "Regular monitoring and adjustment of treatment as needed."
      }
    ],
    faqs: [
      {
        question: "What conditions do psychiatrists treat?",
        answer: "Our psychiatrists treat a wide range of conditions including depression, anxiety, bipolar disorder, ADHD, schizophrenia, and other mental health disorders."
      },
      {
        question: "Will I need to take medication?",
        answer: "Medication is prescribed only when necessary and after thorough evaluation. Your psychiatrist will discuss all treatment options with you."
      },
      {
        question: "How often will I need to see the psychiatrist?",
        answer: "Visit frequency varies based on individual needs. Initially, visits may be more frequent, then spacing out as symptoms improve."
      },
      {
        question: "What's the difference between a psychiatrist and psychologist?",
        answer: "Psychiatrists are medical doctors who can prescribe medication, while psychologists focus on therapy and counseling without medication management."
      }
    ],
    pricing: [
      {
        name: "Initial Consultation",
        price: "3,000",
        description: "Comprehensive first visit",
        features: [
          "90-minute session",
          "Detailed assessment",
          "Diagnosis report",
          "Treatment plan"
        ]
      },
      {
        name: "Follow-up Sessions",
        price: "2,000",
        description: "Regular follow-up visits",
        features: [
          "30-minute session",
          "Progress review",
          "Medication adjustment",
          "Treatment updates"
        ]
      },
      {
        name: "Care Package",
        price: "10,000",
        description: "Monthly care package",
        features: [
          "Initial consultation",
          "3 follow-up sessions",
          "Priority booking",
          "Emergency support",
          "15% savings"
        ]
      }
    ]
  };

  return <ServiceTemplate {...serviceData} />;
} 