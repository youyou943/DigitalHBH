<template>
 
  <div>
      <LargeAreaChart />

      <!-- 图标”返回首页“ -->
      <svg aria-label="返回首页" t="1733992293250" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2473" width="50" height="50" data-spm-anchor-id="a313x.search_index.0.i7.36263a81LHDsbW" style="position: absolute;z-index:3;top:180px;left: 20px;" @click="goBackhome">
        <path d="M512 512.2l0.1-0.4-0.1 0.4z" fill="#8a8a8a" p-id="2474"></path>
        <path d="M923.7 469c-0.4-0.6-0.9-1.2-1.4-1.8-41.9-49.5-89.1-103.1-139-159.8l-0.2-0.2c-50.3-57.1-102.3-116.1-149.6-172-0.6-0.7-1.2-1.3-1.8-1.9-36.3-35.9-74.6-54.1-114-54.1h-2.1c-38.3 0.6-74.1 18.3-106.6 52.6-0.2 0.2-0.4 0.4-0.6 0.7C363.2 183.3 311.3 237.9 261.1 290.8l-0.2 0.2C210.1 344.4 157.6 399.6 111 451.9l-0.1 0.1c-44.8 50.9-32 95.4-24.4 112.1 14 30.9 46.3 53.4 76.8 53.4h41.4v212.7c0 27.2 9.6 55 26.4 76.2 19.6 24.7 46.6 38.3 76 38.3h138.5c16.6 0 30-13.4 30-30V703.5H567v211.4c0 16.6 13.4 30 30 30h139.5c25 0 49.9-11.1 68.1-30.5 22.8-24.2 34.3-58.8 34.3-102.9V617.6h22.3c32 0 59.8-17 74.3-45.4 16.4-31.8 12-70.4-11.8-103.2z m-41.5 75.9c-4.2 8.2-11.6 12.7-20.9 12.7H809c-16.6 0-30 13.4-30 30v223.8c0 27.9-6.2 49.3-18 61.8-10.2 10.8-21.3 11.7-24.5 11.7H627.1V673.5c0-16.6-13.4-30-30-30H445.6c-16.6 0-30 13.4-30 30v211.4H307.2c-25 0-42.4-28.7-42.4-54.5V587.6c0-16.6-13.4-30-30-30h-71.4c-4.2 0-16.8-6.2-22.2-18.1-6-13.4-1-29.9 14.7-47.7 45.9-51.5 98-106.4 148.5-159.4l0.3-0.3C355 279 407.1 224.2 453 172.7c20.8-21.9 42.2-33.2 63.6-33.6 23.1-0.4 47.3 11.7 72 35.9C636.1 231 688 289.9 738.1 346.8l0.2 0.2c49.4 56.1 96.1 109.1 137.4 158 9.9 14.1 12.3 28.6 6.5 39.9z" fill="#8a8a8a" p-id="2475"></path>
      </svg>

      <!-- 图表图例 -->
      <Legend />

      <!-- 图标“生” -->
      <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg" style="position: absolute;z-index:3;top:350;left: 60px;">
          <!-- 圆形 -->
          <circle cx="50" cy="50" r="22" fill="#CEC8B8" />
          <!-- 文字 -->
          <text x="50" y="55" text-anchor="middle" fill="#8a8a8a" font-size="16" font-family="Arial" font-weight="bold">
            生
          </text>
      </svg>

     <!-- 图标“卒” -->
      <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg" style="position: absolute;z-index:3;top:350;left: 6280px;">
          <!-- 圆形 -->
          <circle cx="50" cy="50" r="22" fill="#CEC8B8" />
          <!-- 文字 -->
          <text x="50" y="55" text-anchor="middle" fill="#8a8a8a" font-size="16" font-family="Arial" font-weight="bold">
            卒
          </text>
      </svg>
     <!-- 图标“事” -->
     <svg width="70" height="91" xmlns="http://www.w3.org/2000/svg" style="position: absolute;z-index:3;top:500;left:30px;" @click="changeItem">
          <!-- 胶囊背景 -->
          <rect x="10" y="10" rx="60" ry="20" width="40" height="80" :style="{ fill: svgFillColor, strokeWidth: 2, stroke: '#8a8a8a' }"  />
          <text x="30" y="40" text-anchor="middle" fill="black" font-size="19" font-family="SimSun" font-weight="bold">
                  事
          </text>
          <!-- 胶囊内的图片 -->
          <image x="17" y="54" width="25" height="25" href="../static/avatar.png" clip-path="url(#capsuleClip)" />
  
          <!-- 定义剪切路径，确保图片只显示在胶囊区域内 -->
          <clipPath id="capsuleClip">
          <rect x="10" y="10" rx="80" ry="40" width="100" height="120" />
          </clipPath>
      </svg>



    <div class="timeline-flex-container">
    <Timeline :startYear="1865" :endYear="1957" :width="6500" :height="300" />
    </div>

  <div class="container">
    <div class="header">中国大事记</div>
    <div class="section">
    <div class="grid">
      <div class="subheader">史事</div>
       <div v-for="(item, index) in showNewContainer ? items2 : items" :key="index" 
       :class="['grid-item', { 'special-style': showNewContainer && checkItem(item)}]" 
       @click="handleClick(item)">
    {{ item }}
     </div>
    </div>
    <div class="grid">
      <div class="subheader">艺术</div>
      <div v-for="(item, index) in items" :key="index" class="grid-item" @click="handleClick(item)">{{ item }}</div>
    </div>
    </div>
    
  </div>

  <div class="container2">
    <div class="header2">欧洲大事记</div>
    <div class="section2">
    <div class="grid2">
      <div class="subheader2">史事</div>
      <div v-for="(item, index) in items" :key="index" class="grid-item2" @click="handleClick(item)">{{ item }}</div>
    </div>
    <div class="grid2">
      <div class="subheader2">艺术</div>
      <div v-for="(item, index) in items" :key="index" class="grid-item2" @click="handleClick(item)">{{ item }}</div>
    </div>
    </div>   
  </div>

   <!-- 事件详情 -->
    <el-dialog
     v-model="dialogVisible"
      width="40%"
      :fullscreen="false"
      :center="true"
      :before-close="handleClose"
      style="z-index: 9999;background-color: rgb(243,238,220);top: 0; margin-top: 0;"
      
    >
      <div class="dialog-content2">
        <p>胡宗宪（1512-1565），字汝贞，号默林，直隶绩溪县（今安徽）人。明朝政治、军事人物。任浙江巡按御史期间多次攻击东南沿海倭寇。后因严嵩事牵连下狱自尽。
          
          王直（？-1559）是明代著名的武装海商集团（倭寇）首领；生于南直隶徽州歙县。1557年被胡宗宪诱降，1559年被明廷斩杀。
        </p>
        <p v-html="eventDataother.event"></p>
        <p>&nbsp;</p>
        <p style="text-align: center;">
          <img src="../static/avatar.png" alt="" width="500" height="465">
          <img :src="eventDataother.work" alt="" width="500" height="465">
        </p>
        <p style="text-align: center;">《多宝塔碑》明拓本（局部），原碑现藏西安碑林</p>
        <p style="text-align: center;">{{ eventDataother.workname }}</p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
        </span>
      </div>
    </el-dialog>

    <!-- 年份详情 -->
    <el-dialog 
       v-model="dialogVisible2" 
       width="40%"
      :fullscreen="false"
      :center="true" 
      @close="dialogVisible2 = false"
      style="z-index: 9999;background-color: rgb(243,238,220);top:0; margin-top: 0;"
      >
      <div class="dialog-content">
        <h2>{{ selectedYear }}年</h2>
        <br>
        <p v-if="eventDatayear.painting">
           <svg t="1734953412760" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10282" width="48" height="48"><path d="M263.314286 175.542857h497.371428v682.666667H263.314286z" fill="#F2EBD2" p-id="10283" v-if="eventDatayear.painting"></path><path d="M277.942857 687.542857l150.186667-131.169524c24.868571-21.942857 62.902857-19.504762 85.333333 4.876191L575.390476 629.028571l20.48-15.603809c24.380952-19.017143 59.489524-16.579048 80.944762 5.851428l73.630476 75.580953V843.580952H273.066667l4.87619-156.038095z" fill="#FFC800" p-id="10284" data-spm-anchor-id="a313x.search_index.0.i8.34503a81XvIFXI" class="selected"></path><path d="M760.685714 882.590476H263.314286c-13.653333 0-24.380952-10.727619-24.380953-24.380952V256c0-13.653333 10.727619-24.380952 24.380953-24.380952s24.380952 10.727619 24.380952 24.380952V833.828571h448.609524V199.92381H263.314286c-13.653333 0-24.380952-10.727619-24.380953-24.380953s10.727619-24.380952 24.380953-24.380952h497.371428c13.653333 0 24.380952 10.727619 24.380953 24.380952v682.666667c0 13.653333-10.727619 24.380952-24.380953 24.380952z" fill="#2F57B2" p-id="10285"></path><path d="M270.628571 63.390476h482.742858c31.207619 0 56.07619 24.868571 56.07619 56.076191S784.579048 175.542857 753.371429 175.542857h-482.742858C239.420952 175.542857 214.552381 150.674286 214.552381 119.466667S239.420952 63.390476 270.628571 63.390476z" fill="#02C3F7" p-id="10286"></path><path d="M753.371429 199.92381h-482.742858C226.255238 199.92381 190.171429 163.84 190.171429 119.466667S226.255238 39.009524 270.628571 39.009524h482.742858c44.373333 0 80.457143 36.08381 80.457142 80.457143S797.744762 199.92381 753.371429 199.92381z m-482.742858-112.152381c-17.554286 0-31.695238 14.140952-31.695238 31.695238s14.140952 31.695238 31.695238 31.695238h482.742858c17.554286 0 31.695238-14.140952 31.695238-31.695238s-14.140952-31.695238-31.695238-31.695238h-482.742858z" fill="#2F57B2" p-id="10287"></path><path d="M753.371429 63.390476c31.207619 0 56.07619 24.868571 56.07619 56.076191S784.579048 175.542857 753.371429 175.542857 697.295238 150.674286 697.295238 119.466667 722.16381 63.390476 753.371429 63.390476z" fill="#FFC800" p-id="10288"></path><path d="M753.371429 199.92381c-44.373333 0-80.457143-36.08381-80.457143-80.457143S708.998095 39.009524 753.371429 39.009524 833.828571 75.093333 833.828571 119.466667 797.744762 199.92381 753.371429 199.92381z m0-112.152381c-17.554286 0-31.695238 14.140952-31.695239 31.695238s14.140952 31.695238 31.695239 31.695238 31.695238-14.140952 31.695238-31.695238-14.140952-31.695238-31.695238-31.695238z" fill="#2F57B2" p-id="10289"></path><path d="M270.628571 848.457143h482.742858c31.207619 0 56.07619 24.868571 56.07619 56.07619s-24.868571 56.07619-56.07619 56.076191h-482.742858c-31.207619 0-56.07619-24.868571-56.07619-56.076191S239.420952 848.457143 270.628571 848.457143z" fill="#02C3F7" p-id="10290"></path><path d="M753.371429 984.990476h-482.742858c-44.373333 0-80.457143-36.08381-80.457142-80.457143S226.255238 824.07619 270.628571 824.07619h482.742858c44.373333 0 80.457143 36.08381 80.457142 80.457143s-36.08381 80.457143-80.457142 80.457143z m-482.742858-112.152381c-17.554286 0-31.695238 14.140952-31.695238 31.695238s14.140952 31.695238 31.695238 31.695238h482.742858c17.554286 0 31.695238-14.140952 31.695238-31.695238s-14.140952-31.695238-31.695238-31.695238h-482.742858z" fill="#2F57B2" p-id="10291" data-spm-anchor-id="a313x.search_index.0.i9.34503a81XvIFXI" class="selected"></path><path d="M753.371429 848.457143c31.207619 0 56.07619 24.868571 56.07619 56.07619s-24.868571 56.07619-56.07619 56.076191-56.07619-24.868571-56.076191-56.076191 24.868571-56.07619 56.076191-56.07619z" fill="#FFC800" p-id="10292"></path><path d="M753.371429 984.990476c-44.373333 0-80.457143-36.08381-80.457143-80.457143s36.08381-80.457143 80.457143-80.457143 80.457143 36.08381 80.457142 80.457143-36.08381 80.457143-80.457142 80.457143z m0-112.152381c-17.554286 0-31.695238 14.140952-31.695239 31.695238s14.140952 31.695238 31.695239 31.695238 31.695238-14.140952 31.695238-31.695238-14.140952-31.695238-31.695238-31.695238z" fill="#2F57B2" p-id="10293"></path><path d="M750.445714 719.238095c-6.339048 0-12.678095-2.438095-17.554285-7.314285l-73.630477-75.580953c-13.165714-13.165714-34.133333-15.11619-48.761904-3.413333L590.019048 648.533333c-10.24 7.801905-24.380952 6.339048-32.670477-2.925714l-61.927619-67.779048c-13.653333-14.628571-36.571429-16.091429-51.2-2.925714l-150.186666 131.169524c-10.24 8.777143-25.35619 7.801905-34.620953-2.438095-8.777143-10.24-7.801905-25.35619 2.438096-34.620953l150.186666-131.169523c34.620952-30.232381 88.259048-27.306667 119.466667 6.826666l46.811428 51.2 2.438096-1.950476c34.620952-26.331429 83.382857-22.918095 113.615238 8.289524l73.630476 75.580952c9.264762 9.752381 9.264762 24.868571-0.487619 34.620953-4.87619 4.87619-11.215238 6.826667-17.066667 6.826666z" fill="#2F57B2" p-id="10294"></path><path d="M604.647619 346.209524m-63.390476 0a63.390476 63.390476 0 1 0 126.780952 0 63.390476 63.390476 0 1 0-126.780952 0Z" fill="#F26871" p-id="10295"></path><path d="M604.647619 433.980952c-48.274286 0-87.771429-39.497143-87.771429-87.771428s39.497143-87.771429 87.771429-87.771429 87.771429 39.497143 87.771429 87.771429-39.497143 87.771429-87.771429 87.771428z m0-126.780952c-21.455238 0-39.009524 17.554286-39.009524 39.009524s17.554286 39.009524 39.009524 39.009524 39.009524-17.554286 39.009524-39.009524-17.554286-39.009524-39.009524-39.009524z" fill="#2F57B2" p-id="10296"></path><path d="M472.990476 126.780952H352.060952c-8.289524 0-14.628571-6.339048-14.628571-14.628571s6.339048-14.628571 14.628571-14.628571H472.990476c8.289524 0 14.628571 6.339048 14.628572 14.628571s-6.339048 14.628571-14.628572 14.628571z" fill="#FFFFFF" p-id="10297"></path><path d="M286.232381 126.780952H273.066667c-8.289524 0-14.628571-6.339048-14.628572-14.628571s6.339048-14.628571 14.628572-14.628571h13.165714c8.289524 0 14.628571 6.339048 14.628571 14.628571s-6.339048 14.628571-14.628571 14.628571z" fill="#FFFFFF" p-id="10298"></path></svg>
            <br>
          《{{ eventDatayear.paintingName}}》
        </p>
         <p style="text-align: center;" v-if="eventDatayear.painting">
          <img :src="eventDatayear.painting" alt="" width="500" height="465">
        </p>

         <p v-if="eventDatayear.calligraphy">
          <svg t="1734953304367" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6723" width="40" height="40" ><path d="M1021.123 110.792l-2.827 6.016a1020.677 1020.677 0 0 1-205.675 294.697L687.007 536.873a36.762 36.762 0 0 1-51.82 0L523.203 425.134a36.685 36.685 0 0 1 0-51.942L646.359 250.28A1009.3 1009.3 0 0 1 951.613 41.416c44.949-19.031 83.385 21.488 69.51 69.376z m-401.28 458.01l-128.681-128.81a24.678 24.678 0 0 0-34.996 0l-17.802 17.803c-37.944 37.698-33.89 106.583 11.664 151.89 45.552 45.434 114.319 49.361 152.258 11.663l17.557-17.557c9.702-9.574 9.702-25.287 0-34.99zM414.295 902.542c-6.385 6.385-13.138 12.032-20.014 17.316C250.491 1037.737 59.311 974.131 0 931.891c73.062-11.909 82.514-159.135 82.514-159.135l0.246-0.122c1.843-49.485 22.717-99.83 62.13-138.998 78.096-77.727 201.498-80.67 275.913-6.508 74.286 74.41 71.465 197.566-6.508 275.415z" fill="#707070" p-id="6724"></path></svg>
          <br>
          《{{ eventDatayear.calligraphyName}}》
        </p>
         <p style="text-align: center;" v-if="eventDatayear.calligraphy">
          <img :src="eventDatayear.calligraphy" alt="" width="500" height="465">
        </p>
        <h3>中国</h3>
        <svg t="1734090779345" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14818" width="40" height="40"><path d="M155.827 717.779C40.07 717.779 0 761.103 0 826.087s40.07 108.305 155.827 108.305c115.753 0 155.823-43.321 155.823-108.305s-40.07-108.308-155.823-108.308m845.91-563.187h-89.045c-13.359 0-22.257 8.666-22.257 21.66v108.306h-44.527V132.929c0-12.997-8.899-21.658-22.255-21.658h-89.046c-13.358 0-22.262 8.66-22.262 21.658v108.308h-44.521V132.929c0-12.997-8.904-21.658-22.263-21.658h-89.038c-13.358 0-22.265 8.66-22.265 21.658v108.308H489.74v-64.984c0-12.995-8.906-21.66-22.262-21.66h-89.043c-13.359 0-22.26 8.665-22.26 21.66v108.305H311.65v-86.647c0-64.982-40.07-108.303-155.823-108.303C40.07 89.608 0 132.929 0 197.911v519.868c35.618-30.324 84.589-43.321 155.827-43.321 71.234 0 120.21 12.997 155.823 43.32v-43.32h44.524V782.76c0 13 8.901 21.665 22.26 21.665h89.043c13.356 0 22.262-8.665 22.262-21.665V631.137h44.52v108.305c0 12.995 8.906 21.66 22.264 21.66h89.038c13.359 0 22.263-8.665 22.263-21.66V631.137h44.521v108.305c0 12.995 8.904 21.66 22.262 21.66h89.046c13.356 0 22.255-8.665 22.255-21.66v-64.984h44.527V782.76c0 13 8.898 21.665 22.257 21.665h89.046c13.356 0 22.262-8.666 22.262-21.665V176.253c0-12.995-8.906-21.66-22.262-21.66M356.174 631.136h-44.52V327.884h44.52v303.253z m178.084-43.324H489.74V284.558h44.52v303.255z m178.087 0h-44.521V284.558h44.521v303.255z m178.09 43.324h-44.52V327.884h44.52v303.253z" fill="#FFAC27" p-id="14819"></path></svg>        
        <!--<p>
          鞑靼扰宣府、宁夏、辽东。
          <br>
          戚继光破倭寇于台州。
          <br>
          太湖大水。
          <br>
          广东、贵州、江西民众起事甚多。
        </p>-->
        <p>
          {{ eventDatayear.historyEvent }}
        </p>
        <svg t="1734077043345" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12601" width="40" height="40"><path d="M391.53614281 589.62284187c-1.43225062 42.96751313-37.23851156 76.86410719-80.20602469 75.90927469-41.53526344-0.95483344-74.47702313-34.37401125-75.90927374-75.90927469-6.20641875-42.01267969 30.07725938-77.81894156 72.08993906-77.81894062 48.21909844 0 84.02535937 35.80626094 84.02535937 77.81894062zM349.52346313 433.98495969c-42.96751313-0.95483344-77.34152437-35.32884469-77.81894063-77.81894063 0-42.01267969 35.80626094-84.02535937 77.81894062-84.02536031 42.49009687 0.95483344 76.86410719 35.32884469 77.81894157 77.81894156 0.47741719 48.21909844-35.80626094 84.02535937-77.81894157 84.02535938zM667.48306344 272.14065875c-0.95483344 42.49009687-35.32884469 76.86410719-77.81894157 77.81894156-42.01267969 6.20641875-77.81894156-30.07725938-77.81894062-77.81894156s35.80626094-77.81894156 77.81894063-77.81894063c42.49009687 0.95483344 76.86410719 35.32884469 77.81894156 77.81894063z" fill="#d81e06" p-id="12602"></path><path d="M188.15657938 907.10502594c185.71514156 18.14183906 119.83162125-179.50872281 287.40492375-179.50872375l72.08993906 59.6771025c23.87084063 215.79240094-252.07607906 269.74050188-359.49486282 119.83162125zM751.03100656 619.70010125c60.15451875-89.75436188 233.45682375-389.57212219 233.45682282-389.57212219 5.72900156-13.36767094 0.47741719-28.64500875-12.41283657-35.80626093-9.07091906-6.20641875-21.00634031-6.20641875-30.07725937 0 0 0-263.53408312 227.72782125-341.83044094 299.34034406-59.6771025 60.15451875-59.6771025 84.02535937-83.54794313 179.50872281l65.88352032 53.94810094c96.43819688-29.12242594 120.78645469-35.32884469 168.52813687-107.41878469zM247.83368094 811.14424531c-167.09588625-143.70246187-186.19255875-395.30112469-42.49009594-562.39701 0-0.47741719 0.47741719-0.47741719 0.47741625-0.95483437C283.63994281 163.76704156 391.53614281 109.81894156 505.16134531 109.81894156c155.63788219 0 257.80508156 77.81894156 257.80508157 137.97345938 23.87084063-23.87084063 47.74168125-42.01267969 65.88352031-60.15451875C793.04368625 103.61252281 667.00564625 32 505.16134531 32 244.01434719 32.47741719 32.04128 243.97306719 32.04128 505.5974825v12.4128375c0.47741719 112.19295188 40.58042906 220.56656906 113.6252025 305.54676281 30.07725938 18.14183906 72.08993906 11.93542031 102.16719844-12.4128375zM757.23742531 739.5317225c42.01267969 77.81894156-53.9481 131.76704156-143.70246187 161.84430094-6.20641875 30.07725938-23.87084063 59.6771025-53.94810094 89.75436187 209.58598219-23.87084063 359.49486281-173.77972125 251.59866281-317.48218312-12.4128375 23.87084063-30.07725938 42.01267969-53.9481 65.88352031z" fill="#d81e06" p-id="12603"></path></svg>
        <!--<p>
          宁波天一阁建成。
        </p>-->
        <p>
          {{ eventDatayear.artEvent }}
        </p>
        <br>
        <h3>欧洲</h3>
        <svg t="1734090779345" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="14818" width="40" height="40"><path d="M155.827 717.779C40.07 717.779 0 761.103 0 826.087s40.07 108.305 155.827 108.305c115.753 0 155.823-43.321 155.823-108.305s-40.07-108.308-155.823-108.308m845.91-563.187h-89.045c-13.359 0-22.257 8.666-22.257 21.66v108.306h-44.527V132.929c0-12.997-8.899-21.658-22.255-21.658h-89.046c-13.358 0-22.262 8.66-22.262 21.658v108.308h-44.521V132.929c0-12.997-8.904-21.658-22.263-21.658h-89.038c-13.358 0-22.265 8.66-22.265 21.658v108.308H489.74v-64.984c0-12.995-8.906-21.66-22.262-21.66h-89.043c-13.359 0-22.26 8.665-22.26 21.66v108.305H311.65v-86.647c0-64.982-40.07-108.303-155.823-108.303C40.07 89.608 0 132.929 0 197.911v519.868c35.618-30.324 84.589-43.321 155.827-43.321 71.234 0 120.21 12.997 155.823 43.32v-43.32h44.524V782.76c0 13 8.901 21.665 22.26 21.665h89.043c13.356 0 22.262-8.665 22.262-21.665V631.137h44.52v108.305c0 12.995 8.906 21.66 22.264 21.66h89.038c13.359 0 22.263-8.665 22.263-21.66V631.137h44.521v108.305c0 12.995 8.904 21.66 22.262 21.66h89.046c13.356 0 22.255-8.665 22.255-21.66v-64.984h44.527V782.76c0 13 8.898 21.665 22.257 21.665h89.046c13.356 0 22.262-8.666 22.262-21.665V176.253c0-12.995-8.906-21.66-22.262-21.66M356.174 631.136h-44.52V327.884h44.52v303.253z m178.084-43.324H489.74V284.558h44.52v303.255z m178.087 0h-44.521V284.558h44.521v303.255z m178.09 43.324h-44.52V327.884h44.52v303.253z" fill="#FFAC27" p-id="14819"></path></svg>        
        <!--<p>波瓦西会议。
          <br>
           立沃尼亚骑士团解体。
        </p>-->
        <p>{{ eventDatayear.EuropeHistoryEvent }}</p>
        <svg t="1734077043345" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12601" width="40" height="40"><path d="M391.53614281 589.62284187c-1.43225062 42.96751313-37.23851156 76.86410719-80.20602469 75.90927469-41.53526344-0.95483344-74.47702313-34.37401125-75.90927374-75.90927469-6.20641875-42.01267969 30.07725938-77.81894156 72.08993906-77.81894062 48.21909844 0 84.02535937 35.80626094 84.02535937 77.81894062zM349.52346313 433.98495969c-42.96751313-0.95483344-77.34152437-35.32884469-77.81894063-77.81894063 0-42.01267969 35.80626094-84.02535937 77.81894062-84.02536031 42.49009687 0.95483344 76.86410719 35.32884469 77.81894157 77.81894156 0.47741719 48.21909844-35.80626094 84.02535937-77.81894157 84.02535938zM667.48306344 272.14065875c-0.95483344 42.49009687-35.32884469 76.86410719-77.81894157 77.81894156-42.01267969 6.20641875-77.81894156-30.07725938-77.81894062-77.81894156s35.80626094-77.81894156 77.81894063-77.81894063c42.49009687 0.95483344 76.86410719 35.32884469 77.81894156 77.81894063z" fill="#d81e06" p-id="12602"></path><path d="M188.15657938 907.10502594c185.71514156 18.14183906 119.83162125-179.50872281 287.40492375-179.50872375l72.08993906 59.6771025c23.87084063 215.79240094-252.07607906 269.74050188-359.49486282 119.83162125zM751.03100656 619.70010125c60.15451875-89.75436188 233.45682375-389.57212219 233.45682282-389.57212219 5.72900156-13.36767094 0.47741719-28.64500875-12.41283657-35.80626093-9.07091906-6.20641875-21.00634031-6.20641875-30.07725937 0 0 0-263.53408312 227.72782125-341.83044094 299.34034406-59.6771025 60.15451875-59.6771025 84.02535937-83.54794313 179.50872281l65.88352032 53.94810094c96.43819688-29.12242594 120.78645469-35.32884469 168.52813687-107.41878469zM247.83368094 811.14424531c-167.09588625-143.70246187-186.19255875-395.30112469-42.49009594-562.39701 0-0.47741719 0.47741719-0.47741719 0.47741625-0.95483437C283.63994281 163.76704156 391.53614281 109.81894156 505.16134531 109.81894156c155.63788219 0 257.80508156 77.81894156 257.80508157 137.97345938 23.87084063-23.87084063 47.74168125-42.01267969 65.88352031-60.15451875C793.04368625 103.61252281 667.00564625 32 505.16134531 32 244.01434719 32.47741719 32.04128 243.97306719 32.04128 505.5974825v12.4128375c0.47741719 112.19295188 40.58042906 220.56656906 113.6252025 305.54676281 30.07725938 18.14183906 72.08993906 11.93542031 102.16719844-12.4128375zM757.23742531 739.5317225c42.01267969 77.81894156-53.9481 131.76704156-143.70246187 161.84430094-6.20641875 30.07725938-23.87084063 59.6771025-53.94810094 89.75436187 209.58598219-23.87084063 359.49486281-173.77972125 251.59866281-317.48218312-12.4128375 23.87084063-30.07725938 42.01267969-53.9481 65.88352031z" fill="#d81e06" p-id="12603"></path></svg>
        <!--<p>
          莫斯科瓦里西升天大教堂建成。
          <br>
          意大利雕塑家班迪内利卒
        </p>-->
        <p>{{ eventDatayear.EuropeArtEvent }}</p>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import axios from 'axios';
