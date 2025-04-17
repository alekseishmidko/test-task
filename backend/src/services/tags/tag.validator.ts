import * as yup from "yup";
import { Tag, UpdateTagDto } from ".";

export const findTagDtoValidator: yup.Schema<Tag> = yup.object({
  stationId: yup
    .number()
    .required("stationId is required")
    .positive("stationId must be a positive number")
    .integer("stationId must be an integer"),
  title: yup
    .string()
    .required("Current tag title is required")
    .min(1, "Title must be at least 1 character"),
}) as yup.Schema<Tag>;

export const updateTagDtoValidator: yup.Schema<UpdateTagDto> = yup.object({
  stationId: yup.number().required().positive().integer(),
  title: yup.string().required().min(1),
  newTitle: yup.string().required().min(1),
}) as yup.Schema<UpdateTagDto>;
