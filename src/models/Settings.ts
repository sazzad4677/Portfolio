import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISettings extends Document {
  tagline: string;
  heroDescription: string;
  aboutParagraphs: string[];
  cvLink: string;
  contactEmail: string;
  profileImage: string;
}

const SettingsSchema = new Schema<ISettings>(
  {
    tagline: { type: String, default: "" },
    heroDescription: { type: String, default: "" },
    aboutParagraphs: { type: [String], default: [] },
    cvLink: { type: String, default: "" },
    contactEmail: { type: String, default: "" },
    profileImage: { type: String, default: "" },
  },
  { timestamps: true }
);

const Settings: Model<ISettings> = mongoose.models.Settings || mongoose.model<ISettings>("Settings", SettingsSchema);

export default Settings;
