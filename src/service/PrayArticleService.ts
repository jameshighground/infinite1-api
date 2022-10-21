import {txProcess} from "@lib/db";
import PrayArticle from "src/entity/PrayArticle";

//박스 정보 전달 받아서 박스 안에 데이터만 조회 하는 방식
export async function getPrayArticleList() {
  return await PrayArticle.find();
}
export async function getPrayArticleByUserid(userid: string) {
  return await PrayArticle.find({where: {userid}});
}
export async function addPrayArticle(article: PrayArticle) {
  return await txProcess(async manager => {
    const repository = manager.getRepository(PrayArticle);
    return await repository.save(article);
  });
}
