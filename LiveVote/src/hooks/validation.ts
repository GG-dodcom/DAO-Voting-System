/* eslint-disable @typescript-eslint/no-explicit-any */
import Ajv from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";

const ajv = new Ajv({
	allErrors: true,
	allowUnionTypes: true,
	$data: true,
	passContext: true,
});
// @ts-ignore
addFormats(ajv);
addErrors(ajv);

ajv.addFormat("long", {
	validate: () => true,
});

ajv.addFormat("lowercase", {
	validate: (value: string) => value === value.toLowerCase(),
});

ajv.addFormat("color", {
	validate: (value: string) => {
		if (!value) return false;
		return !!value.match(/^#[0-9A-F]{6}$/);
	},
});

ajv.addKeyword({
	keyword: "maxLengthWithSpaceType",
	validate: function validate(schema: any, data: any) {
		// @ts-ignore
		const spaceType = this.spaceType || "default";
		const isValid = data.length <= schema[spaceType];
		if (!isValid) {
			// @ts-ignore
			validate.errors = [
				{
					keyword: "maxLengthWithSpaceType",
					message: `must not have more than ${schema[spaceType]}`,
					params: { limit: schema[spaceType] },
				},
			];
		}
		return isValid;
	},
	errors: true,
});

ajv.addKeyword({
	keyword: "maxItemsWithSpaceType",
	validate: function validate(schema: any, data: any) {
		// @ts-ignore
		const spaceType = this.spaceType || "default";
		const isValid = data.length <= schema[spaceType];
		if (!isValid) {
			// @ts-ignore
			validate.errors = [
				{
					keyword: "maxItemsWithSpaceType",
					message: `must NOT have more than ${schema[spaceType]} items`,
					params: { limit: schema[spaceType] },
				},
			];
		}
		return isValid;
	},
	errors: true,
});

ajv.addKeyword({
	keyword: "isFile",
	validate: function validate(schema: any, data: any) {
		// Check if the schema requires the data to be a File object
		if (!schema) return true; // If schema is false, skip validation

		const isValid = data instanceof File;
		if (!isValid) {
			// Attach validation error
			// @ts-ignore
			validate.errors = [
				{
					keyword: "isFile",
					message: "Must upload image",
					params: { keyword: "isFile" },
				},
			];
		}
		return isValid;
	},
	errors: true, // Indicates this keyword produces validation errors
});

export function validateSchema(
	schema: any,
	data: any,
	spaceType: string = "default"
) {
	const ajvValidate = ajv.compile(schema);
	const valid = ajvValidate.call(spaceType, data);
	return valid ? valid : ajvValidate.errors;
}

//------------------------------------------------------------------------------------------------------------

function getErrorMessage(errorObject: any): string {
	if (!errorObject.message) return "Invalid field.";

	if (errorObject.keyword === "format") {
		switch (errorObject.params.format) {
			case "address":
				return "Must be a valid address.";
			case "ethValue":
				return "Must be a number.";
			case "customUrl":
				return "Must be a valid URL.";
			case "uri":
				return "Must be a valid URL.";
			case "percentage":
				return "Percentage must be between 0 and 100.";
			default:
				return "Invalid format.";
		}
	}

	return `${errorObject.message
		.charAt(0)
		.toLocaleUpperCase()}${errorObject.message.slice(1)}.`;
}

export function validateForm(
	schema: Record<string, any>,
	form: Record<string, any>,
	spaceType: string = "default"
): Record<string, any> {
	const valid = validateSchema(schema, form, spaceType);
	// console.log(form)
	// console.log('valid', valid);
	if (!Array.isArray(valid)) return {};
	return transformAjvErrors(valid);
}

interface ValidationErrorOutput {
	[key: string]: ValidationErrorOutput | string;
}
function transformAjvErrors(errors: any): ValidationErrorOutput {
	errors = errors.map((error: any) => {
		if (error.instancePath) return error;
		const propertyName = error.params.missingProperty;
		if (!propertyName) return error;
		const path = `/${propertyName}`;
		return {
			...error,
			instancePath: path,
		};
	});

	return errors.reduce((output: ValidationErrorOutput, error: any) => {
		const path: string[] = extractPathFromError(error);

		// Skip the current error if the path is empty
		if (path.length === 0) {
			return output;
		}

		const targetObject: ValidationErrorOutput = findOrCreateNestedObject(
			output,
			path
		);

		targetObject[path[path.length - 1]] = getErrorMessage(error);
		return output;
	}, {});
}

function extractPathFromError(error: any): string[] {
	if (!error.instancePath) {
		return [];
	}
	return error.instancePath.split("/").slice(1);
}

function findOrCreateNestedObject(
	output: ValidationErrorOutput,
	path: string[]
): ValidationErrorOutput {
	const parentPath: string[] = path.slice(0, path.length - 1);
	const parentObject: ValidationErrorOutput = parentPath.reduce(
		(current: ValidationErrorOutput, subpath: string) => {
			if (!current[subpath]) {
				current[subpath] = {} as ValidationErrorOutput;
			}
			return current[subpath] as ValidationErrorOutput;
		},
		output
	);

	return parentObject;
}
