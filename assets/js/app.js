const docSum = document.getElementById('sum');
const docAnswer = document.getElementById('answer');
let sum = '';
let answer = '';

const calButton = type => {
  const lastChar = sum.substr(sum.length - 1);
  if (type === 'del') {
    return del();
  }
  if (
    (!sum.length && type === '%') ||
    (!sum.length && type === '+') ||
    (!sum.length && type === '/') ||
    (!sum.length && type === '*')
  ) {
    return;
  }
  if (!sum.length && type === '.') {
    return buildSum('0.');
  }
  if (!sum.length && type === '-') {
    return buildSum(type);
  }
  if (type === '.' && isNaN(lastChar)) {
    return buildSum('0.');
  }
  return buildSum(type);
};

const buildSum = type => {
  sum += type;
  docSum.innerHTML = sum;
};

const del = () => {
  docSum.innerHTML = '';
  docAnswer.innerHTML = '';
  sum = '';
  answer = '';
};

const evil = fn => {
  return new Function('return ' + fn)();
};

const calculate = () => {
  if (evil(sum) === answer) {
    sum = answer.toString();
    docSum.innerHTML = sum;
    answer = '';
    docAnswer.innerHTML = '';
  } else {
    answer = evil(sum);
    docAnswer.innerHTML = answer;
  }
};
