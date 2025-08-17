// Abstract.
import { ControlledDescriptorCore } from './controlled-descriptor-core.abstract';
// Interface.
import { ControlledPropertyDescriptor } from '@typedly/controlled-descriptor';
import { WrappedPropertyDescriptor } from '@typedly/descriptor';
import { WrappedPropertyDescriptorController } from '@typedly/controller';
/**
 * @description The base abstraction class for controlled descriptors.
 * @export
 * @abstract
 * @class ControlledDescriptorBase
 * @template [O=any] The type of object.
 * @template {keyof O} [K=keyof O] The type of the key.
 * @template {K extends keyof O ? O[K] : any} [V=K extends keyof O ? O[K] : any] The type of the value.
 * @template {boolean} [A=boolean] The type of active.
 * @template {boolean} [N=boolean] The type of enabled.
 * @template {boolean} [C=boolean] The type of configurable.
 * @template {boolean} [E=boolean] The type of enumerable.
 * @template {ControlledPropertyDescriptor<O, K, V, A, N, C, E, D>} [D=ControlledPropertyDescriptor<O, K, V, A, N, C, E, any>] The type of previous and `get`, `set` descriptor.
 * @extends {ControlledDescriptorCore<O, K, V, A, N, C, E, D>}
 */
export abstract class ControlledDescriptorBase<
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
  // The type of the previous descriptor.
  D extends ControlledPropertyDescriptor<O, K, V, A, N, C, E, D> = ControlledPropertyDescriptor<O, K, V, A, N, C, E, any>,
> extends ControlledDescriptorCore<O, K, V, A, N, C, E, D> {
  /**
   * @inheritdoc
   */
  public override get active() {
    return this.controller.active;
  }

  /**
   * @inheritdoc
   */
  public override get controller() {
    return this.#controller;
  }

  /**
   * @inheritdoc
   */
  public override get enabled() {
    return this.controller.enabled;
  }

  /**
   * @inheritdoc
   */
  public override get index() {
    return this.controller.index;
  }

  /**
   * @inheritdoc
   */
  public override get key() {
    return this.controller.key;
  }

  /**
   * @inheritdoc
   */
  public override get onGet() {
    return this.controller.onGet;
  }

  /**
   * @inheritdoc
   */
  public override get onSet() {
    return this.controller.onSet;
  }

  public get previous() {
    return this.controller.previous;
  }

  /**
   * @inheritdoc
   */
  public override get previousDescriptor() {
    return this.controller.previousDescriptor;
  }

  /**
   * @inheritdoc
   */
  public override get privateKey() {
    return this.controller.privateKey;
  }

  /**
   * @inheritdoc
   */
  public get get() {
    return this.controller.get!;
  }

  /**
   * @inheritdoc
   */
  public get set() {
    return this.controller.set!;
  }

  /**
   * @description Privately stored controller.
   * @type {WrappedPropertyDescriptorController<O, K, V, A, N, C, E, D>}
   */
  #controller: WrappedPropertyDescriptorController<O, K, V, A, N, C, E, D>;
  
  /**
   * Creates an instance of `WrappedDescriptorBase` child class.
   * @constructor
   * @param {O} object The object to define the descriptor on.
   * @param {K} key The key of the object to define the descriptor on.
   * @param {Partial<WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>>} attributes The property descriptor to wrap.
   * @param {new (
   *       object: O,
   *       key: K,
   *       attributes: Partial<WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>>,
   *     ) => WrappedPropertyDescriptorController<O, K, V, A, N, C, E, D>} controller The controller to control behavior.
   */
  constructor(
    object: O,
    key: K,
    attributes: Partial<WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>>,
    controller: new (
      object: O,
      key: K,
      attributes: Partial<WrappedPropertyDescriptor<O, K, V, A, N, C, E, D>>,
    ) => WrappedPropertyDescriptorController<O, K, V, A, N, C, E, D>
  ) {
    super({ configurable: attributes.configurable, enumerable: attributes.enumerable });
    // Set the controller.
    this.#controller = new controller(
      object,
      key, { 
        ...attributes,
        ...super.wrap({
          get: attributes.get,
          set: attributes.set
        })
      }
    );
  }
}
