const main = document.querySelector('.container');
const arrayContainer = document.querySelector('.array-container');
const errorContainer = document.querySelector('.error');
const arrayList = document.querySelector('.array-list');
//>Input values
const indexOfValue = document.querySelector('.input_indexof');
const includesValue = document.querySelector('.input_includes');
const pushValue = document.querySelector('.input_push');
const unshiftValue = document.querySelector('.input_unshift');

const sliceStartValue = document.querySelector('.input_start_slice');
const sliceEndValue = document.querySelector('.input_end_slice');

const spliceStartValue = document.querySelector('.input_startIndex_splice');
const spliceAmountValue = document.querySelector('.input_amount_splice');

const insertStartValue = document.querySelector('.input_start_insert');
const insertEndValue = document.querySelector('.input_end_insert');

//> Buttons
const btnFindIndexOf = document.querySelector('.btn_find');
const btnIncludes = document.querySelector('.btn_check');
const btnPush = document.querySelector('.btn_push');
const btnUnshift = document.querySelector('.btn_unshift');
const btnPop = document.querySelector('.btn_pop');
const btnShift = document.querySelector('.btn_shift');
const btnSlice = document.querySelector('.btn_slice');
const btnSplice = document.querySelector('.btn_splice');
const bntInsert = document.querySelector('.btn_insert');
const btnError = document.querySelector('.btn_error');

//>Error
const errorMessage = document.querySelector('.error_message');

let mainArray = [1, 2, 3];

const renderArray = function (arr) {
  arrayContainer.innerHTML = '';
  arr.forEach((el) => {
    const markup = ` <div class="block">
    <span class="value">${el}</span>
  </div>`;
    arrayContainer.insertAdjacentHTML('beforeend', markup);
  });
};

const renderError = function (message) {
  errorMessage.innerHTML = '';
  errorMessage.textContent = message;
  if (errorContainer.classList.contains('hidden')) {
    errorContainer.classList.remove('hidden');
    errorOut = true;
  }
  arrayList.classList.add('stop-events');
  console.log(errorOut);
};

const findIndexOf = function (arr, value) {
  let index = arr.indexOf(value);
  if (index < 0) {
    if (errorContainer.classList.contains('correct-message')) {
      errorContainer.classList.remove('correct-message');
    }
    renderError(`Cant find that index`);
  } else {
    errorContainer.classList.add('correct-message');
    renderError(`First index of (${value}) is (${index})`);
  }
};

const includesCheck = function (arr, value) {
  if (arr.includes(value)) {
    errorContainer.classList.add('correct-message');
    let index = arr.indexOf(value);
    renderError(`Value of (${value}) found at position (${index})`);
  } else {
    if (errorContainer.classList.contains('correct-message')) {
      errorContainer.classList.remove('correct-message');
    }
    renderError(`Array does not include (${value})`);
  }
};

const pushValueInArray = function (arr, value) {
  if (typeof value !== 'number') {
    arr.push(NaN);
  } else {
    arr.push(value);
  }
  renderArray(arr);
};

const unshiftValueInArray = function (arr, value) {
  if (typeof value !== 'number') {
    arr.unshift(NaN);
  } else {
    arr.unshift(value);
  }
  renderArray(arr);
};

const arraySlice = function (arr, start, end) {
  if (!end) {
    errorContainer.classList.add('correct-message');
    renderError(`The returned portion is ${arr.slice(start)}`);
  } else if (isNaN(start) && isNaN(end)) {
    errorContainer.classList.add('correct-message');
    renderError(`The returned portion is ${arr.join(' ')}`);
  } else if (start >= end) {
    if (errorContainer.classList.contains('correct-message')) {
      errorContainer.classList.remove('correct-message');
    }
    renderError('The end index must be larger than the start index');
  } else if (isNaN(start)) {
    errorContainer.classList.add('correct-message');
    renderError(`The returned portion is ${arr.slice(0, end).join(' ')}`);
  } else if (isNaN(end)) {
    errorContainer.classList.add('correct-message');
    renderError(`The returned portion is ${arr.slice(start).join(' ')}`);
  } else {
    errorContainer.classList.add('correct-message');
    renderError(`The returned portion is ${arr.slice(start, end).join(' ')}`);
  }
  renderArray(arr);
};

