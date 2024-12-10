<template>
  <el-container class="track-page">
    <!-- 主要内容区域 -->
    <el-main class="main-content">
      <!-- 地图区域 -->
      <div class="map-container">
        <img 
          class="history-map" 
          src="/images/tracks/china-map.jpg" 
          alt="历史地图"
        />
        
        <!-- 地点标记 -->
        <div 
          v-for="loc in locations" 
          :key="loc.name"
          class="map-marker"
          :class="{ active: activeLocation === loc.name }"
          :style="{ left: loc.position.x + '%', top: loc.position.y + '%' }"
          @click="showLocationDetails(loc)"
        >
          <el-tooltip 
            :content="loc.name + ' (' + loc.period + ')'" 
            placement="top"
          >
            <div class="marker-point"></div>
          </el-tooltip>
          <span class="marker-label">{{ loc.name }}</span>
        </div>
      </div>
    </el-main>

    <!-- 作品详情对话框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="currentLocation?.name + '时期作品'"
      width="60%"
      :destroy-on-close="true"
      class="location-dialog"
    >
      <div v-if="currentLocation" class="dialog-content">
        <div class="location-info">
          <p class="description">{{ currentLocation.description }}</p>
        </div>

        <el-divider>相关作品</el-divider>

        <el-row :gutter="20">
          <el-col 
            v-for="work in currentLocation.works" 
            :key="work.id"
            :span="8"
          >
            <el-card class="work-card" shadow="hover">
              <el-image 
                :src="work.imageUrl" 
                fit="cover"
                :preview-src-list="[work.imageUrl]"
              >
                <template #placeholder>
                  <div class="image-placeholder">
                    <el-icon><Picture /></el-icon>
                  </div>
                </template>
              </el-image>
              <div class="work-info">
                <h4>{{ work.name }}</h4>
                <el-tag size="small" type="success">{{ work.type }}</el-tag>
                <p class="date">{{ work.date }}</p>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </el-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Picture } from '@element-plus/icons-vue'

const activeLocation = ref('')
const dialogVisible = ref(false)

// 地点数据
const locations = [
  {
    name: '上海',
    position: { x: 80, y: 45 },
    period: '1925-1935',
    description: '在上海期间，黄宾虹创作了大量山水画作品，并与众多文人雅士交往，对其艺术创作产生了重要影响。',
    works: [
      {
        id: 1,
        name: '黄浦江畔',
        type: '山水画',
        date: '1928年',
        imageUrl: 'https://www.zhejiangmuseum.com/zhebo-cms-file/ZHEJIANG2/BWG_HUANGBINHONG/CMS/CMS_EXHIBIT_INFO_IMG/20201116/ea9bfdfe24e04938b3e97fa8f9ee6ac41605516669820.jpg'
      },
      {
        id: 2,
        name: '上海城郊',
        type: '山水画',
        date: '1930年',
        imageUrl: 'http://files.xlysauc.com/upload/opic/img/2020qp/sy/2701/2701.jpg'
      }
    ]
  },
  {
    name: '北京',
    position: { x: 70, y: 25 },
    period: '1937-1945',
    description: '在北京期间，黄宾虹深入研究传统山水画法，创作了许多精品力作。',
    works: [
      {
        id: 3,
        name: '北山积雪',
        type: '山水画',
        date: '1940年',
        imageUrl: 'https://www.namoc.org/zgmsg/zgh/201304/45362efb38004e16b2878f099faf0917/images/200705_hbh_ysys.jpg'
      }
    ]
  },
  {
    name: '杭州',
    position: { x: 75, y: 48 },
    period: '1945-1955',
    description: '晚年定居杭州，创作了大量描绘西湖山水的作品，艺术风格日趋成熟。',
    works: [
      {
        id: 4,
        name: '西湖十景',
        type: '山水画',
        date: '1948年',
        imageUrl: 'https://www.zhejiangmuseum.com/zhebo-cms-file/ZHEJIANG2/BWG_HUANGBINHONG/CMS/CMS_EXHIBIT_INFO_IMG/20201118/750a91fe1c3445c4903016e2e86b54af1605666500994.jpg'
      }
    ]
  }
]

const currentLocation = computed(() => 
  locations.find(loc => loc.name === activeLocation.value)
)

const showLocationDetails = (location) => {
  activeLocation.value = location.name
  dialogVisible.value = true
}
</script>

<style scoped>
.track-page {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

.main-content {
  padding: 0;
  height: 100vh;
}

.map-container {
  height: 90%;
  width: 100%;
  position: relative;
}

.history-map {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.map-marker {
  position: absolute;
  transform: translate(-50%, -50%);
  cursor: pointer;
  z-index: 2;
}

.marker-point {
  width: 12px;
  height: 12px;
  background-color: var(--el-color-primary);
  border-radius: 50%;
  border: 2px solid #fff;
  box-shadow: 0 0 0 2px rgba(var(--el-color-primary-rgb), 0.4);
  transition: all 0.3s;
}

.map-marker:hover .marker-point,
.map-marker.active .marker-point {
  transform: scale(1.2);
  background-color: var(--el-color-danger);
}

.marker-label {
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translateX(-50%);
  white-space: nowrap;
  color: var(--el-text-color-primary);
  font-size: 14px;
  margin-top: 4px;
  background-color: var(--el-bg-color);
  padding: 2px 8px;
  border-radius: var(--el-border-radius-base);
  box-shadow: var(--el-box-shadow-light);
}

.dialog-content {
  padding: 20px 0;
}

.description {
  color: var(--el-text-color-regular);
  line-height: 1.8;
  margin-bottom: 20px;
}

.work-card {
  margin-bottom: 20px;
  transition: all 0.3s;
}

.work-card:hover {
  transform: translateY(-5px);
}

.work-card .el-image {
  height: 200px;
  width: 100%;
  object-fit: cover;
}

.work-info {
  padding: 12px;
}

.work-info h4 {
  margin: 0 0 8px 0;
  font-size: 16px;
  color: var(--el-text-color-primary);
}

.work-info .date {
  margin: 8px 0;
  color: var(--el-text-color-secondary);
  font-size: 14px;
}

.image-placeholder {
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
}

:deep(.location-dialog .el-dialog) {
  margin-top: 8vh;
}

:deep(.location-dialog .el-dialog__body) {
  padding: 0 20px 20px;
}
</style>
