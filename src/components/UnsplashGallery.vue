<template>
    <div class="min-h-screen bg-gray-100 py-8 px-4">
        <div class="max-w-6xl mx-auto">
            <!-- 标题 -->
            <h1 class="text-3xl font-bold text-center text-gray-800 mb-12">
                Unsplash 图片展示
            </h1>

            <!-- 设置表单 -->
            <el-row :gutter="20" class="mb-12">
                <el-col :span="6">
                    <el-input v-model="width" placeholder="宽度" type="number" min="100" max="1200" />
                </el-col>
                <el-col :span="6">
                    <el-input v-model="height" placeholder="高度" type="number" min="100" max="1200" />
                </el-col>
                <el-col :span="6">
                    <el-input v-model="count" placeholder="图片数量" type="number" min="1" max="30" />
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" @click="fetchPhotos" :loading="loading">
                        <refresh-icon class="el-icon--right" />
                        刷新图片
                    </el-button>
                </el-col>
            </el-row>

            <!-- 错误提示 -->
            <el-alert v-if="error" :title="error" type="error" class="mb-8" />

            <!-- 图片展示 -->
            <el-row :gutter="20">
                <el-col v-for="photo in photos" :key="photo.id" :span="8" class="mb-4">
                    <el-card class="photo-card">
                        <img :src="getPhotoUrl(photo)" :alt="photo.id" class="w-full h-48 object-cover" />
                        <!-- 下载按钮 -->
                        <div class="flex justify-end mt-2">
                            <el-button type="primary" size="small" @click="downloadImage(photo)">
                                <download-icon class="el-icon--right" />
                                下载
                            </el-button>
                        </div>
                    </el-card>
                </el-col>
            </el-row>

            <!-- 加载动画 -->
            <el-skeleton v-if="loading" :rows="6" animated />
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { Download, Refresh } from '@element-plus/icons-vue';

export default {
    data() {
        return {
            photos: [], // 存储图片数据
            loading: false, // 加载状态
            error: null, // 错误信息
            width: 600, // 默认宽度
            height: 400, // 默认高度
            count: 9, // 默认图片数量
        };
    },
    components: {
        DownloadIcon: Download,
        RefreshIcon: Refresh,
    },
    mounted() {
        this.fetchPhotos(); // 页面加载时获取图片
    },
    methods: {
        async fetchPhotos() {
            this.loading = true;
            this.error = null;

            const accessKey = '你的 Unsplash API Key'; // 替换为你的 Unsplash API Key
            const query = 'nature'; // 搜索关键词
            const url = `https://api.unsplash.com/photos/random?count=${this.count}&query=${query}&client_id=${accessKey}`;

            try {
                const response = await axios.get(url);
                this.photos = response.data;
            } catch (error) {
                this.error = '获取图片失败，请稍后重试。';
                console.error(error);
            } finally {
                this.loading = false;
            }
        },
        getPhotoUrl(photo) {
            // 根据用户设置的分辨率动态生成图片 URL
            return `${photo.urls.raw}&w=${this.width}&h=${this.height}&fit=crop`;
        },
        downloadImage(photo) {
            // 使用 Unsplash 提供的下载链接
            const link = document.createElement('a');
            link.href = photo.links.download; // 使用 links.download 触发下载
            link.target = '_blank'; // 在新标签页打开（可选）
            link.download = `unsplash-image-${photo.id}.jpg`; // 设置下载文件名
            document.body.appendChild(link);
            link.click(); // 触发下载
            document.body.removeChild(link); // 移除 <a> 标签
        },
    },
};
</script>

<style scoped>
/* 标题居中 */
h1 {
    text-align: center;
}

/* 表单与图片之间的间隔 */
.el-row.form-row {
    margin-bottom: 3rem;
    /* 增加底部间距 */
}

/* 图片卡片样式 */
.photo-card {
    transition: box-shadow 0.3s ease;
    border-radius: 8px;
    overflow: hidden;
}

.photo-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 下载按钮样式 */
.el-button--primary {
    background-color: #409eff;
    border-color: #409eff;
}

.el-button--primary:hover {
    background-color: #66b1ff;
    border-color: #66b1ff;
}

/* 图片网格布局 */
.el-row.photo-grid {
    margin-top: 2rem;
    /* 增加顶部间距 */
}
</style>