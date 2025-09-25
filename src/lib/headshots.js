const RAW_HEADSHOTS = {
  'Aaron Feng': 'Aaron.JPG',
  'Aaron': 'Aaron.JPG',
  'Adam': 'Adam.JPG',
  'Alex Papadopoulos': 'Alex.JPG',
  'Alex': 'Alex.JPG',
  'Alicia Wang': 'Alicia.JPG',
  'Andy': 'Andy.JPG',
  'Andy Quinn': 'Andy.JPG',
  'Anson El-Ayari': 'Anus.JPG',
  'Anson El Ayari': 'Anus.JPG',
  'Ava El Ayari': 'Ava.JPG',
  'Beau Leone': 'Beau.JPG',
  'Bianca Rotariu': 'Bianca.JPG',
  'Camran Jiwani': 'Camran.JPG',
  'Daniel Thompson': 'Dan.JPG',
  'Dan Thompson': 'Dan.JPG',
  'Dr. Samuel Grant': '',
  'Edan Kroi': 'Edan.JPG',
  'Emory Geho': 'Emory.JPG',
  'Findlay Goodall': 'Finn Goodall.JPG',
  'Finn Goodall': 'Finn Goodall.JPG',
  'Gavin Cameron': 'Gavin.JPG',
  'Iain Brady': 'Iain.JPG',
  'Ivan Bardziyan': 'Ivan.JPG',
  'James Simone': 'James.JPG',
  'Jay Diri': 'Jay.JPG',
  'Jess': 'Jess.JPG',
  'Jessica Cook': 'Jess.JPG',
  'Jillian Dalton': 'Jillian Dalton.JPG',
  'Adam Bizios': 'Adam.JPG',
  'Nikhil Naran': 'Nikhil.JPG',
  'Nora Malik': '',
  'Sydney Garrah': 'Sydney.JPG',
  'Ravjot Sarao': 'Ravjot.JPG',
  'Roscoe Sze': 'Roscoe.JPG',
  'Sydney': 'Sydney.JPG',
  'Thomas Skippon': 'Thomas.JPG',
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
