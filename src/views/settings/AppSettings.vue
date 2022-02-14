<template>
    <n-tabs type="segment">
        <n-tab-pane name="UI" tab="UI">
            <n-form inline label-placement="left" :label-width="110" ref="formUI">
                <n-grid :cols="6" :x-gap="26" item-responsive responsive="screen">
                    <n-form-item-gi span="6 m:3" label="侧边栏宽度" path="sider.width">
                        <n-input-number
                            v-model:value="siderWidthValue"
                            :min="100"
                            :max="400"
                            :step="5"
                            @update:value="handleSiderWidthUpdate"
                            :update-value-on-input="false"
                        >
                            <template #suffix>px</template>
                        </n-input-number>
                    </n-form-item-gi>
                    <n-form-item-gi span="6 m:3" label="Textarea" path="textareaValue">
                        <n-input
                            placeholder="Textarea"
                            v-model:value="textareaValue"
                            type="textarea"
                            :autosize="{ minRows: 3, maxRows: 5 }"
                        />
                    </n-form-item-gi>
                    <n-form-item-gi span="6 m:3" label="重置UI设置">
                        <n-popconfirm
                            negative-text="确认"
                            :positive-text="null"
                            :show-icon="false"
                            @negative-click="confirmClearUI"
                        >
                            <template #trigger>
                                <n-button strong secondary block type="error">Reset</n-button>
                            </template>
                        </n-popconfirm>
                    </n-form-item-gi>
                </n-grid>
            </n-form>
        </n-tab-pane>
        <n-tab-pane name="chap2" tab="第二章">
            “威尔！着火了！快来帮忙！”我听到女朋友大喊。现在一个难题在我面前——是恢复一个重要的
            Amazon 服务，还是救公寓的火。
            <br />
            <br />我的脑海中忽然出现了 Amazon
            著名的领导力准则”客户至上“，有很多的客户还依赖我们的服务，我不能让他们失望！所以着火也不管了，女朋友喊我也无所谓，我开始
            debug 这个线上问题。
        </n-tab-pane>
        <n-tab-pane name="chap3" tab="第三章">
            但是忽然，公寓的烟味消失，火警也停了。我的女朋友走进了房间，让我震惊的是，她摘下了自己的假发，她是
            Jeff Bezos（Amazon 老板）假扮的！
            <br />
            <br />“我对你坚持顾客至上的原则感到十分骄傲”，说完，他递给我一张五美金的亚马逊礼品卡，从我家窗户翻了出去，跳上了一辆
            Amazon 会员服务的小货车，一溜烟离开了。
            <br />
            <br />虽然现在我已不在 Amazon
            工作，但我还是非常感激在哪里学的到的经验，这些经验我终身难忘。你们同意么？
        </n-tab-pane>
    </n-tabs>
</template>

<script setup>
import { NTabs, NTabPane } from 'naive-ui'
import { NForm, NGrid, NFormItemGi, NButton, NPopconfirm, NInput, NInputNumber } from 'naive-ui'
import { useMessage } from 'naive-ui'
import { ref } from 'vue'
import { useStore } from 'vuex'
import * as R from 'ramda'

const message = useMessage()
const store = useStore()

const formUI = ref()

const siderWidthValue = ref(R.path(['sider', 'width'], store.getters.ui))

const handleSiderWidthUpdate = async (value) => {
    // console.log('update:value:sider.width', value)
    siderWidthValue.value = value
    await store.dispatch('ui/set', { key: 'sider.width', value })
};

const textareaValue = ref('')

const confirmClearUI = async () => {
    await store.dispatch('ui/clear')
    message.info('成功！')
}
</script>

<style scoped>
.n-input-number {
    flex: 1;
}
</style>