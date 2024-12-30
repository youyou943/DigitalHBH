<template>
  <div class="map-container">
    <!-- 欢迎提示框 -->
    <el-dialog
      v-model="showWelcome"
      title="艺术之旅"
      width="35%"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      class="ancient-dialog"
    >
      <div class="welcome-content">
        <div class="content-wrapper">
          <div class="title-decoration">
            <span class="decoration">※</span>
            <span>序</span>
            <span class="decoration">※</span>
          </div>
          <div class="scroll-content">
            <p>"博览群书，游历四方"；"师法自然，心绘山川"，黄宾虹一生的艺术追求都深深植根于这一理念。他广泛涉猎古今书籍，汲取知识精华，同时不遗余力地踏遍祖国的名山大川，于自然中寻找灵感，创作出一幅幅充满生命力的画作。</p>
            <p>黄宾虹以其独特的笔墨语言，将传统与现代、东方与西方的艺术元素巧妙融合，形成了独树一帜的山水画风格，对后世产生了深远的影响。</p>
            <p>让我们搭乘黄宾虹的艺术之舟，一同探索他那充满哲思与自然之美的艺术旅程吧！</p>
          </div>
          <div class="seal">游历</div>
        </div>
      </div>
    </el-dialog>

    <!-- 右侧工具栏 -->
    <div class="toolbar">
      <div class="toolbar-item">
        <el-button 
          type="primary" 
          circle
          @click="handlePlay"
        >
          <el-icon><VideoPlay v-if="!isPlaying" /><VideoPause v-else /></el-icon>
        </el-button>
        <span class="toolbar-text">{{ isPlaying ? '暂停' : '播放' }}</span>
      </div>
      <div class="toolbar-item">
        <el-button 
          type="warning" 
          circle
          @click="handleReset"
        >
          <el-icon><RefreshRight /></el-icon>
        </el-button>
        <span class="toolbar-text">重置</span>
      </div>
    </div>

    <!-- 左侧滑动窗口 -->
    <transition name="slide">
      <div v-if="showSidePanel" class="side-panel">
        <div class="panel-content">
          <h2>{{ currentPlace?.place }}</h2>
          <div v-if="placeDetails" class="place-details">
            <div class="detail-item">
              <span class="label">时间：</span>
              <span>{{ placeDetails.year }}年 {{ placeDetails.month }}</span>
            </div>
            <div v-if="placeDetails.work" class="artwork">
              <img :src="placeDetails.work" :alt="placeDetails.workname" />
              <p class="artwork-name">《{{ placeDetails.workname }}》</p>
            </div>
            <div class="description">
              <p>{{ placeDetails.reference }}</p>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- 背景地图 -->
    <img src="/map.jpg" alt="Map" class="map-img" />

    <!-- 起始点，显示 avatar03.png -->
    <div class="start-point" :style="startPointStyle">
      <img src="/avatar03.png" alt="Start Point" class="start-icon" />
    </div>

    <!-- 地点标记 -->
    <el-tooltip v-for="place in places" :key="place.order" :content="place.place" placement="top">
      <div class="place-point" :style="getPlaceStyle(place)">
        <!-- 地点标记按钮 -->
        <el-button 
          class="place-button" 
          icon="el-icon-location" 
          @click="fetchPlaceDetails(place.place, place.order)">
          <img src="/biaodi1.png" alt="Place Marker" class="place-icon" />
        </el-button>
      </div>
    </el-tooltip>
    
    <!-- 详情对话框 -->
    <el-dialog 
      v-model="dialogVisible"
      title="作品详情" 
      width="40%"
      style="margin-top: 0px;"
    >
      <div v-if="placeDetails">
        <p><strong>年份：</strong>{{ placeDetails.year }}</p>
        <p><strong>月份：</strong>{{ placeDetails.month }}</p>
        <p><strong>描述：</strong>{{ placeDetails.reference }}</p>
        <template v-if="placeDetails.work">
          <img :src="placeDetails.work" alt="Artwork" class="place-work" />
          <p><strong>作品名称：</strong>{{ placeDetails.workname }}</p>
        </template>
      </div>
      <div v-else>
        <p>加载详情失败，请稍后再试。</p>
      </div>
      <!-- <template #footer>
        <el-button @click="dialogVisible = false">关闭</el-button>
      </template> -->
    </el-dialog>
  </div>
