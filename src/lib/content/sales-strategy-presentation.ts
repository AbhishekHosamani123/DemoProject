export interface Slide {
  title: string;
  content: string[];
}

export function parsePresentationText(text: string): Slide[] {
  const slides: Slide[] = [];
  const slideTexts = text.trim().split(/Slide \d+:/).slice(1);

  slideTexts.forEach((slideText) => {
    const lines = slideText.trim().split('\n');
    const titleLine = lines.shift() || '';
    const title = titleLine.replace(/Title: /, '').trim();
    const content = lines.map(line => line.trim()).filter(line => line);
    slides.push({ title, content });
  });

  return slides;
}

export const generatedText = `Slide 1: Title: Q3 2024 Sales Strategy
- Subtitle: Accelerating Growth & Market Leadership
- Date: [Date]
- Presenter: [Your Name/Team Name]

Slide 2: Title: Agenda
- Review of Q2 Performance
- Q3 2024 Strategic Goals
- Target Segments & Expansion
- Product Focus & Messaging
- Go-to-Market Strategy & Key Initiatives
- KPIs & Success Measurement
- Q&A

Slide 3: Title: Q2 2024 Performance Review
- Revenue: ₹2.5Cr vs. ₹2.2Cr Target (14% Beat)
- Key Wins: Landed 5 strategic accounts in the finance sector.
- Growth Areas: 30% increase in pipeline from inbound marketing.
- Lessons Learned: Long sales cycles in EMEA require more localized assets.

Slide 4: Title: Q3 2024 Strategic Goals
- Primary Objective: Achieve ₹3.0Cr in new ARR.
- Secondary Objective: Increase enterprise pipeline by 25%.
- Tertiary Objective: Reduce sales cycle from 90 to 75 days.

Slide 5: Title: Target Segments & Expansion
- Core Focus: Deepen penetration in North American finance & healthcare.
- Expansion Market: Launch targeted outbound campaigns for retail in APAC.
- Ideal Customer Profile: Companies with 500-5000 employees and complex data needs.

Slide 6: Title: Product Focus & Messaging
- Lead Product: 'InsightEngine' Advanced Analytics Suite.
- Core Value Proposition: "Turn your data into predictable revenue."
- Key Differentiators: Real-time processing, codeless integration, and predictive AI.

Slide 7: Title: Go-to-Market Strategy & Initiatives
- Inbound: Launch 'Future of Data' webinar series & 3 new case studies.
- Outbound: Execute ABM campaigns for 50 target enterprise accounts.
- Channel: Onboard 2 new strategic partners in the APAC region.

Slide 8: Title: Sales Team & Resources
- Team Structure: 2 Enterprise AEs, 4 Mid-Market AEs, 4 SDRs.
- Key Hires: Hiring 1 Enterprise AE for EMEA.
- Resources: New competitor battlecards and ROI calculator.

Slide 9: Title: KPIs & Success Measurement
- Pipeline: ₹12Cr in qualified pipeline generated.
- Conversion: Maintain a 25% lead-to-close conversion rate.
- Deal Size: Increase average deal size by 15% to ₹75L.
- Activity: 50 outbound calls and 10 demos booked per SDR per week.

Slide 10: Title: Q&A and Next Steps
- Open floor for questions.
- Next Steps: Finalize account lists by EOW.
`;