import Timeline from "@/components/Timeline.vue";
import LargeAreaChart from '@/components/LargeAreaChart.vue';
import Legend from '@/components/Legend.vue';
import { ElDialog, ElButton } from 'element-plus';
import 'element-plus/dist/index.css';
import { API_BASE_URL } from '../config/api';

export default {
  name:'life',
  components: {
    Timeline,
    LargeAreaChart,
    Legend,
     ElDialog,
    ElButton,
  },
  data() {
    return {

        items: [
        '文徵明书《后赤壁赋》', '冯从吾生', '陈继儒生', '文徵明卒', '唐光启生', '王衡生', '徐光启生', '赵琦美生', '曾鲸生',
        '周凤来', '归有光卒', '冯梦龙生', '陆治卒', '文伯仁卒', '陈洪绶生', '沈德符生', '潘允端生', '钱谦益生', '文嘉卒', '梅鼎祚撰《玉合记》', '蓝瑛生', '恽向生', '文徵明书《后赤壁赋》', '冯从吾生', '陈继儒生', '文徵明卒', '唐光启生', '王衡生', '徐光启生', '赵琦美生', '曾鲸生',
        '周凤来', '归有光卒', '冯梦龙生', '陆治卒', '文伯仁卒', '陈洪绶生', '沈德符生', '潘允端生', '钱谦益生', '文嘉卒', '梅鼎祚撰《玉合记》', '蓝瑛生', '恽向生', '文徵明书《后赤壁赋》', '冯从吾生', '陈继儒生', '文徵明卒', '唐光启生', '王衡生', '徐光启生', '赵琦美生', '曾鲸生',
        '周凤来', '归有光卒', '冯梦龙生', '陆治卒', '文伯仁卒', '陈洪绶生', '沈德符生', '潘允端生', '钱谦益生', '文嘉卒', '梅鼎祚撰《玉合记》', '蓝瑛生', '恽向生', '文徵明书《后赤壁赋》', '冯从吾生', '陈继儒生', '文徵明卒', '唐光启生', '王衡生', '徐光启生', '赵琦美生', '曾鲸生',
        '周凤来', '归有光卒', '冯梦龙生', '陆治卒', '文伯仁卒', '陈洪绶生', '沈德符生', '潘允端生', '钱谦益生', '文嘉卒', '梅鼎祚撰《玉合记》', '蓝瑛生', '恽向生','文徵明书《后赤壁赋》', '恽向生','恽向生','恽向生'
      ],
      /*items2: [
        { year: 1865, data: '数据1' },
        { year: 1870, data: '数据2' },
        { year: 1900, data: '数据3' },
      ],*/
      items2: [
         '春 生于上海董家汇', '冯从吾生', '陈继儒生', '文徵明卒', '唐光启生', '王衡生', '徐光启生', '赵琦美生', '曾鲸生',
        '周凤来', '归有光卒', '书法长进', '书法长进', '文伯仁卒', '陈洪绶生', '沈德符生', '潘允端生', '钱谦益生', '文嘉卒', '梅鼎祚撰《玉合记》', '蓝瑛生', '恽向生', '文徵明书《后赤壁赋》', '冯从吾生', '陈继儒生', '文徵明卒', '唐光启生', '王衡生', '徐光启生', '赵琦美生', '曾鲸生',
        '周凤来', '归有光卒', '冯梦龙生', '陆治卒', '文伯仁卒', '陈洪绶生', '沈德符生', '潘允端生', '钱谦益生', '文嘉卒', '梅鼎祚撰《玉合记》', '蓝瑛生', '恽向生', '文徵明书《后赤壁赋》', '冯从吾生', '陈继儒生', '文徵明卒', '唐光启生', '王衡生', '徐光启生', '赵琦美生', '曾鲸生',
        '周凤来', '归有光卒', '书法长进', '陆治卒', '文伯仁卒', '陈洪绶生', '沈德符生', '潘允端生', '钱谦益生', '文嘉卒', '梅鼎祚撰《玉合记》', '蓝瑛生', '恽向生', '文徵明书《后赤壁赋》', '冯从吾生', '陈继儒生', '文徵明卒', '唐光启生', '王衡生', '徐光启生', '赵琦美生', '曾鲸生',
        '周凤来', '书法长进', '冯梦龙生', '陆治卒', '开始学画', '陈洪绶生', '沈德符生', '潘允端生', '钱谦益生', '文嘉卒', '梅鼎祚撰《玉合记》', '蓝瑛生', '恽向生','文徵明书《后赤壁赋》', '恽向生','恽向生','恽向生'

      ],
      dialogVisible: false,  // 控制 Dialog 显示/隐藏
      selectedItem: '',  // 选中的事件
      dialogVisible2: true, // 控制对话框的显示
      selectedYear: null,   // 存储传递过来的年份
      svgFillColor: "#ffffff", // 初始填充颜色
      showNewContainer: false,//是否显示人物相关事件
      itemsChineseHis: [],//中国历史标题
      itemsChineseArt: [],//中国艺术标题
      itemsEurHis: [],//欧洲历史标题
      itemsEurArt: [],//欧洲艺术标题
      itemshuang:[],//人物事件
      eventDataother: [],//其他事件详情
      eventDataperson: [],//人物事件详情
      eventDatayear:[],//某年份（某年龄）详情事件
    }
  },
  methods: {
  //获取人物事件标题
    fetch_person_titles() {
      console.log(this.items);
    //TODO:api/v1/life/person_event_titles 
    //axios.get(`${API_BASE_URL}/m2/5614391-5293614-default/246996370`)
    axios.get(`${ API_BASE_URL }/api/v1/life/person_event_titles`)
        .then(response => {
          if (response.data.state === 200) {
            const result=response.data.data;
            this.itemshuang = response.data.data;
            console.log("huangbinhong:", this.itemshuang);
            result.forEach(item => {
              const index = item.year - 1865;
              console.log("index", index);
              this.items2[index] = item.title;
            })
          } else {
            console.error('获取事件数据失败');
          }
        })
        .catch(error => {
          console.error('请求错误:', error);
        });
    },
  //获取其他事件标题
   async fetch_other_event_titles() {
     try {
    //TODO:api/v1/life/other_event_titles
       //const response = await axios.get(`${API_BASE_URL}/m2/5614391-5293614-default/246996712`);
     const response = await axios.get(`${ API_BASE_URL }/api/v1/life/other_event_titles`);
    const result = response.data.data; // 获取数据
    console.log("fetch_other_event_titles", result);
    result.forEach(item => {
   switch (item.classify) {
    case 0:
      this.itemsChineseHis.push(item.title);
      break;
    case 1:
      this.itemsChineseArt.push(item.title);
      break;
    case 2:
      this.itemsEurHis.push(item.title);
      break;
    case 3:
      this.itemsEurArt.push(item.title);
      break;
    default:
      console.warn(`未识别分类: ${item}`);
    }
    });

    console.log("itemsChineseHis:", this.itemsChineseHis);
   console.log("itemsChineseArt:", this.itemsChineseArt);
   console.log("itemsEurHis:", this.itemsEurHis);
   console.log("itemsEurArt:", this.itemsEurArt);
    } catch (error) {
        console.error('Error fetch_other_event_titles:', error);
    
  }
    },

   //查找人物事件标题来更改样式
    checkItem(item) {
      //const keywords = ['生于浙江金华']; // 需要检查的多个关键词
       const keywords = this.itemshuang.map(item => item.title);
      return keywords.some(keyword => item.includes(keyword));
    },
  //点击”事“
    changeItem() {
      // 切换颜色为灰色
     this.svgFillColor = this.svgFillColor === '#8a8a8a' ? '#ffffff' : '#8a8a8a';
     this.showNewContainer = !this.showNewContainer;
     this.fetch_person_titles();
    },
    //点击其他事件或人物事件标题
    handleClick(item) {
      console.log("点击了", item);
      // 当点击事件时，打开对话框并显示相关内容
       this.selectedItem = item;
       this.dialogVisible = true;
      console.log(this.dialogVisible);
      document.body.style.overflow = 'auto'; // 禁止滚动
      if (this.showNewContainer) {
        this.fetch_person_event_details();
      }
      else {       
        this.fetch_other_event_details();
      }
      
    },

    //获取其他事件详情数据
    fetch_other_event_details() {
    //TODO:api/v1/life/other_event_details
      //axios.get(`${API_BASE_URL}/m2/5614391-5293614-default/246996980`, { params: { title: this.selectedItem } }) 
      axios.get(`${ API_BASE_URL }/api/v1/life/other_event_details`,{ params: { title: this.selectedItem } }) 
        .then(response => {
          if (response.data.state === 200) {
            
            this.eventDataother = response.data.data;
             this.eventDataother.event = this.eventDataother.event.replace(/\n/g, "<br>");
          } else {
            console.error('获取事件数据失败');
          }
        })
        .catch(error => {
          console.error('请求错误:', error);
        });
    },

  //获取人物事件详情数据
    fetch_person_event_details() { 
      //TODO:api/v1/life/person_event_details
      //axios.get(`${API_BASE_URL}/m2/5614391-5293614-default/246996940`, { params: { title: this.selectedItem } })
      axios.get(`${ API_BASE_URL }/api/v1/life/person_event_details`,{ params: { title: this.selectedItem } })  
        .then(response => {
          if (response.data.state === 200) {
            
            this.eventDataother = response.data.data;
             this.eventDataother.event = this.eventDataother.event.replace(/\n/g, "<br>");
          } else {
            console.error('获取事件数据失败');
          }
        })
        .catch(error => {
          console.error('请求错误:', error);
        });

    },

  //获取人物在某年份（某年龄）详情事件
    fetch_year_details() {
      console.log("获取人物在某年份（某年龄）详情事件canshu",this.selectedYear);
      //axios.get(`${API_BASE_URL}/m2/5614391-5293614-default/246996874`, { params: { year: this.selectedYear } })
       axios.get(`${ API_BASE_URL }/api/v1/life/year_details`,{ params: { year: this.selectedYear } })    
        .then(response => {
          if (response.data.state === 200) {
            
             this.eventDatayear= response.data.data;
             //this.eventDataperson.event = this.eventDataperson.event.replace(/\n/g, "<br>");
          } else {
            console.error('获取人物在某年份（某年龄）详情事件失败');
          }
        })
        .catch(error => {
          console.error('获取人物在某年份（某年龄）详情事件请求错误:', error);
        });
    
    },
  //返回首页
   goBackhome() {
      this.$router.push('/');
    },
  //关闭对话框
   handleClose(done) {
       done(); // 确保在关闭时能够正常关闭对话框
       document.body.style.overflow = 'auto'; // 恢复滚动
    }
  },
  watch: {
    '$route.query.year': function(newYear) {
      // 当路由的 query 参数改变时，更新年份并显示对话框
      if (newYear) {
        this.selectedYear = newYear;
        this.dialogVisible2 = true; // 显示对话框
        this.fetch_year_details();
      }
    }
  },
  mounted() {
     this.fetch_other_event_titles();
    this.dialogVisible2 = false;
    // 页面加载时检查是否有年份数据，如果有，则显示对话框
    if (this.$route.query.year) {
      this.selectedYear = this.$route.query.year;
      console.log("几年", this.selectedYear);
      this.dialogVisible2 = true;
      //this.fetch_year_details();
    }
  },
};
</script>

