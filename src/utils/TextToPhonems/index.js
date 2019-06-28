/* eslint-disable no-continue */
import vowels from './vowels';
import consonants from './consonants';

// Dictionary
import dictionary from './frequent500.json';

function wordToPhonems(word) {
  const phonetics = [];

  for (let idx = 0; idx < word.length; idx += 1) {
    const charCode = word.charCodeAt(idx);
    const isFirstLetter = idx === 0;

    // Initial a can have multiple states => aa | a | i | u
    if (isFirstLetter) {
      // initial hatted a => aa
      if (charCode === 0x622) {
        phonetics.push(vowels[0x622]);
        continue;
      }
      if (charCode === 0x0627) {
        // a+i => i
        if (word.charCodeAt(idx + 1) === 0x06cc) {
          phonetics.push('i');
          idx += 1;
          continue;
        }
        // a+v => u
        if (word.charCodeAt(idx + 1) === 0x0648) {
          phonetics.push('u');
          idx += 1;
          continue;
        }
        // Just an isolated a
        phonetics.push('a');
        continue;
      }
    }

    // Iterating through consonants
    const consonant = consonants[charCode];
    if (!consonant) {
      // if it's a middle [a] add it as an ā
      if (charCode === 0x627) phonetics.push(vowels[0x622]);
      continue;
    }

    // get nextCharCode
    const nextCharCode = word.charCodeAt(idx + 1);
    // Check if next char is out of bounds
    if (Number.isNaN(nextCharCode)) {
      const lastConsonant = consonants[charCode];
      if (lastConsonant) phonetics.push(lastConsonant);
      continue;
    }

    // Check last "h" which makes [eh]
    const afterNextCharCode = word.charCodeAt(idx + 2);
    if (nextCharCode === 0x647 && Number.isNaN(afterNextCharCode)) {
      phonetics.push(`${consonant}e`);
      idx += 1;
      continue;
    }

    // Check if next is a vowel
    const nextVowel = vowels[nextCharCode];
    if (nextVowel) {
      phonetics.push(`${consonant}${nextVowel}`);
      idx += 1;
      continue;
      // Check hamza stopper
    } else if (nextCharCode === 0x652) {
      phonetics.push(consonant);
    } else {
      phonetics.push(`${consonant}a`);
    }
  }

  return phonetics;
}

function lookupWordPhonems(word) {
  return dictionary[word];
}

export default function textToPhonems(text) {
  const words = text.replace(/(?:\r\n|\r|\n)/g, ' ').split(' ');
  const phonetics = [];
  words.forEach((word) => {
    const phonems = lookupWordPhonems(word) || wordToPhonems(word);
    if (!phonems) return;
    if (phonetics.length) phonetics.push('space');
    phonetics.push(...phonems);
  });
  return phonetics;
}
