<template>
  <div class="works-container">
    <!-- 顶部标题 -->
    <div class="page-header">
      <h1>黄宾虹作品</h1>
    </div>

    <!-- 分类导航 -->
    <div class="category-nav">
      <el-radio-group v-model="activeCategory" size="large">
        <el-radio-button label="calligraphy">书法</el-radio-button>
        <el-radio-button label="painting">绘画</el-radio-button>
      </el-radio-group>
    </div>

    <!-- 作品展示区域 -->
    <el-row :gutter="30" class="works-grid" justify="start">
      <el-col 
        v-for="work in works" 
        :key="work.id" 
        :xs="24" 
        :sm="12" 
        :md="8" 
        :lg="6"
      >
        <el-card 
          class="work-card" 
          :body-style="{ padding: '0px' }"
          @click="goToDetail(work)"
          shadow="hover"
        >
          <div class="work-image-container">
            <el-image 
              :src="work.imageUrl" 
              class="work-image"
              fit="contain"
              :preview-src-list="[work.imageUrl]"
              loading="lazy"
            >
              <template #placeholder>
                <div class="image-placeholder">
                  <el-icon><Picture /></el-icon>
                </div>
              </template>
            </el-image>
          </div>
          <div class="work-info">
            <h3 class="work-title">{{ work.name }}</h3>
            <div class="work-meta">
              <el-tag size="small" :type="work.category === 'calligraphy' ? 'success' : 'warning'">
                {{ work.categoryName }}
              </el-tag>
              <span class="artist">{{ work.artist }}</span>
              <span class="period">{{ work.period }}</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 无数据提示 -->
    <el-empty
      v-if="works.length === 0"
      description="暂无相关作品"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Picture } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { getWorksByClassify } from '@/api/works'

const router = useRouter()
const activeCategory = ref('calligraphy')
const works = ref([])

// 获取作品列表
const loadWorks = async (category) => {
  try {
    const classify = category === 'calligraphy' ? 1 : 0
    const { data: response } = await getWorksByClassify(classify)
    if (response.state === 200) {
      works.value = response.data.map(item => ({
        id: item.workname, // 使用作品名作为唯一标识
        name: item.workname,
        imageUrl: item.work,
        category: category,
        categoryName: category === 'calligraphy' ? '书法' : '绘画',
        artist: item.author,
        period: item.era
      }))
    }
  } catch (error) {
    ElMessage.error('获取作品列表失败')
    console.error('Error loading works:', error)
  }
}

// 监听分类变化
watch(activeCategory, (newCategory) => {
  loadWorks(newCategory)
})

// 跳转到详情页
const goToDetail = (work) => {
  router.push({
    name: 'detial',
    params: { workname: work.name }  // 修改为使用作品名作为参数
  })
}

// 初始加载
onMounted(() => {
  loadWorks(activeCategory.value)
})
</script>

<style scoped>
.works-container {
  padding-top: 0px;
  max-width: 14000px;
  margin: 0 auto;
  min-height: 1000px;
  background-color: #f5f7fa;
  transform: translate(4%,30%);
}

.page-header {
  text-align: center;
  margin-bottom: 20px;
  padding: 20px 0;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.page-header h1 {
  margin: 0;
  color: #303133;
  font-size: 28px;
  font-weight: bold;
}

.category-nav {
  margin-bottom: 30px;
  text-align: center;
  padding: 20px 0;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.works-grid {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
  justify-content: flex-start;
  min-height: 400px;
}

.el-col {
  padding: 0 15px;
  margin-bottom: 30px;
  height: 100%;
}

.work-card {
  height: 100%;
  margin-bottom: 0;
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  display: flex;
  flex-direction: column;
}

.work-card:hover {
  transform: translateY(-5px);
}

.work-image-container {
  position: relative;
  padding-top: 100%;
  background-color: #f5f7fa;
  overflow: hidden;
}

.work-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 12px;
}

.image-placeholder {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f5f7fa;
  color: #909399;
}

.work-info {
  padding: 16px;
  background: #fff;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.work-title {
  margin: 0 0 12px 0;
  font-size: 16px;
  color: #303133;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.work-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  color: #606266;
}

.artist, .period {
  color: #909399;
}

:deep(.el-radio-group) {
  --el-radio-button-checked-bg-color: #626aef;
  --el-radio-button-checked-text-color: #ffffff;
}

:deep(.el-tag) {
  border-radius: 4px;
  font-size: 12px;
  padding: 4px 8px;
}
</style>
