# ts-path-params

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
import {type PathParameters, setPathParameters} from '../src/index';

const productsApi = '/api/products/:productId' as const;

const parameters: PathParameters<typeof productsApi, 'id'> = {
	id: '123', // --> Type 'string' is not assignable to type 'never'.ts(2322)
};
```

## API

**General**
- setPathParameters - Replaces parameters in the given path with values picked from the given PathParameters record.

**Types**
- PathParameters - Requires two parameters: the type of the path and parameters you want to set as a string union. It feels weird having to give the parameters to this type and then setting them again in the object itself - this is due to a limitation of typescript. PathParameters will given an error if you try to set a value for a parameter that is not a substring of the provided path prefixed with a colon (':').

The PathParameters type requires y
