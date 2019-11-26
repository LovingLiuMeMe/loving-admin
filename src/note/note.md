# 笔记
### 1.v-if 对象的不存在的初始属性时 无法触发视图更新
```html
  <el-upload>
    <img v-if="goodsInfo.goodsCoverImg" :src="goodsInfo.goodsCoverImg" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
```
```js
  data () {
    return {
      goodsInfo: {
      }
    }
  }
  methods: {
      handleAvatarSuccess(res, file) {
        console.log('res---',res)
        this.goodsInfo.goodsCoverImg = res.data.url; // 无法显示实时的头像
      }
  }
```
#### 解决
由此可以衍生出可能数组动态数组 也会出现该问题,但暂时未遇到 暂不处理
```js
  // 增加一个初始值
  data () {
    return {
      goodsInfo: {
        goodsCoverImg: ''
      }
    }
  }
```
### 2.数组参数问题
前提  
1.content-Type类型是application/x-www-form-urlencoded;charset=UTF-8  
2.post请求  
3.后端是springBoot  

#### 解决方法
此处参考的是 https://blog.csdn.net/pifutan/article/details/86320705  
前端axios
```js
  axios
      .post(url,qs.stringify(params, {arrayFormat: 'repeat'}))
      .then(res => {
          resolve(res);
      })
      .catch(err => {
          reject(err);
      });
```
后端:
```java
  @ApiOperation("删除指定名称的图片")
  @PostMapping("/imageDelete")
  /**
    * @Desc 图片的上传 注意 前后端数组数据的交互 
    * @Author LovingLiu
  */
  public ServerResponse imageDelete(@ApiParam("图片名称") @RequestParam String[] fileNames){
      Boolean is_delete = fileService.delete(fileNames);
      if(is_delete){
          return ServerResponse.createBySuccess("删除成功");
      }
      return ServerResponse.createBySuccess("删除失败");
  }
```
