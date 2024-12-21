<template>
  <div class="work-detail-container">
    <el-row :gutter="40">
      <!-- 左侧作品展示 -->
      <el-col :span="14">
        <div class="image-container">
          <el-image 
            :src="currentWork.work" 
            fit="contain"
            :preview-src-list="[currentWork.work]"
          />
        </div>
      </el-col>

      <!-- 右侧作品信息 -->
      <el-col :span="10">
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
}

.image-container {
  background: #f5f7fa;
  padding: 20px;
  border-radius: 8px;
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.work-info {
  padding: 20px;
}

.work-title {
  margin-bottom: 30px;
  color: #303133;
  font-size: 24px;
  font-weight: bold;
}

.work-description {
  margin-top: 30px;
}

.work-description h3 {
  margin-bottom: 15px;
  color: #303133;
  font-size: 18px;
}

.work-description p {
  line-height: 1.8;
  color: #606266;
  text-align: justify;
}

.back-button {
  margin-top: 30px;
}

:deep(.el-descriptions) {
  margin-top: 20px;
}

:deep(.el-descriptions__label) {
  width: 120px;
  font-weight: bold;
}

:deep(.el-descriptions__content) {
  line-height: 1.6;
}
</style>
