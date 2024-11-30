/* eslint-disable @typescript-eslint/no-explicit-any */
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import addErrors from 'ajv-errors';
import pkg from '../../package.json';
import { Proposal } from './interfaces';

export function shortenAddress(str = '') {
  return `${str.slice(0, 6)}...${str.slice(str.length - 4)}`;
}

export function shorten(str: string, key?: any): string {
  if (!str) return str;
  let limit;
  if (typeof key === 'number') limit = key;
  if (key === 'symbol') limit = 6;
  if (key === 'name') limit = 64;
  if (key === 'choice') limit = 12;
  if (limit)
    return str.length > limit ? `${str.slice(0, limit).trim()}...` : str;
  return shortenAddress(str);
}

export function lsSet(key: string, value: any) {
  return localStorage.setItem(`${pkg.name}.${key}`, JSON.stringify(value));
}

export function lsGet(key: string, fallback?: any) {
  const item = localStorage.getItem(`${pkg.name}.${key}`);
  return jsonParse(item, fallback);
}

export function jsonParse(input: any, fallback?: any) {
  if (typeof input !== 'string') {
    return fallback || {};
  }
  try {
    return JSON.parse(input);
  } catch (err) {
    console.log(err);
    return fallback || {};
  }
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      if (reader.result) {
        resolve(reader.result.toString()); // Base64 string
      } else {
        reject('Could not convert file to Base64');
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };
  });
}

//----------------------------------------------Validation Schema----------------------------------------------
const ajv = new Ajv({
  allErrors: true,
  allowUnionTypes: true,
  $data: true,
  passContext: true,
});
// @ts-ignore
addFormats(ajv);
addErrors(ajv);

ajv.addFormat('long', {
  validate: () => true,
});

ajv.addFormat('lowercase', {
  validate: (value: string) => value === value.toLowerCase(),
});

ajv.addFormat('color', {
  validate: (value: string) => {
    if (!value) return false;
    return !!value.match(/^#[0-9A-F]{6}$/);
  },
});

ajv.addKeyword({
  keyword: 'maxLengthWithSpaceType',
  validate: function validate(schema: any, data: any) {
    // @ts-ignore
    const spaceType = this.spaceType || 'default';
    const isValid = data.length <= schema[spaceType];
    if (!isValid) {
      // @ts-ignore
      validate.errors = [
        {
          keyword: 'maxLengthWithSpaceType',
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
  keyword: 'maxItemsWithSpaceType',
  validate: function validate(schema: any, data: any) {
    // @ts-ignore
    const spaceType = this.spaceType || 'default';
    const isValid = data.length <= schema[spaceType];
    if (!isValid) {
      // @ts-ignore
      validate.errors = [
        {
          keyword: 'maxItemsWithSpaceType',
          message: `must NOT have more than ${schema[spaceType]} items`,
          params: { limit: schema[spaceType] },
        },
      ];
    }
    return isValid;
  },
  errors: true,
});

export function getChoiceString(proposal: Proposal, selected: number) {
  return proposal.choices[selected - 1].name;
}

export function validateSchema(
  schema: any,
  data: any,
  spaceType: string = 'default'
) {
  const ajvValidate = ajv.compile(schema);
  const valid = ajvValidate.call(spaceType, data);
  return valid ? valid : ajvValidate.errors;
}
