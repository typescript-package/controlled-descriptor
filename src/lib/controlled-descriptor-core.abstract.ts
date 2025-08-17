// Abstract.
import { WrappedDescriptorCore } from "@typescript-package/wrapped-descriptor";
// Interface.
import { ControlledPropertyDescriptor } from "@typedly/controlled-descriptor";
import { WrappedPropertyDescriptorController } from "@typedly/controller";
// Type.
import { GetterCallback, SetterCallback } from '@typedly/callback';
/**
 * @description The core abstraction class for controlled descriptors.
 * @export
 * @abstract
 * @class ControlledDescriptorCore
 * @template [O=any] The type of the object.
 * @template {keyof O} [K=keyof O] The type of the key.
 * @template {K extends keyof O ? O[K] : any} [V=K extends keyof O ? O[K] : any] The type of the value.
 * @template {boolean} [A=boolean] The type of the active.
 * @template {boolean} [N=boolean] The type of the enabled.
 * @template {boolean} [C=boolean] The type of the configurable.
 * @template {boolean} [E=boolean] The type of the enumerable.
 * @template {ControlledPropertyDescriptor<O, K, V, A, N, C, E, D>} [D=ControlledPropertyDescriptor<O, K, V, A, N, C, E, any>] The type of the previous descriptor.
 * @extends {WrappedDescriptorCore<O, K, V, A, N, C, E, D>}
 * @implements {ControlledPropertyDescriptor<O, K, V, A, N, C, E, D>}
 */
export abstract class ControlledDescriptorCore<
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
> extends WrappedDescriptorCore<O, K, V, A, N, C, E, D>
  implements ControlledPropertyDescriptor<O, K, V, A, N, C, E, D> {
  /**
   * @inheritdoc
   * @abstract
   * @readonly
   * @type {(A | { onGet?: boolean; onSet?: boolean })}
   */
  abstract override get active(): A | { onGet?: boolean; onSet?: boolean };

  /**
   * @description The `controller` for the descriptor.
   * @public
   * @readonly
   * @type {WrappedPropertyDescriptorController<O, K, V, A, N, C, E, D>}
   */
  abstract get controller(): WrappedPropertyDescriptorController<O, K, V, A, N, C, E, D>;

  /**
   * @inheritdoc
   * @abstract
   * @readonly
   * @type {N}
   */
  abstract override get enabled(): N;

  /**
   * @inheritdoc
   * @abstract
   * @readonly
   * @type {(number | undefined)}
   */
  abstract override get index(): number | undefined;

  /**
   * @inheritdoc
   * @abstract
   * @readonly
   * @type {K}
   */
  abstract override get key(): K;

  /**
   * @description
   * @abstract
   * @readonly
   * @type {D}
   */
  abstract get previous(): D | undefined;

  /**
   * @inheritdoc
   * @abstract
   * @readonly
   * @type {PropertyKey}
   */
  abstract override get privateKey(): PropertyKey;

  /**
   * @inheritdoc
   * @abstract
   * @readonly
   * @type {(this: O, descriptor?: D) => V}
   */
  abstract override get get(): (this: O, descriptor?: D) => V;

  /**
   * @inheritdoc
   * @abstract
   * @readonly
   * @type {(GetterCallback<O, K> | undefined)}
   */
  abstract override get onGet(): GetterCallback<O, K> | undefined;

  /**
   * @inheritdoc
   * @abstract
   * @readonly
   * @type {(SetterCallback<O, K> | undefined)}
   */
  abstract override get onSet(): SetterCallback<O, K> | undefined;

  /**
   * @inheritdoc
   * @abstract
   * @readonly
   * @type {(this: O, value: V, descriptor?: D) => void}
   */
  abstract override get set(): (this: O, value: V, descriptor?: D) => void;

}
