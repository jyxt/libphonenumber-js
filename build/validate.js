'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = is_valid;

var _parse = require('./parse');

var _parse2 = _interopRequireDefault(_parse);

var _metadata = require('./metadata');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Checks if a given phone number is valid
//
// Example use cases:
//
// ```js
// is_valid('8005553535', 'RU')
// is_valid('8005553535', 'RU', metadata)
// is_valid({ phone: '8005553535', country: 'RU' })
// is_valid({ phone: '8005553535', country: 'RU' }, metadata)
// is_valid('+78005553535')
// is_valid('+78005553535', metadata)
// ```
//
function is_valid(first_argument, second_argument, third_argument) {
	var _sort_out_arguments = sort_out_arguments(first_argument, second_argument, third_argument),
	    input = _sort_out_arguments.input,
	    metadata = _sort_out_arguments.metadata;

	// Sanity check


	if (!metadata) {
		throw new Error('Metadata not passed');
	}

	if (!input) {
		return false;
	}

	if (!input.country) {
		return false;
	}

	var country_metadata = metadata.countries[input.country];

	if ((0, _metadata.get_types)(country_metadata)) {
		if (!(0, _parse.get_number_type)(input.phone, input.country, metadata)) {
			return false;
		}
	}

	return true;
}

// Sort out arguments
function sort_out_arguments(first_argument, second_argument, third_argument) {
	var input = void 0;
	var metadata = void 0;

	if (typeof first_argument === 'string') {
		// If country code is supplied
		if (typeof second_argument === 'string') {
			metadata = third_argument;

			// `parse` extracts phone numbers from raw text,
			// therefore it will cut off all "garbage" characters,
			// while this `validate` function needs to verify
			// that the phone number contains no "garbage"
			// therefore the explicit `is_viable_phone_number` check.
			if ((0, _parse.is_viable_phone_number)(first_argument)) {
				input = (0, _parse2.default)(first_argument, second_argument, metadata);
			}
		}
		// Just an international phone number is supplied
		else {
				metadata = second_argument;

				// `parse` extracts phone numbers from raw text,
				// therefore it will cut off all "garbage" characters,
				// while this `validate` function needs to verify
				// that the phone number contains no "garbage"
				// therefore the explicit `is_viable_phone_number` check.
				if ((0, _parse.is_viable_phone_number)(first_argument)) {
					input = (0, _parse2.default)(first_argument, metadata);
				}
			}
	} else {
		// The `first_argument` must be a valid phone number
		// as a whole, not just a part of it which gets parsed here.
		if (first_argument && first_argument.phone && (0, _parse.is_viable_phone_number)(first_argument.phone)) {
			input = first_argument;
		}

		metadata = second_argument;
	}

	return { input: input, metadata: metadata };
}
//# sourceMappingURL=validate.js.map