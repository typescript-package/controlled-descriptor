import { ControlledDescriptor } from "../lib";
import { ControlledDescriptorController } from '@typescript-package/controller';
import { Person } from "./person.test";

const person = new Person();

const key = 'age';

let controlledDescriptor = new ControlledDescriptor(person, key, {
  onGet(key, previousValue, value) {
    console.log(`Getting ${key}: ${previousValue} => ${value}`);
    return value;
  },
  onSet(value, previousValue, key) {
    console.log(`Setting ${key}: ${previousValue} => ${value}`);
    return value;
  },
  previousDescriptor: Object.getOwnPropertyDescriptor(person, key)
});

let secondControlledDescriptor = new ControlledDescriptor(person, key, {
  onGet(key, previousValue, value) {
    console.log(`Second Getting ${key}: ${previousValue} => ${value}`);
    return value;
  },
  onSet(value, previousValue, key) {
    console.log(`Second Setting ${key}: ${previousValue} => ${value}`);
    return value;
  },
  previousDescriptor: controlledDescriptor
});

Object.defineProperty(person, 'age', controlledDescriptor);

person.age = 30;
person.age;

console.group(`Controlled Descriptor for `, controlledDescriptor.key);

console.log(`Active: `, controlledDescriptor.active);
console.log(`Controller: `, controlledDescriptor.controller);
console.log(`Enabled: `, controlledDescriptor.enabled);
console.log(`Index: `, controlledDescriptor.index);
console.log(`Private Key: `, controlledDescriptor.privateKey);

console.groupEnd();

describe('ControlledDescriptor', () => {
  let person = new Person();
  let onControlledDescriptor = new ControlledDescriptor(person, key, {
    onGet(key, previousValue, value) {
      console.log(`Getting ${key}: ${previousValue} => ${value}`);
      it(`should call onGet when getting the value`, () => {
        expect(previousValue).toEqual(30);
        expect(value).toEqual(30);
      });
      return value;
    },
    onSet(value, previousValue, key) {
      console.log(`Setting ${key}: ${previousValue} => ${value}`);
      it(`should call onGet when getting the value`, () => {
        expect(previousValue).toEqual(37);
        expect(value).toEqual(30);
      });
      return value;
    }
  });

  beforeEach(() => {
    person = new Person();
    controlledDescriptor = new ControlledDescriptor(person, key);
    onControlledDescriptor = new ControlledDescriptor(person, key);
  });

  it('should be active', () => {
    expect(controlledDescriptor.active).toBe(true);
  });

  it(`should have a get and set method`, () => {
    expect(typeof controlledDescriptor.get).toEqual('function');
    expect(typeof controlledDescriptor.set).toEqual('function');
  });

  it('should have a controller', () => {
    expect(controlledDescriptor.controller).toBeInstanceOf(ControlledDescriptorController);
  });

  it('should be enabled', () => {
    expect(controlledDescriptor.enabled).toBe(true);
  });

  it('should have an index undefined', () => {
    expect(controlledDescriptor.index).toBeUndefined();
  });

  it('should have a key and private key', () => {
    expect(controlledDescriptor.privateKey).toBeDefined();
    expect(controlledDescriptor.key).toEqual(key);
    expect(controlledDescriptor.privateKey).toEqual('_' + key);
  });

  it(`should have a person.age equal to 30`, () => {
    Object.defineProperty(person, 'age', controlledDescriptor);
    person.age = 30;
    expect(person.age).toEqual(30);
    expect(person._age).toEqual(30);
  });

  it(`should be disabled`, () => {
    Object.defineProperty(person, 'age', controlledDescriptor);
    controlledDescriptor.controller.disable();

    person.age = 30;
    expect(person.age).toBeUndefined();
    expect(person._age).toEqual(37);

    controlledDescriptor.controller.enable();

    person.age = 30;
    expect(person.age).toEqual(30);
    expect(person._age).toEqual(30);
  });

  it(`should call onGet when getting the value`, () => {
    Object.defineProperty(person, 'age', onControlledDescriptor);
    person.age;
  });

  it(`should call onSet when setting the value`, () => {
    Object.defineProperty(person, 'age', onControlledDescriptor);
    person.age = 30;
  });
});
