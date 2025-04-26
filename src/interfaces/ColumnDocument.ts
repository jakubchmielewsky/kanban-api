import { Document } from "mongoose";
import { ColumnInterface } from "./ColumnInterface";

export interface ColumnDocument extends ColumnInterface, Document {}
