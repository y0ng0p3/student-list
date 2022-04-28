import { filterByNameAndTag } from './filter.utils';

const students = [
  {
    city: "Fush\u00eb - Muhurr",
    company: "Yadel",
    email: "iorton0 @imdb.com",
    firstName: "Ingaberg",
    grades: ["78",
      "100",
      "92",
      "86",
      "89",
      "88",
      "91",
      "87"],
    id: "1",
    lastName: "Orton",
    pic: "https://storage.googleapis.com/hatchways-app.appspot.com/assessments/data/frontend/images/voluptasdictablanditiis.jpg",
    skill: "Oracle",
    tags: ['tag2']
  },
  {
    city: "\u0141ob\u017cenica",
    company: "Quatz",
    email: "obrennekek@yellowbook.com",
    firstName: "Olly",
    grades: ["81",
      "74",
      "77",
      "82",
      "74",
      "88",
      "86",
      "87"],
    id: "21",
    lastName: "Brenneke",
    pic: "https://storage.googleapis.com/hatchways-app.appspot.com/assessments/data/frontend/images/velitnonquibusdam.jpg",
    skill: "ATM Networks",
    tags: ['tag3222']
  },
  {
    city: "Divo",
    company: "Gigazoom",
    email: "nbadwickl@nifty.com",
    firstName: "Norby",
    grades: ["73",
      "99",
      "91",
      "92",
      "85",
      "96",
      "95",
      "73"],
    id: "22",
    lastName: "Badwick",
    pic: "https://storage.googleapis.com/hatchways-app.appspot.com/assessments/data/frontend/images/delenitiestdolorum.jpg",
    skill: "Media Relations",
    tags: []
  },
  {
    city: "Sortavala",
    company: "Eamia",
    email: "mmichiem@nifty.com",
    firstName: "Melody",
    grades: ["100",
      "83",
      "76",
      "71",
      "93",
      "95",
      "73",
      "88"],
    id: "23",
    lastName: "Michie",
    pic: "https://storage.googleapis.com/hatchways-app.appspot.com/assessments/data/frontend/images/sitlaborecorrupti.jpg",
    skill: "PC Games",
    tags: []
  },
  {
    city: "Taupo",
    company: "Midel",
    email: "jwillougheyn@psu.edu",
    firstName: "Laurens",
    grades: ["71",
      "80",
      "83",
      "99",
      "91",
      "95",
      "81",
      "75"],
    id: "24",
    lastName: "Willoughey",
    pic: "https://storage.googleapis.com/hatchways-app.appspot.com/assessments/data/frontend/images/dolordoloremassumenda.jpg",
    skill: "Kondor+",
    tags: ['tag1']
  },
  {
    city: "Krajandadapmulyo",
    company: "Wikibox",
    email: "ggallymoreo@mashable.com",
    firstName: "Geraldine",
    grades: ["97",
      "71",
      "89",
      "85",
      "85",
      "87",
      "92",
      "75"],
    id: "25",
    lastName: "Gallymore",
    pic: "https://storage.googleapis.com/hatchways-app.appspot.com/assessments/data/frontend/images/sitlaborecorrupti.jpg",
    skill: "WTL",
    tags: []
  }
]

describe('Filter students by name and tag', () => {
  it('Filter by name', () => {
    const filtered = filterByNameAndTag(students, 'lau', '');
    expect(filtered.length).toBe(1);
  })
  it('Filter by tag', () => {
    const filtered = filterByNameAndTag(students, '', 'ta');
    expect(filtered.length).toBe(3);
  })
  it('Filter by name and tag one result', () => {
    const filtered = filterByNameAndTag(students, 'lau', 'ta');
    expect(filtered.length).toBe(1);
  })
  it('Filter by name and tag zero results', () => {
    const filtered = filterByNameAndTag(students, 'po', 'jkl');
    expect(filtered.length).toBe(0);
  })
})
