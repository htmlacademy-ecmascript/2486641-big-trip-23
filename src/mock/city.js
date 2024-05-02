import { getRandomArrayElement } from '../utils.js';

const mockCities = [
  {
    id: 'e5c26d80-c07c-4012-8d46-d510fdb2c79c',
    description: 'Tokio - a true asian pearl',
    name: 'Tokio',
    pictures: [
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/7.jpg',
        description:
          'Tokio famous for its crowded street markets with the best street food in Asia',
      },
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/7.jpg',
        description: 'Tokio in a middle of Europe',
      },
    ],
  },
  {
    id: '3d098017-7ce8-420a-a792-c3baafaa3bf4',
    description: 'Frankfurt - is a beautiful city',
    name: 'Frankfurt',
    pictures: [
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/1.jpg',
        description:
          'Frankfurt full of of cozy canteens where you can try the best coffee in the Middle East',
      },
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/18.jpg',
        description:
          'Frankfurt famous for its crowded street markets with the best street food in Asia',
      },
    ],
  },
  {
    id: '4715f1ce-023d-4832-bb76-e6ca381ec287',
    description: 'Kioto - is a beautiful city',
    name: 'Kioto',
    pictures: [
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/14.jpg',
        description:
          'Kioto famous for its crowded street markets with the best street food in Asia',
      },
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/14.jpg',
        description:
          'Kioto full of of cozy canteens where you can try the best coffee in the Middle East',
      },
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/3.jpg',
        description: 'Kioto is a beautiful city',
      },
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/3.jpg',
        description:
          'Kioto full of of cozy canteens where you can try the best coffee in the Middle East',
      },
    ],
  },
  {
    id: '9ef8acfc-a0d9-4901-ac3b-59c116c44492',
    description: 'Geneva - with a beautiful old town',
    name: 'Geneva',
    pictures: [
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/3.jpg',
        description: 'Geneva for those who value comfort and coziness',
      },
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/7.jpg',
        description:
          'Geneva with an embankment of a mighty river as a centre of attraction',
      },
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/1.jpg',
        description: 'Geneva for those who value comfort and coziness',
      },
    ],
  },
  {
    id: '49b94996-d9c4-444c-90e1-da11c7c3c7fc',
    description: 'Amsterdam - a perfect place to stay with a family',
    name: 'Amsterdam',
    pictures: [
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/14.jpg',
        description: 'Amsterdam a perfect place to stay with a family',
      },
    ],
  },
  {
    id: 'a1b26641-a191-4b42-b852-79e763a3ec46',
    description: 'Naples - middle-eastern paradise',
    name: 'Naples',
    pictures: [
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/14.jpg',
        description:
          'Naples full of of cozy canteens where you can try the best coffee in the Middle East',
      },
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/10.jpg',
        description:
          'Naples full of of cozy canteens where you can try the best coffee in the Middle East',
      },
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/6.jpg',
        description:
          'Naples famous for its crowded street markets with the best street food in Asia',
      },
    ],
  },
  {
    id: 'd4f42ec2-e0b7-484a-85c5-0ec4dd7e236e',
    description: 'Rotterdam - middle-eastern paradise',
    name: 'Rotterdam',
    pictures: [
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/13.jpg',
        description: 'Rotterdam with a beautiful old town',
      },
    ],
  },
  {
    id: '16c73b9f-169f-45a2-94f3-d6689937e332',
    description:
      'Oslo - full of of cozy canteens where you can try the best coffee in the Middle East',
    name: 'Oslo',
    pictures: [
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/4.jpg',
        description: 'Oslo for those who value comfort and coziness',
      },
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/10.jpg',
        description:
          'Oslo full of of cozy canteens where you can try the best coffee in the Middle East',
      },
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/14.jpg',
        description: 'Oslo a perfect place to stay with a family',
      },
    ],
  },
  {
    id: '3881ec5b-b2b6-4f20-9a7a-82c18e2a5d53',
    description: 'Chamonix - a true asian pearl',
    name: 'Chamonix',
    pictures: [
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/6.jpg',
        description: 'Chamonix with a beautiful old town',
      },
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/4.jpg',
        description: 'Chamonix with a beautiful old town',
      },
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/12.jpg',
        description: 'Chamonix is a beautiful city',
      },
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/11.jpg',
        description:
          'Chamonix full of of cozy canteens where you can try the best coffee in the Middle East',
      },
    ],
  },
  {
    id: 'ac52f50c-3bce-47b0-94a1-421ef1f7a099',
    description: 'Monaco - is a beautiful city',
    name: 'Monaco',
    pictures: [
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/5.jpg',
        description: 'Monaco a true asian pearl',
      },
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/19.jpg',
        description: 'Monaco with a beautiful old town',
      },
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/5.jpg',
        description:
          'Monaco with an embankment of a mighty river as a centre of attraction',
      },
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/19.jpg',
        description: 'Monaco a perfect place to stay with a family',
      },
      {
        src: 'https://23.objects.htmlacademy.pro/static/destinations/16.jpg',
        description: 'Monaco in a middle of Europe',
      },
    ],
  },
];

const getRandomCity = () => getRandomArrayElement(mockCities);

const getMockCities = (id) => {
  if (id) {
    return mockCities.find((element) => element.id === id);
  }
  return mockCities;
};

export { getMockCities, getRandomCity };
