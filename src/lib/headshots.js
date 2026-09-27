const RAW_HEADSHOTS = {
  'Aaron Feng': 'headshot - Aaron Feng.jpg',
  'Aaron': 'headshot - Aaron Feng.jpg',
  'Adam': 'Adam.JPG',
  'Alex Papadopoulos': 'Alex.JPG',
  'Alex Papadopolous': 'Alex.JPG',
  'Alex': 'Alex.JPG',
  'Alicia Wang': 'Alicia.JPG',
  'Andy': 'Andy.JPG',
  'Andy Quinn': 'Andy.JPG',
  'Angela Chen': 'headshot - Angela Chen.png',
  'Anson El-Ayari': 'Anus.JPG',
  'Anson El Ayari': 'Anus.JPG',
  'Ava El Ayari': 'Ava.JPG',
  'Beau Leone': 'Beau.JPG',
  'Ben Shearing': '07447F01-3B41-494B-9BD1-250DC70993ED - Ben Shearing.png',
  'Bianca Rotariu': 'Bianca.JPG',
  'Brandon Schielder': '1772993538621 - Brandon Scheidler.jpg',
  'Brandon Scheidler': '1772993538621 - Brandon Scheidler.jpg',
  'Camran Jiwani': 'Camran.JPG',
  'Daniel Thompson': 'Daniel thompson Headshot - Daniel Thompson.png',
  'Dan Thompson': 'Daniel thompson Headshot - Daniel Thompson.png',
  'Dr. Samuel Grant': '',
  'Edan Kroi': 'Edan.JPG',
  'Emory Geho': 'Emory.JPG',
  'Ethan Cairns': 'Ethan Cairns Headshot - Ethan Cairns.JPG',
  'Findlay Goodall': 'Findlay Goodall Headshot - Finn Goodall.jpeg',
  'Finn Goodall': 'Findlay Goodall Headshot - Finn Goodall.jpeg',
  'Gavin Cameron': 'IMG_3263 - Joanna Cameron.jpeg',
  'Iain Brady': 'Iain.JPG',
  'Isaac Bennett': '',
  'Ivan Bardziyan': 'Ivan.JPG',
  'James Simone': 'James.JPG',
  'Jane Shi': 'headshot - Jane Shi.jpeg',
  'Jay Diri': 'Jay.JPG',
  'Jayanth Dirisanapu': 'Screenshot 2026-09-15 at 3.38.43 PM - Jayanth Diri.png',
  'Jess': 'Jess.JPG',
  'Jessica Cook': 'Jess.JPG',
  'Jill Dalton': 'Jillian Dalton.JPG',
  'Jillian Dalton': 'Jillian Dalton.JPG',
  'Adam Bizios': 'Adam.JPG',
  'Krishan Muni': '',
  'Logan Michaud': 'Headshot - Logan Michaud.JPG',
  'Marcus Cvitak': '',
  'Marius Cotet': 'Marius - Photo - Marius Cotet.png',
  'Matthew Harrison': 'IMG_9066 - Matthew Harrison.jpeg',
  'Nick Page': '',
  'Oliver Bell': '',
  'Nicholas Moretta': '1777063653088 - Nicholas Moretta.jpeg',
  'Nikhil Naran': 'Nikhil.JPG',
  'Nora Malik': '',
  'Ronin Kinloch Varga': 'Headshot - Ronin Kinloch Varga.png',
  'Russell Weir': 'Headshot - Russell Weir.jpg',
  'Simon Jarvis': '',
  'Sydney Garrah': 'Sydney.JPG',
  'Ravjot Sarao': 'Ravjot.JPG',
  'Roscoe Sze': 'Roscoe.JPG',
  'Sydney': 'Sydney.JPG',
  'Thomas Skippon': '126A9942 - Thomas Skippon.jpg',
};

const cache = new Map();

export function getHeadshot(name){
  if (!name) return '';
  if (cache.has(name)) return cache.get(name);
  const filename = RAW_HEADSHOTS[name] || RAW_HEADSHOTS[name.replace(/\./g, '')] || '';
  const value = filename ? `/headshots/${encodeURIComponent(filename)}` : '';
  cache.set(name, value);
  return value;
}

export function hasHeadshot(name){
  const file = getHeadshot(name);
  return typeof file === 'string' && file.length > 0;
}
