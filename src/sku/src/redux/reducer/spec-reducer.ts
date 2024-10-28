export const TOGGLE = "spec";

export type CommoditySpecsType = {
  title: string;
  list: Array<string>;
};

export type SpecCategoryType = {
  id: string;
  specs: Array<string>;
};

export type SpecStateType = {
  specList: Array<CommoditySpecsType>;
  specList_bak: Array<CommoditySpecsType>;
  specCombinationList: Array<SpecCategoryType>;
};

const initialState: SpecStateType = {
  specList_bak: [
    {title: "颜色", list: ["白色", "粉色"]},
    {title: "体重", list: ["G", "KG"]},
    {title: "尺寸", list: ["1寸", "2寸", "3寸"]},
    {title: "形状", list: ["圆", "正方", "三角"]},
  ],
  specList: [
    {title: "套餐版本", list: ["yuncode6120500001", "yuncode6120500002", "yuncode6120500003"]},
    {title: "地域", list: ["中国-华东1(杭州)", "中国-华东2(上海)","中国-华北1(青岛)","中国-华东2(北京)","中国-华东3(张家口)","中国-华南1(深圳)","中国-华南3(广州)","中国-香港","亚太-新加坡","亚太-马来西亚(吉隆坡)","亚太-印度尼西亚(雅加达)","欧洲与美洲-美国(硅谷)","欧洲与美洲-美国(弗吉尼亚)","欧洲与美洲-德国(法兰克福)",]},
    {title: "部署方案", list: ["多机房部署","双机房部署","单机房部署",]},
    {title: "可用区", list: ["A","B", "C", "D", "E", "F", "A/B", "A/C", "B/C", "C/D", "A/B/C", "B/C/E", "D/E/F", "C/D/E", "C/E/F"]},
    {title: "CPU架构",list: ['X86']},
    {title: "规格类型",list: ['独享规格']},
    {title: "节点规格",list: ["4核16G","8核32G","14核70G","24核120G","30核180G","62核400G",]},
    {title: "存储类型", list: ['【云盘ESSDPL1】']},
    {title:"内存大小",list: ['{\"unit\":\"GB\",\"min\":50,\"max\":999999999999999,\"step\":1}']},
    {title: "版本号", list: ['4.2.1']},
    {title: "全功能副本数", list: ['2','3']},
    {title: "资源组", list: ['默认资源组']},
    {title: "自动升级", list: [ "开启小版本自动升级","关闭自动升级",]},
    {title: "释放实例的策略", list: ["释放实例时保留全部备份","释放实例时不保留备份",]},
    {title: "购买时长", list: ["1:Month", "2:Month", "3:Month", "4:Month", "5:Month", "6:Month", "7:Month", "8:Month", "9:Month", "10:Month", "11:Month", "1:Year", "2:Year", "3:Year", "4:Year","5:Year"]},
    {title: "购买个数", list: ['{\"unit\":\"\",\"min\":1,\"max\":1,\"step\":1}']}
  ],
  specCombinationList: [
    {id: "1", specs: [ "中国-华东1(杭州)","多机房部署","A","B","C","X86","独享规格","【云盘ESSDPL1】","4.2.1","2","默认资源组","开启小版本自动升级","释放实例时保留全部备份","4核16G","8核32G","1:Month", "2:Month", "3:Month", "4:Month", "5:Month", "6:Month", "7:Month", "8:Month"]},
    {id: "2", specs: [ "中国-华东2(上海)","单机房部署","D","E","F","X86","独享规格","【云盘ESSDPL1】","4.2.1","2","默认资源组","关闭自动升级","释放实例时不保留备份","4核16G","8核32G","1:Month", "2:Month", "3:Month", "4:Month", "5:Month", "6:Month", "7:Month", "8:Month", "9:Month", "10:Month", "11:Month", "1:Year", "2:Year", "3:Year", "4:Year","5:Year"]},
    {id: "3", specs: [ "中国-华东2(上海)","双机房部署","A/B","A/C","B/C","X86","独享规格","【云盘ESSDPL1】","4.2.1","2","默认资源组","关闭自动升级","释放实例时不保留备份","4核16G","8核32G","1:Month", "2:Month"]},
    {id: "4", specs: [ "中国-华东2(上海)","多机房部署","A/B/C","B/C/E","D/E/F","X86","独享规格","【云盘ESSDPL1】","4.2.1","2","默认资源组","关闭自动升级","释放实例时不保留备份","4核16G","8核32G","1:Month", "2:Month"]},
    // {id: "3", specs: ["yuncode6120500001", "1:Month", "2:Month", "3:Month", "4:Month", "5:Month", "6:Month", "7:Month", "8:Month", "9:Month", "10:Month", "11:Month", "1:Year", "2:Year", "3:Year", "4:Year","5:Year"]},
    // {id: "4", specs: ["yuncode6120500002", "1:Month", "2:Month", "3:Month", "4:Month", "5:Month", "6:Month", "7:Month", "8:Month", "9:Month", "10:Month", "11:Month", "1:Year", "2:Year", "3:Year", "4:Year","5:Year"]},
    // {id: "4", specs: ['yuncode6120500002',"B","C"]},
    // {id: "5", specs: ['yuncode6120500002',"X86"]},
    // {id: "6", specs: ['yuncode6120500002',"欧洲与美洲-美国(硅谷)","欧洲与美洲-美国(弗吉尼亚)","欧洲与美洲-德国(法兰克福)"]},
    // {id: "7", specs: ['yuncode6120500001',"4核16G","8核32G"]},


    // {id: "1", specs: ["G", "1寸", "白色", "正方"]},
    // {id: "2", specs: ["G", "1寸", "白色", "圆"]},
    // {id: "3", specs: ["G", "1寸", "粉色", "圆"]},
    // {id: "4", specs: ["G", "1寸", "粉色", "正方"]},
    // {id: "5", specs: ["KG", "3寸", "白色", "圆"]},
    // {id: "6", specs: ["KG", "2寸", "粉色", "正方"]},
  ],
  // specList: [
  //   {title: "颜色", list: ["白色", "粉色"]},
  //   {title: "尺寸", list: ["1寸", "2寸"]},
  //   {title: "体重", list: ["G", "KG"]}
  // ],
  // specCombinationList: [
  //   {id: "1", specs: ["KG", "1寸", "白色"]},
  //   {id: "2", specs: ["G", "2寸", "白色"]},
  //   {id: "3", specs: ["G", "1寸", "粉色"]}
  // ],
  // specList: [
  //   { title: "颜色", list: ["红色", "紫色", "白色", "黑色"] },
  //   { title: "套餐", list: ["套餐一", "套餐二", "套餐三", "套餐四"] },
  //   { title: "内存", list: ["64G", "128G", "256G"] },
  // ],
  // specCombinationList: [
  //   { id: "1", specs: ["紫色", "套餐一", "64G"] },
  //   { id: "2", specs: ["紫色", "套餐一", "128G"] },
  //   { id: "3", specs: ["紫色", "套餐二", "128G"] },
  //   { id: "4", specs: ["黑色", "套餐三", "256G"] },
  // ],
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case TOGGLE: {
      return {
        ...state,
      };
    }

    default: {
      return {
        ...state,
      };
    }
  }
};
