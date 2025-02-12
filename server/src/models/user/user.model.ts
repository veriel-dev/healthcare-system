import mongoose, { Schema } from 'mongoose';
import { IUser } from '../../types/models';
import { UserStatus } from '../../types/auth.types';

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    speciality: {
      type: String,
      required: true,
    },
    licenseNumber: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: Object.values(UserStatus),
      required: true,
      default: UserStatus.ACTIVE,
    },
    contactInfo: {
      phone: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      emergencyContact: {
        name: {
          type: String,
          required: true,
        },
        phone: {
          type: String,
          required: true,
        },
        relationship: {
          type: String,
          default: '',
        },
      },
    },
    schedule: [
      {
        day: String,
        startTime: String,
        endTime: String,
      },
    ],
    profileImage: {
      url: {
        type: String,
        default: 'https://placehold.co/100x100',
      },
      key: {
        type: String,
        default: '',
      },
      uploadedAt: {
        type: Date,
      },
    },
    education: {
      institution: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      year: {
        type: Number,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    workingHours: {
      maxPatientsPerDay: Number,
      preferredAppointmentDuration: Number,
      breakTime: {
        start: String,
        end: String,
      },
    },
    notificationPreferences: {
      email: { type: Boolean, required: true },
      sms: { type: Boolean, required: true },
      pushNotifications: { type: Boolean, required: true },
    },
    signature: {
      image: String,
      lastUpdated: Date,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

// userSchema.index({ email: 1 }, { unique: true });
// userSchema.index({ licenseNumber: 1 }, { sparse: true });
userSchema.index({ lastName: 1, firstName: 1 });
userSchema.pre('save', function (next) {
  if (!this.isNew) {
    this.lastLogin = new Date();
  }
  next();
});

export const User = mongoose.model<IUser>('User', userSchema);
