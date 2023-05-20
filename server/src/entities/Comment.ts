import { Exclude, Expose } from "class-transformer";
import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { makeId } from "../utils/helper";
import BaseEntity from "./Entity";
import Post from "./Post";
import User  from "./User";
import Vote from "./Vote";

@Entity("comments")
export default class Comment extends BaseEntity {
  @Index()
  @Column()
  identifier: string;

  @Column()
  body: string;

  @Column()
  username: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "username", referencedColumnName: "username" })
  user: User;

  @Column()
  postId: number;

  @ManyToOne(() => Post, (post) => post.comments, { nullable: false })
  post: Post;

  @Exclude() //이건 왜 exclude 하는지 모름 공부해야함
  @OneToMany(() => Vote, (vote) => vote.comment)
  votes: Vote[];

  protected userVote: number;

  setUserVote(user: User) {
    //이부분 이해 안감 findIndex메소드 공부해 볼것!
    const index = this.votes.findIndex((v) => v.username === user.username);
    this.userVote = index > -1 ? this.votes[index].value : 0;
  }

  @Expose() get voteScore(): number {
    const init = 0;
    return this.votes?.reduce(
      (preval, curval) => preval + (curval.value || 0),
      init
    );
  }

  @BeforeInsert()
  makeId() {
    this.identifier = makeId(8);
  }
}

//docker에 대해서 공부할것
