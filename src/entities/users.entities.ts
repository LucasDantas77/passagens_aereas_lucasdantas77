import { getRounds, hashSync } from "bcrypt";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";

@Entity("users")
class Users {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 45 })
  name: string;

  @Column({ length: 45, unique: true })
  email: string;

  @Column({ length: 45 })
  password: string;

  @CreateDateColumn({ type: "date" })
  createdAt: string;

  @UpdateDateColumn({ type: "date" })
  updateAt: string;

  @DeleteDateColumn({ type: "date", nullable: true })
  deletedAt?: string | undefined | null;

  @BeforeInsert()
  @BeforeUpdate()
  hashPass() {
    const passHash = getRounds(this.password);
    if (!passHash) {
      this.password = hashSync(this.password, 10);
    }
  }
}

export { Users };
