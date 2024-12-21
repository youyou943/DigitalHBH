const routePlaceDetails = {
    北京: {
        state: 200,
        data: {
            year: 1999,
            month: "四月",
            reference: "1936年,黄宾虹被故宫聘为古物鉴定委员,在北平期间,他创作了许多具有独特风格的山水画作品,这些作品融合了他对传统绘画的深刻理解和对北方山水的感悟,如《北平纪游册》等。",
            work: "https://bkimg.cdn.bcebos.com/pic/6f061d950a7b0208af274ead68d9f2d3562cc894?x-bce-process=image/format,f_auto/watermark,image_d2F0ZXIvYmFpa2UyNzI,g_7,xp_5,yp_5,P_20/resize,m_lfit,limit_1,h_1080",
            workname: "黄山汤口"
        }
    },
    上海: {
        state: 200,
        data: {
            year: 2001,
            month: "五月",
            reference: "上海作为中国的经济中心，吸引了大量的艺术家和文化名人。此地的文化氛围与现代艺术紧密结合，诞生了许多具有国际影响力的艺术作品。",
            work: "https://example.com/image_shanghai.jpg",
            workname: "上海的夜"
        }
    },
    西安: {
        state: 200,
        data: {
            year: 1987,
            month: "九月",
            reference: "西安作为历史文化名城，是中国古代文明的发源地之一，许多古老的艺术形式和历史遗迹吸引着来自世界各地的游客和学者。",
            work: "https://example.com/image_xian.jpg",
            workname: "大雁塔"
        }
    },
    杭州: {
        state: 200,
        data: {
            year: 2010,
            month: "七月",
            reference: "杭州素有“人间天堂”之美誉，尤其是西湖景区的自然风光、历史文化深深吸引了无数艺术家前来创作。",
            work: "https://example.com/image_hangzhou.jpg",
            workname: "西湖春晓"
        }
    },
    成都: {
        state: 200,
        data: {
            year: 2015,
            month: "六月",
            reference: "成都以其独特的川剧文化、美食以及历史遗迹成为了艺术家和游客的天堂。这里的慢生活节奏也影响了当地的艺术创作风格。",
            work: "https://example.com/image_chengdu.jpg",
            workname: "锦里风情"
        }
    }
};

// 模拟 API 请求
function getRoutesPlaces() {
    return {
        state: 200,
        data: [
            { place: "北京", order: 1 },
            { place: "上海", order: 2 },
            { place: "西安", order: 3 },
            { place: "杭州", order: 4 },
            { place: "成都", order: 5 }
        ]
    };
}

function getRoutePlaceDetails(place) {
    // 根据地点返回不同的地点详情
    if (routePlaceDetails[place]) {
        return routePlaceDetails[place];
    }
    return {
        state: 404,
        message: "地点详情未找到"
    };
}