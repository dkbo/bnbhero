<template>
    <Row>
        <Col :span="24 / v.length" v-for="(data, i) in v" :key="i">
            <Input number v-model="v[i]" :placeholder="PH[i]" />
        </Col>
    </Row>
</template>
<script>
export default {
    name: 'CalcInput',
    props: {
        v: Array,
        PH: Array
    }
}
</script>

