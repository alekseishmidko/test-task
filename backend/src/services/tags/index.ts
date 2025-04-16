import db from "../../db";
export interface Tag {
  stationId: number;
  title: string;
}

type UpdateTagDto = Tag & { newTitle: string };
export class TagService {
  async updateTag(dto: UpdateTagDto): Promise<void> {
    const query = `
          UPDATE "Tag"
          SET "title" = $1
          WHERE "stationId" = $2 AND "title" = $3
        `;
    const { newTitle, stationId, title } = dto;
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
