<script setup lang="ts">
import { defineAsyncComponent } from "vue"
import { defineNotionProps, useNotionBlock } from "@/lib/blockable"
import { availableType } from "@/lib/constant"
import NotionBookmark from "@/blocks/bookmark.vue"
import NotionCallout from "@/blocks/callout.vue"
import NotionColumn from "@/blocks/column.vue"
import NotionEquation from "@/blocks/equation.vue"
import NotionFigure from "@/blocks/helpers/figure.vue"
import NotionHeader from "@/blocks/header.vue"
import NotionList from "@/blocks/list.vue"
import NotionPage from "@/blocks/page.vue"
import NotionQuote from "@/blocks/quote.vue"
import NotionTable from "@/blocks/table.vue"
import NotionTableRow from "@/blocks/table-row.vue"
import NotionText from "@/blocks/text.vue"
import NotionTodo from "@/blocks/todo.vue"
import NotionToggle from "@/blocks/toggle.vue"
import NotionTableOfContents from "@/blocks/table-of-contents.vue"
import NotionSyncBlock from "@/blocks/sync-block.vue"
import NotionSyncPointerBlock from "@/blocks/sync-pointer-block.vue"

const NotionCode = defineAsyncComponent(() => import("@/blocks/code.vue"))
const NotionTweet = defineAsyncComponent(() => import("@/blocks/tweet.vue"))

const props = defineProps({ ...defineNotionProps })
//@ts-ignore
const { pass, type, format, isType } = useNotionBlock(props)
if (!availableType.includes(type.value)) console.warn(`${type.value.toUpperCase()} is not implemented yet`)

const uuidToId = (uuid: string) => {
  return uuid.replaceAll('-','')
}
</script>

<template>
  <div :id="uuidToId(String(pass.contentId))" style="width: 100%" v-if="isType('page')">
    <NotionPage class="notion-page-content" v-bind="pass">
      <slot />
    </NotionPage>
  </div>
  <NotionHeader v-else-if="isType(['header', 'sub_header', 'sub_sub_header'])" v-bind="pass" />
  <NotionBookmark :id="uuidToId(String(pass.contentId))" v-else-if="isType('bookmark')" v-bind="pass" />
  <NotionCallout :id="uuidToId(String(pass.contentId))" v-else-if="isType('callout')" v-bind="pass" />
  <NotionCode :id="uuidToId(String(pass.contentId))" v-else-if="isType('code')" v-bind="pass" />
  <NotionEquation :id="uuidToId(String(pass.contentId))" v-else-if="isType('equation')" v-bind="pass" />
  <NotionText :id="uuidToId(String(pass.contentId))" v-else-if="isType('text')" v-bind="pass" />
  <NotionQuote :id="uuidToId(String(pass.contentId))" v-else-if="isType('quote')" v-bind="pass" />
  <NotionTodo :id="uuidToId(String(pass.contentId))" v-else-if="isType('to_do')" v-bind="pass" />
  <NotionToggle :id="uuidToId(String(pass.contentId))" v-else-if="isType('toggle')" v-bind="pass">
    <slot />
  </NotionToggle>
  <div :id="uuidToId(String(pass.contentId))" v-else-if="isType('column_list')" class="notion-row">
    <slot />
  </div>
  <NotionColumn :id="uuidToId(String(pass.contentId))" v-else-if="isType('column')" :format="format">
    <slot />
  </NotionColumn>
  <NotionList :id="uuidToId(String(pass.contentId))" v-else-if="isType(['bulleted_list', 'numbered_list'])" v-bind="pass">
    <slot />
  </NotionList>
  <NotionFigure :id="uuidToId(String(pass.contentId))" v-else-if="isType(['image', 'embed', 'figma', 'video', 'audio', 'drive', 'maps'])" v-bind="pass" />
  <NotionTable :id="uuidToId(String(pass.contentId))" v-else-if="isType('table')" v-bind="pass"><slot /></NotionTable>
  <NotionTableRow :id="uuidToId(String(pass.contentId))" v-else-if="isType('table_row')" v-bind="pass" />
  <NotionTableOfContents :id="uuidToId(String(pass.contentId))" v-else-if="isType('table_of_contents')" v-bind="pass"></NotionTableOfContents>
  <NotionSyncBlock :id="uuidToId(String(pass.contentId))" v-else-if="isType('transclusion_container')"><slot /></NotionSyncBlock>
  <NotionSyncPointerBlock :id="uuidToId(String(pass.contentId))" v-else-if="isType('transclusion_reference')" v-bind="pass"></NotionSyncPointerBlock>
  <NotionTweet :id="uuidToId(String(pass.contentId))" v-else-if="isType('tweet')" v-bind="pass"></NotionTweet>
  <hr :id="uuidToId(String(pass.contentId))" v-else-if="isType('divider')" class="notion-hr" />
</template>
