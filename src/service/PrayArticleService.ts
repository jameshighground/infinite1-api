import {txProcess} from "@lib/db";
import PrayArticle from "src/entity/PrayArticle";

//박스 정보 전달 받아서 박스 안에 데이터만 조회 하는 방식
export async function getPrayArticleList() {
  // return await PrayArticle.find();
  let query = " select lat, lng, count(*) count ";
  query += " FROM pray_article ";
  query += " group by lat, lng ";
  return await PrayArticle.query(query);
}
export async function getPrayArticleListByLatLng({userid, lat, lng}: {userid: string; lat: number; lng: number}) {
  let query =
    " SELECT article.id, article.lat, article.lng, article.content, article.createDate, article.userid, article.updateDate, article.real_lat, article.real_lng, refid, COUNT(amen.articleid) amen, COUNT(amen2.articleid) amenyn ";
  query += " FROM pray_article article LEFT OUTER JOIN pray_amen amen ";
  query += " ON article.id = amen.articleid ";
  query += " LEFT OUTER JOIN pray_amen amen2 ";
  query += " ON amen.articleid = amen2.articleid ";
  query += " and amen.userid = amen2.userid ";
  query += " AND amen2.userid = ? ";
  query += " where lat = ? and lng = ? ";
  query += " GROUP BY article.id ";
  query += " order by createDate desc ";
  return await PrayArticle.query(query, [userid, lat, lng]);
}
export async function getPrayArticleByUserid(userid: string) {
  return await PrayArticle.find({where: {userid}, order: {createDate: "DESC"}});
}
export async function addPrayArticle(article: any) {
  return await txProcess(async manager => {
    const repository = manager.getRepository(PrayArticle);
    return await repository.save(article);
  });
}
