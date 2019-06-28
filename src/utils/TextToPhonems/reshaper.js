/* eslint-disable no-restricted-syntax */
/* eslint-disable no-labels */
/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
/**
 * Javascript Arabic Reshaper by Saleh Souzanchi (https://github.com/font-store/persian-reshaper)
 * Forked from https://github.com/louy/Javascript-Arabic-Reshaper
 * Based on (https://raw.github.com/Accorpa/Arabic-Converter-From-and-To-Arabic-Presentation-Forms-B/)
 */
const charsMap = [
  /* code,isolated,initial, medial, final */
  [0x0621, 0xfe80, null, null, null] /* HAMZA */,
  [0x0622, 0xfe81, null, null, 0xfe82] /* ALEF_MADDA */,
  [0x0623, 0xfe83, null, null, 0xfe84] /* ALEF_HAMZA_ABOVE */,
  [0x0624, 0xfe85, null, null, 0xfe86] /* WAW_HAMZA */,
  [0x0625, 0xfe87, null, null, 0xfe88] /* ALEF_HAMZA_BELOW */,
  [0x0626, 0xfe89, 0xfe8b, 0xfe8c, 0xfe8a] /* YEH_HAMZA */,
  [0x0627, 0xfe8d, null, null, 0xfe8e] /* ALEF */,
  [0x0628, 0xfe8f, 0xfe91, 0xfe92, 0xfe90] /* BEH */,
  [0x0629, 0xfe93, null, null, 0xfe94] /* TEH_MARBUTA */,
  [0x062a, 0xfe95, 0xfe97, 0xfe98, 0xfe96] /* TEH */,
  [0x062b, 0xfe99, 0xfe9b, 0xfe9c, 0xfe9a] /* THEH */,
  [0x062c, 0xfe9d, 0xfe9f, 0xfea0, 0xfe9e] /* JEEM */,
  [0x062d, 0xfea1, 0xfea3, 0xfea4, 0xfea2] /* HAH */,
  [0x062e, 0xfea5, 0xfea7, 0xfea8, 0xfea6] /* KHAH */,
  [0x062f, 0xfea9, null, null, 0xfeaa] /* DAL */,
  [0x0630, 0xfeab, null, null, 0xfeac] /* THAL */,
  [0x0631, 0xfead, null, null, 0xfeae] /* REH */,
  [0x0632, 0xfeaf, null, null, 0xfeb0] /* ZAIN */,
  [0x0698, 0xfb8a, null, null, 0xfb8b] /* ZHEH */,
  [0x0633, 0xfeb1, 0xfeb3, 0xfeb4, 0xfeb2] /* SEEN */,
  [0x0634, 0xfeb5, 0xfeb7, 0xfeb8, 0xfeb6] /* SHEEN */,
  [0x0635, 0xfeb9, 0xfebb, 0xfebc, 0xfeba] /* SAD */,
  [0x0636, 0xfebd, 0xfebf, 0xfec0, 0xfebe] /* DAD */,
  [0x0637, 0xfec1, 0xfec3, 0xfec4, 0xfec2] /* TAH */,
  [0x0638, 0xfec5, 0xfec7, 0xfec8, 0xfec6] /* ZAH */,
  [0x0639, 0xfec9, 0xfecb, 0xfecc, 0xfeca] /* AIN */,
  [0x063a, 0xfecd, 0xfecf, 0xfed0, 0xfece] /* GHAIN */,
  [0x0640, 0x0640, 0x0640, 0x0640, 0x0640] /* TATWEEL */,
  [0x0641, 0xfed1, 0xfed3, 0xfed4, 0xfed2] /* FEH */,
  [0x0642, 0xfed5, 0xfed7, 0xfed8, 0xfed6] /* QAF */,
  [0x0643, 0xfed9, 0xfedb, 0xfedc, 0xfeda] /* KAF */,
  [0x0644, 0xfedd, 0xfedf, 0xfee0, 0xfede] /* LAM */,
  [0x0645, 0xfee1, 0xfee3, 0xfee4, 0xfee2] /* MEEM */,
  [0x0646, 0xfee5, 0xfee7, 0xfee8, 0xfee6] /* NOON */,
  [0x0647, 0xfee9, 0xfeeb, 0xfeec, 0xfeea] /* HEH */,
  [0x0648, 0xfeed, null, null, 0xfeee] /* WAW */,
  [0x0649, 0xfeef, null, null, 0xfef0] /* ALEF_MAKSURA */,
  [0x064a, 0xfef1, 0xfef3, 0xfef4, 0xfef2] /* YEH Arabic */,
  [0x06cc, 0xfbfc, 0xfbfe, 0xfbff, 0xfbfd] /* YEH Farsi */,
  [0x0686, 0xfb7a, 0xfb7c, 0xfb7d, 0xfb7b] /* CHEH */,
  [0x067e, 0xfb56, 0xfb58, 0xfb59, 0xfb57],
  [0x06af, 0xfb92, 0xfb94, 0xfb95, 0xfb93],
  [0x06a9, 0xfb8e, 0xfb90, 0xfb91, 0xfb8f],
];

