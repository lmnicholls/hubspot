const data = [
  {
    id: 1,
    status: "initiated",
    title: "Human Interest Form",
    content: "Fill out human interest distribution form",
  },
  {
    id: 2,
    status: "initiated",
    title: "Purchase present",
    content: "Get an anniversary gift",
  },
  {
    id: 3,
    status: "initiated",
    title: "Invest in investments",
    content: "Call the bank to talk about investments",
  },
  {
    id: 4,
    status: "initiated",
    title: "Daily reading",
    content: "Finish reading Intro to UI/UX",
  },
];

const dealData = [
  {
    _id: 1,
    name: "Consulting services",
    user: "Danna Alvarado",
    stage: "initiated",
    amount: 20000,
    company: {
      companyName: "Keeg",
      owner: "Miriam Goodwin",
      phone: "(923) 443-2607",
      city: "Lodoga",
      state_region: "Marshall Islands",
      postalCode: 12906,
      dateCreated: "Fri Dec 23 1977 02:44:41 GMT-0500 (Eastern Standard Time)",
      lastActivityDate:
        "Fri Dec 17 1971 08:57:04 GMT-0500 (Eastern Standard Time)",
      industry: "Construction",
      logo: "https://icon2.cleanpng.com/20180328/zxq/kisspng-circle-logo-symbol-font-templates-5abbf957999038.858167711522268503629.jpg",
      deals: [],
    },
    dateCreated: "Fri Dec 23 1977 02:44:41 GMT-0500 (Eastern Standard Time)",
    lastActivityDate:
      "Fri Dec 17 1971 08:57:04 GMT-0500 (Eastern Standard Time)",
    expectedCloseDate:
      "Fri Jan 17 1978 08:57:04 GMT-0500 (Eastern Standard Time)",
  },
  {
    _id: 2,
    name: "Supply Computer Chips",
    user: "Lauren Nichols",
    stage: "qualified",
    amount: 5000,
    company: {
      companyName: "Accidency",
      owner: "Allison Donovan",
      phone: "(895) 445-2293",
      city: "Johnsonburg",
      state_region: "Vermont",
      postalCode: 95647,
      dateCreated: "Mon Aug 18 1975 16:10:30 GMT-0400 (Eastern Daylight Time)",
      lastActivityDate:
        "Tue Apr 27 2021 08:22:18 GMT-0400 (Eastern Daylight Time)",
      industry: "Computer Games",
      logo: "https://icon2.cleanpng.com/20180328/zxq/kisspng-circle-logo-symbol-font-templates-5abbf957999038.858167711522268503629.jpg",
      deals: [],
    },
    dateCreated: "Mon Aug 18 1975 16:10:30 GMT-0400 (Eastern Daylight Time)",
    lastActivityDate:
      "Tue Apr 27 2021 08:22:18 GMT-0400 (Eastern Daylight Time)",
    expectedCloseDate:
      "Tue June 27 2021 08:22:18 GMT-0400 (Eastern Daylight Time)",
  },
  {
    _id: 3,
    name: "Supply Card Decks",
    user: "Jeremy Wheless",
    stage: "contract sent",
    amount: 3500,
    company: {
      companyName: "Bisba",
      owner: "Jean Stokes",
      phone: "(922) 452-2456",
      city: "Frystown",
      state_region: "Utah",
      postalCode: 20310,
      dateCreated: "Sat Sep 30 2017 10:43:01 GMT-0400 (Eastern Daylight Time)",
      lastActivityDate:
        "Tue Jun 02 1992 19:18:22 GMT-0400 (Eastern Daylight Time)",
      industry: "Gaming",
      logo: "https://icon2.cleanpng.com/20180328/zxq/kisspng-circle-logo-symbol-font-templates-5abbf957999038.858167711522268503629.jpg",
      deals: [],
    },
    dateCreated: "Sat Sep 30 2017 10:43:01 GMT-0400 (Eastern Daylight Time)",
    lastActivityDate:
      "Tue Jun 02 1992 19:18:22 GMT-0400 (Eastern Daylight Time)",
    expectedCloseDate:
      "Tue Aug 02 1992 19:18:22 GMT-0400 (Eastern Daylight Time)",
  },
  {
    _id: 4,
    name: "Consulting Services",
    user: "Danna Alvarado",
    stage: "closed won",
    amount: 5000,
    company: {
      companyName: "Slofast",
      owner: "Estella Carey",
      phone: "(881) 505-3762",
      city: "Alafaya",
      state_region: "Georgia",
      postalCode: 32220,
      dateCreated: "Thu Mar 05 2009 15:33:52 GMT-0500 (Eastern Standard Time)",
      lastActivityDate:
        "Mon Apr 25 1988 17:29:48 GMT-0400 (Eastern Daylight Time)",
      industry: "Automotive",
      logo: "https://icon2.cleanpng.com/20180328/zxq/kisspng-circle-logo-symbol-font-templates-5abbf957999038.858167711522268503629.jpg",
      deals: [],
    },
    dateCreated: "Thu Apr 12 2007 17:34:21 GMT-0400 (Eastern Daylight Time)",
    lastActivityDate:
      "Sun Aug 23 2015 15:39:14 GMT-0400 (Eastern Daylight Time)",
    expectedCloseDate:
      "Sun Sep 23 2015 15:39:14 GMT-0400 (Eastern Daylight Time)",
  },
  {
    _id: 5,
    name: "Consulting Services",
    user: "Lauren",
    stage: "closed won",
    amount: 7500,
    company: {
      companyName: "Quordate",
      owner: "Felicia Vasquez",
      phone: "(888) 442-2701",
      city: "Roy",
      state_region: "Connecticut",
      postalCode: 34705,
      dateCreated: "Thu Aug 29 1991 03:03:48 GMT-0400 (Eastern Daylight Time)",
      lastActivityDate:
        "Sun Feb 17 1985 23:22:52 GMT-0500 (Eastern Standard Time)",
      industry: "Computer Games",
      logo: "https://icon2.cleanpng.com/20180328/zxq/kisspng-circle-logo-symbol-font-templates-5abbf957999038.858167711522268503629.jpg",
      deals: [],
    },
    dateCreated: "Thu Aug 29 1991 03:03:48 GMT-0400 (Eastern Daylight Time)",
    lastActivityDate:
      "Sun Feb 17 1985 23:22:52 GMT-0500 (Eastern Standard Time)",
    expectedCloseDate:
      "Sun Mar 23 1985 15:39:14 GMT-0400 (Eastern Daylight Time)",
  },
  {
    _id: 6,
    name: "Supply Tires",
    user: "Jeremy Wheless",
    stage: "initiated",
    amount: 6500,
    company: {
      companyName: "Viocular",
      owner: "Cortez Robinson",
      phone: "(870) 504-3768",
      city: "Grazierville",
      state_region: "Rhode Island",
      postalCode: 47863,
      dateCreated: "Tue Feb 04 1997 17:29:56 GMT-0500 (Eastern Standard Time)",
      lastActivityDate:
        "Sat Oct 03 1998 22:21:07 GMT-0400 (Eastern Daylight Time)",
      industry: "Automotive",
      logo: "https://icon2.cleanpng.com/20180328/zxq/kisspng-circle-logo-symbol-font-templates-5abbf957999038.858167711522268503629.jpg",
      deals: [],
    },
    dateCreated: "Tue Feb 04 1997 17:29:56 GMT-0500 (Eastern Standard Time)",
    lastActivityDate:
      "Sat Oct 03 1998 22:21:07 GMT-0400 (Eastern Daylight Time)",
    expectedCloseDate:
      "Sun Oct 31 1985 15:39:14 GMT-0400 (Eastern Daylight Time)",
  },
  {
    _id: 7,
    name: "Supply Paper",
    user: "Danna Alvarado",
    stage: "closed lost",
    amount: 15000,
    company: {
      companyName: "Minga",
      owner: "Lakisha Buckner",
      phone: "(927) 462-3233",
      city: "Wells",
      state_region: "Idaho",
      postalCode: 37514,
      dateCreated: "Sat Jun 27 2015 06:42:55 GMT-0400 (Eastern Daylight Time)",
      lastActivityDate:
        "Tue Apr 07 1981 15:47:43 GMT-0500 (Eastern Standard Time)",
      industry: "Accounting",
      logo: "https://icon2.cleanpng.com/20180328/zxq/kisspng-circle-logo-symbol-font-templates-5abbf957999038.858167711522268503629.jpg",
      deals: [],
    },
    dateCreated: "Sat Jun 27 2015 06:42:55 GMT-0400 (Eastern Daylight Time)",
    lastActivityDate:
      "Tue Apr 07 1981 15:47:43 GMT-0500 (Eastern Standard Time)",
    expectedCloseDate:
      "Tue Mar 07 1981 15:47:43 GMT-0500 (Eastern Standard Time)",
  },
];

const statuses = [
  {
    status: "initiated",
  },
  {
    status: "qualified",
  },
  {
    status: "contract sent",
  },
  {
    status: "closed won",
  },
  {
    status: "closed lost",
  },
];

export { data, dealData, statuses };
