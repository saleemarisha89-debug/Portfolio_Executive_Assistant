/*
 * Avenza Business Growth — editable site content.
 *
 * Everything that is likely to change before or after launch lives here:
 * links, pricing, team profiles, testimonials and the review-form endpoint.
 * Edit the values below; the page renders them automatically (see main.js).
 */
window.AVENZA = {
  brand: {
    name: "Avenza Business Growth",
    tagline: "Structure. Strategy. Sustainable Growth.",
    email: "saleemarisha89@gmail.com",
  },

  links: {
    booking: "https://cal.com/arisha-saleem-efihir/book-free-call-with-arisha",
    portfolio: "https://canva.link/ubkblrzkw6538wf",
    fiverr: "https://www.fiverr.com/arishasaleem567?public_mode=true",
    linkedin: "https://www.linkedin.com/in/arisha-saleem-b06336305/",
  },

  /*
   * Business Growth Review form.
   * No submission service is configured yet. Paste a form endpoint that
   * accepts JSON POSTs and answers 2xx on success (for example a Formspree
   * form URL such as "https://formspree.io/f/xxxxxxx"). While this is empty
   * the form validates normally but never pretends to submit: it offers
   * an email draft and the booking link instead.
   */
  reviewForm: {
    endpoint: "",
  },

  /*
   * Proposed starting prices in USD. NOT YET APPROVED for public launch —
   * confirm with Arisha before going live.
   */
  pricing: [
    {
      id: "sprint",
      name: "Project Sprint",
      price: 250,
      unit: "per project",
      kicker: "Focused project",
      summary:
        "For a defined research, CRM, workflow, documentation, or operational project.",
      includesLabel: "Includes",
      features: [
        "Agreed project scope",
        "Defined deliverables",
        "Expected timeline",
        "Organized documentation",
        "Project handover",
      ],
      cta: "Discuss Your Project",
      featured: false,
    },
    {
      id: "growth",
      name: "Growth Support",
      price: 600,
      unit: "per month",
      kicker: "Recurring support",
      summary: "For recurring support across selected business functions.",
      includesLabel: "Support may include",
      features: [
        "Business research",
        "Lead generation support",
        "CRM maintenance",
        "Workflow coordination",
        "Marketing operations",
        "Client and project coordination",
        "Recurring business support",
      ],
      cta: "Explore Growth Support",
      featured: true,
    },
    {
      id: "partner",
      name: "Embedded Growth Partner",
      price: 1200,
      unit: "per month",
      kicker: "Multi-function partnership",
      summary:
        "For more involved coordination across multiple business functions.",
      includesLabel: "Support may include",
      features: [
        "Business development coordination",
        "Research and opportunity tracking",
        "Operational improvements",
        "CRM and client process oversight",
        "Project coordination",
        "Marketing execution support",
        "Planning and follow-through",
      ],
      cta: "Discuss a Partnership",
      featured: false,
    },
  ],

  /*
   * Team profiles. Set `image` to a path such as
   * "public/images/team/natasha.jpg" once a real portrait exists; while it is
   * null (or the file fails to load) the initials placeholder is shown.
   * Portraits are displayed at a 4:5 ratio with a centred crop.
   */
  team: [
    {
      name: "Arisha Saleem",
      role: "Founder & Business Development Lead",
      initials: "AS",
      image: null,
      focus: [
        "Business direction",
        "Business development",
        "Client relationships",
        "Research & growth support",
      ],
    },
    {
      name: "Natasha",
      role: "Co-Founder",
      initials: "N",
      image: null,
      focus: [],
      note: "Profile details coming soon.",
    },
    {
      name: "Hadia",
      role: "Chief Operating Officer (COO)",
      initials: "H",
      image: null,
      focus: [
        "Day-to-day operations",
        "Workflows & delivery processes",
        "Project & team coordination",
      ],
    },
    {
      name: "Saleem",
      role: "Chief Financial Officer (CFO)",
      initials: "S",
      image: null,
      focus: [
        "Finance management",
        "Budgeting & financial planning",
        "Financial oversight",
      ],
    },
  ],

  /*
   * Verbatim client reviews of Arisha Saleem's individual freelance work,
   * taken from her Fiverr order-history export ("Arisha fiverr.docx").
   * Client usernames are intentionally not published. These are NOT reviews
   * of Avenza Business Growth as a company.
   */
  testimonials: [
    {
      quote:
        "So far, I've had a great experience! We communicate well and effectively, and I appreciate her cooperation, as a lot of the work that I have assigned so far seems a bit random. She did great with asking clarifying questions as needed, and did not need micromanaging with the amount of details I gave her upfront for each task. I really am looking forward to continuing our work together! If you're looking for an assistant that you don't need to micromanage, would highly encourage you to work with Arisha!",
      rating: 5,
      date: "June 2026",
    },
    {
      quote:
        "Another excellent experience with Arisha. This was the first time carryng out a research project for us and it exceeds our expectations. Delivered on time and covering everything we asked for in the right level of detail. Great work!",
      rating: 5,
      date: "April 2026",
    },
    {
      quote:
        "Arisha has been consistent, organized, and easy to work with. She followed through on every task and made adjustments quickly based on feedback. I appreciated the clean design style, reliable communication, and the structure she brought to the project. Looking forward to continuing the workflow—we’re building something solid here.",
      rating: 5,
      date: "June 2025",
    },
    {
      quote:
        "Arisha is an absolute gem! She took over my inbox management, calendar scheduling, and client follow-ups with incredible efficiency and care. Communication was smooth, deadlines were always met, and her proactive attitude made a huge difference. Highly recommend her if you need someone reliable and detail-oriented!",
      rating: 5,
      date: "April 2025",
    },
    {
      quote:
        "incredible work as always. Consistent communication, always reviewing the work and trying to find better ways to improve. Will keep working with her as long as possible.",
      rating: 5,
      date: "December 2025",
    },
    {
      quote:
        "Arisha was fantastic to work with – professional, proactive, and detail-oriented. She understood my needs quickly and delivered everything on time with great communication throughout. Highly recommended!",
      rating: 5,
      date: "November 2025",
    },
    {
      quote:
        "Working with Arisha was a wonderful experience, I’d tried a few other VA’s that just didn’t get it. Arisha did and delivered exactly what I needed. Will use again 100%.",
      rating: 5,
      date: "August 2025",
    },
    {
      quote:
        "A really plaisant and efficient communication, delivery ontime, good quality and understanding of the test assignment. As a result, I took a monthly premium package as next step.",
      rating: 4.7,
      date: "May 2026",
    },
  ],
};
