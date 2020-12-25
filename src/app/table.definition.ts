export const HEADER_COLUMNS = {
    jyuKbnCd: "受注区分",
    jyuKbnNm: "",
    zeirituNm: "",
    dummy1: "",
    dummy2: "",
    itemCd: "商品CD",
    itemNm: "商品名",
    suu: "数量",
    unit: "単位",
    jyuTan: "受注単価",
    jyuKin: "受注金額",
    syoZei: "消費税",
    tyuNum: "注文番号",
    memo: "備考",
    kanno: "完納",
    kikaku: "規格",
    kazeiKbn: "課税区分",
    zeirituCd: "税率",
    genTan: "原価単価",
    genKin: "原価金額",
    araKin: "粗利金額",
    jyuNou: "受注納期",
}

export class SalesInputModel {
    jyuKbnCd: "";
    jyuKbnNm: "";
    itemCd: "";
    itemNm: "";
    suu: "";
    unit: "";
    jyuTan: "";
    jyuKin: "";
    syoZei: "";
    tyuNum: "";
    memo: "";
    kanno: "";
    kikaku: "";
    kazeiKbn: "";
    zeirituCd: "";
    zeirituNm: "";
    genTan: "";
    genKin: "";
    araKin: "";
    jyuNou: "";
}

export const InitData = {
    jyuKbnCd: "1",
    itemCd: '1',
    itemNm: 'a',
    suu: "",
    unit: "",
    jyuTan: "",
    jyuKin: "",
    syoZei: "",
    tyuNum: "",
    memo: "",
    kanno: "",
    jyuKbnNm: 'a',
    kikaku: 'a',
    kazeiKbn: 'a',
    zeirituCd: "1",
    zeirituNm: "0.8%",
    genTan: "",
    genKin: "",
    araKin: "",
    jyuNou: "",
    dummy1: "",
    dummy2: ""
}

export const FocusInOrder = [
    "memo",
    "jyuKbnCd",
    "kanno",

]