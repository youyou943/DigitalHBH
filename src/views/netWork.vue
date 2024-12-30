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

const graphRef = ref('elder')

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
    { id: '黄定华', relation: '父亲', group: 'family', age: 'elder', color: '#6b7b94' },
    { id: '方氏', relation: '母亲', group: 'family', age: 'elder', color: '#6b7b94' },
    { id: '洪四果', relation: '原配夫人', group: 'family', age: 'elder', color: '#6b7b94' },
    { id: '宋若婴', relation: '侧室', group: 'family', age: 'elder', color: '#6b7b94' },
    { id: '黄用明', relation: '长子', group: 'family', age: 'elder', color: '#6b7b94' },
    { id: '黄映宇', relation: '次子', group: 'family', age: 'elder', color: '#6b7b94' },
    { id: '黄鑑', relation: '三子', group: 'family', age: 'elder', color: '#6b7b94' },
    { id: '黄映家', relation: '女儿', group: 'family', age: 'elder', color: '#6b7b94' },
    { id: '黄乃耐', relation: '妹妹', group: 'family', age: 'elder', color: '#6b7b94' },
    { id: '黄恒华', relation: '四叔', group: 'family', age: 'elder', color: '#6b7b94' },
    { id: '黄元秀', relation: '弟弟', group: 'family', age: 'elder', color: '#6b7b94' },
    { id: '黄映绮', relation: '堂妹', group: 'family', age: 'elder', color: '#6b7b94' },
    { id: '黄昂青', relation: '侄子', group: 'family', age: 'elder', color: '#6b7b94' },
    { id: '黄警吾', relation: '侄子', group: 'family', age: 'elder', color: '#6b7b94' },
    { id: '黄映芬', relation: '侄女', group: 'family', age: 'elder', color: '#6b7b94' },
    { id: '黄宾日', relation: '侄孙', group: 'family', age: 'elder', color: '#6b7b94' },
    { id: '黄高志', relation: '侄孙', group: 'family', age: 'elder', color: '#6b7b94' },
    { id: '江钟羲', relation: '侄女婿', group: 'family', age: 'elder', color: '#6b7b94' },
    { id: '赵志钧', relation: '女婿', group: 'family', age: 'elder', color: '#6b7b94' },
    { id: '黄高勤', relation: '孙女', group: 'family', age: 'elder', color: '#6b7b94' },
    { id: '黄努卫', relation: '外孙', group: 'family', age: 'elder', color: '#6b7b94' },
    { id: '李灼先', relation: '启蒙老师', group: 'art', age: 'childhood', color: '#6b7b94' },
    { id: '李咏棠', relation: '启蒙老师', group: 'art', age: 'childhood', color: '#6b7b94' },
    { id: '程建', relation: '四书五经老师', group: 'art', age: 'childhood', color: '#6b7b94' },
    { id: '赵经田', relation: '四书五经老师', group: 'art', age: 'childhood', color: '#6b7b94' },
    { id: '应芹生', relation: '四书五经老师', group: 'art', age: 'childhood', color: '#6b7b94' },
    { id: '董其昌', relation: '儿时喜爱的作者', group: 'art', age: 'childhood', color: '#6b7b94' },
    { id: '查士标', relation: '儿时喜爱的作者', group: 'art', age: 'childhood', color: '#6b7b94' },
    { id: '陈春帆', relation: '写真老师', group: 'art', age: 'youth', color: '#6b7b94' },
    { id: '汪仲伊', relation: '国学老师', group: 'art', age: 'youth', color: '#6b7b94' },
    { id: '郑雪珊', relation: '山水老师', group: 'art', age: 'youth', color: '#6b7b94' },
    { id: '陈崇光', relation: '花鸟老师', group: 'art', age: 'youth', color: '#6b7b94' },
    { id: '程桓生', relation: '同事', group: 'art', age: 'youth', color: '#6b7b94' },
    { id: '赵穆', relation: '篆刻先生', group: 'art', age: 'youth', color: '#6b7b94' },
    { id: '许崇贵', relation: '知县', group: 'art', age: 'youth', color: '#6b7b94' },
    { id: '黄牧甫', relation: '好友', group: 'art', age: 'youth', color: '#6b7b94' },
    { id: '郑搢书', relation: '作垦同事', group: 'art', age: 'adult', color: '#6b7b94' },
    { id: '许承尧', relation: '革命同事', group: 'art', age: 'adult', color: '#6b7b94' },
    { id: '江炜', relation: '革命同事', group: 'art', age: 'adult', color: '#6b7b94' },
    { id: '陈去病', relation: '革命同事', group: 'art', age: 'adult', color: '#6b7b94' },
    { id: '江律本', relation: '革命同事', group: 'art', age: 'adult', color: '#6b7b94' },
    { id: '黄节', relation: '革命同事', group: 'art', age: 'adult', color: '#6b7b94' },
    { id: '邓实', relation: '革命同事', group: 'art', age: 'adult', color: '#6b7b94' },
    { id: '沈曾植', relation: '革命同事', group: 'art', age: 'adult', color: '#6b7b94' },
    { id: '冯煦', relation: '革命同事', group: 'art', age: 'adult', color: '#6b7b94' },
    { id: '蔡守', relation: '书画之交兼同事', group: 'art', age: 'adult', color: '#6b7b94' },
    { id: '王一亭', relation: '书画之交兼同事', group: 'art', age: 'adult', color: '#6b7b94' },
    { id: '柳亚子', relation: '书画之交兼同事', group: 'art', age: 'adult', color: '#6b7b94' },
    { id: '高天梅', relation: '书画之交兼同事', group: 'art', age: 'adult', color: '#6b7b94' },
    { id: '潘飞声', relation: '杏花楼共雅集', group: 'art', age: 'adult', color: '#6b7b94' },
    { id: '吴昌硕', relation: '杏花楼共雅集', group: 'art', age: 'adult', color: '#6b7b94' },
    { id: '徐积余', relation: '杏花楼共雅集', group: 'art', age: 'adult', color: '#6b7b94' },
    { id: '周梦坡', relation: '杏花楼共雅集', group: 'art', age: 'adult', color: '#6b7b94' },
    { id: '徐仲可', relation: '杏花楼共雅集', group: 'art', age: 'adult', color: '#6b7b94' },
    { id: '胡朴庵', relation: '杏花楼共雅集', group: 'art', age: 'adult', color: '#6b7b94' },
    { id: '童心安', relation: '杏花楼共雅集', group: 'art', age: 'adult', color: '#6b7b94' },
    { id: '王云五', relation: '同事', group: 'art', age: 'adult', color: '#6b7b94' },
    { id: '李叔同', relation: '同事', group: 'art', age: 'adult', color: '#6b7b94' },
    { id: '邹安', relation: '同事', group: 'art', age: 'adult', color: '#6b7b94' },
    { id: '王国维', relation: '金石之交', group: 'art', age: 'adult', color: '#6b7b94' },
    { id: '曾熙', relation: '论艺朋友', group: 'art', age: 'adult', color: '#6b7b94' },
    { id: '罗振玉', relation: '好友', group: 'art', age: 'adult', color: '#6b7b94' },
    { id: '张虹', relation: '以画会友', group: 'art', age: 'adult', color: '#6b7b94' },
    { id: '王秋湄', relation: '研究同事', group: 'art', age: 'middle', color: '#6b7b94' },
    { id: '高剑父', relation: '研究同事', group: 'art', age: 'middle', color: '#6b7b94' },
    { id: '陈树人', relation: '研究同事', group: 'art', age: 'middle', color: '#6b7b94' },
    { id: '蔡哲夫', relation: '研究同事', group: 'art', age: 'middle', color: '#6b7b94' },
    { id: '邓尔雅', relation: '造访之交', group: 'art', age: 'middle', color: '#6b7b94' },
    { id: '张小楼', relation: '展览会同事', group: 'art', age: 'middle', color: '#6b7b94' },
    { id: '钱化佛', relation: '展览会同事', group: 'art', age: 'middle', color: '#6b7b94' },
    { id: '陈巨来', relation: '同事好友', group: 'art', age: 'middle', color: '#6b7b94' },
    { id: '汪声友', relation: '补习所同事', group: 'art', age: 'middle', color: '#6b7b94' },
    { id: '徐悲鸿', relation: '提携恩师', group: 'art', age: 'middle', color: '#6b7b94' },
    { id: '陶冷月', relation: '好友', group: 'art', age: 'middle', color: '#6b7b94' },
    { id: '田边华', relation: '东游之交', group: 'art', age: 'middle', color: '#6b7b94' },
    { id: '叶恭绰', relation: '同事', group: 'art', age: 'middle', color: '#6b7b94' },
    { id: '赵含英', relation: '学生', group: 'art', age: 'middle', color: '#6b7b94' },
    { id: '顾飞', relation: '学生', group: 'art', age: 'middle', color: '#6b7b94' },
    { id: '朱砚', relation: '学生', group: 'art', age: 'middle', color: '#6b7b94' },
    { id: '虞澹涵', relation: '助赈同事', group: 'art', age: 'elder', color: '#6b7b94' },
    { id: '唐冠玉', relation: '助赈同事', group: 'art', age: 'elder', color: '#6b7b94' },
    { id: '张大千', relation: '白马湖之交', group: 'art', age: 'elder', color: '#6b7b94' },
    { id: '经亨颐', relation: '白马湖之交', group: 'art', age: 'elder', color: '#6b7b94' },
    { id: '方旭', relation: '腴霜柑阁共雅集', group: 'art', age: 'elder', color: '#6b7b94' },
    { id: '龚道耕', relation: '腴霜柑阁共雅集', group: 'art', age: 'elder', color: '#6b7b94' },
    { id: '贺天健', relation: '同事', group: 'art', age: 'elder', color: '#6b7b94' },
    { id: '谢海燕', relation: '同事', group: 'art', age: 'elder', color: '#6b7b94' },
    { id: '谢公展', relation: '游会之交', group: 'art', age: 'elder', color: '#6b7b94' },
    { id: '王济远', relation: '游会之交', group: 'art', age: 'elder', color: '#6b7b94' },
    { id: '何香凝', relation: '同事', group: 'art', age: 'elder', color: '#6b7b94' },
    { id: '蔡元培', relation: '同事', group: 'art', age: 'elder', color: '#6b7b94' },
    { id: '夏剑丞', relation: '同事', group: 'art', age: 'elder', color: '#6b7b94' },
    { id: '孙海波', relation: '同事', group: 'art', age: 'elder', color: '#6b7b94' },
    { id: '罗复堪', relation: '同事', group: 'art', age: 'elder', color: '#6b7b94' },
    { id: '郭味蕖', relation: '学生', group: 'art', age: 'elder', color: '#6b7b94' },
    { id: '傅雷', relation: '画展共事好友', group: 'art', age: 'elder', color: '#6b7b94' },
    { id: '裘柱常夫妇', relation: '画展共事好友', group: 'art', age: 'elder', color: '#6b7b94' },
  ],
  links: [
    { source: '黄宾虹', target: '黄定华', relation: '父亲', type: 'family', age: 'elder' },
    { source: '黄宾虹', target: '方氏', relation: '母亲', type: 'family', age: 'elder' },
    { source: '黄宾虹', target: '洪四果', relation: '原配夫人', type: 'family', age: 'elder' },
    { source: '黄宾虹', target: '宋若婴', relation: '侧室', type: 'family', age: 'elder' },
    { source: '黄宾虹', target: '黄用明', relation: '长子', type: 'family', age: 'elder' },
    { source: '黄宾虹', target: '黄映宇', relation: '次子', type: 'family', age: 'elder' },
    { source: '黄宾虹', target: '黄鑑', relation: '三子', type: 'family', age: 'elder' },
    { source: '黄宾虹', target: '黄映家', relation: '女儿', type: 'family', age: 'elder' },
    { source: '黄宾虹', target: '黄乃耐', relation: '妹妹', type: 'family', age: 'elder' },
    { source: '黄宾虹', target: '黄恒华', relation: '四叔', type: 'family', age: 'elder' },
    { source: '黄宾虹', target: '黄元秀', relation: '弟弟', type: 'family', age: 'elder' },
    { source: '黄宾虹', target: '黄映绮', relation: '堂妹', type: 'family', age: 'elder' },
    { source: '黄宾虹', target: '黄昂青', relation: '侄子', type: 'family', age: 'elder' },
    { source: '黄宾虹', target: '黄警吾', relation: '侄子', type: 'family', age: 'elder' },
    { source: '黄宾虹', target: '黄映芬', relation: '侄女', type: 'family', age: 'elder' },
    { source: '黄宾虹', target: '黄宾日', relation: '侄孙', type: 'family', age: 'elder' },
    { source: '黄宾虹', target: '黄高志', relation: '侄孙', type: 'family', age: 'elder' },
    { source: '黄宾虹', target: '江钟羲', relation: '侄女婿', type: 'family', age: 'elder' },
    { source: '黄宾虹', target: '赵志钧', relation: '女婿', type: 'family', age: 'elder' },
    { source: '黄宾虹', target: '黄高勤', relation: '孙女', type: 'family', age: 'elder' },
    { source: '黄宾虹', target: '黄努卫', relation: '外孙', type: 'family', age: 'elder' },
    { source: '黄宾虹', target: '李灼先', relation: '启蒙老师', type: 'art', age: 'childhood' },
    { source: '黄宾虹', target: '李咏棠', relation: '启蒙老师', type: 'art', age: 'childhood' },
    { source: '黄宾虹', target: '程建', relation: '四书五经老师', type: 'art', age: 'childhood' },
    { source: '黄宾虹', target: '赵经田', relation: '四书五经老师', type: 'art', age: 'childhood' },
    { source: '黄宾虹', target: '应芹生', relation: '四书五经老师', type: 'art', age: 'childhood' },
    {
      source: '黄宾虹',
      target: '董其昌',
      relation: '儿时喜爱的作者',
      type: 'art',
      age: 'childhood',
    },
    {
      source: '黄宾虹',
      target: '查士标',
      relation: '儿时喜爱的作者',
      type: 'art',
      age: 'childhood',
    },
    { source: '黄宾虹', target: '陈春帆', relation: '写真老师', type: 'art', age: 'youth' },
    { source: '黄宾虹', target: '汪仲伊', relation: '国学老师', type: 'art', age: 'youth' },
    { source: '黄宾虹', target: '郑雪珊', relation: '山水老师', type: 'art', age: 'youth' },
    { source: '黄宾虹', target: '陈崇光', relation: '花鸟老师', type: 'art', age: 'youth' },
    { source: '黄宾虹', target: '程桓生', relation: '同事', type: 'art', age: 'youth' },
    { source: '黄宾虹', target: '赵穆', relation: '篆刻先生', type: 'art', age: 'youth' },
    { source: '黄宾虹', target: '许崇贵', relation: '知县', type: 'art', age: 'youth' },
    { source: '黄宾虹', target: '黄牧甫', relation: '好友', type: 'art', age: 'youth' },
    { source: '黄宾虹', target: '郑搢书', relation: '作垦同事', type: 'art', age: 'adult' },
    { source: '黄宾虹', target: '许承尧', relation: '革命同事', type: 'art', age: 'adult' },
    { source: '黄宾虹', target: '江炜', relation: '革命同事', type: 'art', age: 'adult' },
    { source: '黄宾虹', target: '陈去病', relation: '革命同事', type: 'art', age: 'adult' },
    { source: '黄宾虹', target: '江律本', relation: '革命同事', type: 'art', age: 'adult' },
    { source: '黄宾虹', target: '黄节', relation: '革命同事', type: 'art', age: 'adult' },
    { source: '黄宾虹', target: '邓实', relation: '革命同事', type: 'art', age: 'adult' },
    { source: '黄宾虹', target: '沈曾植', relation: '革命同事', type: 'art', age: 'adult' },
    { source: '黄宾虹', target: '冯煦', relation: '革命同事', type: 'art', age: 'adult' },
    { source: '黄宾虹', target: '蔡守', relation: '书画之交兼同事', type: 'art', age: 'adult' },
    { source: '黄宾虹', target: '王一亭', relation: '书画之交兼同事', type: 'art', age: 'adult' },
    { source: '黄宾虹', target: '柳亚子', relation: '书画之交兼同事', type: 'art', age: 'adult' },
    { source: '黄宾虹', target: '高天梅', relation: '书画之交兼同事', type: 'art', age: 'adult' },
    { source: '黄宾虹', target: '潘飞声', relation: '杏花楼共雅集', type: 'art', age: 'adult' },
    { source: '黄宾虹', target: '吴昌硕', relation: '杏花楼共雅集', type: 'art', age: 'adult' },
    { source: '黄宾虹', target: '徐积余', relation: '杏花楼共雅集', type: 'art', age: 'adult' },
    { source: '黄宾虹', target: '周梦坡', relation: '杏花楼共雅集', type: 'art', age: 'adult' },
    { source: '黄宾虹', target: '徐仲可', relation: '杏花楼共雅集', type: 'art', age: 'adult' },
    { source: '黄宾虹', target: '胡朴庵', relation: '杏花楼共雅集', type: 'art', age: 'adult' },
    { source: '黄宾虹', target: '童心安', relation: '杏花楼共雅集', type: 'art', age: 'adult' },
    { source: '黄宾虹', target: '王云五', relation: '同事', type: 'art', age: 'adult' },
    { source: '黄宾虹', target: '李叔同', relation: '同事', type: 'art', age: 'adult' },
    { source: '黄宾虹', target: '邹安', relation: '同事', type: 'art', age: 'adult' },
    { source: '黄宾虹', target: '王国维', relation: '金石之交', type: 'art', age: 'adult' },
    { source: '黄宾虹', target: '曾熙', relation: '论艺朋友', type: 'art', age: 'adult' },
    { source: '黄宾虹', target: '罗振玉', relation: '好友', type: 'art', age: 'adult' },
    { source: '黄宾虹', target: '张虹', relation: '以画会友', type: 'art', age: 'adult' },
    { source: '黄宾虹', target: '王秋湄', relation: '研究同事', type: 'art', age: 'middle' },
    { source: '黄宾虹', target: '高剑父', relation: '研究同事', type: 'art', age: 'middle' },
    { source: '黄宾虹', target: '陈树人', relation: '研究同事', type: 'art', age: 'middle' },
    { source: '黄宾虹', target: '蔡哲夫', relation: '研究同事', type: 'art', age: 'middle' },
    { source: '黄宾虹', target: '邓尔雅', relation: '造访之交', type: 'art', age: 'middle' },
    { source: '黄宾虹', target: '张小楼', relation: '展览会同事', type: 'art', age: 'middle' },
    { source: '黄宾虹', target: '钱化佛', relation: '展览会同事', type: 'art', age: 'middle' },
    { source: '黄宾虹', target: '陈巨来', relation: '同事好友', type: 'art', age: 'middle' },
    { source: '黄宾虹', target: '汪声友', relation: '补习所同事', type: 'art', age: 'middle' },
    { source: '黄宾虹', target: '徐悲鸿', relation: '提携恩师', type: 'art', age: 'middle' },
    { source: '黄宾虹', target: '陶冷月', relation: '好友', type: 'art', age: 'middle' },
    { source: '黄宾虹', target: '田边华', relation: '东游之交', type: 'art', age: 'middle' },
    { source: '黄宾虹', target: '叶恭绰', relation: '同事', type: 'art', age: 'middle' },
    { source: '黄宾虹', target: '赵含英', relation: '学生', type: 'art', age: 'middle' },
    { source: '黄宾虹', target: '顾飞', relation: '学生', type: 'art', age: 'middle' },
    { source: '黄宾虹', target: '朱砚', relation: '学生', type: 'art', age: 'middle' },
    { source: '黄宾虹', target: '虞澹涵', relation: '助赈同事', type: 'art', age: 'elder' },
    { source: '黄宾虹', target: '唐冠玉', relation: '助赈同事', type: 'art', age: 'elder' },
    { source: '黄宾虹', target: '张大千', relation: '白马湖之交', type: 'art', age: 'elder' },
    { source: '黄宾虹', target: '经亨颐', relation: '白马湖之交', type: 'art', age: 'elder' },
    { source: '黄宾虹', target: '方旭', relation: '腴霜柑阁共雅集', type: 'art', age: 'elder' },
    { source: '黄宾虹', target: '龚道耕', relation: '腴霜柑阁共雅集', type: 'art', age: 'elder' },
    { source: '黄宾虹', target: '贺天健', relation: '同事', type: 'art', age: 'elder' },
    { source: '黄宾虹', target: '谢海燕', relation: '同事', type: 'art', age: 'elder' },
    { source: '黄宾虹', target: '谢公展', relation: '游会之交', type: 'art', age: 'elder' },
    { source: '黄宾虹', target: '王济远', relation: '游会之交', type: 'art', age: 'elder' },
    { source: '黄宾虹', target: '何香凝', relation: '同事', type: 'art', age: 'elder' },
    { source: '黄宾虹', target: '蔡元培', relation: '同事', type: 'art', age: 'elder' },
    { source: '黄宾虹', target: '夏剑丞', relation: '同事', type: 'art', age: 'elder' },
    { source: '黄宾虹', target: '孙海波', relation: '同事', type: 'art', age: 'elder' },
    { source: '黄宾虹', target: '罗复堪', relation: '同事', type: 'art', age: 'elder' },
    { source: '黄宾虹', target: '郭味蕖', relation: '学生', type: 'art', age: 'elder' },
    { source: '黄宾虹', target: '傅雷', relation: '画展共事好友', type: 'art', age: 'elder' },
    { source: '黄宾虹', target: '裘柱常夫妇', relation: '画展共事好友', type: 'art', age: 'elder' },
  ],
}

// 保存原始数据的副本
const originalData = {
  nodes: [...graphData.nodes],
  links: [...graphData.links],
}

const initGraph = () => {
  const filteredData = getFilteredData()
  const width = 1000
  const height = 1000

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

  // 如果选择了“全部”或“家族”按钮，取消所有年龄按钮的激活状态
  if (filterId === 'all' || filterId === 'family') {
    ageFilters.value.forEach((filter) => {
      filter.active = false
    })
  }

  initGraph() // 重新渲染图表
}

const toggleAgeFilter = (filterId) => {
  const activeFilter = filters.value.find((f) => f.active)

  // 如果当前选择的是“全部”或“家族”分类，则禁用年龄筛选
  if (activeFilter.id === 'all' || activeFilter.id === 'family') {
    return
  }

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
  initGraph() // 重新渲染图表
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
  margin-top: 10px;
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
  width: 1000px;
  height: 1000px;
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