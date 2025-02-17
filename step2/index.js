// 1차원 배열의 stringify
// [1, "ab\"c", true, undefined, null, (_) => 3, Symbol()];
const a = [1, 'ab"c', true, undefined, null, (_) => 3, Symbol()];
const b = [];

const stringCheck = {
  regex: [
    [/"/g, '\\"'],
    [/[\r\n\l]/g, "\\n"],
    [/\t/g, "\\t"]
  ],
  convert(data) {
    return this.regex.reduce((acc, [k, v]) => acc.replace(k, v), data);
  }
};

const el = {
  data: {
    boolean: (v) => v.toString(),
    number: (v) => v.toString(),
    string: (v) => `"${stringCheck.convert(v)}"`
  },
  stringify(data) {
    return this.data[typeof data]?.(data) ?? "null";
  }
};

const recursive = (arr, acc, i) =>
  i < arr.length
    ? recursive(arr, acc + `,${el.stringify(arr[i])}`, i + 1)
    : `[${acc.slice(1)}]`;

const validator = (arr) => {
  if (!Array.isArray(arr)) throw "invalid arr";
};


const arrayStringify = (arr) => {
  validator(arr);

  if (arr.length == 0) return "[]";
  else {
    let acc = "",
      i = 0;
    while (i < arr.length) {
      acc = acc + `,${el.stringify(arr[i])}`;
      i++;
    }
    return `[${acc.slice(1)}]`;
  }
};

console.log(JSON.stringify(a) === arrayStringify(a));
