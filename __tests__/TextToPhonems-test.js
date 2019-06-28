import textToPhonems from '../src/utils/TextToPhonems/index';

test('if a simple hello works', () => {
  const phonetics = textToPhonems('سلام');
  expect(phonetics).toEqual(['sa', 'lā', 'm']);
});

test('if a simple greeting works', () => {
  const phonetics = textToPhonems('چطوری');
  expect(phonetics).toEqual(['če', 'to', 'ri']);
});

test('if a simple ahmad works', () => {
  const phonetics = textToPhonems('احْمد');
  expect(phonetics).toEqual(['a', 'h', 'ma', 'd']);
});

test('test a phrase', () => {
  const phonetics = textToPhonems('سلام ایران');
  expect(phonetics).toEqual(['sa', 'lā', 'm', 'space', 'i', 'rā', 'n']);
});

test('test khahar', () => {
  const phonetics = textToPhonems('خواهر');
  expect(phonetics).toEqual(['xu', 'ā', 'ha', 'r']);
});

test('test khune', () => {
  const phonetics = textToPhonems('خانه');
  expect(phonetics).toEqual(['xā', 'ne']);
});
