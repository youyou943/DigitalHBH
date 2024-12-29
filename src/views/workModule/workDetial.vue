<template>
  <div class="work-detail-container">
    <el-row :gutter="40">
      <!-- 左侧作品展示 -->
      <el-col :span="16">
        <div class="image-container">
          <el-image 
            :src="currentWork.work" 
            fit="contain"
            :preview-src-list="[currentWork.work]"
            class="work-display-image"
          />
        </div>
      </el-col>

      <!-- 右侧作品信息 -->
      <el-col :span="8">
        <div class="work-info">
          <h1 class="work-title">{{ currentWork.workname }}</h1>
          
          <el-descriptions :column="1" border>
            <el-descriptions-item label="作者">
              {{ currentWork.author }}
            </el-descriptions-item>
            <el-descriptions-item label="时代">
              {{ currentWork.era }}
            </el-descriptions-item>
            <el-descriptions-item label="创作年份">
              {{ currentWork.create_year }}
            </el-descriptions-item>
            <el-descriptions-item label="质地">
              {{ currentWork.texture }}
            </el-descriptions-item>
            <el-descriptions-item label="尺寸">
              {{ currentWork.size }}
            </el-descriptions-item>
            <el-descriptions-item label="收藏单位">
              {{ currentWork.collection }}
            </el-descriptions-item>
            <el-descriptions-item label="类型">
              {{ currentWork.categoryName || '未提供' }} <!-- 添加了一个防止为空的默认值 -->
            </el-descriptions-item>
          </el-descriptions>

          <div class="work-description">
            <h3>作品简介</h3>
            <p>{{ currentWork.introduction }}</p>
          </div>

          <!-- 返回按钮 -->
          <el-button 
            type="primary" 
            @click="router.back()"
            class="back-button"
          >
            返回作品列表
          </el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getWorkDetails } from '@/api/works'

const route = useRoute()
const router = useRouter()
const currentWork = ref({})

const loadWorkDetail = async () => {
  try {
    const workname = route.params.workname
    const { data: response } = await getWorkDetails(workname)
    if (response.state === 200) {
      currentWork.value = response.data
    } else {
      ElMessage.error('获取作品详情失败')
    }
  } catch (error) {
    ElMessage.error('获取作品详情失败')
    console.error('Error loading work detail:', error)
  }
}

onMounted(() => {
  loadWorkDetail()
})
</script>

<style scoped>
.work-detail-container {
  padding: 40px;
  max-width: 1400px;
  margin: 0 auto;
  min-height: 90vh;
  display: flex;
  align-items: center;
  background-color: #f9f4e6;
}

.image-container {
  background: #fff9e6;
  padding: 15px;
  border-radius: 8px;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(185, 128, 0, 0.1);
  position: relative;
  overflow: hidden;
  border: 1px solid #d4b106;
}

.work-display-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: all 0.3s ease;
}

.image-container:hover .work-display-image {
  transform: scale(1.02);
}

.work-info {
  padding: 30px;
  background: #fff9e6;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(185, 128, 0, 0.1);
  height: 80vh;
  overflow-y: auto;
  width: 400px;
  margin: 0 auto;
  border: 1px solid #d4b106;
}

.work-title {
  margin-bottom: 30px;
  color: #8b4513;
  font-size: 24px;
  font-weight: bold;
  font-family: "楷体", "STKaiti", serif;
  letter-spacing: 2px;
}

.work-description {
  margin-top: 30px;
}

.work-description h3 {
  margin-bottom: 15px;
  color: #8b4513;
  font-size: 18px;
  font-family: "楷体", "STKaiti", serif;
  letter-spacing: 1px;
}

.work-description p {
  line-height: 1.8;
  color: #5c3f2e;
  text-align: justify;
  font-family: "楷体", "STKaiti", serif;
  letter-spacing: 1px;
}

.back-button {
  margin-top: 30px;
  background-color: #8b4513 !important;
  border-color: #8b4513 !important;
  font-family: "楷体", "STKaiti", serif;
}

:deep(.el-descriptions) {
  margin-top: 20px;
  --el-border-color: #d4b106;
}

:deep(.el-descriptions__label) {
  width: 120px;
  font-weight: bold;
  color: #8b4513;
  font-family: "楷体", "STKaiti", serif;
  background-color: rgba(139, 69, 19, 0.05);
}

:deep(.el-descriptions__content) {
  line-height: 1.6;
  color: #5c3f2e;
  font-family: "楷体", "STKaiti", serif;
}

.work-info::-webkit-scrollbar {
  width: 6px;
}

.work-info::-webkit-scrollbar-track {
  background: rgba(139, 69, 19, 0.1);
  border-radius: 3px;
}

.work-info::-webkit-scrollbar-thumb {
  background: rgba(139, 69, 19, 0.2);
  border-radius: 3px;
}

.work-info::-webkit-scrollbar-thumb:hover {
  background: rgba(139, 69, 19, 0.3);
}

/* 响应式布局调整 */
@media screen and (max-width: 1400px) {
  .work-info {
    width: 350px;
  }
}

@media screen and (max-width: 1200px) {
  .work-info {
    width: 300px;
  }
}

@media screen and (max-width: 768px) {
  .work-info {
    width: 100%;
    max-width: 500px;
    height: auto;
    min-height: 500px;
    margin-top: 20px;
  }
}
</style>
