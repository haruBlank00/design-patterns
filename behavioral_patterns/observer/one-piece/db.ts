import * as sqlite3 from "sqlite3";

export class DB {
  private static db: DB;

  private constructor() {
    DB.db = new sqlite3.Database("op.db");
  }

  static getInstance() {
    const isFirstInstance = DB.db === undefined;
    if (isFirstInstance) {
      DB.db = new DB();
    }
    return DB.db;
  }
}
