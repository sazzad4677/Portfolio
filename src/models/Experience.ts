import mongoose, { Schema, Document, Model } from "mongoose";

export interface IExperience extends Document {
  company: string;
  name: string;
  position: string;
  startDate: Date;
  endDate?: Date;
  isCurrent: boolean;
  website?: string;
  description: string[];
  technologies: string[];
}

const ExperienceSchema = new Schema<IExperience>(
  {
    company: { type: String, required: true },
    name: { type: String, required: true }, // Not sure what 'name' means in context of Experience, maybe project name or something, adhering to user's req
    position: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    isCurrent: { type: Boolean, default: false },
    website: { type: String },
    description: { type: [String], default: [] },
    technologies: { type: [String], default: [] },
  },
  { timestamps: true }
);

const Experience: Model<IExperience> = mongoose.models.Experience || mongoose.model<IExperience>("Experience", ExperienceSchema);

export default Experience;
