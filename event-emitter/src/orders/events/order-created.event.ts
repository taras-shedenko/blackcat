export class OrderCreatedEvent {
  constructor(
    public name: string,
    public description: string,
  ) {}
}
