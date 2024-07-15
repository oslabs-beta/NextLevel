import mongoose from 'mongoose';

const MetricSchema = new mongoose.Schema({
  metricType: {
    type: String,
    required: [true, 'Metric type was not provided']
  },
  metricValue: {
    type: Number,
    required: [true, 'Metric value was not provided']
  },
  metricDate: {
    type: Date,
    required: [true, 'Metric date was not provided'],
    default: Date.now
  }
});

const BundleSchema = new mongoose.Schema({
  bundleLog: {
    type: String,
    required: [true, 'Build log was not provided']
  },
  bundleDate: {
    type: Date,
    required: [true, 'Build date was not provided'],
    default: Date.now
  },
});

const BuildSchema = new mongoose.Schema({
  buildTime: {
    type: Number,
    required: [true, 'Build time was not provided']
  },
  buildDate: {
    type: Date,
    required: [true, 'Build date was not provided'],
    default: Date.now
  },
})

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: true,
  },
  password: {
    type: String,
  },
  APIkey: {
    type: String,
    required: [true, 'API key was not provided'],
    unique: true,
  },
  FCP: [MetricSchema],
  LCP: [MetricSchema],
  TTFB: [MetricSchema],
  CLS: [MetricSchema],
  FID: [MetricSchema],
  INP: [MetricSchema],
  bundleLog: [BundleSchema],
  buildTime: [BuildSchema]
});

export default mongoose.models.User || mongoose.model('User', UserSchema, 'Users');
