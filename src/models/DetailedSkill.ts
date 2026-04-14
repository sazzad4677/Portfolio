import mongoose, { Schema, Document, Model } from "mongoose";

export interface IDetailedSkill extends Document {
  category: string;
  items: string[];
  order: number;
}

const DetailedSkillSchema = new Schema<IDetailedSkill>(
  {
    category: { type: String, required: true },
    items: { type: [String], default: [] },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const DetailedSkill: Model<IDetailedSkill> = mongoose.models.DetailedSkill || mongoose.model<IDetailedSkill>("DetailedSkill", DetailedSkillSchema);

export default DetailedSkill;
