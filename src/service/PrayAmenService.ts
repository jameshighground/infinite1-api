import PrayAmen from "@entity/PrayAmen";
import {txProcess} from "@lib/db";

export async function addPrayAmen(amen: {articleid: number; userid: string}) {
  return await txProcess(async manager => {
    const repository = manager.getRepository(PrayAmen);
    return await repository.save(amen);
  });
}
