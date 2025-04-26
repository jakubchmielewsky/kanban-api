import { Document } from "mongoose";
import { TaskInterface } from "./TaskInterface";

export interface TaskDocument extends TaskInterface, Document {}
