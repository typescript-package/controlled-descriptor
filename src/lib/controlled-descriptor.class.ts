// Abstract.
import { ControlledDescriptorBase } from './controlled-descriptor-base.abstract';
// Class.
import { ControlledDescriptorController } from '@typescript-package/controller';
// Interface.
import { ControlledPropertyDescriptor } from '@typedly/controlled-descriptor';
import { WrappedPropertyDescriptor } from '@typedly/descriptor';
import { WrappedPropertyDescriptorController } from '@typedly/controller';
/**
 * @description The concrete implementation controlled descriptor class with controller to control its behavior.
 * @export
 * @class ControlledDescriptor
 * @template [O=any] The type of object.
 * @template {keyof O} [K=keyof O] The type of the key.
 * @template {K extends keyof O ? O[K] : any} [V=K extends keyof O ? O[K] : any] The type of the value.
 * @template {boolean} [A=boolean] The type of the active.
 * @template {boolean} [N=boolean] The type of the enabled.
 * @template {boolean} [C=boolean] The type of the configurable.
 * @template {boolean} [E=boolean] The type of the enumerable.
 * @template {ControlledPropertyDescriptor<O, K, V, A, N, C, E, D> | PropertyDescriptor} [D=ControlledPropertyDescriptor<O, K, V, A, N, C, E, any>] The type of previous and `get`, `set` descriptor.
 * @extends {ControlledDescriptorBase<O, K, V, A, N, C, E, D>}
 */
export class ControlledDescriptor<
  // Object.
  O = any,
  // Key.
  K extends keyof O = keyof O,
  // Value.
  V extends K extends keyof O ? O[K] : any = K extends keyof O ? O[K] : any,
  // Active.
  A extends boolean = boolean,
  // Enabled.
  N extends boolean = boolean,
  // Configurable.
  C extends boolean = boolean,
  // Enumerable.
  E extends boolean = boolean,
  // Descriptor.
  D extends ControlledPropertyDescriptor<O, K, V, A, N, C, E, D> | PropertyDescriptor = ControlledPropertyDescriptor<O, K, V, A, N, C, E, any>,
> extends ControlledDescriptorBase<O, K, V, A, N, C, E, D> {
  /**
   * @description The string tag for the descriptor.
   * @public
   * @readonly
   * @type {string}
   */
  public get [Symbol.toStringTag](): string {
    return 'ControlledDescriptor';
  }

  /**
   * Creates an instance of `ControlledDescriptor`.
   * @constructor
   * @param {O} object The object of the key.
   * @param {K} key The object key.
   * @param {Partial<WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>>} [attributes={}] The attributes of the descriptor.
   * @param {new (
   *       object: O,
   *       key: K,
   *       descriptor: Partial<WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>>,
   *     ) => WrappedPropertyDescriptorController<O, K, V, A, N, C, E, D>} [controller=ControlledDescriptorController] The controller to control accessors.
   */
  constructor(
    object: O,
    key: K,
    attributes: Partial<WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>> = {},
    controller: new (
      object: O,
      key: K,
      descriptor: Partial<WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>>,
    ) => WrappedPropertyDescriptorController<O, K, V, A, N, C, E, D> = ControlledDescriptorController<O, K, V, A, N, C, E, D>
  ) {
    super(object, key, attributes, controller);
  }
}
