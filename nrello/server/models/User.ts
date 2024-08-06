import { Schema, model, Document } from "mongoose";
import { generateHash } from "~/server/utils/hash";
import bcrypt from "bcryptjs";

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  stripeCustomerId?: string;
  comparePassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    stripeCustomerId: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// save 메서드 호출 전 실행 함수
userSchema.pre("save", async function (next) {
  // 변경사항 없으면 다음 미들웨어로 전달
  if (!this.isModified("password")) {
    return next();
  }

  // 비밀번호 변경 되었다면 비동기 방식으로 hash 처리 (암호화)
  this.password = await generateHash(this.password);
});

userSchema.methods.comparePassword = async function (password: string) {
  // 저장된 해시와 비교
  return await bcrypt.compare(password, this.password);
};

export const User = model<UserDocument>("User", userSchema);
