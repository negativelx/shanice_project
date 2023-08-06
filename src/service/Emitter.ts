export declare type EventType = string | symbol;

export declare interface Listener {
    once: boolean,
    handler: Function,
}

export declare type EventHandlerList = Array<Listener>;
export declare type EventHandlerMap = Map<EventType, EventHandlerList>;

class emitter {

    public listener: EventHandlerMap = new Map();

    /**
     * Register an event handler for the given type.
     * @param {string|symbol} type Type of event to listen for, or `"*"` for all events
     * @param {function} handler Function to call in response to given event
     */
    on(type: EventType, handler: Function): void {
        const listeners: EventHandlerList = <EventHandlerList>this.listener.get(type),
            listener: Listener = {once: false, handler},
            added: number | undefined = listeners && listeners.push(listener);
        if (!added)
            this.listener.set(type, [listener]);
    }

    /**
     * Register an event handler for the given type.
     * @param {string|symbol} type Type of event to listen for, or `"*"` for all events
     * @param {function} handler Function to call in response to given event
     */
    once(type: EventType, handler: Function): void {
        const listeners: EventHandlerList = <EventHandlerList>this.listener.get(type),
            listener: Listener = {once: true, handler},
            added: number | undefined = listeners && listeners.push(listener);
        if (!added)
            this.listener.set(type, [listener]);
    }

    /**
     * Remove an event handler for the given type.
     * @param {string|symbol} type Type of event to unregister `handler` from, or `"*"`
     * @param {Function} handler Handler function to remove
     */
    off(type: EventType, handler: Function): void {
        const listeners: EventHandlerList = <EventHandlerList>this.listener.get(type);
        if (listeners) {
            listeners.forEach((listener: Listener, index: number) => {
                if (handler === listener.handler)
                    listeners.splice(index, 1);
            });
        }
    }

    /**
     * Invoke all handlers for the given type.
     * If present, `"*"` handlers are invoked after type-matched handlers.
     *
     * Note: Manually firing "*" handlers is not supported.
     *
     * @param {string|symbol} type The event type to invoke
     * @param {...any[]} params Any value (object is recommended and powerful), passed to each handler
     */
    emit(type: EventType, ...params: any[]): void {
        if (!Array.isArray(params))
            params = [];
        if (type !== '*') {
            const listeners: EventHandlerList = <EventHandlerList>this.listener.get(type);
            if (listeners)
                listeners.every(async (listener: Listener, index: number) => {
                    const result = await listener.handler.apply(null, params);
                    if (listener.once)
                        listeners.splice(index, 1);
                    return result;
                });
        }
        const wildListeners: EventHandlerList = <EventHandlerList>this.listener.get('*');
        if (wildListeners)
            wildListeners.every(async (listener: Listener, index: number) => {
                const result = await listener.handler.apply(null, [type, ...params]);
                if (listener.once)
                    wildListeners.splice(index, 1);
                return result;
            });
    }
}

export default new emitter();
