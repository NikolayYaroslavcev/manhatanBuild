"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var validClass = 'valid';
var invalidClass = 'invalid';
var dataAction = 'data-action';
var dataFeat = 'data-feat';
var dataMaskSelector = '[data-mask-init]';
var datepickerSelector = '[single-datepicker]';
var dataMaskRequiredSelector = '[data-mask-required-init]';
var countryMaskWrapperSelector = '.country-mask';
var AJAXPopupAction = 'open-ajax-popup';
var openInlineAction = 'open-inline-popup';
var inputTextAction = 'required-text';
var inputNumberAction = 'required-number';
var inputEmailAction = 'required-email';
var emailInputControlAction = 'email-input-control';
var inputMaskAction = 'required-mask';
var radiobuttonAction = 'required-radiobutton';
var checkboxAction = 'required-checkbox';
var selectAction = 'required-select';
var countryMaskAction = 'country-mask';
var fileAction = 'input-file';
var fileMultipleAction = 'input-file-multiple';
var fileRequiredAction = 'required-input-file';
var fileMultipleRequiredAction = 'required-input-file-multiple';
var inputPasswordAction = 'input-password';
var numberInset = 'number-inset';
var letterInset = 'letter-inset';
var formSubmit = 'form-submit';
window.addEventListener('load', function () {
  stylerInit('.styler', [selectLoadImages]);
  var inputMaskNodes = document.querySelectorAll(dataMaskSelector);
  if (inputMaskNodes) {
    inputMaskNodes.forEach(function (item) {
      inputMaskInit(item);
    });
  }
  var inputMaskRequiredNodes = document.querySelectorAll(dataMaskRequiredSelector);
  if (inputMaskRequiredNodes) {
    inputMaskRequiredNodes.forEach(function (item) {
      inputMaskRequiredInit(item);
    });
  }
  var datepeackerNodes = document.querySelectorAll(datepickerSelector);
  if (datepeackerNodes.length) {
    datepeackerNodes.forEach(function (item) {
      datePickerInit(item);
    });
  }
  var inputFileMultiples = document.querySelectorAll('input[type="file"][multiple]');
  if (inputFileMultiples.length) {
    inputFileMultiples.forEach(function (item) {
      editableInputFileMultipleInit(item);
    });
  }
});
document.addEventListener('click', function (e) {
  var targetNode = e.target.closest("[".concat(dataAction, "]"));
  var dataActionAttr = null;
  var dataHref = null;
  var dataClass = null;
  if (targetNode) {
    dataActionAttr = targetNode.getAttribute(dataAction);
    dataHref = targetNode.getAttribute('data-href');
    dataClass = targetNode.getAttribute('data-class');
  }
  switch (true) {
    case dataActionAttr === AJAXPopupAction:
      e.preventDefault();
      openAJAXPopUp(dataHref, dataClass, [popupAJAXStylerInit, datepickerAJAXInit, inputMaskAJAXInit, inputMaskRequiredAJAXInit]);
      break;
    case dataActionAttr === openInlineAction:
      e.preventDefault();
      openInlinePopup(dataHref);
      break;
    case dataActionAttr === formSubmit:
      var selectors = ["[".concat(dataAction, "=\"").concat(inputTextAction, "\"]"), "[".concat(dataAction, "=\"").concat(inputNumberAction, "\"]"), "[".concat(dataAction, "=\"").concat(inputEmailAction, "\"]"), "[".concat(dataAction, "=\"").concat(selectAction, "\"]"), "[".concat(dataAction, "=\"").concat(radiobuttonAction, "\"]"), "[".concat(dataAction, "=\"").concat(checkboxAction, "\"]"), "[".concat(dataAction, "=\"").concat(fileRequiredAction, "\"]"), "[".concat(dataAction, "=\"").concat(fileMultipleRequiredAction, "\"]"), "[".concat(dataAction, "=\"").concat(inputPasswordAction, "\"]"), dataMaskRequiredSelector];
      var requiredFields = targetNode.closest('form').querySelectorAll(selectors.join(', '));
      if (requiredFields.length) {
        requiredFields.forEach(function (item) {
          checkNodeValidity(item);
        });
      }
      break;
    default:
      break;
  }
});
document.addEventListener('input', function (e) {
  var targetNode = e.target;
  var dataActionAttr = targetNode.getAttribute(dataAction);
  var dataFeatAttr = targetNode.getAttribute(dataFeat);

  /*
   * Main action
   */
  switch (true) {
    case dataActionAttr === inputTextAction || dataActionAttr === inputNumberAction:
      checkNodeValidity(targetNode);
      break;
    case dataActionAttr === inputEmailAction:
      checkEmailField(targetNode);
      break;
    case dataActionAttr === emailInputControlAction:
      emailInputControl(targetNode);
      break;
    case dataActionAttr === inputPasswordAction:
      inputPasswordCheckValidity(targetNode);
      break;
    default:
      break;
  }

  /*
   * Feat action
   */
  switch (true) {
    case dataFeatAttr === numberInset:
      targetNode.value = targetNode.value.replace(/[0-9]/g, '');
      break;
    case dataFeatAttr === letterInset:
      targetNode.value = targetNode.value.replace(/[a-zа-яё\s]/g, '');
      break;
  }
});
document.addEventListener('change', function (e) {
  var targetNode = e.target;
  var dataActionAttr = targetNode.getAttribute(dataAction);
  switch (true) {
    case dataActionAttr === radiobuttonAction || dataActionAttr === selectAction:
      checkNodeValidity(targetNode);
      break;
    case dataActionAttr === checkboxAction:
      updateGroupCheckboxesValidity(targetNode);
      break;
    case dataActionAttr === countryMaskAction:
      updateCountryMask(targetNode);
      break;
    case dataActionAttr === fileAction:
      inputFileHandler(targetNode);
      break;
    case dataActionAttr === fileRequiredAction:
      inputFileRequiredHadler(targetNode);
      break;
    case dataActionAttr === fileMultipleAction:
      inputFileMultipleHandler(targetNode);
      break;
    case dataActionAttr === fileMultipleRequiredAction:
      inputFileMultipleRequiredHandler(targetNode);
      break;
    default:
      break;
  }
});
var stylerInit = function stylerInit(selector) {
  var callbacks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var stylerNodes = document.querySelectorAll(selector);
  if (stylerNodes.length) {
    stylerNodes.forEach(function (item) {
      $(item).styler({
        onFormStyled: function onFormStyled() {
          var eTarget = this[0];
          if (callbacks.length) {
            callbacks.map(function (callback) {
              return callback(eTarget);
            });
          }
        },
        onSelectClosed: function onSelectClosed() {
          this[0].querySelector('select').dispatchEvent(new Event('change', {
            bubbles: true
          }));
        }
      });
    });
  }
};
var popupAJAXStylerInit = function popupAJAXStylerInit() {
  stylerInit('.mfp-content .styler', [selectLoadImages]);
};
var datepickerAJAXInit = function datepickerAJAXInit() {
  var singleDatepickers = document.querySelectorAll(".mfp-content ".concat(datepickerSelector));
  if (singleDatepickers.length) {
    singleDatepickers.forEach(function (item) {
      var minDate = minDate ? new Date(item.dataset.minDate) : getRelativeDate('-1_0_0');
      var maxDate = maxDate ? new Date(item.dataset.maxDate) : getRelativeDate('+1_0_0');
      singleDatepickerInit({
        node: item,
        minDate: minDate,
        maxDate: maxDate
      });
    });
  }
};
var openAJAXPopUp = function openAJAXPopUp(dataHref, dataClass) {
  var callbacks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  $.magnificPopup.open({
    items: {
      src: dataHref
    },
    type: 'ajax',
    mainClass: "mfp-fade ".concat(dataClass),
    removalDelay: 300,
    closeOnBgClick: true,
    callbacks: {
      beforeOpen: scrollDisable,
      ajaxContentAdded: function ajaxContentAdded() {
        if (callbacks.length) {
          callbacks.map(function (callback) {
            callback();
          });
        }
      },
      afterClose: scrollEnable
    }
  });
};
var inputMaskInit = function inputMaskInit(node) {
  var nodeMask = node.getAttribute('data-mask');
  var nodePlaceholder = node.getAttribute('data-placeholder');
  var config = {
    clearMaskOnLostFocus: true,
    clearIncomplete: true,
    oncleared: function oncleared() {
      this.dispatchEvent(new Event('input', {
        bubbles: true
      }));
    },
    onincomplete: function onincomplete() {
      this.dispatchEvent(new Event('input', {
        bubbles: true
      }));
    },
    onKeyValidation: function onKeyValidation() {
      this.dispatchEvent(new Event('input', {
        bubbles: true
      }));
    }
  };
  if (nodePlaceholder) {
    config['placeholder'] = nodePlaceholder;
  }
  Inputmask(nodeMask, config).mask(node);
};
var inputMaskAJAXInit = function inputMaskAJAXInit() {
  var nodes = document.querySelectorAll(".mfp-content ".concat(dataMaskSelector));
  if (nodes.length) {
    nodes.forEach(function (node) {
      inputMaskInit(node);
    });
  }
};
var inputMaskRequiredInit = function inputMaskRequiredInit(node) {
  var nodeMask = node.getAttribute('data-mask');
  var nodePlaceholder = node.getAttribute('data-placeholder');
  var config = {
    clearMaskOnLostFocus: true,
    clearIncomplete: true,
    oncomplete: function oncomplete() {
      node.setCustomValidity('');
      checkNodeValidity(node);
    },
    oncleared: function oncleared() {
      node.setCustomValidity('Invalid field');
      checkNodeValidity(node);
    },
    onincomplete: function onincomplete() {
      node.setCustomValidity('Invalid field');
      checkNodeValidity(node);
      this.dispatchEvent(new Event('input', {
        bubbles: true
      }));
    },
    onKeyValidation: function onKeyValidation() {
      this.dispatchEvent(new Event('input', {
        bubbles: true
      }));
    }
  };
  if (nodePlaceholder) {
    config['placeholder'] = nodePlaceholder;
  }
  Inputmask(nodeMask, config).mask(node);
};
var inputMaskRequiredAJAXInit = function inputMaskRequiredAJAXInit() {
  var nodes = document.querySelectorAll(".mfp-content ".concat(dataMaskRequiredSelector));
  if (nodes.length) {
    nodes.forEach(function (node) {
      inputMaskRequiredInit(node);
    });
  }
};
var openInlinePopup = function openInlinePopup(dataHref) {
  $.magnificPopup.open({
    items: {
      src: dataHref
    },
    type: 'inline',
    closeOnBgClick: true
  });
};
var wrapperSetValid = function wrapperSetValid(wrapper) {
  wrapper.classList.add(validClass);
  wrapper.classList.remove(invalidClass);
};
var wrapperSetInvalid = function wrapperSetInvalid(wrapper) {
  wrapper.classList.add(invalidClass);
  wrapper.classList.remove(validClass);
};
var checkNodeValidity = function checkNodeValidity(node) {
  var wrapper = node.closest(WRAPPER_SELECTOR);
  node.validity.valid && readOnlyNodeValidate(node) ? wrapperSetValid(wrapper) : wrapperSetInvalid(wrapper);
};
var readOnlyNodeValidate = function readOnlyNodeValidate(node) {
  if (node.readOnly) {
    return node.value !== '';
  }
  return true;
};
var removeFieldValidity = function removeFieldValidity(node) {
  var wrapper = node.closest(WRAPPER_SELECTOR);
  node.required = false;
  node.setCustomValidity('');
  wrapper.classList.remove(validClass);
  wrapper.classList.remove(invalidClass);
};
var resetFieldValidity = function resetFieldValidity(node) {
  var wrapper = node.closest(WRAPPER_SELECTOR);
  node.setCustomValidity('');
  wrapper.classList.remove(validClass);
  wrapper.classList.remove(invalidClass);
};
var checkEmailField = function checkEmailField(node) {
  var nodeValue = node.value;
  nodeValue.length > 0 && (nodeValue.match(/[a-z0-9]\@.+[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}/g) || []).length !== 1 ? node.setCustomValidity('Заполните это поле') : node.setCustomValidity('');
  checkNodeValidity(node);
};
var emailInputControl = function emailInputControl(node) {
  var nodeValue = node.value;
  if (nodeValue.length > 0 && (nodeValue.match(/[a-z0-9]\@.+[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}/g) || []).length !== 1) {
    node.setCustomValidity('Заполните это поле');
    node.required = true;
    checkNodeValidity(node);
  } else if (nodeValue === '') {
    removeFieldValidity(node);
  } else {
    node.setCustomValidity('');
    node.required = false;
    checkNodeValidity(node);
  }
};
var selectLoadImages = function selectLoadImages(select) {
  if (select.getAttribute(dataAction) === countryMaskAction) {
    var selectOptions = select.querySelectorAll('option');
    var inputCountryWrapper = select.closest(countryMaskWrapperSelector);
    var inputVisible = inputCountryWrapper.querySelector('input[type="tel"][data-mask]');
    var inputResult = inputCountryWrapper.querySelector('[data-result-value]');
    if (selectOptions.length) {
      selectOptions.forEach(function (option, index) {
        if (!option.classList.contains('no-mask')) {
          var styleredSelectOptions = inputCountryWrapper.querySelectorAll('.jq-selectbox__dropdown li');
          var styleredSelectOptionsItem = styleredSelectOptions[index];
          if (styleredSelectOptionsItem) {
            styleredSelectOptionsItem.style.backgroundImage = "url(\"".concat(option.getAttribute('data-img'), "\")");
            var selectedCountry = inputCountryWrapper.querySelector('.selected.sel');
            if (selectedCountry) {
              inputCountryWrapper.querySelector('.jq-selectbox__select-text').style.backgroundImage = selectedCountry.style.backgroundImage;
            }
          }
        }
      });
    }
    inputVisible.addEventListener('input', function () {
      inputResult.value = inputVisible.value;
    });
  }
};
var updateCountryMask = function updateCountryMask(select) {
  var countryWrapper = select.closest(countryMaskWrapperSelector);
  var result = countryWrapper.querySelector('[data-result-value]');
  var input = countryWrapper.querySelector('input[data-mask]');
  var selectedOption = select.options[select.selectedIndex];
  var selectPlaceholder = selectedOption.getAttribute('data-placeholder');
  var selectedImg = selectedOption.getAttribute('data-img');
  var selectedDataValue = select.value;
  if (input.inputmask) {
    input.inputmask.remove();
  }
  input.value = '';
  resetFieldValidity(input);
  if (selectedOption.classList.contains('no-mask')) {
    countryWrapper.querySelector('.jq-selectbox__select-text').style.backgroundImage = 'none';
    input.setAttribute('placeholder', '_______');
    input.setAttribute('data-mask', '');
    input.setAttribute('data-placeholder', '');
    result.value = input.value;
  } else {
    countryWrapper.querySelector('.jq-selectbox__select-text').style.backgroundImage = "url(\"".concat(selectedImg, "\")");
    input.setAttribute('placeholder', selectPlaceholder);
    input.setAttribute('data-mask', selectedDataValue);
    input.setAttribute('data-placeholder', selectPlaceholder);
    input.required ? inputMaskRequiredInit(input) : inputMaskInit(input);
    result.value = "".concat(select.value, " ").concat(input.value);
  }
};
var updateGroupCheckboxesValidity = function updateGroupCheckboxesValidity(node) {
  var wrapper = node.closest(WRAPPER_SELECTOR);
  var checkboxes = wrapper.querySelectorAll('input[type="checkbox"]');
  var checkboxChecked = wrapper.querySelector('input[type="checkbox"]:checked');
  var checkboxNotChecked = wrapper.querySelectorAll('input[type="checkbox"]:not(:checked)');
  if (checkboxChecked) {
    checkboxNotChecked.forEach(function (item) {
      item.required = false;
    });
    checkNodeValidity(checkboxChecked);
  } else {
    checkboxes.forEach(function (item) {
      item.required = true;
    });
    checkNodeValidity(node);
  }
};
var inputFileHandler = function inputFileHandler(node) {
  var files = node.files;
  var maxSize = parseInt(node.getAttribute('data-max-size'));
  var previewNode = node.closest(WRAPPER_SELECTOR).querySelector('.form-file');
  var previewNodeData = previewNode.querySelector('.form-file__preview');
  if (files.length) {
    var file = files[0];
    var src = URL.createObjectURL(file);
    var name = file.name;
    var size = file.size / 1000;
    previewNode.querySelector('[data-file-img]').src = src;
    previewNode.querySelector('[data-file-name]').textContent = name;
    previewNode.querySelector('[data-file-size]').textContent = "".concat(size, "\u043A\u0431");
    previewNodeData.classList.remove(HIDDEN_CLASS);
    if (size > maxSize) {
      node.setCustomValidity("\u0420\u0430\u0437\u043C\u0435\u0440 \u0444\u0430\u0439\u043B\u0430 \u0431\u043E\u043B\u044C\u0448\u0435 ".concat(maxSize, " \u043A\u0431"));
      previewNode.classList.add(invalidClass);
    } else {
      node.setCustomValidity('');
      previewNode.classList.remove(invalidClass);
    }
  } else {
    node.setCustomValidity('');
    previewNodeData.classList.add(HIDDEN_CLASS);
    previewNode.classList.remove(invalidClass);
  }
};
var inputFileRequiredHadler = function inputFileRequiredHadler(node) {
  inputFileHandler(node);
  checkNodeValidity(node);
};
var inputFileMultipleHandler = function inputFileMultipleHandler(node) {
  var files = node.files;
  var fileListContainer = node.closest(WRAPPER_SELECTOR).querySelector('[data-file-list]');
  fileListContainer.innerHTML = '';
  for (var index = 0; index < files.length; index++) {
    var li = document.createElement('li');
    li.classList.add('input-file__list-item');
    li.setAttribute('data-last-modified', files[index].lastModified);
    li.setAttribute('data-size', files[index].size);
    var nameItemNode = document.createElement('span');
    nameItemNode.classList.add('input-file__list-name');
    nameItemNode.textContent = files[index].name;
    var sizeItemNode = document.createElement('span');
    sizeItemNode.classList.add('input-file__list-size');
    sizeItemNode.textContent = "".concat(files[index].size / 1024, " \u043A\u0431");
    var removeItemNode = document.createElement('span');
    removeItemNode.classList.add('input-file__list-cross');
    removeItemNode.classList.add('cross-style');
    removeItemNode.addEventListener('click', removeFileListItem);
    li.append(nameItemNode);
    li.append(sizeItemNode);
    li.append(removeItemNode);
    fileListContainer.append(li);
  }
  if (node.dataset.totalSize || node.dataset.filesCount) {
    inputFileMultipleCheckValidity(node);
  }
};
var inputFileMultipleRequiredHandler = function inputFileMultipleRequiredHandler(node) {
  inputFileMultipleHandler(node);
  // inputFileMultipleCheckValidity(node);
};

