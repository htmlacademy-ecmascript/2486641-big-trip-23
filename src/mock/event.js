const mockEvents = [
  {
    'id': '3470cafa-31a4-4b71-8e33-bd3c3df7df38',
    'basePrice': 174,
    'dateFrom': '2024-04-15T15:08:07.164Z',
    'dateTo': '2024-04-17T15:10:07.164Z',
    'destination': 'e5c26d80-c07c-4012-8d46-d510fdb2c79c',
    'isFavorite': true,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'id': '125899ed-d862-4897-87dd-8bdf5ba1d6cd',
    'basePrice': 4437,
    'dateFrom': '2024-04-19T13:56:07.164Z',
    'dateTo': '2024-04-20T01:52:07.164Z',
    'destination': 'ac52f50c-3bce-47b0-94a1-421ef1f7a099',
    'isFavorite': false,
    'offers': [],
    'type': 'bus'
  },
  {
    'id': 'fbe950a3-4b3d-4812-98a6-6e4bbdea32f0',
    'basePrice': 9819,
    'dateFrom': '2024-04-21T16:16:07.164Z',
    'dateTo': '2024-04-21T23:41:07.164Z',
    'destination': 'a1b26641-a191-4b42-b852-79e763a3ec46',
    'isFavorite': true,
    'offers': [
      '48ef59a9-7bad-4a89-a057-6a3fd8a05574',
      'ca6f9a93-6e4a-4471-bdca-12a5d6360ce5',
      'c029338d-79b0-4183-bcca-4bd4328ec78b'
    ],
    'type': 'ship'
  },
  {
    'id': '627621ba-66b9-4ecc-b399-524015f6285b',
    'basePrice': 3324,
    'dateFrom': '2024-04-22T16:22:07.164Z',
    'dateTo': '2024-04-24T10:13:07.164Z',
    'destination': '9ef8acfc-a0d9-4901-ac3b-59c116c44492',
    'isFavorite': true,
    'offers': [
      '1b8b5893-234d-4c40-bc57-7fc0f0a0432b',
      '4c4eeb46-e746-4e7a-b69d-f72f4e1759e7'
    ],
    'type': 'taxi'
  },
  {
    'id': 'd1d58b95-1f7b-4abf-aaf2-8a3e059b6ee4',
    'basePrice': 6710,
    'dateFrom': '2024-04-25T15:51:07.164Z',
    'dateTo': '2024-04-27T05:45:07.164Z',
    'destination': '3d098017-7ce8-420a-a792-c3baafaa3bf4',
    'isFavorite': true,
    'offers': [],
    'type': 'train'
  },
  {
    'id': 'd411637a-9036-4931-8ccb-45ce0996978e',
    'basePrice': 1622,
    'dateFrom': '2024-04-27T20:06:07.164Z',
    'dateTo': '2024-04-29T02:01:07.164Z',
    'destination': 'ac52f50c-3bce-47b0-94a1-421ef1f7a099',
    'isFavorite': false,
    'offers': [
      'ae85920c-b179-4ddf-80c6-031081d06696',
      '48ef59a9-7bad-4a89-a057-6a3fd8a05574',
      'ca6f9a93-6e4a-4471-bdca-12a5d6360ce5',
      'c029338d-79b0-4183-bcca-4bd4328ec78b'
    ],
    'type': 'ship'
  },
  {
    'id': 'efc7cbd5-fea9-4324-89ff-c765b5abd72f',
    'basePrice': 2494,
    'dateFrom': '2024-04-30T11:46:07.164Z',
    'dateTo': '2024-05-01T17:57:07.164Z',
    'destination': 'ac52f50c-3bce-47b0-94a1-421ef1f7a099',
    'isFavorite': false,
    'offers': [
      '24968829-a4b8-4691-8915-a39348ec1e9c',
      'e5d12b20-9e0b-4ed6-a92e-c84ef070e183'
    ],
    'type': 'drive'
  },
  {
    'id': '4eae0fce-f283-4f3a-83a5-35a6ef9ab6b6',
    'basePrice': 2541,
    'dateFrom': '2024-05-02T18:49:07.164Z',
    'dateTo': '2024-05-04T16:09:07.164Z',
    'destination': '16c73b9f-169f-45a2-94f3-d6689937e332',
    'isFavorite': true,
    'offers': [
      '8576f4b9-4071-405f-ba15-337b6500a493',
      '3221bb97-0f8a-4340-97b2-26f7ebd68388',
      'dc87ba6e-6a15-49d8-98ae-0a1becce893d'
    ],
    'type': 'train'
  },
  {
    'id': '868139a6-5d8d-44e5-a9ac-27bea677221a',
    'basePrice': 7180,
    'dateFrom': '2024-05-05T16:56:07.164Z',
    'dateTo': '2024-05-07T13:08:07.164Z',
    'destination': 'e5c26d80-c07c-4012-8d46-d510fdb2c79c',
    'isFavorite': true,
    'offers': [
      '3221bb97-0f8a-4340-97b2-26f7ebd68388',
      'dc87ba6e-6a15-49d8-98ae-0a1becce893d'
    ],
    'type': 'train'
  },
  {
    'id': '53cef26f-d2c7-4129-95c0-57821b53c4f2',
    'basePrice': 1578,
    'dateFrom': '2024-05-09T04:37:07.164Z',
    'dateTo': '2024-05-11T04:06:07.164Z',
    'destination': '9ef8acfc-a0d9-4901-ac3b-59c116c44492',
    'isFavorite': true,
    'offers': [
      '8576f4b9-4071-405f-ba15-337b6500a493',
      '3221bb97-0f8a-4340-97b2-26f7ebd68388',
      'dc87ba6e-6a15-49d8-98ae-0a1becce893d'
    ],
    'type': 'train'
  },
  {
    'id': '0f4209da-636b-4f92-aee1-5fa91cc1137d',
    'basePrice': 4667,
    'dateFrom': '2024-05-12T16:52:07.164Z',
    'dateTo': '2024-05-13T05:57:07.164Z',
    'destination': '3881ec5b-b2b6-4f20-9a7a-82c18e2a5d53',
    'isFavorite': true,
    'offers': [
      '3fc54970-f17d-4268-be14-198f77c2a883',
      '2b182504-880c-4915-af79-39b69651490d',
      'aca5339a-b38b-4d83-9619-c41e984d23a0'
    ],
    'type': 'flight'
  },
  {
    'id': '8bbb7b71-d58c-4a0f-b147-680ac7864453',
    'basePrice': 7143,
    'dateFrom': '2024-05-14T02:35:07.164Z',
    'dateTo': '2024-05-15T22:01:07.164Z',
    'destination': 'a1b26641-a191-4b42-b852-79e763a3ec46',
    'isFavorite': false,
    'offers': [
      'c029338d-79b0-4183-bcca-4bd4328ec78b'
    ],
    'type': 'ship'
  },
  {
    'id': '40bfe63b-9b5a-4bc5-ad57-8926210bcf51',
    'basePrice': 6372,
    'dateFrom': '2024-05-17T10:44:07.164Z',
    'dateTo': '2024-05-18T05:59:07.164Z',
    'destination': 'a1b26641-a191-4b42-b852-79e763a3ec46',
    'isFavorite': false,
    'offers': [],
    'type': 'drive'
  },
  {
    'id': '8ee20c6e-4dd1-43b9-957b-9d4a87bb2ad1',
    'basePrice': 1792,
    'dateFrom': '2024-05-19T19:26:07.164Z',
    'dateTo': '2024-05-20T05:15:07.164Z',
    'destination': '3881ec5b-b2b6-4f20-9a7a-82c18e2a5d53',
    'isFavorite': true,
    'offers': [
      'dc55aea4-0e34-4989-97a6-eb29da358e6a',
      '304b839a-b9cd-41b8-9aa2-96f9ab4ca41f'
    ],
    'type': 'bus'
  },
  {
    'id': '6ffc26bb-fb28-4f67-a0dc-74ae27337a79',
    'basePrice': 124,
    'dateFrom': '2024-05-21T05:42:07.164Z',
    'dateTo': '2024-05-22T14:50:07.164Z',
    'destination': 'ac52f50c-3bce-47b0-94a1-421ef1f7a099',
    'isFavorite': false,
    'offers': [
      '5284ce5c-16f5-40a5-99d4-8c760bad607e',
      '3e70d7a0-c554-49b2-8d13-18a03624a0be'
    ],
    'type': 'restaurant'
  },
  {
    'id': '5c7619dd-cc66-49bc-b43f-d9a5d78dc4bc',
    'basePrice': 8568,
    'dateFrom': '2024-05-23T02:12:07.164Z',
    'dateTo': '2024-05-23T17:11:07.164Z',
    'destination': '4715f1ce-023d-4832-bb76-e6ca381ec287',
    'isFavorite': false,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'id': '9691f0b1-a9fb-4ffc-80c2-aafa11d9d0fc',
    'basePrice': 2890,
    'dateFrom': '2024-05-24T17:32:07.164Z',
    'dateTo': '2024-05-26T00:23:07.164Z',
    'destination': 'a1b26641-a191-4b42-b852-79e763a3ec46',
    'isFavorite': false,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'id': '08d4ce47-b7f7-4161-a423-defdfc471044',
    'basePrice': 1688,
    'dateFrom': '2024-05-26T07:28:07.164Z',
    'dateTo': '2024-05-26T23:15:07.164Z',
    'destination': 'a1b26641-a191-4b42-b852-79e763a3ec46',
    'isFavorite': true,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'id': '02a9033e-eccf-4571-8b76-a9cd335f307a',
    'basePrice': 512,
    'dateFrom': '2024-05-27T22:07:07.164Z',
    'dateTo': '2024-05-28T21:16:07.164Z',
    'destination': '3881ec5b-b2b6-4f20-9a7a-82c18e2a5d53',
    'isFavorite': true,
    'offers': [
      '5077482b-05c8-4147-a8bc-b8de9cf09f51',
      '1b8b5893-234d-4c40-bc57-7fc0f0a0432b',
      '4c4eeb46-e746-4e7a-b69d-f72f4e1759e7'
    ],
    'type': 'taxi'
  },
  {
    'id': 'c8a87a71-ed15-41b3-9770-99517b3d8fcd',
    'basePrice': 1511,
    'dateFrom': '2024-05-29T15:24:07.164Z',
    'dateTo': '2024-05-30T03:42:07.164Z',
    'destination': '9ef8acfc-a0d9-4901-ac3b-59c116c44492',
    'isFavorite': false,
    'offers': [],
    'type': 'drive'
  },
  {
    'id': 'd4cae048-2b34-4bc9-9f8a-56bcf070abf8',
    'basePrice': 9872,
    'dateFrom': '2024-05-30T18:17:07.164Z',
    'dateTo': '2024-05-31T22:15:07.164Z',
    'destination': 'd4f42ec2-e0b7-484a-85c5-0ec4dd7e236e',
    'isFavorite': true,
    'offers': [],
    'type': 'sightseeing'
  },
  {
    'id': '155622b5-ba54-425a-a265-c341f0bf94fd',
    'basePrice': 6794,
    'dateFrom': '2024-06-01T20:39:07.164Z',
    'dateTo': '2024-06-03T18:43:07.164Z',
    'destination': 'd4f42ec2-e0b7-484a-85c5-0ec4dd7e236e',
    'isFavorite': false,
    'offers': [
      '07ca56e9-f70b-4a8b-8239-ebe1a8faef51',
      '3ff6e0b1-12df-470f-a3f9-eb49db1201fc',
      '5077482b-05c8-4147-a8bc-b8de9cf09f51',
      '1b8b5893-234d-4c40-bc57-7fc0f0a0432b',
      '4c4eeb46-e746-4e7a-b69d-f72f4e1759e7'
    ],
    'type': 'taxi'
  },
  {
    'id': '8bca9025-4412-4cc2-9c77-fe4d619befb0',
    'basePrice': 740,
    'dateFrom': '2024-06-04T13:11:07.164Z',
    'dateTo': '2024-06-05T09:12:07.164Z',
    'destination': '9ef8acfc-a0d9-4901-ac3b-59c116c44492',
    'isFavorite': true,
    'offers': [],
    'type': 'drive'
  },
  {
    'id': '1f2c1ef8-7203-4fd8-84b3-bbf07b52f59b',
    'basePrice': 1841,
    'dateFrom': '2024-06-06T08:03:07.164Z',
    'dateTo': '2024-06-07T20:22:07.164Z',
    'destination': '3881ec5b-b2b6-4f20-9a7a-82c18e2a5d53',
    'isFavorite': true,
    'offers': [
      '24968829-a4b8-4691-8915-a39348ec1e9c',
      'e5d12b20-9e0b-4ed6-a92e-c84ef070e183'
    ],
    'type': 'drive'
  },
  {
    'id': '31326554-c27c-4c59-b777-3ec021aff7e9',
    'basePrice': 5528,
    'dateFrom': '2024-06-09T02:01:07.164Z',
    'dateTo': '2024-06-11T01:19:07.164Z',
    'destination': '3881ec5b-b2b6-4f20-9a7a-82c18e2a5d53',
    'isFavorite': true,
    'offers': [
      '40be16b1-2d98-4d0f-898b-a5d9573b6479'
    ],
    'type': 'check-in'
  }
];

const getMockEvents = () => mockEvents;

export { getMockEvents };
