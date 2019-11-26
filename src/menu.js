//全部菜单
export const menu = [
  {
    icon: "el-icon-news",
    index: "home",
    title: "home"
  },
  {
    icon: "el-icon-service",
    index: "tencent://message/?uin=3230644615&Site=http://vps.shuidazhe.com&Menu=yes",
    title: "link"
  },
  // ++
  {
    icon: "el-icon-mobile-phone",
    index: "user",
    title: "user",
    subs: [
      {
        index: "userList",
        title: "userList"
      }
    ]
  },
  {
    icon: "el-icon-sold-out",
    title: "product",
    index: "product",
    subs: [
      {      
        index: "productlist",
        title: "productlist"
      },
      {
        index: "productinfo",
        title: "productcreate"
      }
    ]
  },
  {
    icon: "el-icon-goods",
    title: "order",
    index: "order",
    subs: [
      {
        index: "orderlist",
        title: "orderlist"
      }
    ]
  },
  {
    icon: "el-icon-menu",
    title: "homeManage",
    index: "homeManage",
    subs: [
      {
        index: "activityManage",
        title: "activityManage"
      },
      {
        index: "indexSwipperManage",
        title: "indexSwipperManage"
      },
      {
        index: "indexWelcomeManage",
        title: "indexWelcomeManage"
      }
    ]
  }
];
