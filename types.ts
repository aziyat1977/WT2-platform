export enum UserRole {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
}

export enum AppMode {
  DASHBOARD = 'DASHBOARD',
  LEARN = 'LEARN',     // Standard scrolling content
  KAHOOT = 'KAHOOT',   // Gamified quiz
  IELTS = 'IELTS',     // Simulation CD test
}

export enum Personality {
  INTROVERT = 'INTROVERT', // Minimal, calm, focus-oriented
  EXTROVERT = 'EXTROVERT', // Gamified, loud, social-oriented
  AMBIVERT = 'AMBIVERT',   // Balanced
}

export interface Option {
  id: string;
  text: string;
  correct: boolean;
  feedback: string;
}

export interface QuizItem {
  id: string;
  type: 'quiz';
  question: string;
  options: Option[];
}

export interface LessonItem {
  id: string;
  type: 'lesson';
  title: string;
  contentHTML: string;
  citation: string;
}

export type CourseItem = LessonItem | QuizItem;

export interface AppState {
  role: UserRole;
  mode: AppMode;
  personality: Personality;
  darkMode: boolean;
  currentCourseIndex: number;
  score: number;
  completedIds: string[];
}