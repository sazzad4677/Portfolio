import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICertification extends Document {
  title: string;
  issuer: string;
  date: string; // The user specified string for date, we can keep it as string
  description: string;
  link: string;
  order: number;
}

const CertificationSchema = new Schema<ICertification>(
  {
    title: { type: String, required: true },
    issuer: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String, default: "" },
    link: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Certification: Model<ICertification> = mongoose.models.Certification || mongoose.model<ICertification>("Certification", CertificationSchema);

export default Certification;
