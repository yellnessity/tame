<template>
  <div class="trait_chart" :id="'traits_chart_'+trait"></div>
</template>

<script>
var ProgressBar = require('progressbar.js');
export default {
    name: "TraitsMeter",
    props: {
        value: Number,
        trait: String
    },
    mounted() {
        var bar = new ProgressBar.Circle(`#traits_chart_${this.trait}`, {
        color: '#FF8577',
        strokeWidth: 4,
        trailWidth: 1,
        easing: 'easeInOut',
        duration: 1400,
        text: {
            value: this.value
        }
        }); 
        bar.animate(this.value / 100);
    }
}
</script>

<style>
.trait_chart {
    position: relative;
    width: 50px;
    height: 50px;
}
</style>