// const combCharsMap = [
// [ [ 0x0644, 0x0622 ], 0xFEF5, null, null, 0xFEF6 ], /* LAM_ALEF_MADDA */
// [ [ 0x0644, 0x0623 ], 0xFEF7, null, null, 0xFEF8 ], /* LAM_ALEF_HAMZA_ABOVE */
// [ [ 0x0644, 0x0625 ], 0xFEF9, null, null, 0xFEFA ], /* LAM_ALEF_HAMZA_BELOW */
// [[0x0644, 0x0627], 0xfefb, null, null, 0xfefc] /* LAM_ALEF */,
// ];

const transChars = [
  0x0610 /* ARABIC SIGN SALLALLAHOU ALAYHE WASSALLAM */,
  0x0612 /* ARABIC SIGN ALAYHE ASSALLAM */,
  0x0613 /* ARABIC SIGN RADI ALLAHOU ANHU */,
  0x0614 /* ARABIC SIGN TAKHALLUS */,
  0x0615 /* ARABIC SMALL HIGH TAH */,
  0x064b /* ARABIC FATHATAN */,
  0x064c /* ARABIC DAMMATAN */,
  0x064d /* ARABIC KASRATAN */,
  0x064e /* ARABIC FATHA */,
  0x064f /* ARABIC DAMMA */,
  0x0650 /* ARABIC KASRA */,
  0x0651 /* ARABIC SHADDA */,
  0x0652 /* ARABIC SUKUN */,
  0x0653 /* ARABIC MADDAH ABOVE */,
  0x0654 /* ARABIC HAMZA ABOVE */,
  0x0655 /* ARABIC HAMZA BELOW */,
  0x0656 /* ARABIC SUBSCRIPT ALEF */,
  0x0657 /* ARABIC INVERTED DAMMA */,
  0x0658 /* ARABIC MARK NOON GHUNNA */,
  0x0670 /* ARABIC LETTER SUPERSCRIPT ALEF */,
  0x06d6 /* ARABIC SMALL HIGH LIGATURE SAD WITH LAM WITH ALEF MAKSURA */,
  0x06d7 /* ARABIC SMALL HIGH LIGATURE QAF WITH LAM WITH ALEF MAKSURA */,
  0x06d8 /* ARABIC SMALL HIGH MEEM INITIAL FORM */,
  0x06d9 /* ARABIC SMALL HIGH LAM ALEF */,
  0x06da /* ARABIC SMALL HIGH JEEM */,
  0x06db /* ARABIC SMALL HIGH THREE DOTS */,
  0x06dc /* ARABIC SMALL HIGH SEEN */,
  0x06df /* ARABIC SMALL HIGH ROUNDED ZERO */,
  0x06e0 /* ARABIC SMALL HIGH UPRIGHT RECTANGULAR ZERO */,
  0x06e1 /* ARABIC SMALL HIGH DOTLESS HEAD OF KHAH */,
  0x06e2 /* ARABIC SMALL HIGH MEEM ISOLATED FORM */,
  0x06e3 /* ARABIC SMALL LOW SEEN */,
  0x06e4 /* ARABIC SMALL HIGH MADDA */,
  0x06e7 /* ARABIC SMALL HIGH YEH */,
  0x06e8 /* ARABIC SMALL HIGH NOON */,
  0x06ea /* ARABIC EMPTY CENTRE LOW STOP */,
  0x06eb /* ARABIC EMPTY CENTRE HIGH STOP */,
  0x06ec /* ARABIC ROUNDED HIGH STOP WITH FILLED CENTRE */,
  0x06ed /* ARABIC SMALL LOW MEEM */,
];

