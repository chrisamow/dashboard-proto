//note, the jquery exception is a known thing - do NOT pause on caught exceptions at page load
//http://stackoverflow.com/questions/21661113/jquery-error-during-load-failed-to-execute-query-x-is-not-a-valid-selecto

let idnext = 100  //unique instances of component
Vue.component('c3-chart', {
  template: '<div :style="styles" v-bind:class="classtype" :id="randomid" ></div>',
  props: {
    legend: {
      type: Object,
    },
    size: {
      type: Object,
    },
    colour: {
      type: Object,
    },
    axis: {
      type: Object,
    },
    bar: {
      type: Object,
    },
    chartdata:{
      type: Object,
      default: function () {
        return  {
                columns: [
                    ['data1', 30, 200, 100, 400, 150, 250],
                    ['data2', 50, 20, 10, 40, 15, 25]
                ]
        }
      }
    },
    classtype:{
          type: Object,
    },
    styles: {
          type: Object,
    }
  },
  created: function() {
  },
  mounted: function(){

       this.drawChart();
  },
  methods : {
    drawChart: function () {
      var self = this 
      var chart = c3.generate({
             bindto: document.getElementById(self.randomid) ,
             data: self.chartdata,
             size : self.size,
             colour : self.colour,
             legend : self.legend,
             bar : self.bar,
             axis : self.axis
      });
    }
  },
  computed: {
    randomid: function () {
      idnext += 1
      return 'myc3_' + idnext      //'c3_todorandomidhere'   //_.uniqueId('c3_')
    }
  } 
})


Vue.component('c3-bar', {
  template: '<div><c3-chart :chartdata="bar.data" :colour="bar.color" :size="bar.size"></c3-chart></div>',
  props:  {
  },
  components:  {
  },
  data: function () {
    return {
      bar : {
        data: {
          columns: [
              ['data1', 30, 200, 100, 400, 150, 250],
              ['data2', 50, 20, 10, 40, 15, 25]
          ],
          type: 'bar',
          onclick: function (d, i) { /*console.log("onclick", d, i);*/ },
          onmouseover: function (d, i) { /*console.log("onmouseover", d, i);*/ },
          onmouseout: function (d, i) {   /* console.log("onmouseout", d, i);*/ }
        },
        color: {
          pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], 
          threshold: {
            values: [30, 60, 90, 100]
          }
        },
        size: {
          height: 180
        }
      }
    }
  }
})


Vue.component('c3-gauge', {
  template: '<div><c3-chart :chartdata="gauge.data" :colour="gauge.color" :size="gauge.size"></c3-chart></div>',
  props:  {
  },
  components:  {
  },
  data: function () {
    return {
      gauge : {
        data: {
          columns: [
            ['data', 91.4]
          ],
          type: 'gauge',
          onclick: function (d, i) { /*console.log("onclick", d, i);*/ },
          onmouseover: function (d, i) { /*console.log("onmouseover", d, i);*/ },
          onmouseout: function (d, i) {   /* console.log("onmouseout", d, i);*/ }
        },
        color: {
          pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], 
          threshold: {
            values: [30, 60, 90, 100]
          }
        },
        size: {
          height: 180
        }
      }
    }
  }
})


Vue.component('vital-display', {
  props: [ 'metric', 'description', 'metricval' ],
  template: '<div><div><h3><span class="text-muted">{{metric}}: </span><span>{{metricval}}</span></h3></div><div><small class="text-muted">{{description}}</small></div></div>'
})


new Vue({
  el: '#vueapp',
  data: {
    brand: 'SHOWROOMLogic'
  },
  methods: {
    humanizeURL: function (url) {
      return url
        .replace(/^https?:\/\//, '')
        .replace(/\/$/, '')
    }
  }
})

