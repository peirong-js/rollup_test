<template>
    <div class="test">
        {{message}}
        <svg width='100%' height="100%" viewBox="0 0 100 100">
            <line x1="0" y1="50" x2="100" y2="50" stroke-width="8" stroke="currentcolor" />
            <line x1="50" y1="0" x2="50" y2="100" stroke-width="8" stroke="currentcolor" />
        </svg>
    </div>
</template>

<script>
export default {
    name: 'TestComponent',
    data() {
        return {
            message: 'hello world!!!!!'
        }
    }
    // setup() {
    //     const message = 'hello world?????'
    //     return {
    //         message
    //     }
    // }
}
</script>

<style lang="scss" scoped>
    .test{
       
    }
</style>