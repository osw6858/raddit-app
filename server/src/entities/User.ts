import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  OneToMany,
  BeforeInsert,
} from "typeorm";
import { IsEmail, Length } from "class-validator";
import bcrypt from "bcryptjs";
import Post from "./Post";
import Vote from "./Vote";
import BaseEntity from "./Entity";

@Entity("users") //user 클래스가 엔티티임을 알려줌 -> DB에 user테이블로 저장
export default class User extends BaseEntity {
  @Index() //검색이 많은 컬럼에서 사용 -> 책갈피 같은 역할
  @IsEmail(undefined, { message: "이메일 주소가 잘못되었습니다." }) //이메일 유효성 검사
  @Length(1, 255, { message: "이메일 주소는 비워둘 수 없습니다." }) //이메일 길이 검사
  @Column({ unique: true }) //유니크 제약조건 -> 중복방지 --> PK랑은 다름 PK = NotNull + 유니크 제약조건
  email: string;

  @Index()
  @Length(3, 255, { message: "사용자 이름은 3자리 이상이어야 합니다." })
  @Column({ unique: true }) //유니크 제약조건 -> 중복방지
  username: string;

  @Length(6, 255, { message: "비밀번호는 6자리 이상이어야 합니다." })
  @Column()
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Vote, (vote) => vote.user)
  vote: Vote[];

  @BeforeInsert() //이해안감
  async hasPassword() {
    this.password = await bcrypt.hash(this.password, 6);
  }
}

