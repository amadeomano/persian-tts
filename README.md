<div align="center">
  <img src="https://github.com/amfolio/persian-tts/raw/master/_docs/logo.png" width="128" />
  <h1>Persian Text-to-Speach synthesizer</h1>
</div>
<p align="center">
  <a href="https://github.com/amfolio/persian-tts/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-GPLv3-blue.svg" alt="PersianTTS is GPLv3 licensed." />
  </a>
  <img src="https://img.shields.io/github/package-json/v/amfolio/persian-tts.svg" />
  <img src="https://img.shields.io/github/issues-raw/amfolio/persian-tts.svg">
</p>

Persian TTS is a simple text-to-speach synthesizing engine and ReactNative app that I have initially developed as my Bachelor's degree graduation project.

The project is however meant to get gradual improvements over time.

<p align="center">
  <img src="https://github.com/amfolio/persian-tts/raw/master/_docs/ios.png" height="300">
  <img src="https://github.com/amfolio/persian-tts/raw/master/_docs/android.png" height="300">
</p>

## Contents

- [Requirements](#-requirements)
- [Installation guide](#-installation-guide)
- [Launching apps](#-launching-apps)
- [Project structure](#-project-structure)
- [How it works](#-how-it-works)
- [Acknowledgments](#-acknowledgments)
- [Contribution](#-contribution)

## ✅ Requirements

Persian-TTS apps are powered by [React Native][rn] so you will need it for compiling the apps properly.
To compile android version, having a proper [Android SDK][as] on your machine is a must and evidently compiling iOS varient needs you to have a working [Xcode][xc] copy and a functional [Cocoapods][cp] dependency management tool on a MacOS operating system powered machine.

You will also need to have a dependency management tool for accessing NPM and download project's dependencies. [Yarn][yn] is preferrable for it's performance but [NPM][np] is also just fine.

[rn]: https://github.com/facebook/react-native
[as]: https://developer.android.com/studio
[xc]: https://developer.apple.com/xcode/
[cp]: https://cocoapods.org/
[yn]: https://yarnpkg.com/lang/en/
[np]: https://nodejs.org/en/

## 🗺 Installation guide

First you can get the source code by cloning it

```bash
git clone git@github.com:amfolio/persian-tts.git
```

### iOS dependencies installation (Optional)

```bash
cd ios
pod install
```

Then move to the package's directory and install it's dependencies using `yarn install` or `npm install`

## 🚀 Launching apps

To launch apps in emulators of Android and/or iOS operating systems, you can use following commands:

### Android

```bash
react-native run-android
```

### iOS

```bash
react-native run-ios
```

## ⚙️ Project structure

This project's structure is just identical to many other ReactNative project structures. below is just a big picture of the main structure:

- **\_\_tests\_\_ :** Jest powered unit tests
- **android :** ReactNative android source files
- **ios :** ReactNative ios source files
- **src :** Main project root
  - **components :** Reusable React components
    - **ComponentName :** A CamelCase named folder wrapping over component files
      - **index.js :** The component entry point, exporting it's contents using ES6 modules
      - **styles.js (optional):** component's ReactNative style-sheets
  - **screen :** Application screen components
  - **utils :** Synthesizer algorithms & other language processing tools
  - **App.js :** Main application entry
  - **Router.js :** React-Navigation component configurations
  - **voices.json :** Application wide available voices configs

## ✈️ How it works

Shortly the project uses a "concatnative synthesizing" apprach to achieve it's goal. In persian language, an unlimited set of words could be constructed by concatnating "consonant+vowel" pairs. For bravity here we call these pairs simply "Syllables".

To make the synthesizing work, the project has initially a set of 169 syllable voices, recoded from my own voice (so it's not a professional narration 😅). this number is devided as bellow:

| Voice type                 | Corresponding files count |
| -------------------------- | ------------------------: |
| vowels                     |                         6 |
| silent consonants          |                        23 |
| syllable (consonant+vowel) |                       138 |
| spaces                     |                         2 |
| **Total**                  |                   **169** |

The synthesizing process is then feasable by concatnating syllables using [FFmpeg][fm] library and it's [react-native-ffmpeg][rf] wrapper. Here is a quick schema of what happens.

### 1️⃣ Step 1

In the first step, the phonetic corresponding for of persian input is created using [TextToPhonems][t2p] utility function.

```javascript
const input = "سلام"; // means "Hello" in persian
const output = textToPhonems(input); // ["sa", "lā", "m"];
```

### 2️⃣ Step 2

The result of step 1 passes through [PhonemsToFFMpeg][p2f] utility function and gets a valid ffmpeg concatnation command:

```javascript
const ffmpeg = phonemsToFFMpeg(output);
```

and the result would be:

```bash
ffmpeg \
  -I sa.wav -I lā.wav -I m.wav \
  -filter_complex ‘[0:0][1:0][2:0]concat=n=3:v=0:a=1[out]’ \
  -map ‘[out]’ output.wav
```

### 3️⃣ Step 3

The application calls ffmpeg using [react-native-ffmpeg][rf] and the following steps get done behind the scenes:

<table>
  <tr>
    <td colspan="3" align="center"><b>Before concatnation</b></td>
  </tr>
  <tr>
    <td><img src="https://github.com/amfolio/persian-tts/raw/master/_docs/sa.png" height="120"></td>
    <td><img src="https://github.com/amfolio/persian-tts/raw/master/_docs/laa.png" height="120"></td>
    <td><img src="https://github.com/amfolio/persian-tts/raw/master/_docs/m.png" height="120"></td>
  </tr>
  <tr>
    <td align="center">sa.wav</td>
    <td align="center">lā.wav</td>
    <td align="center">m.wav</td>
  </tr>
  <tr>
    <td colspan="3" align="center"><b>After concatnation</b></td>
  </tr>
  <tr>
    <td colspan="3" align="center"><img src="https://github.com/amfolio/persian-tts/raw/master/_docs/salaam.png" height="120"></td>
  </tr>
  <tr>
    <td colspan="3" align="center">output.wav</td>
  </tr>
</table>

### 4️⃣ Step 4

The output audio file gets played over both iOS and Android platforms thanks to [react-native-sound][rs] library. Reading bundle resources and transfering them to sandbox/SD-card location is also possible thanks to [react-native-fs][rnfs]

[fm]: http://ffmpeg.org/
[rf]: https://github.com/tanersener/react-native-ffmpeg
[t2p]: https://github.com/amfolio/persian-tts/blob/master/src/utils/TextToPhonems/index.js
[p2f]: https://github.com/amfolio/persian-tts/blob/master/src/utils/PhonemsToFFMpeg/index.js
[rs]: https://github.com/zmxv/react-native-sound
[rnfs]: https://github.com/itinance/react-native-fs

## 🙏🏻 Acknowledgments

The special thank you goes to my project's director, [Dr. Mohammad Taheri][dmt] who gave me the confidence of approaching this subject and guided me through the best steps to make it possible. Without him I would have probably never get into such academic researches.

The next big thanks goes to the developers community who generousely share the cutting edge technology with others. It's just thanks to this community that reinventing the wheels is not anymore necessary.

Here is a short list of libraries who helped me infinitely in my development path:

- [React][r]
- [React Native][rn]
- [React Navigation][rnn]
- [React Native FFmpeg][rf]
- [React Native FS][rnfs]
- [React Native Modal][rnm]
- [React Native Sound][rs]

[dmt]: http://shirazu.ac.ir/faculty/home/motaheri/en
[r]: https://github.com/facebook/react/
[rnn]: https://github.com/react-navigation/react-navigation
[rnm]: https://github.com/react-native-community/react-native-modal

## 🤝 Contibution

This repository is initially constructed as a minimum effort for a Persian language open-source Text-To-Speech solution. I would be highly grateful of any contribution from issues reporting to bugfixes and improvements.
Please feel free to send pull requests in case of feeling any necessity.