<style >

html, body {
  background-color: #E2DCCC;  /* 设置整个页面背景颜色 */
  height: 100%;
  width:100%;
   margin: 0;    /* 移除默认的边距 */
}

.timeline-flex-container {

  position: absolute;
  transform: translate(-14%, -80%);
  display: flex;
  justify-content: flex-start; /* 向左对齐 */
  align-items: center; /* 可选：垂直居中对齐 */
  z-index: 2;
}

.container {
  position: absolute;
  display: flex;
  justify-content: flex-start; /* 向左对齐 */
  align-items: center; /* 可选：垂直居中对齐 */
  width:386%;
  height: 1000px; /* 设置更大的高度 */
  transform: translate(-13.97%, -24%);
  flex-direction: row;
  background-color: #E2DCCC; 
}
.container2 {
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: flex-start; /* 向左对齐 */
  align-items: center; /* 可选：垂直居中对齐 */
  width: 386%;
  height: 500px; /* 设置更大的高度 */
  transform: translate(-13.95%, 87%);
  padding:0px;
  
}

.timeline {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.timeline-item {
  background-color: #f0f0f0;
  padding: 5px;
  margin-bottom: 5px;
  text-align: center;
}

.header{
  width: 156px;
  background-color:#D8D2C2;
  text-align: center;
  font-size: 38px; 
  font-family: "KaiTi", "楷体", serif; /* 设置为楷书字体 */
  padding:0px;
  writing-mode: vertical-rl; /* 设置文字竖排 */
  height:420px; /* 设置固定高度 */
  margin-top: 60px;
}

.header2{
  width: 156px;
  background-color:#A5AAA3;
  text-align: center;
  font-size: 38px; 
  font-family: "KaiTi", "楷体", serif; /* 设置为楷书字体 */
  padding: 0;
  writing-mode: vertical-rl; /* 设置文字竖排 */
  height: 420px; /* 设置固定高度 */
  margin-top: 60px;
}
.subheader{
background-color:#D8D2C2;
font-size: 30px;
font-family: "KaiTi", "楷体", serif; 
text-align: center;
 writing-mode: vertical-rl;
}
.subheader2{
background-color:#A5AAA3;
font-size: 30px;
font-family: "KaiTi", "楷体", serif; 
text-align: center;
 writing-mode: vertical-rl;
}
.section {
  width: 100%;
  background-color: #E2DCCC;
  text-align: center;
  padding:0;
  margin-bottom: 10px;
  height: 350px; /* 设置固定高度 */
}
.section2 {
  width: 100%;
  background-color:#C3B59B;
  text-align: center;
  padding:0;
  margin-bottom: 10px;
  height: 350px; /* 设置固定高度 */
}
.grid {
  display: grid;
  grid-template-columns: repeat(93, auto); /* 根据需要调整列数 */
  gap: 0; /* 确保列之间没有间隙 */
}
.grid2 {
  display: grid;
  grid-template-columns: repeat(93, auto); /* 根据需要调整列数 */
  gap: 0; /* 确保列之间没有间隙 */
}
.grid-item {
  background-color: #E2DCCC;
  padding: 5px;
  text-align: center;
  writing-mode: vertical-rl; /* 设置文字竖排 */
  font-size: 20px;
  font-family: "KaiTi", "楷体", serif; 
  font-weight: bold;
}
.special-style {
  background-color:#DAB09F;
  padding: 5px;
  text-align: center;
  writing-mode: vertical-rl; /* 设置文字竖排 */
  font-size: 20px;
  font-family: "KaiTi", "楷体", serif; 
  color: white;
  font-weight: bold;
   /*border: 2px solid #333;*/
  border-radius: 5px; /* 设置圆角，如果需要方角可以删除此行 */
   margin:0px; 
}
.grid-item2 {
  background-color:#AFB4AD;
  padding: 5px;
  text-align: center;
  writing-mode: vertical-rl; /* 设置文字竖排 */
  font-size: 20px;
  font-family: "KaiTi", "楷体", serif; 
  font-weight: bold;
}

.charts{
   position: absolute;
  display: flex;
  width: 6500px;
  height: 1000px; /* 设置更大的高度 */
  transform: translate(-14%, -14.5%);
}

.dialog-content{
  font-size: 20px;
  font-family: fangzheng-font-custom;
  color: #333333; 
}
.dialog-content2{
   font-size: 18px;
  font-family:"KaiTi", "楷体", serif; 
  color: #333333; 
}
</style>
