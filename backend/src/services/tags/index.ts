import db from "../../db";
import { findTagDtoValidator, updateTagDtoValidator } from "./tag.validator";

export interface Tag {
  stationId: number;
  title: string;
}

export type UpdateTagDto = Tag & { newTitle: string };

export class TagService {
  async findTag(dto: Tag): Promise<boolean> {
    const validDto = await findTagDtoValidator.validate(dto);

    const { stationId, title } = validDto;

    const result = await db.query<Tag>(
      `SELECT * FROM "Tag" WHERE "stationId" = $1 AND "title" = $2`,
      [stationId, title]
    );

    return !!result.rows[0];
  }

  async updateTag(dto: UpdateTagDto): Promise<void> {
    const validDto = await updateTagDtoValidator.validate(dto);
    const { newTitle, stationId, title } = validDto;

    const query = `
      UPDATE "Tag"
      SET "title" = $1
      WHERE "stationId" = $2 AND "title" = $3
    `;
    const values = [newTitle, stationId, title];

    try {
      const result = await db.query(query, values);

      if (result.rowCount === 0) {
        throw new Error("Tag not found or nothing to update");
      }
    } catch (error) {
      console.error("Error updating tag:", error);
      throw new Error("Unable to update tag");
    }
  }
}

export const tagsService = new TagService();
