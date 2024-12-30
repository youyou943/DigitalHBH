<template>
  <div class="works-container">
    <!-- 顶部标题 -->
    <div class="page-header">
      <h1>黄宾虹作品</h1>
    </div>

    <!-- 分类导航和搜索框 -->
    <div class="control-section">
      <div class="control-left"></div>

      <!-- 分类导航 -->
      <div class="category-nav">
        <div class="category-main">
          <el-radio-group v-model="activeCategory" size="large">
            <el-radio-button label="calligraphy">书法</el-radio-button>
            <el-radio-button label="painting">绘画</el-radio-button>
          </el-radio-group>
        </div>

        <!-- 时期分类 -->
        <div class="period-nav" v-if="activeCategory">
          <el-radio-group v-model="activePeriod" size="default">
            <el-radio-button label="early">早期</el-radio-button>
            <el-radio-button label="middle">中期</el-radio-button>
            <el-radio-button label="peak">盛期</el-radio-button>
            <el-radio-button label="late">晚期</el-radio-button>
          </el-radio-group>
        </div>
      </div>

      <!-- 搜索框 -->
      <div class="search-box">
        <el-input
          v-model="searchQuery"
          placeholder="搜索作品名称"
          class="search-input"
          clearable
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
      </div>
    </div>

    <!-- 作品展示区域 -->
    <el-row :gutter="30" class="works-grid" justify="start">
      <el-col 
        v-for="work in filteredWorks" 
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
      v-if="filteredWorks.length === 0"
      description="暂无相关作品"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Picture, Search } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { getWorksByClassify, getWorksByTime } from '@/api/works'

const router = useRouter()
const activeCategory = ref('calligraphy')
const activePeriod = ref('')
const works = ref([])
const searchQuery = ref('')

