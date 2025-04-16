import db from "../../db";

export interface Station {
  id: number;
  name: string;
}
export class StationsService {
  async getAllStations(): Promise<Station[]> {
    try {
      const query = `SELECT * FROM "Station" ORDER BY name ASC`;
      const result = await db.query<Station>(query);

      return result.rows;
    } catch (error) {
      throw new Error("Unable to fetch stations");
    }
  }
}

export const stationsService = new StationsService();
