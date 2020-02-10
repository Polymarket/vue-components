<template>
  <div>
    <apexchart
      type="donut"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script>
export default {
  name: 'GovTallyDonut',
  props: {
    proposal: {
      type: Object,
      required: false,
      default: Object.assign({}),
    },
  },
  data() {
    return {
      series: this.proposal.donutValues,
      chartOptions: {
        colors: ['#e9a1ab', '#222f3d', '#73797f', '#73797f'],
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'vertical',
            shadeIntensity: 0.05,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 0.9,
            stops: [0, 100],
          },
        },
        labels: ['Yes', 'No', 'Abstain', 'No w/ Veto'],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 275,
            },
            legend: {
              position: 'bottom',
            },
          },
        }],
        legend: {
          labels: {
            colors: '#000',
          },
        },
      },
    };
  },
};
</script>

<style>

</style>
