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
    // LinkedIn is shown as a "coming soon" placeholder while this is empty.
    // Paste the profile URL here to turn the placeholders into real links.
    linkedin: "",
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
   * Team profiles. `image` is a path under public/images/team/. If an image
   * is null or fails to load, the initials placeholder is shown instead.
   * Portraits are displayed at a 4:5 ratio with a centred crop.
   */
  team: [
    {
      name: "Arisha Saleem",
      role: "Founder & Business Development Lead",
      initials: "AS",
      image: "public/images/team/arisha-saleem.jpg",
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
      image: "public/images/team/natasha.jpg",
      note: "A central part of Avenza Business Growth. As Co-Founder, Natasha brings hands-on experience from the many client projects she has delivered.",
      focus: [],
    },
    {
      name: "Hadia",
      role: "Chief Operating Officer (COO)",
      initials: "H",
      image: "public/images/team/hadia.jpg",
      focus: [
        "Day-to-day operations",
        "Workflows & delivery processes",
        "Project & team coordination",
      ],
    },
    {
      name: "Muhammad",
      role: "Chief Financial Officer (CFO)",
      initials: "M",
      image: "public/images/team/muhammad.jpg",
      focus: [
        "Finance management",
        "Budgeting & financial planning",
        "Financial oversight",
      ],
    },
  ],

  /*
   * Verbatim client reviews of each team member's individual freelance work.
   * NOT reviews of Avenza Business Growth as a company.
   * - Arisha: from her Fiverr order-history export ("Arisha fiverr.docx").
   * - Natasha, Hadia, Muhammad: as supplied by the team (October 2026).
   * `name` is the reviewer's username; leave it "" when it is not known.
   * `rating` is out of 5; use null when it is not known.
   */
  testimonials: [
    {
      for: "Arisha Saleem",
      name: "next_level_nik",
      rating: 5,
      quote:
        "So far, I've had a great experience! We communicate well and effectively, and I appreciate her cooperation, as a lot of the work that I have assigned so far seems a bit random. She did great with asking clarifying questions as needed, and did not need micromanaging with the amount of details I gave her upfront for each task. I really am looking forward to continuing our work together! If you're looking for an assistant that you don't need to micromanage, would highly encourage you to work with Arisha!",
    },
    {
      for: "Arisha Saleem",
      name: "mikewilson1406",
      rating: 5,
      quote:
        "Another excellent experience with Arisha. This was the first time carryng out a research project for us and it exceeds our expectations. Delivered on time and covering everything we asked for in the right level of detail. Great work!",
    },
    {
      for: "Arisha Saleem",
      name: "sbedecki",
      rating: 5,
      quote:
        "Arisha is an absolute gem! She took over my inbox management, calendar scheduling, and client follow-ups with incredible efficiency and care. Communication was smooth, deadlines were always met, and her proactive attitude made a huge difference. Highly recommend her if you need someone reliable and detail-oriented!",
    },
    {
      for: "Natasha",
      name: "",
      rating: null,
      quote:
        "Natasha did an excellent job! The work was accurate, well-organized, and delivered with great attention to detail. Communication was smooth throughout the process. Highly recommended!",
    },
    {
      for: "Natasha",
      name: "",
      rating: null,
      quote:
        "Natasha was wonderful to work with! She understood the requirements quickly, communicated clearly, and handled everything professionally. I truly appreciate her dedication and efficiency.",
    },
    {
      for: "Natasha",
      name: "",
      rating: null,
      quote:
        "Great experience working with Natasha. She conducted thorough research and presented the information clearly and professionally. Very detail-oriented and reliable!",
    },
    {
      for: "Hadia",
      name: "Rrtp777",
      rating: 5,
      quote:
        "Hadia did an excellent job. She completed the task exactly as was requested. Anytime she had any questions, she asked me to ensure she was doing the job correctly. I look forward to working with her again. Highly recommended seller!",
    },
    {
      for: "Hadia",
      name: "abdellahbardich",
      rating: 5,
      quote:
        "Hadia went above and beyond what was requested. She is a quick learner and a talented problem-solver, and I am so happy to have chosen her as my VA",
    },
    {
      for: "Muhammad",
      name: "remc_uk",
      rating: 5,
      quote:
        "Great experience working with Muhammad for the first time carrying out some market research in my business sector. Great communication, excellent standard of work and extremely polite. Will definitely be working together again soon",
    },
    {
      for: "Muhammad",
      name: "lainelindsay",
      rating: 5,
      quote:
        "Mohammad did a great job. I plan to hire him for future work.",
    },
  ],
};
