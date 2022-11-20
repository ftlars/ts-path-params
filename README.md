# ts-path-params [![Build](https://github.com/ftlars/ts-path-params/actions/workflows/integrate.yml/badge.svg)](https://github.com/ftlars/ts-path-params/actions/workflows/integrate.yml)

Typesafely set path parameter values for express style routes.

## Installation

```bash
npm i @ftlars/ts-path-params
```

```bash
yarn add @ftlars/ts-path-params
```

## Usage

```ts
import {type PathParameters, setPathParameters} from '@ftlars/ts-path-params';

const productsApi = '/api/products/:productId' as const;

const parameters: PathParameters<typeof productsApi, 'productId'> = {
	productId: '123',
};

const pathWithParametersSet = setPathParameters(productsApi, parameters); // -> 'api/products/123'
```

## Typesafety 

```ts
import {type PathParameters, setPathParameters} from '@ftlars/ts-path-params';

// Example 1 -->
const productsApi = '/api/products/:productId' as const;

// Oops, misspelled 'productId' as 'id' in the PathParameters type
const parameters: PathParameters<typeof productsApi, 'id'> = {
	id: '123', // --> Type 'string' is not assignable to type 'never'.ts(2322)
};

// Example 2 -->
const path = '/api/products/:productId' as const;

// If you dont want to explicitly set the type of your parameters object and there is a type error, setPathParameters will give an error instead.
const parameters = {
	id: '123', // Oops, misspelled 'productId' as 'id'
};

const set = setPathParameters(path, parameters);
// -> Argument of type '{ id: string; }' is not assignable to parameter of type 'PathParameters<"/api/products/:productId", "id">'.
```

## API

**General**
- setPathParameters - Replaces parameters in the given path with values picked from the given PathParameters record.

**Types**
- PathParameters - Requires two parameters: the type of the path and parameters you want to set as a string union. It feels weird having to give the parameters to this type and then setting them again in the object itself - this is due to a limitation of typescript. PathParameters will given an error if you try to set a value for a parameter that is not a substring of the provided path prefixed with a colon (':').
