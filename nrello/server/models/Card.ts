import { Document, Schema, model } from "mongoose";

export interface CardDocument extends Document {
  title: string;
  description: string;
  owner: string;
  list: string;
  label?: string;
}

const cardSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "제목은 필수 항목입니다."],
    },
    description: {
      type: String,
      default: null,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "소유자는 필수 항목입니다."],
    },
    list: {
      type: Schema.Types.ObjectId,
      ref: "List",
      required: [true, "목록은 필수 항목입니다."],
    },
    label: {
      type: String,
      default: null,
      required: [true, "라벨은 필수 값 입니다."],
    },
  },
  {
    timestamps: true,
  }
);

export const Card = model<CardDocument>("Card", cardSchema);
