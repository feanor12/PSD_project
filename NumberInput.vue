<template>
<input type="number" v-bind="value">
</template>

<script>
export default {
    name: "NumberInput ",
    data() {
        return {
            value: 0
        }
    }
}
</script>