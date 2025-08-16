// Abstract.
import { ControlledDescriptorBase } from './controlled-descriptor-base.abstract';
// Interface.
import { ControlledPropertyDescriptor } from '@typedly/controlled-descriptor';
import { WrappedPropertyDescriptor } from '@typedly/descriptor';
import { WrappedPropertyDescriptorController } from '@typedly/controller';
/**
 * @description
 * @export
 * @class ControlledDescriptor
 * @template [O=any] 
 * @template {keyof O} [K=keyof O] 
 * @template {K extends keyof O ? O[K] : any} [V=K extends keyof O ? O[K] : any] 
 * @template {boolean} [A=boolean] 
 * @template {boolean} [N=boolean] 
 * @template {boolean} [C=boolean] 
 * @template {boolean} [E=boolean] 
 * @template {ControlledPropertyDescriptor<O, K, V, A, N, C, E, D>} [D=ControlledPropertyDescriptor<O, K, V, A, N, C, E, any>] 
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
  D extends ControlledPropertyDescriptor<O, K, V, A, N, C, E, D> = ControlledPropertyDescriptor<O, K, V, A, N, C, E, any>,
> extends ControlledDescriptorBase<O, K, V, A, N, C, E, D> {
  /**
   * @description The string tag for the descriptor.
   * @public
   * @readonly
   * @type {string}
   */
  public get [Symbol.toStringTag](): string {
    return 'ControllableDescriptor';
  }

  /**
   * Creates an instance of `ControlledDescriptor`.
   * @constructor
   * @param {O} object 
   * @param {K} key 
   * @param {Partial<WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>>} [attributes={}] 
   * @param {new (
   *       object: O,
   *       key: K,
   *       descriptor: Partial<WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>>,
   *     ) => WrappedPropertyDescriptorController<O, K, V, A, N, C, E, D>} controller 
   */
  constructor(
    object: O,
    key: K,
    attributes: Partial<WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>> = {},
    controller: new (
      object: O,
      key: K,
      descriptor: Partial<WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>>,
    ) => WrappedPropertyDescriptorController<O, K, V, A, N, C, E, D>
  ) {
    super(object, key, attributes, controller);
  }
}
