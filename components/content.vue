<template>
  <b-list-group class="list-group-flush">
    <b-breadcrumb :items="menuItems" class="mt-2 pr-2 pb-2"/>
    <b-list-group-item v-for="content in data.list" :key="content.id" class="flex-column align-items-start post-item">
      <b-card-title>
        <b-link
          class="mr-2"
          :href="'/article/'+(content.slug&&content.slug!=null?encodeURIComponent(content.slug):content.id)"
        >
          {{ content.title }}
        </b-link>
      </b-card-title>
      <b-card-text
        class="RichText ztext CopyrightRichText-richText"
        itemprop="text"
      >
        {{ content.content }}...
      </b-card-text>
      <b-link
        class="mr-2"
        :href="'/article/'+(content.slug&&content.slug!=null?encodeURIComponent(content.slug):content.id)+'#comments'"
      >
        评论 ({{ content.commentsNum }})
      </b-link>
      <b-link
        class="mr-2"
        :href="'/article/'+(content.slug&&content.slug!=null?encodeURIComponent(content.slug):content.id)"
      >
        阅读({{ content.hits }})
      </b-link>
      <b-link class="mr-2" :href="'/archive/'+encodeURIComponent(content.created)+'/1'">
        {{ content.created | formatDate }}
      </b-link>
    </b-list-group-item>
    <b-card class="mb-0 border-0 text-center">
      <b-pagination-nav :link-gen="linkGen" :number-of-pages="data.totalPage" :value="data.pageNum" limit="10"
                        use-router @change="indexChanged"/>
    </b-card>
  </b-list-group>
</template>
<script>

  import {dateFormat} from '~/utils/dateUtils'
  let currentPage=1;

  export default {
    name: 'Content',
    filters: {
      formatDate(time) {
        const date = new Date(time);
        return dateFormat(date, 'yyyy年MM月dd日')
      }
    },
    // eslint-disable-next-line vue/require-prop-types
    props: ['displayType', 'displayMeta', 'orderType', 'data', 'menuItems'],
    methods: {
      linkGen(pageNum) {
        if(this.displayMeta){
          return `/${this.displayType}/${this.displayMeta}/${pageNum}`
        }else {
          return `/${this.displayType}/${pageNum}`
        }
      },
      indexChanged(pageNum) {
        if(pageNum===currentPage)
          return;
        currentPage=pageNum;
        this.$emit('getContentsByNum', pageNum)
      }
    }
  }
</script>
<style>
  .pagination {
    justify-content: center;
  }

  .card-title a {
    display: inline;
    font-weight: 500;
    font-size: 18px;
    line-height: 28px;
    color: #212121;
    position: relative;
    vertical-align: middle;
  }

  .card-text {
    margin-bottom: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 1.5;
    color: #888;
    font-size: 13px;
    font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC, Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei, sans-serif;
  }
</style>