</template>

<script>
import { ref } from 'vue'
import { ElMessage, ElTooltip, ElButton, ElDialog } from 'element-plus'
import { VideoPlay, VideoPause, RefreshRight } from '@element-plus/icons-vue'

// 地点数据
export const places = [
  { place: "金华", order: 1, position: { x: 70, y: 60 } },
  { place: "歙县", order: 2, position: { x: 65, y: 58 } },
  { place: "金华", order: 3, position: { x: 70, y: 60 } },
  { place: "歙县潭渡村", order: 4, position: { x: 65, y: 58 } },
  { place: "南京", order: 5, position: { x: 66, y: 45 } },
  { place: "扬州", order: 6, position: { x: 68, y: 42 } },
  { place: "歙县", order: 7, position: { x: 65, y: 58 } },
  { place: "上海", order: 8, position: { x: 78, y: 50 } },
  { place: "北平", order: 9, position: { x: 53, y: 25 } },
  { place: "杭州", order: 10, position: { x: 75, y: 54 } }
];

// 模拟 API 请求
const routePlaceDetails = {
  金华1: {
    state: 200,
    data: {
      year: "1865-1875",
      month: "",
      reference: "公1865年清穆宗  同治四年  乙丑  二岁 1月27日，阴历甲子、乙丑之交正月元旦子时，生于浙江金华县城西之铁岭头，距立春尚有十余日，循旧俗，堕地即为二岁。初名懋质，一名元吉，后改名质，字朴存，亦作朴丞、朴人，初号滨虹，民国丁戊间，改字宾虹遂以字行。时祖父德涵卒十九年。祖母潘氏卒三年。父定华年三五岁。母方氏年二十三岁。",
      work: "",
      workname: "读《画征录》"
    }
  },
  歙县2: {
    state: 200,
    data: {
      year: "1877-1878",
      month: "八月",
      reference: "在歙县住二伯父家，从族人习拳术、剑术、马术，遍访书画真迹，习画不辍。",
      work: "/家庆图.png",
      workname: "家庆图 陈春帆画"
    }
  },
    金华3: {
    state: 200,
    data: {
      year: "1879-1882",
      month: "",
      reference: "公元1879年  清德宗光绪五年  己卯  十六岁 春，返金华。考入金华丽正书院值课，以课赏费购文具，习画益勤。义乌画师陈春帆为绘《家庆图》大幅。从陈氏习人物画。随陈春帆游义乌，继续从其习画。",
      work: "https://ts1.cn.mm.bing.net/th/id/R-C.b504fa41221c566c03c9bca6bb191fd2?rik=TcDUJ891q6tEsA&riu=http%3a%2f%2fimg1.gtimg.com%2frushidao%2fpics%2fhv1%2f149%2f209%2f1504%2f97851044.jpg&ehk=G4zB4MZQ4NvRemzMfH5OBoiQ2XzSBFtaBtqRsXmRXMs%3d&risl=&pid=ImgRaw&r=0",
      workname: "丽正、长山两书院"
    }
  },
  歙县潭渡村4: {
    state: 200,
    data: {
      year: "1889-1990",
      month: "",
      reference: "公元1889年  清德宗光绪十五年  己丑  二十六岁是年浙江七府洪灾肆虐，金华商业被累，东山再起无望，父亲乃急流勇退，留四弟黄赞继续在金华从商，二妹、三妹送郑、��两家当童养媳，举家迁回原籍歙县潭渡村。从西溪汪仲伊问学，课暇与其嗣汪福熙、律本研习书画。己丑夏五月，题西溪汪律本为汪福熙梅竹书画帐眉。长女映宝（1889—1949略前）生。",
      work: "https://oss-product-img.artfoxlive.com/201910/1572254332808_3266424.jpg?x-oss-process=style/l_watermark",
      workname: "梅竹图"
    }
  },
    南京5: {
    state: 200,
    data: {
      year: "1892",
      month: "十月",
      reference: `公元1892年清德宗光绪十八年壬辰二十九岁迫于生活压力，弃举业，到南京教书，境况困窘，心情郁闷。6月7日竹醉日，夜窗岑寂，成小诗一首并图之。初冬之际，汪福熙来游南京，晤谈殊快，检旧作八帧赠之。10月23日壬辰九月初三致书汪福熙，乞其介绍"栖枝之地"。冬月月半迁扬州，住李官人巷内，有"飘同断梗，祇合因风，志比倾葵，时殷向日"之慨。`,
      work: "https://www.msmjkt.com/files/default/2018/10-19/1622433ebe1e111828.jpg",
      workname: "设色梅竹图"
    }
  },
  扬州6: {
    state: 200,
    data: {
      year: "1893-1894",
      month: "八月",
      reference: "公元1893年清德宗光绪十九年癸巳三十岁坐馆扬州，课余不废书画。仲春，为理卿绘山水便。仲秋，为汪福熙作山水四屏。",
      work: "http://files.xlysauc.com/upload/opic/img/06qp/d/469.jpg",
      workname: "山水四屏"
    }
  },
  歙县7: {
    state: 200,
    data: {
      year: "1899",
      month: "五月",
      reference: "公元1899年 清德宗光绪二十五年 己亥 三十六岁 在歙县许宅授课。夏日，为��庭写山水纨扇。仲秋，为父母官筱印作《黄白山黄山诗意图》。",
      work: "https://ts1.cn.mm.bing.net/th/id/R-C.83600e2cec52c2f0e66a7f5bc052276e?rik=esm7JmzM523uTQ&riu=http%3a%2f%2f3img.zhuokearts.com%2fauction.pics%2f2013%2f12%2f16%2fzc-10740-338.jpg&ehk=vtgJ3sTMGwBdOJWPTyiKegwnrxE4vLse%2b9bgAU3CBU8%3d&risl=&pid=ImgRaw&r=0",
      workname: "黄白山黄山诗意图"
    }
  },
    上海8: {
    state: 200,
    data: {
      year: "1907-1936",
      month: "八月",
      reference: `丙午岁暮，陈去病辞别歙中，取道新安江归里，有《岁晏置酒与诸友别，乘山行十里至朱家村舟中宿》、《晓别深渡》、《桐江晚泊》诸诗纪之。初夏，以"革党"罪名被控告于省，闻报匆匆安排好堨务，星夜逃亡上海，投奔国学保存会。`,
      work: "https://ts1.cn.mm.bing.net/th/id/R-C.75da35363da27805d5cb3d3f8295fb92?rik=%2bgi0USpYpGQsbg&riu=http%3a%2f%2f3img.zhuokearts.com%2fauction.pics%2f2023%2f02%2f24%2f25530%2f4063.jpg&ehk=vyHTjb2%2f6RlmFzQ%2bi49%2bEjoiEb4eGgdq8kydMBolu1o%3d&risl=&pid=ImgRaw&r=0",
      workname: "桐庐晚渡图"
    }
  },
  北平9: {
    state: 200,
    data: {
      year: "1937-1948",
      month: "十二月",
      reference: "南京文物库房竣工，上海故宫南迁文物于1936年12月4日及17日��两批运宁，随之暂居南京继续鉴定。",
      work: "https://www.namoc.org/zgmsg/zgh/201304/fb84eb6f5e244302aee5a7f07cfe4db8/images/200705_hbh_lbctt.jpg",
      workname: "作《练滨草堂图》"
    }
  },
  杭州10: {
    state: 200,
    data: {
      year: "1949-1955",
      month: "十二月",
      reference: "元旦，浙江省假湖滨省立民众教育馆举办第一次全省美术展览会揭幕，出品并往观。长天文艺社印画展纪念特刊，刊有参展作品与傅雷《观答客问》。",
      work: "https://www.namoc.org/zgmsg/zgh/201304/63e1fa3ca84241cd8aeff3703201a49a/images/200705_hbh_hcjs.jpg",
      workname: "作《横槎江上》"
    }
  },
};

