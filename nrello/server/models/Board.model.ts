import {Schema, model, Document} from 'mongoose'
import BoardSchema from "~/schemas/Board.schema";

export interface BoardDocument extends Document {
    name:string;
    lists: string[];
    owner: string;
    coverImage:string;
}

const boardSchema = new Schema(
    {
        name: {
            type: String,
            default: "Untitled Board",
        },
        lists: [
            {
                type: Schema.Types.ObjectId,
                ref: "List",
            }
        ],
        owner: {
            type: Schema.Types.ObjectId,
            ref: "List",
        },
        coverImage: {
            type: String,
            default: null,
        }
    },
    {
        timestamps: true,

    }
);

export const Board = model<BoardDocument>("Board", boardSchema);
