/**
 * @file es6Test.js
 */

const setTest = () => {
  const set = new Set([1, 2, 3]);
  [1, 2, 3].includes(2);
  console.log(set); // eslint-disable-line no-console
  console.log([1, 2, 3].includes(2)); // eslint-disable-line no-console
};

setTest();

const promiseTest = (testCosde) => {
  return new Promise(resolve => {
    resolve(testCosde);
  });
};

promiseTest('promise test').then(data => {
  console.log(data); // eslint-disable-line no-console
});

const asyncTest = async (testCosde) => {
  return await promiseTest(testCosde);
};

asyncTest('async test').then(data => {
  console.log(data); // eslint-disable-line no-console
});

const classListTest = () => {
  document.getElementById('js-es6-test').classList.add('is-show');

  if (document.getElementById('js-es6-test').classList.contains('is-show')) {
    console.log('is-show'); // eslint-disable-line no-console
    document.getElementById('js-es6-test').classList.remove('is-show');
  }
};

classListTest();

const removeTset = () => {
  document.getElementById('js-es6-test').remove();
};

removeTset();

const spredTest = () => {
  const arrayValues = [1, 2, 3];
  const spredValues = [...arrayValues];
  console.log(spredValues); // eslint-disable-line no-console
};

spredTest();

const [value1, value2] = ['value1Text', 'value2Text'];
console.log(value1); // eslint-disable-line no-console
console.log(value2); // eslint-disable-line no-console

const { value01, value02 } = { value01: 'value01Text', value02: 'value02Text' };
console.log(value01); // eslint-disable-line no-console
console.log(value02); // eslint-disable-line no-console
