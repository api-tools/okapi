<template>
    <div class="border rounded slider flex" :class="this.state === true ? 'on' : 'off'" @click="this.changeState()">
        <div class="dot border rounded">&nbsp;</div>
    </div>
</template>

<script>
export default {
    props: ["state"],
    emits: ["changeState"],
    methods: {
        changeState() {
            this.$emit("changeState", !this.state)
        }
    }
};
</script>

<style>
.slider {
    cursor: pointer;
    width: 45px;
    padding: 0 5px;
    background-color: var(--col-input-text-bg);
}

.dot {
    width: 15px;
    height: 15px;
    margin: 0.2rem 0;
    background-color: var(--col-splitter);
}

.on {
    justify-content: end;
}

.off {
    justify-content: start;
}
</style>
