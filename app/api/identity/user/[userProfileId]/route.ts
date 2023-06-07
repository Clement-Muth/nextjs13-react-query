import { db } from "libraries/db/kysely";
import { seed } from "libraries/db/seed";
import { NextResponse } from "next/server";
import { ApiParams } from "types/next";

export const GET = async (_req: Request, { params }: ApiParams) => {
  let startTime = Date.now();

  try {
    const user = await db
      .selectFrom("users")
      .selectAll()
      .where("id", "=", Number(params.userProfileId))
      .executeTakeFirst();

    console.log(user);

    return NextResponse.json(user, { status: 200 });
  } catch (err: any) {
    if (err.message === `relation "users" does not exist`) {
      console.log("Table does not exist, creating and seeding it with dummy data now...");
      // Table is not created yet
      await seed();
      startTime = Date.now();
      const user = await db.selectFrom("users").selectAll().execute();

      return NextResponse.json(user, { status: 500 });
    } else {
      console.log(err);
      return NextResponse.json(null, { status: 403 });
    }
  }
};
