import { Platform } from 'react-native';
import * as RNFS from 'react-native-fs';

function toFileSystem(phonem) {
  let result = '';
  result = phonem.replace(/č/, 'ch');
  result = result.replace(/ž/, 'zh');
  result = result.replace(/š/, 'sh');
  result = result.replace(/ø/, 'ain');
  result = result.replace(/ğ/, 'gh');
  result = result.replace(/ā/, 'aa');
  result = result.replace('do', 'do_');
  return result;
}

async function androidResourcePath(resourceName) {
  const destinationPath = `${RNFS.CachesDirectoryPath}/${resourceName}`;
  // console.log('@@@@@@@@@', await RNFS.existsAssets(resourceName));
  if (await RNFS.exists(destinationPath)) return destinationPath;
  await RNFS.copyFileAssets(resourceName, destinationPath).catch((err) => {
    console.log(
      `Failed to copy android resource: ${resourceName}, err message: ${err.message}, err code: ${err.code}`,
    );
    return undefined;
  });
  return destinationPath;
}

async function iosResourcePath(resourceName) {
  return `${RNFS.MainBundlePath}/${resourceName}`;
}

export default async function phonemsToFFMpeg(
  phonemsArr,
  outputDir,
  voice = '_2',
  isSpaced = false,
) {
  if (!Array.isArray(phonemsArr) || !phonemsArr.length) return undefined;
  let inputs = '';
  let filterComplex = '';

  for (let idx = 0; idx < phonemsArr.length; idx += 1) {
    const phonem = phonemsArr[idx];
    if (idx !== 0 && isSpaced) inputs += `-i space${voice}.wav `;

    let filename = '';
    // eslint-disable-next-line no-await-in-loop
    if (Platform.OS === 'android') filename = await androidResourcePath(`${toFileSystem(phonem)}${voice}.wav`);
    // eslint-disable-next-line no-await-in-loop
    else filename = await iosResourcePath(`${toFileSystem(phonem)}${voice}.wav`);

    inputs += `-i ${filename}${idx < phonemsArr.length - 1 ? ' ' : ''}`;
    filterComplex += `[${idx}:0]`;
  }

  let result = `${inputs} -filter_complex ${filterComplex}`;
  result += `concat=n=${phonemsArr.length}:v=0:a=1[out]`;
  result += ' -map [out]';
  result += ` ${outputDir || '~/desktop'}/output.wav`;

  if (await RNFS.exists(`${RNFS.CachesDirectoryPath}/output.wav`)) {
    await RNFS.unlink(`${RNFS.CachesDirectoryPath}/output.wav`);
  }

  return result;
}
