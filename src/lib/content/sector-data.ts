
export const sectorData = {
  primary: {
    name: "Primary Sector",
    definition: "Natural resource extraction and production - Agriculture, mining, forestry, fishing",
    domains: {
      agriculture: {
        name: "Agriculture and Farming",
        description: "Crop cultivation, livestock raising, agricultural products",
        industries: ["Crop Production", "Horticulture", "Livestock and Dairy", "Organic Farming", "Agricultural Services"],
      },
      mining: {
        name: "Mining and Extraction",
        description: "Mineral extraction, oil and gas, quarrying operations",
        industries: ["Coal Mining", "Oil and Gas Extraction", "Metal Mining", "Non-metallic Minerals", "Gemstones and Precious Stones"],
      },
      forestry: {
        name: "Forestry and Logging",
        description: "Timber harvesting, forest products, wood processing",
        industries: ["Timber Harvesting", "Forest Products", "Plantation Forestry", "Non-timber Forest Products"],
      },
      fishing: {
        name: "Fishing and Aquaculture",
        description: "Commercial fishing, fish farming, marine products",
        industries: ["Marine Fishing", "Freshwater Fishing", "Aquaculture and Fish Farming", "Seafood Processing"],
      },
    },
    dashboardComponents: [
      "Production Tracking: Crop yield monitoring, harvest schedules, seasonal planning",
      "Resource Management: Land utilization, water management, equipment tracking",
      "Weather Integration: Climate monitoring, rainfall data, seasonal forecasts",
      "Market Price Tracking: Commodity prices, market trends, price alerts",
      "Compliance Monitoring: Environmental regulations, organic certifications, safety standards",
      "Financial Analytics: Cost per acre, profit margins, ROI calculations",
      "Supply Chain Management: Storage facilities, transportation, distribution channels",
      "Quality Control: Product grading, quality certifications, testing results",
    ],
  },
  secondary: {
    name: "Secondary Sector",
    definition: "Production and processing of goods - Transform raw materials into finished products",
    domains: {
      manufacturing: {
        name: "Manufacturing",
        description: "Production of goods through industrial processes",
        industries: ["Food and Beverage Production", "Textiles and Apparel", "Pharmaceuticals and Medical", "Chemicals and Plastics", "Electronics and Semiconductors", "Automotive and Transport Equipment", "Machinery and Equipment", "Consumer Goods"],
      },
      construction: {
        name: "Construction",
        description: "Building and infrastructure development",
        industries: ["Residential Construction", "Commercial Construction", "Industrial Construction", "Infrastructure Development", "Specialized Construction"],
      },
      energy: {
        name: "Energy and Power",
        description: "Power generation equipment, renewable energy systems",
        industries: ["Renewable Energy Systems", "Power Generation Equipment", "Energy Storage", "Energy Distribution"],
      },
    },
    dashboardComponents: [
      "Production Analytics: Manufacturing output, efficiency metrics, capacity utilization",
      "Quality Management: QC processes, defect tracking, compliance monitoring",
      "Supply Chain Monitoring: Raw material tracking, vendor management, inventory control",
      "Equipment Performance: Machine efficiency, maintenance schedules, downtime analysis",
      "Cost Management: Production costs, material costs, labor efficiency",
      "Order Management: Order tracking, delivery schedules, customer management",
      "Regulatory Compliance: Safety standards, environmental regulations, certifications",
      "Financial Performance: Revenue tracking, profit margins, cost analysis",
    ],
  },
  tertiary: {
    name: "Tertiary Sector",
    definition: "Service provision to businesses and consumers - Intangible products and customer service",
    domains: {
      it: {
        name: "Information Technology",
        description: "Software development, IT consulting, digital services",
        industries: ["Software Development", "IT Consulting", "Cloud Services", "Cybersecurity", "Data Services", "IT Support"],
      },
      finance: {
        name: "Financial Services",
        description: "Banking, insurance, investment services, fintech",
        industries: ["Banking Services", "Insurance Services", "Fintech Services", "Investment Services"],
      },
      healthcare: {
        name: "Healthcare Services",
        description: "Medical services, diagnostic centers, wellness programs",
        industries: ["Medical Services", "Diagnostic Services", "Telemedicine", "Wellness Services"],
      },
      education: {
        name: "Education Services",
        description: "Schools, training institutes, e-learning platforms",
        industries: ["Formal Education", "Professional Training", "E-Learning", "Educational Technology"],
      },
      logistics: {
        name: "Transportation and Logistics",
        description: "Shipping, courier services, supply chain management",
        industries: ["Freight Transportation", "Courier and Delivery", "Warehousing", "Logistics Solutions"],
      },
    },
    dashboardComponents: [
      "Service Analytics: Service delivery metrics, customer satisfaction scores, response times",
      "Customer Management: Client profiles, service history, support tickets",
      "Revenue Tracking: Service revenue, billing cycles, payment status",
      "Resource Allocation: Staff utilization, service capacity, workload distribution",
      "Performance Metrics: Service quality indicators, efficiency measures, productivity tracking",
      "Client Communication: Communication logs, feedback management, relationship tracking",
      "Compliance Monitoring: Service standards, regulatory requirements, quality certifications",
      "Market Analysis: Service demand trends, competitive analysis, pricing strategies",
    ],
  },
  quaternary: {
    name: "Quaternary Sector",
    definition: "Information, research, and intellectual services - Data processing, research, education, technology",
    domains: {
      research: {
        name: "Research and Development",
        description: "Scientific research, product development, innovation labs",
        industries: ["Biotechnology Research", "Environmental Technology", "Scientific Research", "Product Development"],
      },
      analytics: {
        name: "Data Analytics and AI",
        description: "Data science, machine learning, artificial intelligence services",
        industries: ["Data Analytics", "Artificial Intelligence", "Big Data Services", "AI Consulting"],
      },
      edtech: {
        name: "Educational Technology",
        description: "Digital learning platforms, educational software, training systems",
        industries: ["Learning Management Systems", "Educational Software", "Corporate Training Technology", "Virtual Reality Education"],
      },
    },
    dashboardComponents: [
        "Research Analytics: Project progress, research milestones, publication tracking",
        "Knowledge Management: Research databases, intellectual property tracking, collaboration tools",
        "Innovation Metrics: Patent applications, research outcomes, technology transfer",
        "Funding Tracking: Grant management, research funding, budget allocation",
        "Collaboration Networks: Research partnerships, academic collaborations, industry connections",
        "Performance Indicators: Research impact, citation analysis, technology adoption",
        "Compliance Management: Research ethics, regulatory compliance, safety protocols",
        "Technology Transfer: Commercialization tracking, licensing agreements, startup incubation",
    ],
  },
  quinary: {
    name: "Quinary Sector",
    definition: "High-level government, administration, and policy - Top-tier decision-making and policy formation",
    domains: {
      government: {
        name: "Government Administration",
        description: "Public sector management, policy implementation",
        industries: ["Public Administration", "Regulatory Bodies", "Public Services", "Defense and Security"],
      },
      management: {
        name: "Executive Management",
        description: "Corporate leadership, strategic decision making",
        industries: ["Corporate Strategy", "Executive Leadership", "Management Consulting", "Policy Think Tanks"],
      },
    },
    dashboardComponents: [
        "Strategic Planning: Goal setting, strategic initiatives, performance tracking",
        "Policy Management: Policy development, implementation tracking, impact assessment",
        "Stakeholder Management: Stakeholder engagement, relationship tracking, communication management",
        "Performance Governance: KPI monitoring, governance metrics, compliance tracking",
        "Decision Support: Executive reports, decision analytics, scenario planning",
        "Risk Management: Strategic risk assessment, mitigation strategies, risk monitoring",
        "Resource Allocation: Budget management, resource optimization, investment tracking",
        "Impact Analysis: Policy impact, strategic outcomes, performance evaluation",
    ],
  },
};

export type SectorKey = keyof typeof sectorData;
export type DomainKey<S extends SectorKey> = keyof (typeof sectorData)[S]["domains"];
