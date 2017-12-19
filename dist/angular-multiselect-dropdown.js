/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1);

var _main = __webpack_require__(4);

var _main2 = _interopRequireDefault(_main);

var _v1docs = __webpack_require__(6);

var _v1docs2 = _interopRequireDefault(_v1docs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

angular.module('AngularjsDropdownMultiselectExample', ['angularjs-dropdown-multiselect', 'hljs', 'ui.bootstrap', 'ui.router']).component('main', (0, _main2.default)()).component('v1Docs', (0, _v1docs2.default)()).config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider.state({
		name: 'main',
		url: '/main',
		template: '<main></main>'
	});

	$stateProvider.state({
		name: 'v1',
		url: '/v1',
		template: '<v1-docs></v1-docs>'
	});

	$urlRouterProvider.otherwise('/main');
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _angularjsDropdownMultiselect = __webpack_require__(2);

var _angularjsDropdownMultiselect2 = _interopRequireDefault(_angularjsDropdownMultiselect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

angular.module('angularjs-dropdown-multiselect', []).directive('dmDropdownStaticInclude', function ($compile) {
	'ngInject';

	return function directive(scope, element, attrs) {
		var template = attrs.dmDropdownStaticInclude;
		var contents = element.html(template).contents();
		$compile(contents)(scope);
	};
}).directive('ngDropdownMultiselect', _angularjsDropdownMultiselect2.default);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = dropdownMultiselectDirective;

var _angularjsDropdownMultiselect = __webpack_require__(3);

var _angularjsDropdownMultiselect2 = _interopRequireDefault(_angularjsDropdownMultiselect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function dropdownMultiselectDirective() {
	return {
		restrict: 'AE',
		scope: {
			selectedModel: '=',
			options: '=',
			extraSettings: '=',
			events: '=',
			searchFilter: '=?',
			translationTexts: '=',
			disabled: '='
		},
		transclude: {
			toggleDropdown: '?toggleDropdown'
		},
		controller: _angularjsDropdownMultiselect2.default,
		templateUrl: 'app/component/angularjs-dropdown-multiselect.html'
	};
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = dropdownMultiselectController;
/*
	eslint no-param-reassign: [
		"error",
		{
			"props": true,
			"ignorePropertyModificationsFor": [
				"$scope"
			]
		}
	]
*/

function contains(collection, target) {
	var containsTarget = false;
	collection.some(function (object) {
		if (object === target) {
			containsTarget = true;
			return true;
		}
		return false;
	});
	return containsTarget;
}

function getIndexByProperty(collection, objectToFind, property) {
	var index = -1;
	collection.some(function (option, ind) {
		if (option[property] === objectToFind[property]) {
			index = ind;
			return true;
		}
		return false;
	});
	return index;
}

function dropdownMultiselectController($scope, $element, $filter, $document) {
	'ngInject';

	var $dropdownTrigger = $element.children()[0];
	var externalEvents = {
		onItemSelect: angular.noop,
		onItemDeselect: angular.noop,
		onSelectAll: angular.noop,
		onDeselectAll: angular.noop,
		onInitDone: angular.noop,
		onMaxSelectionReached: angular.noop,
		onSelectionChanged: angular.noop,
		onClose: angular.noop
	};

	var settings = {
		dynamicTitle: true,
		scrollable: false,
		scrollableHeight: '300px',
		closeOnBlur: true,
		displayProp: 'label',
		enableSearch: false,
		clearSearchOnClose: false,
		selectionLimit: 0,
		showCheckAll: true,
		showUncheckAll: true,
		showEnableSearchButton: false,
		closeOnSelect: false,
		buttonClasses: 'btn btn-default',
		closeOnDeselect: false,
		groupBy: undefined,
		checkBoxes: false,
		groupByTextProvider: null,
		smartButtonMaxItems: 0,
		smartButtonTextConverter: angular.noop,
		styleActive: false,
		selectedToTop: false,
		keyboardControls: false,
		template: '{{getPropertyForObject(option, settings.displayProp)}}',
		searchField: '$',
		showAllSelectedText: false
	};

	var texts = {
		checkAll: 'Check All',
		uncheckAll: 'Uncheck All',
		selectionCount: 'checked',
		selectionOf: '/',
		searchPlaceholder: 'Search...',
		buttonDefaultText: 'Select',
		dynamicButtonTextSuffix: 'checked',
		disableSearch: 'Disable search',
		enableSearch: 'Enable search',
		selectGroup: 'Select all:',
		allSelectedText: 'All'
	};

	var input = {
		searchFilter: $scope.searchFilter || ''
	};

	angular.extend(settings, $scope.extraSettings || []);
	angular.extend(externalEvents, $scope.events || []);
	angular.extend(texts, $scope.translationTexts);

	if (settings.closeOnBlur) {
		$document.on('click', function (e) {
			if ($scope.open) {
				var target = e.target.parentElement;
				var parentFound = false;

				while (angular.isDefined(target) && target !== null && !parentFound) {
					if (!!target.className.split && contains(target.className.split(' '), 'multiselect-parent') && !parentFound) {
						if (target === $dropdownTrigger) {
							parentFound = true;
						}
					}
					target = target.parentElement;
				}

				if (!parentFound) {
					$scope.$apply(function () {
						$scope.close();
					});
				}
			}
		});
	}

	angular.extend($scope, {
		toggleDropdown: toggleDropdown,
		checkboxClick: checkboxClick,
		externalEvents: externalEvents,
		settings: settings,
		texts: texts,
		input: input,
		close: close,
		selectCurrentGroup: selectCurrentGroup,
		getGroupLabel: getGroupLabel,
		getButtonText: getButtonText,
		getPropertyForObject: getPropertyForObject,
		selectAll: selectAll,
		deselectAll: deselectAll,
		setSelectedItem: setSelectedItem,
		isChecked: isChecked,
		keyDownLink: keyDownLink,
		keyDownSearchDefault: keyDownSearchDefault,
		keyDownSearch: keyDownSearch,
		getFilter: getFilter,
		toggleSearch: toggleSearch,
		keyDownToggleSearch: keyDownToggleSearch,
		orderFunction: orderFunction
	});

	$scope.externalEvents.onInitDone();

	function focusFirstOption() {
		setTimeout(function () {
			var elementToFocus = angular.element($element)[0].querySelector('.option');
			if (angular.isDefined(elementToFocus) && elementToFocus != null) {
				elementToFocus.focus();
			}
		}, 0);
	}

	function toggleDropdown() {
		if ($scope.open) {
			$scope.close();
		} else {
			$scope.open = true;
		}
		if ($scope.settings.keyboardControls) {
			if ($scope.open) {
				if ($scope.settings.selectionLimit === 1 && $scope.settings.enableSearch) {
					setTimeout(function () {
						angular.element($element)[0].querySelector('.searchField').focus();
					}, 0);
				} else {
					focusFirstOption();
				}
			}
		}
		if ($scope.settings.enableSearch) {
			if ($scope.open) {
				setTimeout(function () {
					angular.element($element)[0].querySelector('.searchField').focus();
				}, 0);
			}
		}
	}

	function checkboxClick($event, option) {
		$scope.setSelectedItem(option, false, true);
		$event.stopImmediatePropagation();
	}

	function close() {
		$scope.open = false;
		$scope.input.searchFilter = $scope.settings.clearSearchOnClose ? '' : $scope.input.searchFilter;
		$scope.externalEvents.onClose();
	}

	function selectCurrentGroup(currentGroup) {
		$scope.selectedModel.splice(0, $scope.selectedModel.length);
		$scope.options.forEach(function (item) {
			if (item[$scope.settings.groupBy] === currentGroup) {
				$scope.setSelectedItem(item, false, false);
			}
		});
		$scope.externalEvents.onSelectionChanged();
	}

	function getGroupLabel(groupValue) {
		if ($scope.settings.groupByTextProvider !== null) {
			return $scope.settings.groupByTextProvider(groupValue);
		}

		return groupValue;
	}

	function textWidth(text) {
		var $btn = $element.find('button');
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		ctx.font = $btn.css('font-size') + $btn.css('font-family');
		// http://stackoverflow.com/questions/38823353/chrome-canvas-2d-context-measuretext-giving-me-weird-results
		ctx.originalFont = $btn.css('font-size') + $btn.css('font-family');
		ctx.fillStyle = '#000000';
		return ctx.measureText(text).width;
	}

	function getButtonText() {
		if ($scope.settings.dynamicTitle && $scope.selectedModel && $scope.selectedModel.length > 0) {
			if ($scope.settings.smartButtonMaxItems > 0) {
				var paddingWidth = 12 * 2;
				var borderWidth = 1 * 2;
				var dropdownIconWidth = 8;
				var widthLimit = $element[0].offsetWidth - paddingWidth - borderWidth - dropdownIconWidth;

				var itemsText = [];

				angular.forEach($scope.options, function (optionItem) {
					if ($scope.isChecked(optionItem)) {
						var displayText = $scope.getPropertyForObject(optionItem, $scope.settings.displayProp);
						var converterResponse = $scope.settings.smartButtonTextConverter(displayText, optionItem);

						itemsText.push(converterResponse || displayText);
					}
				});

				if ($scope.selectedModel.length > $scope.settings.smartButtonMaxItems) {
					itemsText = itemsText.slice(0, $scope.settings.smartButtonMaxItems);
					itemsText.push('...');
				}

				var result = itemsText.join(', ');
				var index = result.length - 4;
				if ($element[0].offsetWidth === 0) {
					return result;
				}
				if (widthLimit <= textWidth('...')) {
					return '...';
				}
				while (textWidth(result) > widthLimit) {
					if (itemsText[itemsText.length - 1] !== '...') {
						itemsText.push('...');
						result = result + '...';
						index = result.length - 4;
					}
					result = result.slice(0, index) + result.slice(index + 1);
					index -= 1;
				}

				return result;
			}
			var totalSelected = angular.isDefined($scope.selectedModel) ? $scope.selectedModel.length : 0;

			if (totalSelected === 0) {
				return $scope.texts.buttonDefaultText;
			}

			if ($scope.settings.showAllSelectedText && totalSelected === $scope.options.length) {
				return $scope.texts.allSelectedText;
			}

			return totalSelected + ' ' + $scope.texts.dynamicButtonTextSuffix;
		}
		return $scope.texts.buttonDefaultText;
	}

	function getPropertyForObject(object, property) {
		if (angular.isDefined(object) && Object.prototype.hasOwnProperty.call(object, property)) {
			return object[property];
		}

		return undefined;
	}

	function selectAll() {
		$scope.deselectAll(true);
		$scope.externalEvents.onSelectAll();

		var searchResult = $filter('filter')($scope.options, $scope.getFilter($scope.input.searchFilter));
		angular.forEach(searchResult, function (value) {
			$scope.setSelectedItem(value, true, false);
		});
		$scope.externalEvents.onSelectionChanged();
		$scope.selectedGroup = null;
	}

	function deselectAll() {
		var dontSendEvent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

		if (!dontSendEvent) {
			$scope.externalEvents.onDeselectAll();
		}

		$scope.selectedModel.splice(0, $scope.selectedModel.length);
		if (!dontSendEvent) {
			$scope.externalEvents.onSelectionChanged();
		}
		$scope.selectedGroup = null;
	}

	function setSelectedItem(option) {
		var dontRemove = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
		var fireSelectionChange = arguments[2];

		var exists = void 0;
		var indexOfOption = void 0;
		if (angular.isDefined(settings.idProperty)) {
			exists = getIndexByProperty($scope.selectedModel, option, settings.idProperty) !== -1;
			indexOfOption = getIndexByProperty($scope.selectedModel, option, settings.idProperty);
		} else {
			exists = $scope.selectedModel.indexOf(option) !== -1;
			indexOfOption = $scope.selectedModel.indexOf(option);
		}

		if (!dontRemove && exists) {
			$scope.selectedModel.splice(indexOfOption, 1);
			$scope.externalEvents.onItemDeselect(option);
			if ($scope.settings.closeOnDeselect) {
				$scope.close();
			}
		} else if (!exists && ($scope.settings.selectionLimit === 0 || $scope.selectedModel.length < $scope.settings.selectionLimit)) {
			$scope.selectedModel.push(option);
			if (fireSelectionChange) {
				$scope.externalEvents.onItemSelect(option);
			}
			if ($scope.settings.closeOnSelect) {
				$scope.close();
			}
			if ($scope.settings.selectionLimit > 0 && $scope.selectedModel.length === $scope.settings.selectionLimit) {
				$scope.externalEvents.onMaxSelectionReached();
			}
		} else if ($scope.settings.selectionLimit === 1 && !exists && $scope.selectedModel.length === $scope.settings.selectionLimit) {
			$scope.selectedModel.splice(0, 1);
			$scope.selectedModel.push(option);
			if (fireSelectionChange) {
				$scope.externalEvents.onItemSelect(option);
			}
			if ($scope.settings.closeOnSelect) {
				$scope.close();
			}
		}
		if (fireSelectionChange) {
			$scope.externalEvents.onSelectionChanged();
		}
		$scope.selectedGroup = null;
	}

	function isChecked(option) {
		if (angular.isDefined(settings.idProperty)) {
			return getIndexByProperty($scope.selectedModel, option, settings.idProperty) !== -1;
		}
		return $scope.selectedModel.indexOf(option) !== -1;
	}

	function keyDownLink(event) {
		var sourceScope = angular.element(event.target).scope();
		var nextOption = void 0;
		var parent = event.target.parentNode;
		if (!$scope.settings.keyboardControls) {
			return;
		}
		if (event.keyCode === 13 || event.keyCode === 32) {
			// enter
			event.preventDefault();
			if (sourceScope.option) {
				$scope.setSelectedItem(sourceScope.option, false, true);
			} else if (event.target.id === 'deselectAll') {
				$scope.deselectAll();
			} else if (event.target.id === 'selectAll') {
				$scope.selectAll();
			}
		} else if (event.keyCode === 38) {
			// up arrow
			event.preventDefault();
			if (parent.previousElementSibling) {
				nextOption = parent.previousElementSibling.querySelector('a') || parent.previousElementSibling.querySelector('input');
			}
			while (!nextOption && !!parent) {
				parent = parent.previousElementSibling;
				if (parent) {
					nextOption = parent.querySelector('a') || parent.querySelector('input');
				}
			}
			if (nextOption) {
				nextOption.focus();
			}
		} else if (event.keyCode === 40) {
			// down arrow
			event.preventDefault();
			if (parent.nextElementSibling) {
				nextOption = parent.nextElementSibling.querySelector('a') || parent.nextElementSibling.querySelector('input');
			}
			while (!nextOption && !!parent) {
				parent = parent.nextElementSibling;
				if (parent) {
					nextOption = parent.querySelector('a') || parent.querySelector('input');
				}
			}
			if (nextOption) {
				nextOption.focus();
			}
		} else if (event.keyCode === 27) {
			event.preventDefault();

			$scope.toggleDropdown();
		}
	}

	function keyDownSearchDefault(event) {
		var parent = event.target.parentNode.parentNode;
		var nextOption = void 0;
		if (!$scope.settings.keyboardControls) {
			return;
		}
		if (event.keyCode === 9 || event.keyCode === 40) {
			// tab
			event.preventDefault();
			focusFirstOption();
		} else if (event.keyCode === 38) {
			event.preventDefault();
			if (parent.previousElementSibling) {
				nextOption = parent.previousElementSibling.querySelector('a') || parent.previousElementSibling.querySelector('input');
			}
			while (!nextOption && !!parent) {
				parent = parent.previousElementSibling;
				if (parent) {
					nextOption = parent.querySelector('a') || parent.querySelector('input');
				}
			}
			if (nextOption) {
				nextOption.focus();
			}
		} else if (event.keyCode === 27) {
			event.preventDefault();

			$scope.toggleDropdown();
		}
	}

	function keyDownSearch(event, searchFilter) {
		var searchResult = void 0;
		if (!$scope.settings.keyboardControls) {
			return;
		}
		if (event.keyCode === 13) {
			if ($scope.settings.selectionLimit === 1 && $scope.settings.enableSearch) {
				searchResult = $filter('filter')($scope.options, $scope.getFilter(searchFilter));
				if (searchResult.length === 1) {
					$scope.setSelectedItem(searchResult[0], false, true);
				}
			} else if ($scope.settings.enableSearch) {
				$scope.selectAll();
			}
		}
	}

	function getFilter(searchFilter) {
		var filter = {};
		filter[$scope.settings.searchField] = searchFilter;
		return filter;
	}

	function toggleSearch($event) {
		if ($event) {
			$event.stopPropagation();
		}
		$scope.settings.enableSearch = !$scope.settings.enableSearch;
		if (!$scope.settings.enableSearch) {
			$scope.input.searchFilter = '';
		}
	}

	function keyDownToggleSearch() {
		if (!$scope.settings.keyboardControls) {
			return;
		}
		if (event.keyCode === 13) {
			$scope.toggleSearch();
			if ($scope.settings.enableSearch) {
				setTimeout(function () {
					angular.element($element)[0].querySelector('.searchField').focus();
				}, 0);
			} else {
				focusFirstOption();
			}
		}
	}

	function orderFunction(object1, object2) {
		if (angular.isUndefined(object2)) {
			return -1;
		}
		if (angular.isUndefined(object1)) {
			return 1;
		}
		if (object1.type !== 'object' || object2.type !== 'object') {
			return object1.index < object2.index ? -1 : 1;
		}
		var v1 = object1.value;
		var v2 = object2.value;
		// first order by group
		if ($scope.settings.groupBy) {
			if (v1[$scope.settings.groupBy] !== v2[$scope.settings.groupBy]) {
				if (v1[$scope.settings.groupBy] < v2[$scope.settings.groupBy]) {
					return 1;
				}
				return -1;
			}
		}
		if (!$scope.settings.selectedToTop) {
			return $scope.options.indexOf(v1) < $scope.options.indexOf(v2) ? -1 : 1;
		}
		// then order selected to top
		if (!$scope.isChecked(v1) && !$scope.isChecked(v2) || $scope.isChecked(v1) && $scope.isChecked(v2)) {
			return $scope.options.indexOf(v1) < $scope.options.indexOf(v2) ? -1 : 1;
		}
		if ($scope.isChecked(v1)) {
			return -1;
		}
		return 1;
	}
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = mainComponent;

var _main = __webpack_require__(5);

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mainComponent() {
	var component = {
		templateUrl: 'app/main/main.template.html',
		controller: _main2.default
	};

	return component;
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
	eslint no-param-reassign: [
		"error",
		{
			"props": true,
			"ignorePropertyModificationsFor": [
				"$scope"
			]
		}
	]
*/

var MainController = function MainController($scope, $log) {
	'ngInject';

	_classCallCheck(this, MainController);

	$scope.testing = true;
	$scope.testmodel = [{ id: 1 }];
	$scope.testdata = [{ id: 1, label: 'David' }, { id: 2, label: 'Jhon' }, { id: 3, label: 'Danny' }];
	$scope.testsettings = {
		selectionLimit: 1,
		selectedToTop: true,
		idProperty: 'id'
	};
	$scope.testevents = {
		onSelectionChanged: function onSelectionChanged() {
			// This event is not firing on selection of max limit
			$log.debug('you changed selection');
		}
	};

	$scope.example1model = [];
	$scope.example1data = [{ id: 1, label: 'David' }, { id: 2, label: 'Jhon' }, { id: 3, label: 'Danny' }];

	$scope.example2model = [];
	$scope.example2data = [{ id: 1, label: 'David' }, { id: 2, label: 'Jhon' }, { id: 3, label: 'Danny' }];
	$scope.example2settings = { displayProp: 'id' };

	$scope.example5model = [];
	$scope.example5data = [{ id: 1, label: 'David' }, { id: 2, label: 'Jhon' }, { id: 3, label: 'Danny' }];
	$scope.example5settings = {};
	$scope.example5customTexts = { buttonDefaultText: 'Select Users' };

	$scope.example6data = [{ id: 1, label: 'David' }, { id: 2, label: 'Jhon' }, { id: 3, label: 'Danny' }];
	$scope.example6model = [$scope.example6data[0], $scope.example6data[2]];
	$scope.example6settings = {};

	$scope.example7model = [];
	$scope.example7data = [{ id: 1, label: 'David' }, { id: 2, label: 'Jhon' }, { id: 3, label: 'Danny' }];
	$scope.example7settings = { externalIdProp: '' };
	$scope.customFilter = 'a';

	$scope.example8model = [];
	$scope.example8data = [{ id: 1, label: 'David' }, { id: 2, label: 'Jhon' }, { id: 3, label: 'Danny' }];
	$scope.example8settings = {
		checkBoxes: true
	};

	$scope.example9model = [];
	$scope.example9data = [{ id: 1, label: 'David' }, { id: 2, label: 'Jhon' }, { id: 3, label: 'Danny' }];
	$scope.example9settings = { enableSearch: true };

	$scope.example10model = [];
	$scope.example10data = [{ id: 1, label: 'David' }, { id: 2, label: 'Jhon' }, { id: 3, label: 'Danny' }];

	$scope.example10settings = { selectionLimit: 2 };

	$scope.example12model = [];
	$scope.example12data = [{ id: 1, label: 'David' }, { id: 2, label: 'Jhon' }, { id: 3, label: 'Danny' }];

	$scope.example12settings = { selectionLimit: 1 };

	$scope.example11model = [];
	$scope.example11data = [{ id: 1, label: 'David', gender: 'M' }, { id: 2, label: 'Jhon', gender: 'M' }, { id: 3, label: 'Lisa', gender: 'F' }, { id: 4, label: 'Nicole', gender: 'F' }, { id: 5, label: 'Danny', gender: 'M' }];

	$scope.example11settings = {
		groupByTextProvider: function groupByTextProvider(groupValue) {
			if (groupValue === 'M') {
				return 'Male';
			}
			return 'Female';
		},

		groupBy: 'gender'
	};

	$scope.selectByGroupModel = [];
	$scope.selectByGroupData = [{ id: 1, label: 'David', gender: 'M' }, { id: 2, label: 'Jhon', gender: 'M' }, { id: 3, label: 'Lisa', gender: 'F' }, { id: 4, label: 'Nicole', gender: 'F' }, { id: 5, label: 'Danny', gender: 'M' }, { id: 6, label: 'Unknown', gender: 'O' }];

	$scope.selectByGroupSettings = {
		selectByGroups: ['F', 'M'],
		groupByTextProvider: function groupByTextProvider(groupValue) {
			switch (groupValue) {
				case 'M':
					return 'Male';
				case 'F':
					return 'Female';
				default:
					return 'Other';
			}
		},

		groupBy: 'gender'
	};

	$scope.example13model = [];
	$scope.example13data = [{ id: 1, label: 'David' }, { id: 2, label: 'Jhon' }, { id: 3, label: 'Lisa' }, { id: 4, label: 'Nicole' }, { id: 5, label: 'Danny' }];

	$scope.example13settings = {
		smartButtonMaxItems: 3,
		smartButtonTextConverter: function smartButtonTextConverter(itemText) {
			if (itemText === 'Jhon') {
				return 'Jhonny!';
			}

			return itemText;
		}
	};

	$scope.example14model = [];
	$scope.example14data = [{ id: 1, label: 'David' }, { id: 2, label: 'Jhon' }, { id: 3, label: 'Lisa' }, { id: 4, label: 'Nicole' }, { id: 5, label: 'Danny' }, { id: 6, label: 'Dan' }, { id: 7, label: 'Dean' }, { id: 8, label: 'Adam' }, { id: 9, label: 'Uri' }, { id: 10, label: 'Phil' }];

	$scope.example14settings = {
		scrollableHeight: '100px',
		scrollable: true
	};

	$scope.example15model = [];
	$scope.example15data = [{ id: 1, label: 'David' }, { id: 2, label: 'Jhon' }, { id: 3, label: 'Lisa' }, { id: 4, label: 'Nicole' }, { id: 5, label: 'Danny' }];

	$scope.example15settings = {
		enableSearch: true
	};

	$scope.example16model = [];
	$scope.example16data = [{ id: 1, label: 'David' }, { id: 2, label: 'Jhon' }, { id: 3, label: 'Lisa' }, { id: 4, label: 'Nicole' }, { id: 5, label: 'Danny' }];
	$scope.example16settings = {
		styleActive: true
	};

	$scope.example17model = [];
	$scope.example17data = [{ id: 1, label: 'David' }, { id: 2, label: 'Jhon' }, { id: 3, label: 'Lisa' }, { id: 4, label: 'Nicole' }, { id: 5, label: 'Danny' }];
	$scope.example17settings = {
		keyboardControls: true
	};

	$scope.example18model = [];
	$scope.example18data = [{ id: 1, label: 'David' }, { id: 2, label: 'Jhon' }, { id: 3, label: 'Lisa' }, { id: 4, label: 'Nicole' }, { id: 5, label: 'Danny' }];
	$scope.example18settings = {
		keyboardControls: true,
		enableSearch: true,
		selectionLimit: 1
	};

	$scope.example19model = [];
	$scope.example19data = [{ id: 1, name: 'David' }, { id: 2, name: 'Jhon' }, { id: 3, name: 'Lisa' }, { id: 4, name: 'Nicole' }, { id: 5, name: 'Danny' }];
	$scope.example19settings = {
		template: '<b>{{option.name}}</b>'
	};

	$scope.example20model = [];
	$scope.example20data = [{ id: 1, label: 'David', age: 23 }, { id: 2, label: 'Jhon', age: 24 }, { id: 3, label: 'Danny', age: 26 }];
	$scope.example20settings = {
		searchField: 'age',
		enableSearch: true
	};

	$scope.example21model = [];
	$scope.example21data = [{ id: 1, label: 'David' }, { id: 2, label: 'Jhon' }, { id: 3, label: 'Danny' }];
	$scope.example21settings = {
		showEnableSearchButton: true
	};

	$scope.searchSelectAllModel = [];
	$scope.searchSelectAllData = [{ id: 1, label: 'David' }, { id: 2, label: 'Jhon' }, { id: 3, label: 'Danny' }];
	$scope.searchSelectAllSettings = {
		enableSearch: true,
		keyboardControls: true
	};

	$scope.disabledModel = [];
	$scope.disabledData = [{ id: 1, label: 'David', disabled: true }, { id: 2, label: 'Jhon' }, { id: 3, label: 'Danny' }];

	$scope.selectedToTopModel = [];
	$scope.selectedToTopData = [{ id: 1, label: 'David' }, { id: 2, label: 'Jhon' }, { id: 3, label: 'Danny' }];
	$scope.selectedToTopSettings = {
		selectedToTop: true
	};

	$scope.stringModel = [];
	$scope.stringData = ['David', 'Jhon', 'Danny'];
	$scope.stringSettings = {
		template: '{{option}}',
		smartButtonTextConverter: function smartButtonTextConverter(skip, option) {
			return option;
		}
	};

	$scope.transclusionModel = [];
	$scope.transclusionData = [{ id: 1, label: 'David' }, { id: 2, label: 'Jhon' }, { id: 3, label: 'Danny' }];
	$scope.transclusionSettings = {};

	$scope.idPropertyModel = [{ id: 1 }];
	$scope.idPropertyData = [{ id: 1, label: 'David' }, { id: 2, label: 'Jhon' }, { id: 3, label: 'Danny' }];
	$scope.idPropertySettings = {
		idProperty: 'id'
	};
};

exports.default = MainController;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = v1Component;
function v1Component() {
	var component = {
		templateUrl: 'app/v1docs/v1docs.template.html'
	};

	return component;
}

/***/ })
/******/ ]);