export default {
  name: 'Trajectory',
  components: {
    ElTooltip,
    ElButton,
    ElDialog,
    VideoPlay,
    VideoPause,
    RefreshRight,
  },
  data() {
    return {
      currentOrder: 0, // 记录当前位置
      startPointStyle: {
        position: 'absolute',
        top: `${places[0].position.y}%`,
        left: `${places[0].position.x}%`,
        transition: 'top 2s, left 2s',  // 控制动画的过渡时间
      },
      places,  // 加载地点数据
      dialogVisible: false, // 控制对话框的显示与隐藏
      placeDetails: null, // 存储当前地点的详细信息
      showSidePanel: false,
      currentPlace: null,
      animationInterval: null,
      isPlaying: true,
      showWelcome: true,
    };
  },
  methods: {
    // 定时更新人物的位置
    moveAvatar() {
      this.animationInterval = setInterval(() => {
        if (this.currentOrder < this.places.length) {
          // 关闭当前面板
          this.showSidePanel = false;
          
          setTimeout(() => {
            const place = this.places[this.currentOrder];
            this.startPointStyle.top = `${place.position.y}%`;
            this.startPointStyle.left = `${place.position.x}%`;
            
            // 更新当前地点并显示面板
            setTimeout(() => {
              this.currentPlace = place;
              this.loadPlaceDetails(place.place, place.order);
              this.showSidePanel = true;
            }, 500); // 等待移动动画完成后显示
            
            this.currentOrder += 1;
          }, 300);
        } else {
          // 播放结束，隐藏面板
          this.showSidePanel = false;
          // 清除定时器
          clearInterval(this.animationInterval);
          this.animationInterval = null;
          this.isPlaying = false;
        }
      }, 5000);
    },
    // 计算每个地点的样式
    getPlaceStyle(place) {
      return {
        position: 'absolute',
        top: `${place.position.y}%`,
        left: `${place.position.x}%`,
      };
    },
    // 获取并展示地点详情
    fetchPlaceDetails(place, order) {
      const detailKey = `${place}${order}`;
      const placeDetails = routePlaceDetails[detailKey];
      if (placeDetails && placeDetails.state === 200) {
        this.placeDetails = placeDetails.data;
        this.dialogVisible = true;
      } else {
        ElMessage.error('地点详情未找到');
      }
    },
    loadPlaceDetails(place, order) {
      const detailKey = `${place}${order}`;
      const placeDetails = routePlaceDetails[detailKey];
      if (placeDetails && placeDetails.state === 200) {
        this.placeDetails = placeDetails.data;
      }
    },
    handlePlay() {
      if (this.isPlaying) {
        // 暂停
        if (this.animationInterval) {
          clearInterval(this.animationInterval);
          this.animationInterval = null;
        }
      } else {
        // 播放
        this.moveAvatar();
      }
      this.isPlaying = !this.isPlaying;
    },
    handleReset() {
      // 清除现有定时器
      if (this.animationInterval) {
        clearInterval(this.animationInterval);
      }
      // 重置状态
      this.currentOrder = 0;
      this.showSidePanel = false;
      // 重置人物位置
      this.startPointStyle = {
        position: 'absolute',
        top: `${places[0].position.y}%`,
        left: `${places[0].position.x}%`,
        transition: 'top 2s, left 2s',
      };
      // 重新开始动画
      setTimeout(() => {
        this.moveAvatar();
        this.isPlaying = true;
        // 显示第一个地点的面板
        setTimeout(() => {
          this.currentPlace = places[0];
          this.loadPlaceDetails(places[0].place, places[0].order);
          this.showSidePanel = true;
        }, 500);
      }, 100);
    },
  },
  mounted() {
    // 4秒后自动关闭欢迎提示
    setTimeout(() => {
      this.showWelcome = false;
    }, 4000);
    this.moveAvatar();
  },
  beforeUnmount() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
  },
};
</script>

