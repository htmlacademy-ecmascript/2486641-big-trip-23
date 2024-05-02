const mockOffers = [
  {
    type: 'taxi',
    offers: [
      {
        id: '07ca56e9-f70b-4a8b-8239-ebe1a8faef51',
        title: 'Upgrade to a business class',
        price: 33,
      },
      {
        id: '3ff6e0b1-12df-470f-a3f9-eb49db1201fc',
        title: 'Choose the radio station',
        price: 148,
      },
      {
        id: '5077482b-05c8-4147-a8bc-b8de9cf09f51',
        title: 'Choose temperature',
        price: 165,
      },
      {
        id: '1b8b5893-234d-4c40-bc57-7fc0f0a0432b',
        title: 'Drive quickly, I am in a hurry',
        price: 71,
      },
      {
        id: '4c4eeb46-e746-4e7a-b69d-f72f4e1759e7',
        title: 'Drive slowly',
        price: 106,
      },
    ],
  },
  {
    type: 'bus',
    offers: [
      {
        id: 'f267d4d8-799b-4e25-8826-ac8455fe3833',
        title: 'Infotainment system',
        price: 174,
      },
      {
        id: 'dc55aea4-0e34-4989-97a6-eb29da358e6a',
        title: 'Order meal',
        price: 122,
      },
      {
        id: '304b839a-b9cd-41b8-9aa2-96f9ab4ca41f',
        title: 'Choose seats',
        price: 91,
      },
    ],
  },
  {
    type: 'train',
    offers: [
      {
        id: '8576f4b9-4071-405f-ba15-337b6500a493',
        title: 'Book a taxi at the arrival point',
        price: 78,
      },
      {
        id: '3221bb97-0f8a-4340-97b2-26f7ebd68388',
        title: 'Order a breakfast',
        price: 85,
      },
      {
        id: 'dc87ba6e-6a15-49d8-98ae-0a1becce893d',
        title: 'Wake up at a certain time',
        price: 38,
      },
    ],
  },
  {
    type: 'flight',
    offers: [
      {
        id: '9601c223-a752-40f4-a5e8-b36d83727f23',
        title: 'Choose meal',
        price: 111,
      },
      {
        id: '48746fde-dad6-4562-a284-ab96e80186da',
        title: 'Choose seats',
        price: 59,
      },
      {
        id: 'ae9d8098-b376-40fb-8a9d-b3c4326fb792',
        title: 'Upgrade to comfort class',
        price: 95,
      },
      {
        id: '3fc54970-f17d-4268-be14-198f77c2a883',
        title: 'Upgrade to business class',
        price: 169,
      },
      {
        id: '2b182504-880c-4915-af79-39b69651490d',
        title: 'Add luggage',
        price: 85,
      },
      {
        id: 'aca5339a-b38b-4d83-9619-c41e984d23a0',
        title: 'Business lounge',
        price: 71,
      },
    ],
  },
  {
    type: 'check-in',
    offers: [
      {
        id: 'c6a1285d-bd27-46a3-8a33-9e4c5102b58b',
        title: 'Choose the time of check-in',
        price: 54,
      },
      {
        id: 'b94c57ef-54a4-41e4-b7da-fa944fd68ff3',
        title: 'Choose the time of check-out',
        price: 182,
      },
      {
        id: '97efaa0f-3ce2-4993-9570-230e30363d34',
        title: 'Add breakfast',
        price: 165,
      },
      {
        id: '611f5ece-7baf-4283-8d64-719f4cee82b7',
        title: 'Laundry',
        price: 98,
      },
      {
        id: '40be16b1-2d98-4d0f-898b-a5d9573b6479',
        title: 'Order a meal from the restaurant',
        price: 88,
      },
    ],
  },
  {
    type: 'sightseeing',
    offers: [],
  },
  {
    type: 'ship',
    offers: [
      {
        id: '82981ccb-c202-4294-b289-eaa1dd2d3e4f',
        title: 'Choose meal',
        price: 103,
      },
      {
        id: '575f58d3-a812-4cb4-ace1-2071a9866d43',
        title: 'Choose seats',
        price: 130,
      },
      {
        id: 'ae85920c-b179-4ddf-80c6-031081d06696',
        title: 'Upgrade to comfort class',
        price: 133,
      },
      {
        id: '48ef59a9-7bad-4a89-a057-6a3fd8a05574',
        title: 'Upgrade to business class',
        price: 98,
      },
      {
        id: 'ca6f9a93-6e4a-4471-bdca-12a5d6360ce5',
        title: 'Add luggage',
        price: 174,
      },
      {
        id: 'c029338d-79b0-4183-bcca-4bd4328ec78b',
        title: 'Business lounge',
        price: 68,
      },
    ],
  },
  {
    type: 'drive',
    offers: [
      {
        id: '24968829-a4b8-4691-8915-a39348ec1e9c',
        title: 'With automatic transmission',
        price: 43,
      },
      {
        id: 'e5d12b20-9e0b-4ed6-a92e-c84ef070e183',
        title: 'With air conditioning',
        price: 157,
      },
    ],
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: '5284ce5c-16f5-40a5-99d4-8c760bad607e',
        title: 'Choose live music',
        price: 190,
      },
      {
        id: '3e70d7a0-c554-49b2-8d13-18a03624a0be',
        title: 'Choose VIP area',
        price: 186,
      },
    ],
  },
];

const getMockOffers = () => mockOffers;

const getMockOffer = (id) => {
  if (id) {
    const offers = [];
    mockOffers.forEach((element) => {
      element.offers.forEach((offer) => offers.push(offer));
    });
    return offers.find((element) => element.id === id);
  }
  return '';
};

export { getMockOffers, getMockOffer };