const arraySplice = function (arr, start, count) {
  if (start < 0) {
    if (errorContainer.classList.contains('correct-message')) {
      errorContainer.classList.remove('correct-message');
    }
    renderError('The start index must be in range');
  } else if (isNaN(start)) {
    arr.splice(0, count);
  } else {
    arr.splice(start, count);
  }
  renderArray(arr);
};

const arrayInsertIndex = function (arr, index, value) {
  if (isNaN(index) && isNaN(value)) {
    arr.splice(0, 0, NaN);
  } else if (isNaN(index)) {
    arr.splice(0, 0, value);
  } else if (isNaN(value)) {
    arr.splice(index, 0, NaN);
  } else {
    arr.splice(index, 0, value);
  }
  renderArray(arr);
};

arrayList.addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('btn')) {
    if (e.target.classList.contains('btn_find')) {
      let value = Number(indexOfValue.value);
      findIndexOf(mainArray, value);
    }
    if (e.target.classList.contains('btn_check')) {
      let value = Number(includesValue.value);
      includesCheck(mainArray, value);
    }
    if (e.target.classList.contains('btn_push')) {
      if (mainArray.length >= 10) {
        if (errorContainer.classList.contains('correct-message')) {
          errorContainer.classList.remove('correct-message');
        }
        renderError('Array cant exceed 10 elements');
        return;
      }
      let value = Number(pushValue.value);
      pushValueInArray(mainArray, value);
    }
    if (e.target.classList.contains('btn_unshift')) {
      if (mainArray.length >= 10) {
        if (errorContainer.classList.contains('correct-message')) {
          errorContainer.classList.remove('correct-message');
        }
        renderError('Array cant exceed 10 elements');
        return;
      }
      let value = Number(unshiftValue.value);
      unshiftValueInArray(mainArray, value);
    }
    if (e.target.classList.contains('btn_pop')) {
      if (mainArray.length === 0) {
        if (errorContainer.classList.contains('correct-message')) {
          errorContainer.classList.remove('correct-message');
        }
        renderError('You cannnot remove any more elements');
      }
      mainArray.pop();
      renderArray(mainArray);
    }
    if (e.target.classList.contains('btn_shift')) {
      if (mainArray.length === 0) {
        if (errorContainer.classList.contains('correct-message')) {
          errorContainer.classList.remove('correct-message');
        }
        renderError('You cannnot remove any more elements');
      }
      mainArray.shift();
      renderArray(mainArray);
    }
    if (e.target.classList.contains('btn_slice')) {
      let startValue = Number(sliceStartValue.value);
      let endValue = Number(sliceEndValue.value);

      arraySlice(mainArray, startValue, endValue);
    }

    if (e.target.classList.contains('btn_splice')) {
      let deletedCount = Number(spliceAmountValue.value);
      let startValue = Number(spliceStartValue.value);
      arraySplice(mainArray, startValue, deletedCount);
    }
    if (e.target.classList.contains('btn_insert')) {
      if (mainArray.length >= 10) {
        if (errorContainer.classList.contains('correct-message')) {
          errorContainer.classList.remove('correct-message');
        }
        renderError('Array cant exceed 10 elements');
        return;
      }
      let startValue = Number(insertStartValue.value);
      let insertValue = Number(insertEndValue.value);
      arrayInsertIndex(mainArray, startValue, insertValue);
    }
  }
});

btnError.addEventListener('click', function (e) {
  e.preventDefault();

  arrayList.classList.remove('stop-events');
  errorContainer.classList.add('hidden');
});

renderArray(mainArray);
