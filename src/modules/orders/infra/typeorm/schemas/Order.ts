import {
  ObjectID,
  Entity,
  Column,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('orders')
class Order {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  amount: number;

  @Column()
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Order;
