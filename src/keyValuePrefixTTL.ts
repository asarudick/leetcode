

abstract class Command<K, V> {
  protected previousValue: V | undefined;
  protected value: V | undefined;
  protected key!: K;
  protected store: Map<K, V>;
  
  constructor(store: Map<K, V>) {
    this.store = store;
  }

  undo () {}
  do(key: K, value?: V){}
}

class SetCommand<K, V> extends Command<K, V> {
  do (key?: K, value?: V) {
    this.value = value ?? this.value;
    this.key = key ?? this.key;
    if (this.value === undefined) {
      return;
    }

    this.previousValue = this.store.get(this.key);
    this.store.set(this.key, this.value);
  }

  undo () {
    if (this.previousValue === undefined) {
      this.store.delete(this.key);
      return;
    }

    this.store.set(this.key, this.previousValue);
  }
}

class DeleteCommand<K, V> extends Command<K, V> {
  do(key?: K) {
    this.key = key ?? this.key;
    this.previousValue = this.store.get(this.key);

    if (this.previousValue === undefined) {
      return;
    }

    this.store.delete(this.key);
  }

  undo() {
    if (this.previousValue === undefined) {
      return;
    }
    this.store.set(this.key, this.previousValue);
  }
}

export class keyValuePrefixTTL<V> {
  
  public store;
  public undoCommands: any[];
  public redoCommands: any[];

  
  constructor () {
    this.store = new Map<string, {value: V, ttl?: number}>();
    this.undoCommands = [];
    this.redoCommands = [];
  }

  tryExpire (key: string) {
    const entry = this.store.get(key);
    if (entry?.ttl && entry.ttl < Date.now()) {
      this.store.delete(key);
    }
  }

  get (key: string) {
    this.tryExpire(key);
    return this.store.get(key);
  }

  set (key: string, value: V, ttl?: number) {
    const command = new SetCommand(this.store);
    command.do(key, { value, ttl });
    this.undoCommands.push(command);
  }

  has(key: string) {
    this.tryExpire(key);
    return this.store.has(key);
  }

  delete (key: string) {
    if (!this.has(key)) return;

    const command = new DeleteCommand(this.store);
    command.do(key);
    this.undoCommands.push(command);
  }

  prefixSearch (search: string) {
    return this.store.keys().map(i => {
      this.tryExpire(i);
      if (!this.has(i)) return;
      return i.startsWith(search) && i;
    });
  }

  undo () {
    if (!this.undoCommands.length) return;
    const command = this.undoCommands.pop();
    this.redoCommands.push(command);
    command.undo();
  }

  redo () {
    if (!this.redoCommands.length) return;
    const command = this.redoCommands.pop();
    this.undoCommands.push(command);
    command.do()
  }
}
