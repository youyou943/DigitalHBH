<template>
  <div class="graph-wrapper">
    <div class="main-content">
      <div id="relationship-graph" ref="graphRef"></div>
      <div class="category-filters">
        <button
          v-for="filter in filters"
          :key="filter.id"
          :class="['filter-btn', { active: filter.active }]"
          @click="toggleFilter(filter.id)"
        >
          {{ filter.name }}
        </button>
      </div>
    </div>
    <div v-if="filters[filters.length - 1].active" class="age-filters">
      <button
        v-for="ageFilter in ageFilters"
        :key="ageFilter.id"
        :class="['age-btn', { active: ageFilter.active }]"
        @click="toggleAgeFilter(ageFilter.id)"
      >
        {{ ageFilter.name }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as d3 from 'd3'

const graphRef = ref(null)

const filters = ref([
  { id: 'all', name: '全部', active: true },
  { id: 'family', name: '家族', active: false },
  { id: 'art', name: '艺术', active: false },
])

const ageFilters = ref([
  { id: 'childhood', name: '童年', active: false },
  { id: 'youth', name: '青年', active: false },
  { id: 'adult', name: '壮年', active: false },
  { id: 'middle', name: '中年', active: false },
  { id: 'elder', name: '老年', active: false },
])

const graphData = {
  nodes: [
    { id: '黄宾虹', group: 'center', color: '#c15c37' },
    { id: '王氏', group: 'family', color: '#6b7b94', age: 'childhood' },
    { id: '马从香', group: 'family', color: '#6b7b94', age: 'childhood' },
    { id: '钱谦益', group: 'family', color: '#6b7b94', age: 'childhood' },
    { id: '高孝龙', group: 'family', color: '#6b7b94', age: 'youth' },
    { id: '邢钧', group: 'family', color: '#6b7b94', age: 'youth' },
    { id: '徐显臣', group: 'family', color: '#6b7b94', age: 'youth' },
    { id: '黄辉', group: 'family', color: '#6b7b94', age: 'adult' },
    { id: '沈思孝', group: 'family', color: '#6b7b94', age: 'adult' },
    { id: '马时可', group: 'family', color: '#6b7b94', age: 'adult' },
    { id: '王士琦', group: 'art', color: '#6b7b94', age: 'middle' },
    { id: '陈所益', group: 'art', color: '#6b7b94', age: 'middle' },
    { id: '田一儒', group: 'art', color: '#6b7b94', age: 'middle' },
    { id: '区大相', group: 'art', color: '#6b7b94', age: 'middle' },
    { id: '吴正志', group: 'art', color: '#6b7b94', age: 'elder' },
    { id: '王嘉会', group: 'art', color: '#6b7b94', age: 'elder' },
    { id: '朱国祯', group: 'art', color: '#6b7b94', age: 'elder' },
    { id: '沈一贯', group: 'art', color: '#6b7b94', age: 'elder' },
    { id: '顾宪成', group: 'art', color: '#6b7b94', age: 'elder' },
  ],
  links: [
    { source: '黄宾虹', target: '王氏', type: 'family', age: 'childhood', relation: '母亲' },
    { source: '黄宾虹', target: '马从香', type: 'family', age: 'childhood', relation: '祖父' },
    { source: '黄宾虹', target: '钱谦益', type: 'family', age: 'childhood', relation: '叔父' },
    { source: '黄宾虹', target: '高孝龙', type: 'family', age: 'youth', relation: '兄长' },
    { source: '黄宾虹', target: '邢钧', type: 'family', age: 'youth', relation: '族兄' },
    { source: '黄宾虹', target: '徐显臣', type: 'family', age: 'youth', relation: '表兄' },
    { source: '黄宾虹', target: '黄辉', type: 'family', age: 'adult', relation: '堂兄' },
    { source: '黄宾虹', target: '沈思孝', type: 'family', age: 'adult', relation: '姐夫' },
    { source: '黄宾虹', target: '马时可', type: 'family', age: 'adult', relation: '姨父' },
    { source: '黄宾虹', target: '王士琦', type: 'art', age: 'middle', relation: '师父' },
    { source: '黄宾虹', target: '陈所益', type: 'art', age: 'middle', relation: '师兄' },
    { source: '黄宾虹', target: '田一儒', type: 'art', age: 'middle', relation: '师叔' },
    { source: '黄宾虹', target: '区大相', type: 'art', age: 'middle', relation: '挚友' },
    { source: '黄宾虹', target: '吴正志', type: 'art', age: 'elder', relation: '师友' },
    { source: '黄宾虹', target: '王嘉会', type: 'art', age: 'elder', relation: '同门' },
    { source: '黄宾虹', target: '朱国祯', type: 'art', age: 'elder', relation: '好友' },
    { source: '黄宾虹', target: '沈一贯', type: 'art', age: 'elder', relation: '知己' },
    { source: '黄宾虹', target: '顾宪成', type: 'art', age: 'elder', relation: '挚友' },
  ],
}

// 保存原始数据的副本
const originalData = {
  nodes: [...graphData.nodes],
  links: [...graphData.links],
}

const initGraph = () => {
  const filteredData = getFilteredData()
  const width = 800
  const height = 800

  d3.select('#relationship-graph svg').remove()

  const svg = d3
    .select('#relationship-graph')
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  const simulation = d3
    .forceSimulation(filteredData.nodes)
    .force(
      'link',
      d3
        .forceLink(filteredData.links)
        .id((d) => d.id)
        .distance(200),
    )
    .force('charge', d3.forceManyBody().strength(-1000))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('radial', d3.forceRadial(250, width / 2, height / 2))

  // 添加连线和文字的容器组
  const linkGroups = svg.append('g').selectAll('g').data(filteredData.links).enter().append('g')

  // 添加连线
  linkGroups
    .append('line')
    .style('stroke', '#999')
    .style('stroke-width', 1)
    .style('stroke-dasharray', '3,3')

  // 添加连线上的文字
  linkGroups
    .append('text')
    .attr('text-anchor', 'middle')
    .attr('dy', -8)
    .style('fill', '#333')
    .style('font-size', '14px')
    .style('font-weight', '500')
    .style('opacity', 0)
    .text((d) => d.relation)

  // 添加节点
  const nodes = svg
    .append('g')
    .selectAll('g')
    .data(filteredData.nodes)
    .enter()
    .append('g')
    .style('cursor', 'pointer')
    .on('click', function (event, d) {
      event.stopPropagation()
      // 先将所有文字隐藏
      linkGroups.selectAll('text').style('opacity', 0)
      // 再显示相关的文字
      linkGroups.selectAll('text').each(function (t) {
        if (t.source.id === d.id || t.target.id === d.id) {
          d3.select(this).style('opacity', 1)
        }
      })
    })

  // 添加节点圆圈
  nodes
    .append('circle')
    .attr('r', (d) => (d.group === 'center' ? 40 : 30))
    .style('fill', (d) => d.color)

  // 添加节点文字
  nodes
    .append('text')
    .text((d) => d.id)
    .attr('text-anchor', 'middle')
    .attr('dy', '.35em')
    .style('fill', 'white')
    .style('font-size', '12px')

  // 在 SVG 空白处点击时隐藏所有关系文字
  svg.on('click', function (event) {
    if (event.target.tagName === 'svg') {
      linkGroups.selectAll('text').style('opacity', 0)
    }
  })

  // 添加拖拽行为
  nodes.call(d3.drag().on('start', dragstarted).on('drag', dragged).on('end', dragended))

  simulation.on('tick', () => {
    linkGroups
      .select('line')
      .attr('x1', (d) => d.source.x)
      .attr('y1', (d) => d.source.y)
      .attr('x2', (d) => d.target.x)
      .attr('y2', (d) => d.target.y)

    linkGroups
      .select('text')
      .attr('x', (d) => (d.source.x + d.target.x) / 2)
      .attr('y', (d) => (d.source.y + d.target.y) / 2)

    nodes.attr('transform', (d) => `translate(${d.x},${d.y})`)
  })

  function dragstarted(event) {
    if (!event.active) simulation.alphaTarget(0.3).restart()
    event.subject.fx = event.subject.x
    event.subject.fy = event.subject.y
  }

  function dragged(event) {
    event.subject.fx = event.x
    event.subject.fy = event.y
  }

  function dragended(event) {
    if (!event.active) simulation.alphaTarget(0)
    event.subject.fx = null
    event.subject.fy = null
  }
}

const getFilteredData = () => {
  const activeFilter = filters.value.find((f) => f.active)
  const activeAgeFilter = ageFilters.value.find((f) => f.active)

  let filteredNodes = [...originalData.nodes]
  let filteredLinks = [...originalData.links]

  // 先按分类筛选
  if (activeFilter.id !== 'all') {
    filteredNodes = filteredNodes.filter(
      (node) => node.group === 'center' || node.group === activeFilter.id,
    )
    filteredLinks = filteredLinks.filter((link) => link.type === activeFilter.id)
  }

  // 再按年龄阶段筛选
  if (activeAgeFilter) {
    filteredNodes = filteredNodes.filter(
      (node) => node.group === 'center' || node.age === activeAgeFilter.id,
    )
    filteredLinks = filteredLinks.filter((link) => link.age === activeAgeFilter.id)
  }

  return {
    nodes: filteredNodes,
    links: filteredLinks,
  }
}

const toggleFilter = (filterId) => {
  filters.value.forEach((filter) => {
    filter.active = filter.id === filterId
  })
  initGraph() // 重新渲染图表
}

const toggleAgeFilter = (filterId) => {
  const filter = ageFilters.value.find((f) => f.id === filterId)
  if (filter.active) {
    // 如果当前按钮已经是激活状态，则取消激活
    filter.active = false
  } else {
    // 否则，先将所有按钮设为非激活，再激活当前按钮
    ageFilters.value.forEach((f) => {
      f.active = f.id === filterId
    })
  }
  initGraph()
}

onMounted(() => {
  initGraph()
})
</script>

<style scoped>
.graph-wrapper {
  width: 100%;
  padding: 20px;
  background-color: #f5f2eb;
  position: relative;
}

.main-content {
  position: relative;
}

.category-filters {
  position: absolute;
  right: 100px;
  top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 10;
}

.filter-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #6b7b94;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
  min-width: 80px;
}

.filter-btn:hover {
  opacity: 0.9;
}

.filter-btn.active {
  background-color: #c15c37;
}

#relationship-graph {
  width: 800px;
  height: 800px;
  margin: 0 auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.age-filters {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.age-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #6b7b94;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
  min-width: 80px;
}

.age-btn:hover {
  opacity: 0.9;
}

.age-btn.active {
  background-color: #c15c37;
}
</style>
