const dictionary = {
  a: 'ᚨ', // ᚬ ᚭ
  b: 'ᛒ',
  c: 'ᚴ', // ᚲ ᚳ
  d: 'ᛞ',
  e: 'ᛖ',
  f: 'ᚠ',
  g: 'ᚷ',
  h: 'ᚻ', // ᚺ
  i: 'ᛁ',
  j: 'ᛃ',
  k: 'ᚴ',
  l: 'ᛚ',
  m: 'ᛗ',
  n: 'ᚾ',
  o: 'ᛟ', // ᚩ
  p: 'ᛈ',
  q: 'ᛩ',
  r: 'ᚱ',
  s: 'ᛋ', // ᛊ
  t: 'ᛏ',
  u: 'ᚢ',
  v: 'ᚹ',
  w: 'ᚹ',
  x: 'ᛪ',
  y: 'ᛇ', // ᚤ
  z: 'ᛉ',
  ' ': '᛫',
  //th: 'ᚦ'
}

function findThurs(str) {
  if (str.includes('ᛏᚻ')) {
    return str.replace(/ᛏᚻ/g, 'ᚦ'); // same as replaceAll()
  }
  else if (str.includes('ᛏᚺ')) {
    return str.replace(/ᛏᚺ/g, 'ᚦ');
  }
  else {
    return str;
  }
}

function translateRunes(text) {
  const temp = [];
  const supportedCharacters = Object.keys(dictionary);
  for (const char of text.toLowerCase().split('')) {
    if (supportedCharacters.includes(char)) {
      temp.push(dictionary[char]);
      continue;
    }
    temp.push(char);
  }
  
  return { translation: findThurs(temp.join('')) };
}

export default translateRunes;