// 获取作品列表
const loadWorks = async (category) => {
  try {
    const classify = category === 'calligraphy' ? 1 : 0
    const { data: response } = await getWorksByClassify(classify)
    if (response.state === 200) {
      works.value = response.data.map(item => ({
        id: item.workname,
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

// 获取指定时期的作品
const loadWorksByPeriod = async (category, period) => {
  try {
    const classify = category === 'calligraphy' ? 1 : 0
    let time = ''
    switch(period) {
      case 'early':
        time = '早期'
        break
      case 'middle':
        time = '中期'
        break
      case 'peak':
        time = '盛期'
        break
      case 'late':
        time = '晚期'
        break
      default:
        return
    }
    
    const { data: response } = await getWorksByTime(classify, time)
    if (response.state === 200) {
      works.value = response.data.map(item => ({
        id: item.workname,
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
    console.error('Error loading works by period:', error)
  }
}

// 监听分类变化
watch(activeCategory, (newCategory) => {
  loadWorks(newCategory)
  activePeriod.value = '' // 重置时期选择
})

// 监听时期变化
watch(activePeriod, (newPeriod) => {
  if (newPeriod) {
    loadWorksByPeriod(activeCategory.value, newPeriod)
  } else {
    loadWorks(activeCategory.value)
  }
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

// 过滤作品列表
const filteredWorks = computed(() => {
  if (!searchQuery.value) return works.value
  const query = searchQuery.value.toLowerCase()
  return works.value.filter(work => 
    work.name.toLowerCase().includes(query) ||
    work.artist.toLowerCase().includes(query)
  )
})
</script>

<style scoped>
.works-container {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
  height: 100vh;
  background-color: #f9f4e6; /* 米黄色背景 */
  width: 92%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  gap: 20px;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.page-header {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px 0;
  background: #fff9e6; /* 浅黄色背景 */
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(185, 128, 0, 0.1);
  border: 1px solid #d4b106;
}

.page-header h1 {
  margin: 0;
  color: #8b4513; /* 棕色文字 */
  font-size: 28px;
  font-weight: 800;
  letter-spacing: 4px;
  font-family: "楷体", "STKaiti", serif;
}

.control-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  margin-bottom: 30px;
  padding: 20px 30px;
  background: #fff9e6;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(185, 128, 0, 0.1);
  border: 1px solid #d4b106;
}

.control-left {
  width: 300px; /* 与搜索框宽度相同，用于平衡布局 */
}

.search-box {
  width: 300px;
}

.search-input {
  transition: all 0.3s ease;
}

.search-input:deep(.el-input__wrapper) {
  border-radius: 4px;
  box-shadow: 0 4px 15px rgba(185, 128, 0, 0.1);
  border: 1px solid #d4b106;
  padding: 8px 15px;
  background-color: #fdfaf3;
}

.search-input:deep(.el-input__wrapper):hover {
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.search-input:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 2px 12px rgba(98, 106, 239, 0.2);
}

.search-input:deep(.el-input__prefix) {
  color: #909399;
  font-size: 16px;
}

.category-nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.category-main {
  margin-bottom: 5px;
}

.period-nav {
  animation: fadeIn 0.3s ease-in-out;
}

.period-nav :deep(.el-radio-button__inner) {
  padding: 8px 20px;
  font-size: 14px;
  background-color: #fff9e6;
  border-color: #d4b106;
  color: #8b4513;
}

.period-nav :deep(.el-radio-button__original) {
  opacity: 0;
}

.period-nav :deep(.el-radio-button__inner:hover) {
  color: #d4b106;
  border-color: #8b4513;
}

.period-nav :deep(.el-radio-button__input.is-checked + .el-radio-button__inner) {
  background-color: #8b4513;
  border-color: #8b4513;
  box-shadow: -1px 0 0 0 #8b4513;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.works-grid {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
  justify-content: flex-start;
  flex: 1;
}

.el-col {
  padding: 0 15px;
  margin-bottom: 30px;
  height: auto;
}

.work-card {
  height: auto;
  margin-bottom: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff9e6;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 15px rgba(185, 128, 0, 0.1);
  border: 1px solid #d4b106;
}

.work-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(185, 128, 0, 0.2);
}

.work-image-container {
  position: relative;
  padding-top: 75%;
  background-color: #fdfaf3;
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
  padding: 20px;
  background: #fff9e6;
  flex-grow: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.work-title {
  margin: 0;
  font-size: 18px;
  color: #8b4513;
  font-weight: 600;
  font-family: "楷体", "STKaiti", serif;
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
  --el-radio-button-checked-bg-color: #8b4513;
  --el-radio-button-checked-text-color: #ffffff;
}

:deep(.el-radio-button__inner) {
  padding: 12px 25px;
  font-weight: 500;
  border-radius: 4px;
  transition: all 0.3s ease;
  font-family: "楷体", "STKaiti", serif;
  border-color: #d4b106;
}

:deep(.el-tag) {
  border-radius: 4px;
  font-size: 12px;
  padding: 6px 12px;
  font-weight: 500;
  font-family: "楷体", "STKaiti", serif;
  background-color: #8b4513;
  border-color: #8b4513;
}

/* 响应式布局 */
@media screen and (max-width: 1200px) {
  .works-container {
    width: 95%;
  }
}

@media screen and (max-width: 768px) {
  .works-container {
    width: 98%;
    padding: 15px;
  }

  .page-header h1 {
    font-size: 24px;
  }

  .category-nav {
    margin-bottom: 20px;
    padding: 15px 0;
  }

  .works-grid {
    margin-right: -10px;
    margin-left: -10px;
  }
}

@media screen and (max-width: 480px) {
  .works-container {
    padding: 10px;
  }

  .page-header {
    padding: 15px 0;
  }

  .page-header h1 {
    font-size: 20px;
  }

  .work-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}

.works-container::-webkit-scrollbar {
  width: 8px;
}

.works-container::-webkit-scrollbar-track {
  background: rgba(139, 69, 19, 0.1);
  border-radius: 3px;
}

.works-container::-webkit-scrollbar-thumb {
  background: rgba(139, 69, 19, 0.2);
  border-radius: 4px;
}

.works-container::-webkit-scrollbar-thumb:hover {
  background: rgba(139, 69, 19, 0.3);
}
</style>
