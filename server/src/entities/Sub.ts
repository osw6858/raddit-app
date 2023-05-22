import { Expose } from "class-transformer";
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import BaseEntity from "./Entity";
import Post from "./Post";
import User from "./User"
//커뮤니티
@Entity("subs")
export default class Sub extends BaseEntity {
  // class object(클래스) <--> plain object(json형식 object)
  @Index()
  @Column({ unique: true })
  name: string;

  @Column()
  title: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ nullable: true })
  imageUrn: string;

  @Column({ nullable: true })
  bannerUrn: string;

  @Column()
  username: string; // <- JoinColum에 첫번쨰 매개변수 name:

  @ManyToOne(() => User)
  @JoinColumn({ name: "username", referencedColumnName: "username" }) //referencedColumnName -> 참조하는 테이블 컬럼 이름
  user: User;

  @OneToMany(() => Post, (post) => post.sub)
  posts: Post[];

  @Expose() // <- class transformer모듈
  get imageUrl(): string {
    return this.imageUrn // <- 이게 있다면(조건문)
      ? `${process.env.APP_URL}/images/${this.imageUrn}` //참이면 이거 실행
      : "https://www.gravatar.com/avatar?d=mp&f=y"; //거짓이면 이거 실행
  }

  //삼항연산자는 조건문 ? 선택문1:선택문2 로 구성된다.
  //조건문이 참이면 선택문1을 실행하고, 조건문이 거짓이면 선택문 2를 실행.

  @Expose() // class 객체에서 get매소드를 사용하여 프론트쪽으로 데이터를 전달할때 사용
  get bannerUrl(): string | undefined {
    return this.bannerUrn
      ? `${process.env.APP_URL}/images/${this.bannerUrn}` //${process.env.APP_URL} == localhost:4000
      : undefined;
  }
}
//typescript class 개념 , class transformer모듈 @Expose() , @Exclude 개념 공부!!