var inputFileMultipleCheckValidity = function inputFileMultipleCheckValidity(node) {
  var maxTotalSize = node.dataset.totalSize * 1024;
  var files = node.files;
  var filesSizes = Array.from(files).map(function (item) {
    return item.size / 1024;
  });
  var dataFilesCount = parseInt(node.dataset.filesCount);
  var totalSize = filesSizes.reduce(function (prev, curr) {
    return prev + curr;
  });
  files.length && files.length <= dataFilesCount && totalSize <= maxTotalSize ? node.setCustomValidity('') : node.setCustomValidity('Invalid field');
  checkNodeValidity(node);
};
var removeFileListItem = function removeFileListItem(e) {
  var eTarget = e.target;
  var fileNode = eTarget.closest('li');
  var inputFile = eTarget.closest(WRAPPER_SELECTOR).querySelector('input[type="file"]');
  var fileList = _toConsumableArray(inputFile.files);
  var fileLastModified = parseInt(fileNode.getAttribute('data-last-modified'));
  var fileSize = parseInt(fileNode.getAttribute('data-size'));
  var fileName = fileNode.textContent;
  var newFileList = fileList.filter(function (item) {
    var lastModified = item.lastModified,
      name = item.name,
      size = item.size;
    if (lastModified === fileLastModified || name === fileSize || size === fileName) {
      return false;
    } else {
      return true;
    }
  });
  inputFile.files = new FileListItems(newFileList);
  eTarget.dispatchEvent(new Event('change', {
    bubbles: true
  }));
  eTarget.removeEventListener('click', removeFileListItem);
  eTarget.closest('li').remove();
  if (inputFile.dataset.totalSize || inputFile.dataset.filesCount || inputFile.required) {
    inputFileMultipleCheckValidity(inputFile);
  }
};
var FileListItems = function FileListItems(files) {
  var b = new ClipboardEvent('').clipboardData || new DataTransfer();
  for (var i = 0, len = files.length; i < len; i++) {
    b.items.add(files[i]);
  }
  return b.files;
};
var editableInputFileMultipleInit = function editableInputFileMultipleInit(node) {
  var userfileListArray = _toConsumableArray(node.files);
  node.addEventListener('click', function (e) {
    userfileListArray = _toConsumableArray(e.target.files);
  });
  node.addEventListener('change', function (e) {
    var newFileListArray = _toConsumableArray(e.target.files);
    if (userfileListArray.length) {
      newFileListArray.forEach(function (item) {
        var lastModified = item.lastModified,
          name = item.name,
          size = item.size;
        var duplicatefileListArray = userfileListArray.filter(function (itemFL) {
          if (lastModified === itemFL.lastModified || name === itemFL.name || size === itemFL.size) {
            return true;
          } else {
            return false;
          }
        });
        if (!duplicatefileListArray.length) {
          userfileListArray.push(item);
        }
      });
    } else {
      userfileListArray = _toConsumableArray(newFileListArray);
    }
    node.files = new FileListItems(userfileListArray);
  });
};