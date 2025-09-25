export class Codec {
  encode (strs: string[]) {
    let result = "";
    for (const str of strs) {
      result += str.length + "#" + str;
    }
    return result;
  }

  decode (s: string): string[] {
    const result: string[] = [];

    let i = 0;

    while (i < s.length) {
      let j = i;
      while (s[j] !== '#') {
        j++;
      }

      const length = parseInt(s.slice(i, j), 10);

      const str = s.slice(j + 1, j + 1 + length);
      result.push(str);
      i = j + 1 + length;
    }

    return result;
  }
}