function CharacterMapContains(c) {
  for (let i = 0; i < charsMap.length; ++i) {
    if (charsMap[i][0] === c) {
      return true;
    }
  }
  return false;
}
function GetCharRep(c) {
  for (let i = 0; i < charsMap.length; ++i) {
    if (charsMap[i][0] === c) {
      return charsMap[i];
    }
  }
  return false;
}
// function GetCombCharRep(c1, c2) {
//   for (let i = 0; i < combCharsMap.length; ++i) {
//     if (combCharsMap[i][0][0] === c1 && combCharsMap[i][0][1] === c2) {
//       return combCharsMap[i];
//     }
//   }
//   return false;
// }
function IsTransparent(c) {
  for (let i = 0; i < transChars.length; ++i) {
    if (transChars[i] === c) {
      return true;
    }
  }
  return false;
}

export default function convertArabic(normal) {
  let crep;
  let shaped = '';
  // let combcrep;

  for (let i = 0; i < normal.length; ++i) {
    const current = normal.charCodeAt(i);
    if (CharacterMapContains(current)) {
      let prev = null;
      let next = null;
      let prevID = i - 1;
      let nextID = i + 1;

      /*
        Transparent characters have no effect in the shaping process.
        So, ignore all the transparent characters that are BEFORE the
        current character.
        */
      for (; prevID >= 0; --prevID) {
        if (!IsTransparent(normal.charCodeAt(prevID))) {
          break;
        }
      }

      prev = prevID >= 0 ? normal.charCodeAt(prevID) : null;
      crep = prev ? GetCharRep(prev) : false;
      if (crep[2] == null && crep[3] == null) {
        prev = null;
      }

      /*
        Transparent characters have no effect in the shaping process.
        So, ignore all the transparent characters that are AFTER the
        current character.
        */
      for (; nextID < normal.length; ++nextID) {
        if (!IsTransparent(normal.charCodeAt(nextID))) {
          break;
        }
      }

      next = nextID <= normal.length ? normal.charCodeAt(nextID) : null;
      crep = next ? GetCharRep(next) : false;
      if (crep[3] == null && crep[4] == null) {
        next = null;
      }

      // /* Combinations */
      // if (
      //   current === 0x0644
      //   && next !== null
      //   && (next === 0x0622 || next === 0x0623 || next === 0x0625 || next === 0x0627)
      // ) {
      //   combcrep = GetCombCharRep(current, next);
      //   if (prev != null) {
      //     shaped += String.fromCharCode(combcrep[4]);
      //   } else {
      //     shaped += String.fromCharCode(combcrep[1]);
      //   }
      //   i += 1;
      //   continue;
      // }

      crep = GetCharRep(current);

      /* Medial */
      if (prev != null && next != null && crep[3] != null) {
        shaped += String.fromCharCode(crep[3]);
        continue;
      } /* Final */ else if (prev != null && crep[4] != null) {
        shaped += String.fromCharCode(crep[4]);
        continue;
      } /* Initial */ else if (next != null && crep[2] != null) {
        shaped += String.fromCharCode(crep[2]);
        continue;
      } /* Isolated */ else {
        shaped += String.fromCharCode(crep[1]);
      }
    } else {
      shaped += String.fromCharCode(current);
    }
  }
  return shaped;
}

// convert from Arabic Presentation Forms B
// export function convertArabicBack(apfb) {
//   let toReturn = '';
//   let selectedChar;

//   theLoop: for (let i = 0; i < apfb.length; ++i) {
//     selectedChar = apfb.charCodeAt(i);

//     for (let j = 0; j < charsMap.length; ++j) {
//       if (
//         charsMap[j][4] === selectedChar
//         || charsMap[j][2] === selectedChar
//         || charsMap[j][1] === selectedChar
//         || charsMap[j][3] === selectedChar
//       ) {
//         toReturn += String.fromCharCode(charsMap[j][0]);
//         continue theLoop;
//       }
//     }

//     for (let j = 0; j < combCharsMap.length; ++j) {
//       if (
//         combCharsMap[j][4] === selectedChar
//         || combCharsMap[j][2] === selectedChar
//         || combCharsMap[j][1] === selectedChar
//         || combCharsMap[j][3] === selectedChar
//       ) {
//         const code1 = combCharsMap[j][0][0];
//         const code2 = combCharsMap[j][0][1];
//         toReturn += String.fromCharCode(code1) + String.fromCharCode(code2);
//         continue theLoop;
//       }
//     }

//     toReturn += String.fromCharCode(selectedChar);
//   }
//   return toReturn;
// }
