import {
  EventSubscriber,
  EntitySubscriberInterface,
  DataSource,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { User } from './entities/user.entity';

@EventSubscriber()
export class UsersSubscriber implements EntitySubscriberInterface<User> {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  beforeInsert(event: InsertEvent<User>) {
    console.log('INSERT:\m', event.entity);
  }

  beforeUpdate(event: UpdateEvent<User>) {
    console.log('UPDATE:\m', event.entity);
  }
}
