<div align="center">
  <img src="https://github.com/amfolio/persian-tts/raw/master/_docs/logo.png" width="128" />
  <h1>Persian Text-to-Speach synthesizer</h1>
</div>
<p align="center">
  <!-- <a href="https://github.com/amfolio/persian-tts/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-GPLv3-blue.svg" alt="PersianTTS is GPLv3 licensed." />
  </a>
  <img src="https://img.shields.io/github/package-json/v/amfolio/persian-tts.svg" />
  <img src="https://img.shields.io/github/issues-raw/amfolio/persian-tts.svg"> -->
</p>

Persian TTS is a simple text-to-speach synthesizing engine and ReactNative app that I have initially developed as my Bachelor's degree graduation project.

The project is however meant to get gradual improvements over time.

<p align="center" style="margin-top: 40px">
  <img src="https://github.com/amfolio/persian-tts/raw/master/_docs/ios.png" height="300">
  <img src="https://github.com/amfolio/persian-tts/raw/master/_docs/android.png" height="300">
</p>

## Contents

- [Requirements](#-requirements)
- [Installation guide](#-installation-guide)
- [Launching apps](#-launching-apps)
- [Project structure](#-project-structure)
- [Contribution](#-contribution)
- [How it works](#-how-it-works)

## ☑ Requirements

Persian-TTS apps are powered by [React Native][r] so you will need it for compiling the apps properly.
To compile android version, having a proper [Android SDK][a] on your machine is a must and evidently compiling iOS varient needs you to have a working [Xcode][x] copy and a functional [Cocoapods][c] dependency management tool on a MacOS operating system powered machine.

You will also need to have a dependency management tool for accessing NPM and download project's dependencies. [Yarn][y] is preferrable for it's performance but [NPM][n] is also just fine.

[r]: https://github.com/facebook/react-native
[a]: https://developer.android.com/studio
[x]: https://developer.apple.com/xcode/
[c]: https://cocoapods.org/
[y]: https://yarnpkg.com/lang/en/
[n]: https://nodejs.org/en/

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

To launch apps in emulators of any of following operating systems, you can use following commands:

### Android

```bash
react-native run-android
```

### iOS

```bash
react-native run-ios
```