<style scoped>
.map-container {
  position: relative;
  width: 110%;
  height: 98vh;
  background-color: #f0f0f0;
  margin: 1vh -3.5%;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px;
}

.map-img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: 97vh; /* 增加图片高度 */
  object-fit: contain;
  display: block;
  margin: auto;
}

/* 起始点的定位样式 */
.start-icon {
  width: 50px; /* 设置头像的大小 */
  height: 50px;
  border-radius: 50%; /* 如果想要圆形图标，可以加这个属性 */
}

/* 地点标记样式 */
.place-point {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

/* 地点标记按钮样式 */
.place-button {
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
}

/* 地点标记标的样式 */
.place-icon {
  width: 70px;  /* 你可以根据需要调整图片大小 */
  height: 50px;
}

/* 图片展示样式 */
.place-work {
  width: 100%;
  height: auto;
  margin-top: 20px;
}

/* 添加对话框内容的样式 */
:deep(.el-dialog__body) {
  padding: 20px;
}

.place-work {
  width: 100%;
  max-height: 300px;
  object-fit: contain;
  margin: 15px 0;
}

/* 添加新的样式 */
.side-panel {
  position: fixed;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 400px;
  max-height: 80vh;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 0 15px 15px 0;
  padding: 30px;
  z-index: 1000;
  overflow-y: auto;
  box-shadow: 2px 0 15px rgba(0, 0, 0, 0.3);
}

.panel-content {
  opacity: 1;
}

.panel-content h2 {
  margin: 0 0 20px 0;
  font-size: 24px;
  color: #fff;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  padding-bottom: 10px;
}

.place-details {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.label {
  color: rgba(255, 255, 255, 0.7);
  font-weight: bold;
}

.artwork {
  margin: 15px 0;
  text-align: center;
}

.artwork img {
  max-width: 100%;
  border-radius: 8px;
  margin-bottom: 10px;
}

.artwork-name {
  font-style: italic;
  color: rgba(255, 255, 255, 0.9);
}

.description {
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  text-align: justify;
}

/* 滑动动画 */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%) translateY(-50%);
  opacity: 0;
}

