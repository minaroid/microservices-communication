export class MessageDto<T> {
    readonly message?: T;
  
    constructor(partial: Partial<MessageDto<T>>) {
      Object.assign(this, partial);
    }
  }