/* 滚动条样式 */
.side-panel::-webkit-scrollbar {
  width: 6px;
}

.side-panel::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.side-panel::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

.side-panel::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* 右侧工具栏样式 */
.toolbar {
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.toolbar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.toolbar-text {
  font-size: 12px;
  color: #606266;
}

.toolbar :deep(.el-button) {
  width: 40px;
  height: 40px;
  transition: all 0.3s ease;
}

.toolbar :deep(.el-button:hover) {
  transform: scale(1.1);
}

.toolbar :deep(.el-icon) {
  font-size: 20px;
}

/* 欢迎提示框样式 */
.ancient-dialog :deep(.el-dialog) {
  background: url('/ture.jpg') repeat;
  border: 12px solid #8b4513;
  border-image: url('/border.png') 30 30 stretch;
  border-radius: 0;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  max-height: 80vh;
}

.ancient-dialog :deep(.el-dialog__header) {
  background-color: rgba(139, 69, 19, 0.9);
  padding: 15px 20px;
  margin: 0;
  border-bottom: 2px solid rgba(244, 228, 188, 0.3);
}

.ancient-dialog :deep(.el-dialog__title) {
  color: #f4e4bc;
  font-size: 22px;
  font-family: "楷体", "STKaiti", serif;
  text-align: center;
  letter-spacing: 4px;
}

.welcome-content {
  padding: 20px;
  font-family: "楷体", "STKaiti", serif;
}

.content-wrapper {
  position: relative;
  padding: 20px 40px;
  border: 2px solid rgba(139, 69, 19, 0.2);
  background-color: rgba(255, 255, 255, 0.7);
  box-shadow: inset 0 0 10px rgba(139, 69, 19, 0.1);
}

.title-decoration {
  text-align: center;
  color: #8b4513;
  font-size: 20px;
  margin-bottom: 30px;
  letter-spacing: 12px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.decoration {
  color: #b92525;
  font-size: 16px;
}

.scroll-content {
  max-height: 300px;
  overflow-y: auto;
  padding-right: 20px;
}

.welcome-content p {
  margin-bottom: 20px;
  line-height: 2;
  text-align: justify;
  color: #4a4a4a;
  font-size: 16px;
  text-indent: 2em;
}

.seal {
  position: absolute;
  bottom: 20px;
  right: 40px;
  width: 60px;
  height: 60px;
  background-color: #b92525;
  color: #fff;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transform: rotate(15deg);
  opacity: 0.8;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  writing-mode: vertical-rl;
  letter-spacing: 4px;
}

/* 自定义滚动条样式 */
.scroll-content::-webkit-scrollbar {
  width: 6px;
}

.scroll-content::-webkit-scrollbar-track {
  background: rgba(139, 69, 19, 0.1);
}

.scroll-content::-webkit-scrollbar-thumb {
  background: rgba(139, 69, 19, 0.3);
  border-radius: 3px;
}

.scroll-content::-webkit-scrollbar-thumb:hover {
  background: rgba(139, 69, 19, 0.5);
}
</style>
